import Template			from "./components/Template";
import Value 			from "./components/Value";
import MinecraftString	from "./components/minecraft/MinecraftString";

import MinecraftItem	from "./values/MinecraftItem";
import Text			 	from './values/Text';
import Number			from './values/Number';
import Variable			from './values/Variable';
import Location			from "./values/Location";
import Potion			from "./values/Potion";
import GameValue		from "./values/GameValue";
import Vector 			from "./values/Vector";

import { PlayerAction, PlayerEvent }	from "./codeblocks/Player";
import { EntityAction, EntityEvent }	from "./codeblocks/Entity";
import { SetVariable }					from "./codeblocks/SetVariable";
import SelectObject						from "./codeblocks/SelectObject";
import GameAction						from "./codeblocks/GameAction";
import Func								from "./codeblocks/Func";

import Ieditor	from "./Iquickeditor";

type actDefs = {[name: string]: (()=>void)|string};

function getEditor(template: Template, customAction: { actDefs: actDefs, doCustomAction: (name: string, ...args: any[]) => any }): Ieditor {
	const actDefs = customAction.actDefs;
	const doCustomAction = customAction.doCustomAction;
	const editor: Ieditor = {
		_from: (other: Template) => {
			template._blocks = other.blocks;
		},

		getTemplate: () => {
			return template;
		},

		//* Spark stuff.
		defAction: (name: string, cbOrAction: (()=>void)|string) => {
			actDefs[name] = cbOrAction;
			Object.keys(actDefs).forEach((name: string) => {
				editor.action[name] = function(...args: any[]) {doCustomAction(name, ...args);};
			});
		},
		action: {},

		//* Values.
		item: (amount: number, id: string, name: string | MinecraftString, slot?: number) => new MinecraftItem(amount, id, name, slot),
		mc: (amount: number, id: string, name: string | MinecraftString, slot?: number) => new MinecraftItem(amount, id, name, slot),

		text: (text: string, slot?: number) => new Text(text, slot),
		txt: (txt: string, slot?: number) => new Text(txt, slot),

		number: (number: number, slot?: number) => new Number(number, slot),
		num: (num: number, slot?: number) => new Number(num, slot),

		variable: (name: string, scope: "local" | "game" | "save", slot?: number) => new Variable(name, scope, slot),
		var: (name: string, scope: "local" | "game" | "save"="game", slot?: number) => new Variable(name, scope, slot),

		location: (x: number, y: number, z: number, pitch: number=90, yaw: number=0, slot?: number) => new Location(x, y, z, pitch, yaw, slot),
		loc: (x: number, y: number, z: number, pitch: number=90, yaw: number=0, slot?: number) => new Location(x, y, z, pitch, yaw, slot),

		potion: (potion: string, duration: number, amplifier: number=0, slot?: number) => new Potion(potion, duration, amplifier, slot),
		pot: (pot: string, dur: number, amp: number=0, slot?: number) => new Potion(pot, dur, amp, slot),

		vector: (x: number, y: number, z: number, slot?: number) => new Vector(x, y, z, slot),
		vec: (x: number, y: number, z: number, slot?: number) => new Vector(x, y, z, slot),

		game: {
			//* Game values.
			value: (value: string, target: string, slot?: number) => new GameValue(value, target, slot),
			val: (val: string, target: string, slot?: number) => new GameValue(val, target, slot),
			//* Game action.
			action: (action: string, ...args: Value[]) => template.push(new GameAction(action, ...args)),
			act: (action: string, ...args: Value[]) => template.push(new GameAction(action, ...args)),
		},

		//* Codeblocks.
		player: {
			action: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			act: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			
			event: (event: string) => template.push(new PlayerEvent(event)),
			evt: (event: string) => template.push(new PlayerEvent(event)),
		},
		entity: {
			action: (action: string, ...args: Value[]) => template.push(new EntityAction(action, ...args)),
			act: (action: string, ...args: Value[]) => template.push(new EntityAction(action, ...args)),

			event: (event: string) => template.push(new EntityEvent(event)),
			evt: (event: string) => template.push(new EntityEvent(event)),
		},

		function: (name: string, ...args: Value[]) => template.push(new Func(name, ...args)),
		func: (name: string, ...args: Value[]) => template.push(new Func(name, ...args)),

		setvariable: (action: string, variable: Variable,...args: Value[]) => template.push(new SetVariable(action, variable, ...args)),
		setvar: (action: string, variable: Variable,...args: Value[]) => template.push(new SetVariable(action, variable, ...args)),

		select: (condition: string, ...args: Value[]) => template.push(new SelectObject(condition, ...args)),
		sel: (condition: string, ...args: Value[]) => template.push(new SelectObject(condition, ...args)),
	};
	return editor;
}
export default getEditor;
