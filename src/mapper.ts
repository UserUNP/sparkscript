
import Value from "./core/components/Value";
import Block from "./core/components/Block";

import { PlayerAction, PlayerEvent } from "./codeblocks/Player";
import { EntityEvent, EntityAction } from "./codeblocks/Entity";
import { SetVariable } from "./codeblocks/SetVariable";
import SelectObject from "./codeblocks/SelectObject";
import GameAction from "./codeblocks/GameAction";
import Func from "./codeblocks/Func";

import Text from "./values/Text";
import Number from "./values/Number";
import Variable from "./values/Variable";
import Location from "./values/Location";
import Potion from "./values/Potion";
import GameValue from "./values/GameValue";
import Vector from "./values/Vector";

const blockMap: { [key: string]: any } = {
	"event": PlayerEvent,
	"player_action": PlayerAction,
	"entity_event": EntityEvent,
	"entity_action": EntityAction,
	"set_var": SetVariable,
	"select_obj": SelectObject,
	"game_action": GameAction,	
	"func": Func
	
} as const;

const valueMap: { [key: string]: any } = {
	"txt": Text,
	"num": Number,
	"var": Variable,
	"loc": Location,
	"pot": Potion,
	"g_val": GameValue,
	"vec": Vector
} as const;

export function blockMapper(type: string, action: string, args: Value[]): Block {
	const clazz = blockMap[type];
	switch(clazz) {

		case PlayerEvent: return new clazz(action);
		case PlayerAction: return new clazz(action, ...args);
		case SelectObject: return new clazz(action, ...args);
		case EntityEvent: return new clazz(action, ...args);
		case EntityAction: return new clazz(action, ...args);
		case GameAction: return new clazz(action, ...args);
		case SetVariable: return new clazz(action, ...args);
		case Func: return new clazz(action, ...args);

		default: throw new Error(`Unknown block type: ${type}`);
	}
}

export function valueMapper(type: string, value:{[key:string]:any}, slot?: number): Value {
	const clazz = valueMap[type];
	switch(clazz) {

		case Text: return new clazz(value.name, slot);
		case Number: return new clazz(value.name, slot);
		case Variable: return new clazz(value.name, value.scope, slot);
		case Location: return new clazz(value.loc.x, value.loc.y, value.loc.z, value.loc.pitch, value.loc.yaw, slot);
		case Potion: return new clazz(value.pot, value.dur, value.amp, slot);
		case GameValue: return new clazz(value.type, value.target, slot);
		case Vector: return new clazz(value.x, value.y, value.z, slot);

		default: throw new Error(`Unknown value type: ${type}`);
	}
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
