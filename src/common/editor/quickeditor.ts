import Template	from "../../core/components/Template";
import Value	from "../../core/components/Value";

import {
	DFValueType,
	DFDumpScheme,
	DFCodeExportableBlock
} from "../../core/types";

import {
	GameValue,
	Location,
	MinecraftItem,
	Number,
	Potion,
	Sound,
	Text,
	Variable,
	Vector,
} from "../../values";

import {
	PlayerAction, PlayerEvent, PlayerCondition,
	EntityAction, EntityEvent, EntityCondition,
	GameAction, GameCondition,
	SetVariable, VariableCondition,
	Func, CallFunction,
	Process, StartProcess,
	SelectObject,
	Control,
} from "../../codeblocks";

import Ieditor	from "./Iquickeditor";
import mapper from "../../mapper";
import { codeblockSupported } from "../mapperUtils";
import { sparkscriptWarn } from "../utilities";
import { getActionOwner } from "../../core/codeDump";

export type ActDefs = Record<string, ((...args: any[])=>void) | keyof DFDumpScheme["actions"]>;

/**
 * Generate a quick editor.
 * @param _template Template to edit.
 * @param customActionOptions Action definitons and doCustomAction function
 * @returns The quick editor.
 */
function getEditor<T extends Template = Template>(_template: T|false, customActionOptions: { actDefs?: ActDefs, doCustomAction?: (name: string, ...args: any[]) => any }): Ieditor<T> {
	let template: T;
	if(!_template) template = new Template(false) as T;
	else template = _template;

	const actDefs = customActionOptions.actDefs || {};
	const doCustomAction = customActionOptions.doCustomAction;
	const editor: Ieditor<typeof template> = {
		_from: (other) => {
			template._blocks = other.blocks;
		},

		getTemplate: () => template,

		get: (index) => {
			return template.blocks[index] ?? null;
		},

		//* Spark stuff.
		defAction: (name, cbOrAction) => {
			actDefs[name] = cbOrAction;
			getEditor.applyActions(editor, actDefs, doCustomAction)
		},
		action: getEditor.defaultActDefs,

		//* Values.
		item: (id, name, amount, slot?) => new MinecraftItem(id, name, amount, slot),
		mc: (id, name, amount, slot?) => new MinecraftItem(id, name, amount, slot),

		text: (text, slot?) => new Text(text, slot),
		txt: (text, slot?) => new Text(text, slot),

		number: (number, slot?) => new Number(number, slot),
		num: (number, slot?) => new Number(number, slot),

		variable: (name, scope, slot?) => new Variable(name, scope, slot),
		var: (name, scope, slot?) => new Variable(name, scope, slot),

		location: (x, y, z, pitch, yaw, slot?) => new Location(x, y, z, pitch, yaw, slot),
		loc: (x, y, z, pitch, yaw, slot?) => new Location(x, y, z, pitch, yaw, slot),

		potion: (potion, duration, amplifier, slot?) => new Potion(potion, duration, amplifier, slot),
		pot: (potion, duration, amplifier, slot?) => new Potion(potion, duration, amplifier, slot),

		sound: (sound, volume, pitch, slot?) => new Sound(sound, volume, pitch, slot),
		snd: (sound, volume, pitch, slot?) => new Sound(sound, volume, pitch, slot),

		vector: (x, y, z, slot?) => new Vector(x, y, z, slot),
		vec: (x, y, z, slot?) => new Vector(x, y, z, slot),

		true: new Number(1),
		false: new Number(0),

		game: {
			//* Game value.
			value: (value, target, slot?) => new GameValue(value, target, slot),
			val: (value, target, slot?) => new GameValue(value, target, slot),
			//* Game action.
			action: (action, ...args) => template.add(new GameAction(action, ...args)),
			act: (action, ...args) => template.add(new GameAction(action, ...args)),
			//* Game condition.
			condition: (condition, ...args) => template.add(new GameCondition(condition, ...args)),
			if: (condition, ...args) => template.add(new GameCondition(condition, ...args)),
		},

		//* Codeblocks.
		player: {
			action: (action, ...args) => template.add(new PlayerAction(action, "Default", ...args)),
			act: (action, ...args) => template.add(new PlayerAction(action, "Default", ...args)),

			event: (event) => template.add(new PlayerEvent(event)),
			evt: (event) => template.add(new PlayerEvent(event)),

			condition: (condition, ...args) => template.add(new PlayerCondition(condition, "Default", ...args)),
			if: (condition, ...args) => template.add(new PlayerCondition(condition, "Default", ...args)),
		},
		entity: {
			action: (action, ...args) => template.add(new EntityAction(action, "Default", ...args)),
			act: (action, ...args) => template.add(new EntityAction(action, "Default", ...args)),

			event: (event) => template.add(new EntityEvent(event)),
			evt: (event) => template.add(new EntityEvent(event)),

			condition: (condition, ...args) => template.add(new EntityCondition(condition, "Default", ...args)),
			if: (condition, ...args) => template.add(new EntityCondition(condition, "Default", ...args)),
		},

		function: (name, ...args) => template.add(new Func(name, ...args)),
		func: (name, ...args) => template.add(new Func(name, ...args)),

		callFunction: (name) => template.add(new CallFunction(name)),
		callFunc: (name) => template.add(new CallFunction(name)),

		process: (name, ...args) => template.add(new Process(name, ...args)),
		proc: (name, ...args) => template.add(new Process(name, ...args)),

		startProcess: (name) => template.add(new StartProcess(name)),
		startProc: (name) => template.add(new StartProcess(name)),

		setVariable: (action, variable, ...args) => template.add(new SetVariable(action, variable, ...args)),
		setVar: (action, variable, ...args) => template.add(new SetVariable(action, variable, ...args)),

		ifVariable: (condition, ...args) => template.add(new VariableCondition(condition, ...args)),
		ifVar: (condition, ...args) => template.add(new VariableCondition(condition, ...args)),

		select: (condition, ...args) => template.add(new SelectObject(condition, ...args)),
		sel: (condition, ...args) => template.add(new SelectObject(condition, ...args)),

		control: (action, ...args) => template.add(new Control(action, ...args)),
		ctrl: (action, ...args) => template.add(new Control(action, ...args)),
	} as const;
	return editor;
}

/**
 * Default custom action executor.
 * @param tempToModify Template to act on.
 * @param actDefs Action definitions.
 * @param name Name of action.
 * @param args Arguments to pass to the action.
 * @returns User-specified output.
 */
getEditor.doCustomAction = (tempToModify: Template, actDefs: ActDefs, name: string, ...args: any[]) => {
	if(actDefs[name]) {
		const action = actDefs[name];
		if(typeof action === "string") {
			const actionOwnerType = getActionOwner(action)["0"];
			if(!actionOwnerType) throw new Error(`Action ${action} doesn't exist. The action dump may be outdated..`);
			const parsedArgs = args.map((a) => {
				if(typeof a === "string") return new Text(a);
				if(typeof a === "number") return new Number(a);
				if(typeof a === "symbol") return new Text(a.toString());
				if(a instanceof Value) return a;
				else throw new Error(`Can only convert primitive strings and numbers to DiamondFire values. Got ${typeof a} instead`);
			});
			if(!codeblockSupported(actionOwnerType)) throw new Error(`Type "${actionOwnerType}" (from action ${action}) cannot be recongized as a DiamondFire block type; this might be a bug.`)
			if(actionOwnerType.includes("if")) sparkscriptWarn("Can only create action blocks");

			const instance = mapper(actionOwnerType, {
				action, args: { items: [] },
				id: "block", target: "Selection",
				block: actionOwnerType,
				inverted: ""
			});
			instance.args = parsedArgs as DFValueType[];
			tempToModify.push(instance as DFCodeExportableBlock);
		} else return action(...args);
	} else throw new Error(`Action ${name} is not defined.`);
}
getEditor.defaultActDefs = {} as Record<string, ((...args: any[])=>void)>;
getEditor.applyActions = <T extends Template>(editor: Ieditor<T>, actDefs: ActDefs, doCustomAction?: (name: string, ...args: any[]) => any) => {
	for(const name in actDefs) {
		editor.action[name] = (...args: any[]) => {
			doCustomAction ? doCustomAction(name, ...args) : getEditor.doCustomAction(editor.getTemplate(), actDefs, name, ...args);
		}
	};
}

/**
 * Quickly generate an editor, with default specifications.
 */
getEditor.default = <T extends Template>(t?: T | string): Ieditor<T> => getEditor(typeof t !== "string" ? (t||false) : new Template(`${t}`) as T, {actDefs:{}});

export default getEditor;
