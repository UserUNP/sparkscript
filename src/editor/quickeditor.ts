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
import mapper, { getActionOwner, codeblockSupported } from "../mapper";

export type ActDefs = Record<string, ((...args: any[])=>void) | string>;

/**
 * Generate a quick editor.
 * @param _template Template to edit.
 * @param customAction Action definitons and/or doCustomAction function
 * @returns The quick editor.
 */
function getEditor(_template: Template|false, customAction: { actDefs: ActDefs, doCustomAction?: (name: string, ...args: any[]) => any }): Ieditor {
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
			getEditor.applyActions(editor, actDefs, doCustomAction)
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
		var: (name, scope="unsaved", slot?) => new Variable(name, scope, slot),

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

/**
 * Default custom function executor.
 * @param tempToModify Template to act on.
 * @param actDefs Action definitions.
 * @param name Name of action.
 * @param args Arguments to pass to the action.
 * @returns User-specified output.
 */
getEditor.defaultCustomAction = (tempToModify: Template, actDefs: ActDefs, name: string, ...args: any[]) => {
	if(actDefs[name]) {
		const action = actDefs[name];
		if(typeof action === "string") {
			const actionOwnerType = getActionOwner(action)?.identifier;
			if(!actionOwnerType) throw new Error(`Action ${action} doesn't exist. If you're sure it must then the action dump may be outdated..`);
			const parsedArgs = args.map((a: any) => {
				if(typeof a === "string") return new Text(a);
				if(typeof a === "number") return new Number(a);
				else return a;
			});
			if(!codeblockSupported(actionOwnerType)) throw new Error(`Type "${actionOwnerType}" (from action ${action}) cannot be recongized as a DiamondFire block type, this maybe because it is not implemented yet.`)
			const instance = mapper(actionOwnerType, action || "", parsedArgs);
			tempToModify.push(instance);
		} else return action(...args);
	} else throw new Error(`Action ${name} is not defined.`);
}
getEditor.defaultActDefs = {} as ActDefs;
getEditor.applyActions = (editor: Ieditor, actDefs: ActDefs, doCustomAction?: (name: string, ...args: any[]) => any) => {
	Object.keys(actDefs).forEach(name => {
		editor.action[name] = (...args: any[]) => { doCustomAction ? doCustomAction(name, ...args) : getEditor.defaultCustomAction(editor.getTemplate(), actDefs, name); }
	});
}

/**
 * Quickly generate an editor, with default specifications.
 */
getEditor.default = (t?: Template): Ieditor => {
	return getEditor(t||false, {actDefs:{}})
}

export default getEditor;
