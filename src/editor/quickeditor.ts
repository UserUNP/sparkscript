import Template			from "../core/components/Template";

import MinecraftItem	from "../values/MinecraftItem";
import Text			 	from '../values/Text';
import Number			from '../values/Number';
import Variable			from '../values/Variable';
import Location			from "../values/Location";
import Potion			from "../values/Potion";
import GameValue		from "../values/GameValue";
import Vector 			from "../values/Vector";

import { PlayerAction, PlayerEvent }	from "../codeblocks/Player";
import { EntityAction, EntityEvent }	from "../codeblocks/Entity";
import { SetVariable }					from "../codeblocks/SetVariable";
import SelectObject						from "../codeblocks/SelectObject";
import GameAction						from "../codeblocks/GameAction";
import Func								from "../codeblocks/Func";

import Ieditor	from "./Iquickeditor";

type actDefs = Record<string, ((...args: any[])=>void) | string>;

function getEditor(_template: Template|false, customAction: { actDefs: actDefs, doCustomAction: (name: string, ...args: any[]) => any }): Ieditor {
	let template: Template;
	if(!_template) template = new Template(false);
	else template = _template;

	const actDefs = customAction.actDefs;
	const doCustomAction = customAction.doCustomAction;
	const editor: Ieditor = {
		_from: (other) => {
			template._blocks = other.blocks;
		},

		getTemplate: () => template,

		get: (index: number) => {
			return template.blocks[index] ?? null;
		},

		//* Spark stuff.
		defAction: (name, cbOrAction) => {
			actDefs[name] = cbOrAction;
			Object.keys(actDefs).forEach((name) => {
				editor.action[name] = function(...args: any[]) {doCustomAction(name, ...args);};
			});
		},
		action: {},

		//* Values.
		item: (id, name, amount, slot?) => new MinecraftItem(id, name, amount, slot),
		mc: (id, name, amount, slot?) => new MinecraftItem(id, name, amount, slot),

		text: (text, slot?) => new Text(text, slot),
		txt: (txt, slot?) => new Text(txt, slot),

		number: (number, slot?) => new Number(number, slot),
		num: (num, slot?) => new Number(num, slot),

		variable: (name, scope, slot?) => new Variable(name, scope, slot),
		var: (name, scope="game", slot?) => new Variable(name, scope, slot),

		location: (x, y, z, pitch=90, yaw=0, slot?) => new Location(x, y, z, pitch, yaw, slot),
		loc: (x, y, z, pitch=90, yaw=0, slot?) => new Location(x, y, z, pitch, yaw, slot),

		potion: (potion, duration, amplifier=0, slot?) => new Potion(potion, duration, amplifier, slot),
		pot: (pot, dur, amp=0, slot?) => new Potion(pot, dur, amp, slot),

		vector: (x, y, z, slot?) => new Vector(x, y, z, slot),
		vec: (x, y, z, slot?) => new Vector(x, y, z, slot),

		game: {
			//* Game values.
			value: (value, target, slot?) => new GameValue(value, target, slot),
			val: (val, target, slot?) => new GameValue(val, target, slot),
			//* Game action.
			action: (action, ...args) => template.push(new GameAction(action, ...args)),
			act: (action, ...args) => template.push(new GameAction(action, ...args)),
		},

		//* Codeblocks.
		player: {
			action: (action, ...args) => template.push(new PlayerAction(action, ...args)),
			act: (action, ...args) => template.push(new PlayerAction(action, ...args)),
			
			event: (event) => template.push(new PlayerEvent(event)),
			evt: (event) => template.push(new PlayerEvent(event)),
		},
		entity: {
			action: (action, ...args) => template.push(new EntityAction(action, ...args)),
			act: (action, ...args) => template.push(new EntityAction(action, ...args)),

			event: (event) => template.push(new EntityEvent(event)),
			evt: (event) => template.push(new EntityEvent(event)),
		},

		function: (name, ...args) => template.push(new Func(name, ...args)),
		func: (name, ...args) => template.push(new Func(name, ...args)),

		setvariable: (action, variable,...args) => template.push(new SetVariable(action, variable, ...args)),
		setvar: (action, variable,...args) => template.push(new SetVariable(action, variable, ...args)),

		select: (condition, ...args) => template.push(new SelectObject(condition, ...args)),
		sel: (condition, ...args) => template.push(new SelectObject(condition, ...args)),
	};
	return editor;
}
export default getEditor;
