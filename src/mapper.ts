
import Value from "./components/Value";
import Block from "./components/Block";

import { PlayerAction, PlayerEvent } from "./codeblocks/Player";
import { SetVariable } from "./codeblocks/SetVariable";
import SelectObject from "./codeblocks/SelectObject";

import Number from "./values/Number";
import Text from "./values/Text";
import Variable from "./values/Variable";

const blockMap: { [key: string]: any } = {
	"event": PlayerEvent,
	"player_action": PlayerAction,
	"set_var": SetVariable,
	"select_obj": SelectObject,
} as const;

const valueMap: { [key: string]: any } = {
	"txt": Text,
	"num": Number,
	"var": Variable,
} as const;

export function blockMapper(type: string, action: string, args: Value[]): Block {
	const clazz = blockMap[type];
	if(clazz === PlayerEvent) return new clazz(action);
	else if(clazz === PlayerAction) return new clazz(action, ...args);
	else if(clazz === SetVariable) return new clazz(action, ...args);
	else if(clazz === SelectObject) return new clazz(action, ...args);
	else throw new Error(`Unknown block type: ${type}`);
}

export function valueMapper(type: string, value:{[key:string]:any}, slot?: number): Value {
	const clazz = valueMap[type];
	if(clazz === Text) return new clazz(value.name, slot);
	else if(clazz === Number) return new clazz(value.name, slot);
	else if(clazz === Variable) return new clazz(value.name, value.scope, slot);
	else throw new Error(`Unknown value type: ${type}`);
}

export function mapper(type: string, action: string, args: Value[]): Block;
export function mapper(type: string, value: { [key: string]: any }, slot?: number): Value;
export default function mapper(type: string, actOrVal: string|{[key:string]:any}, argsOrSlot: (number|undefined)|Value[]): Block|Value {
	// check if its for a block
	if(typeof actOrVal === "string") {
		const action = actOrVal;
		const args = argsOrSlot as Value[];
		return blockMapper(type, action, args);
	} else {
		const value = actOrVal;
		const slot = argsOrSlot as number;
		return valueMapper(type, value, slot);
	}
}

import dump from "./actiondump.json";

export function getCodeblockByType(type: string) {
	const codeblock: any = dump.codeblocks.find(c => c.identifier === type);
	if(!codeblock) return null;
	return codeblock;
}

export function getCodeblockByName(name: string) {
	const codeblock = dump.codeblocks.find(c => c.name === name);
	if(!codeblock) return null;
	return codeblock;
}

export function getActionOwner(action: string) {
	const actionName = dump.actions.find(a => a.name === action);
	if(!actionName) return null;
	return getCodeblockByName(actionName.codeblockName);
}

export function getCodeblockActions(type: string) {
	const codeblock = getCodeblockByType(type);
	if(!codeblock) return [];
	return dump.actions.filter(a => a.codeblockName === codeblock.name);
}

export function getCodeblockAction(type: string, name: string) {
	const codeblock = getCodeblockByType(type);
	if(!codeblock) return null;
	return dump.actions.find(a => a.codeblockName === codeblock.name && a.name === name);
}

export function getCodeblockType(name: string) {
	const codeblock = dump.codeblocks.find(c => c.name === name);
	if(!codeblock) return null;
	return codeblock.identifier;
}
