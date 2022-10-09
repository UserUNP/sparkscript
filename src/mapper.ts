
import Value from "./core/components/Value";
import { RawDFValueDataRecord } from "./core/components/DataStorage";

import DFBlockCodename from "./core/types/DFBlockCodename";
import DFValueCodename from "./core/types/DFValueCodename";
import DFBlockName from "./core/types/DFBlockName";

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
import MinecraftItem from "./values/MinecraftItem";
import Vector from "./values/Vector";

const blockMap = {
	"event": (e: string,_: Value[]) => new PlayerEvent(e),
	"player_action": (act: string, args: Value[]) => new PlayerAction(act, ...args),
	"entity_event": (e: string,_: Value[]) => new EntityEvent(e),
	"entity_action": (act: string, args: Value[]) => new EntityAction(act, ...args),
	"set_var": (act: string, args: Value[]) => new SetVariable(act, ...args),
	"select_obj": (cond: string, args: Value[]) => new SelectObject(cond, ...args),
	"game_action": (act: string, args: Value[]) => new GameAction(act, ...args),	
	"func": (name: string, args: Value[]) => new Func(name, ...args),
} as const;

const valueMap = {
	"txt": (v: RawDFValueDataRecord, s?: number) => new Text(v.name, s),
	"num": (v: RawDFValueDataRecord, s?: number) => new Number(v.name, s),
	"var": (v: RawDFValueDataRecord, s?: number) => new Variable(v.name, v.scope, s),
	"loc": (v: RawDFValueDataRecord, s?: number) => new Location(v.loc.x, v.loc.y, v.loc.z, v.loc.pitch, v.loc.yaw, s),
	"pot": (v: RawDFValueDataRecord, s?: number) => new Potion(v.pot, v.dur, v.amp, s),
	"g_val": (v: RawDFValueDataRecord, s?: number) => new GameValue(v.type, v.target, s),
	"item": (v: RawDFValueDataRecord, s?: number) => MinecraftItem.fromNBT(v.item, s),
	"vec": (v: RawDFValueDataRecord, s?: number) => new Vector(v.x, v.y, v.z, s),
} as const;

export function blockMapper<T extends DFBlockCodename>(type: T, actionOrData: string, args: Value[]): ReturnType<typeof blockMap[T]> {
	const constructor = blockMap[type];
	if(!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire block type. Template may be corrupted or invalid.`);
	return constructor(actionOrData, args) as ReturnType<typeof blockMap[T]>;
}

export function valueMapper<T extends DFValueCodename>(type: T, value: RawDFValueDataRecord, slot?: number): ReturnType<typeof valueMap[T]> {
	const constructor = valueMap[type];
	if(!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire value type. Template may be corrupted or invalid.`);
	return constructor(value, slot) as ReturnType<typeof valueMap[T]>;
}

/**
 * ## Official sparkscript type mapper
 * Convert DiamondFire's raw value or codeblock type to the respective sparkscript typeof class.  
 * by @UserUNP
 */
export type SparkscriptMapper
	<T extends DFBlockCodename | DFValueCodename> =
	T extends DFBlockCodename ? ReturnType<typeof blockMap[T]> :
	T extends DFValueCodename ? ReturnType<typeof valueMap[T]> :
	never;

/**
 * Raw DiamondFire codeblock data -> Respective sparkscript type.
 * @param type Block codename.
 * @param action Block's action or data.
 * @param args Arguments to put into the codeblock.
 */
 export function mapper<T extends DFBlockCodename>(type: T, action: string, args: Value[]): ReturnType<typeof blockMap[T]>;
 /**
  * Raw DiamondFire value data -> Respective sparkscript type.
  * @param type Value codename.
  * @param value Value's data.
  * @param slot Value's slot in order. Indexes start at 0.
  */
 export function mapper<T extends DFValueCodename>(type: T, value: RawDFValueDataRecord, slot?: number): ReturnType<typeof valueMap[T]>;
/**
 * Raw DiamondFire data -> Respective sparkscript type.
 * @param type Block/Value codename.
 * @param actOrVal Block/Value action or data.
 * @param argsOrSlot Codeblock's arguments or Value's slot.
 */
export default function mapper<T extends DFBlockCodename | DFValueCodename>(type: T, actOrVal: string|RawDFValueDataRecord, argsOrSlot: (number|undefined)|Value[]): SparkscriptMapper<T> {
	// check if its for a block
	if(typeof actOrVal === "string") {
		const action = actOrVal;
		const args = argsOrSlot as Value[];
		return blockMapper(type as DFBlockCodename, action, args) as SparkscriptMapper<T>;
	} else {
		const value = actOrVal;
		const slot = argsOrSlot as number;
		return valueMapper(type as DFValueCodename, value, slot) as SparkscriptMapper<T>;
	}
}

/**
 * 
 * @param type Codeblock codename to check.
 * @returns `true` if `type` is supported in sparkscript, otherwise `false`.
 */
export function codeblockSupported(type: DFBlockCodename): type is DFBlockCodename {
	return type in blockMap;
}

/**
 * 
 * @param type Value codename to check.
 * @returns `true` if `type` is supported in sparkscript, otherwise `false`.
 */
export function valueSupported(type: string): type is DFValueCodename {
	return type in valueMap;
}

import codeDump from "./core/codeDump";

export function getCodeblockByType(type: DFBlockCodename) {
	const codeblock = codeDump.getDump().codeblocks.find(c => c.identifier === type);
	if(!codeblock) return null;
	if(!codeblockSupported(type)) console.warn(`[sparkscript] WARNING: Codeblock type "${codeblock}" is not implemented into the mapper`);
	return codeblock;
}

export function getCodeblockByName(name: string) {
	const codeblock = codeDump.getDump().codeblocks.find(c => c.name === name);
	if(!codeblock) return null;
	return codeblock;
}

export function getActionOwner(action: string) {
	const actionName = codeDump.getDump().actions.find(a => a.name === action);
	if(!actionName) return null;
	return getCodeblockByName(actionName.codeblockName);
}

export function getCodeblockActions(type: DFBlockCodename) {
	const codeblock = getCodeblockByType(type);
	if(!codeblock) return [];
	return codeDump.getDump().actions.filter(a => a.codeblockName === codeblock.name);
}

export function getCodeblockAction(type: DFBlockCodename, name: string) {
	const codeblock = getCodeblockByType(type);
	if(!codeblock) return null;
	return codeDump.getDump().actions.find(a => a.codeblockName === codeblock.name && a.name === name) || null;
}

export function getCodeblockType(name: DFBlockName) {
	const codeblock = codeDump.getDump().codeblocks.find(c => c.name === name);
	if(!codeblock) return null;
	return codeblock.identifier;
}
