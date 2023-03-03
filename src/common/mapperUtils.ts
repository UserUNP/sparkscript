import {
	DFBlockAction,
	DFBlockCodename,
	DFSafeVarScope,
	DFValueCodename,
	DFValueDataType,
	DFValueType
} from "../core/types";

import {
	PlayerAction, PlayerEvent,
	EntityAction, EntityEvent,
	GameAction,
	SetVariable,
	Func, CallFunction,
	Process, StartProcess,
	SelectObject,
	Control,
} from "../codeblocks";

import {
	BLTag, Ibl_tag,
	GameValue, Ig_val,
	Location, Iloc,
	MinecraftItem, Iitem,
	Number, Inum,
	Potion, Ipot,
	Sound, Isnd,
	Text, Itxt,
	Variable, Ivar,
	Vector, Ivec,
} from "../values";

import { RawDFDataBlock } from "../core/components/DataBlock";
import { RawDFActionBlock } from "../core/components/ActionBlock";
import { RawDFConditionalBlock } from "../core/components/ConditionalBlock";
import { RawDFSubActionBlock } from "../core/components/SubActionBlock";
import { RawDFValueDataRecord } from "../core/components/DataStorage";

export const blockMap = {
	"bracket": ({ }: any, _: DFValueType[]) => { throw new Error("Cannot parse a bracket block.") },
	"else": ({ }: any, _: DFValueType[]) => { throw new Error("(unimplemented)") },

	"event": ({ action }: RawDFActionBlock<"event">, _: DFValueType[]) => new PlayerEvent(action),
	"player_action": ({ action, target }: RawDFActionBlock<"player_action">, args: DFValueType[]) => new PlayerAction(action, target, ...args),
	"if_player": ({ }: RawDFConditionalBlock<"if_player">, args: DFValueType[]) => { args; throw new Error("(unimplemented)") },

	"entity_event": ({ action }: RawDFActionBlock<"entity_event">, _: DFValueType[]) => new EntityEvent(action),
	"entity_action": ({ action, target }: RawDFActionBlock<"entity_action">, args: DFValueType[]) => new EntityAction(action, target, ...args),
	"if_entity": ({ }: RawDFConditionalBlock<"if_entity">, args: DFValueType[]) => { args; throw new Error("(unimplemented)") },

	"game_action": ({ action }: RawDFActionBlock<"game_action">, args: DFValueType[]) => new GameAction(action, ...args),
	"if_game": ({ }: RawDFConditionalBlock<"if_game">, args: DFValueType[]) => { args; throw new Error("(unimplemented)") },
	"control": ({ action }: RawDFActionBlock<"control">, args: DFValueType[]) => new Control(action, ...args),

	"select_obj": ({ action }: RawDFSubActionBlock<"select_obj">, args: DFValueType[]) => new SelectObject(action, ...args),
	"repeat": ({ }: RawDFSubActionBlock<"repeat">, args: DFValueType[]) => { args; throw new Error("(unimplemented)") },

	"set_var": ({ action }: RawDFActionBlock<"set_var">, args: DFValueType[]) => new SetVariable(action, ...args),
	"if_var": ({ }: RawDFConditionalBlock<"if_player">, args: DFValueType[]) => { args; throw new Error("(unimplemented)") },

	"func": ({ data }: RawDFDataBlock<"func">, args: DFValueType[]) => new Func(data, ...args),
	"call_func": ({ data }: RawDFDataBlock<"call_func">, _: DFValueType[]) => new CallFunction(data),

	"process": ({ data }: RawDFDataBlock<"process">, args: DFValueType[]) => new Process(data, ...args),
	"start_process": ({ data }: RawDFDataBlock<"start_process">, _: DFValueType[]) => new StartProcess(data),
} as const;

import NBT = require("nbt-ts");

type ValueMapArguments<T extends DFValueDataType> = { v: RawDFValueDataRecord<T>, s?: number };
export const valueMap = {
	"bl_tag": ({ v, s }: ValueMapArguments<Ibl_tag>) => new BLTag(v.block, v.action, v.tag, v.option, s),
	"txt": ({ v, s }: ValueMapArguments<Itxt>) => new Text(v.name, s),
	"num": ({ v, s }: ValueMapArguments<Inum>) => Number.parse(v.name, s),
	"var": ({ v, s }: ValueMapArguments<Ivar>) => new Variable(v.name, (v.scope || "unsaved") as DFSafeVarScope, s),
	"loc": ({ v, s }: ValueMapArguments<Iloc>) => new Location(v.loc.x, v.loc.y, v.loc.z, v.loc.pitch, v.loc.yaw, s),
	"pot": ({ v, s }: ValueMapArguments<Ipot>) => new Potion(v.pot, v.dur, v.amp, s),
	"g_val": ({ v, s }: ValueMapArguments<Ig_val>) => new GameValue(v.type, v.target, s),
	"item": ({ v, s }: ValueMapArguments<Iitem>) => MinecraftItem.fromNBT(typeof v.item === "string" ? v.item : NBT.stringify(v.item as unknown as NBT.TagObject), s),
	"vec": ({ v, s }: ValueMapArguments<Ivec>) => new Vector(v.x, v.y, v.z, s),
	"snd": ({ v, s }: ValueMapArguments<Isnd>) => new Sound(v.sound, v.vol, v.pitch, s),
} as const;

/**
 * ## Sparkscript type mapper
 * Convert DiamondFire's raw value or codeblock type (`T`) to the respective sparkscript typeof class.
 * by @UserUNP
 */
export type SparkscriptMapper
<T extends DFBlockCodename | DFValueCodename> =
	T extends DFBlockCodename ? ReturnType<typeof blockMap[T]> :
	T extends DFValueCodename ? ReturnType<typeof valueMap[T]> :
	never;
/**
 * Get `T`'s value data specification types from value the given `T` value codename.
 */
export type ValueDataMapper<T extends DFValueCodename> = Parameters<typeof valueMap[T]>[0]["v"];
/**
 * Extract string union of action names from an action block.
 * @deprecated Use {@link DFBlockAction} from `types/` folder instead.
 * @see {@link DFBlockAction}
 */
export type ActionNamesInBlock<T extends DFBlockCodename> = DFBlockAction<T>;

/**
 * Check if a codeblock is supported.
 * @param type Codeblock codename to check.
 * @returns `true` if `type` is supported in sparkscript, otherwise `false`.
 */
export function codeblockSupported(type: unknown): type is DFBlockCodename {
	if (typeof type !== "string") return false;
	return type in blockMap;
}

/**
 * Check if a value type is supported.
 * @param type Value codename to check.
 * @returns `true` if `type` is supported in sparkscript, otherwise `false`.
 */
export function valueSupported(type: string): type is DFValueCodename {
	return type in valueMap;
}

export function isOfTypeValue(test: unknown): test is DFValueType {
	if (!test || typeof test !== "object") return false;
	if (!("data" in test)) return false;
	return true;
}
