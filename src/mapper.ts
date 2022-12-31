import { RawDFActionBlock } from "./core/components/ActionBlock";
import { RawDFConditionalBlock } from "./core/components/ConditionalBlock";
import { RawDFDataBlock } from "./core/components/DataBlock";
import { RawDFValueDataRecord } from "./core/components/DataStorage";
import { RawDFSubActionBlock } from "./core/components/SubActionBlock";
import { RawDFValue } from "./core/components/Value";

import DFCodeSerializedBlock from "./core/types/DFCodeSerializedBlock";
import DFBlockCodename from "./core/types/DFBlockCodename";
import DFBlockName from "./core/types/DFBlockName";
import DFSafeVarScope from "./core/types/DFSafeVarScope";
import DFValueCodename from "./core/types/DFValueCodename";
import DFValueDataType from "./core/types/DFValueDataType";
import DFValueType from "./core/types/DFValueType";
import DFDumpScheme from "./core/types/DFDumpScheme";
import DFBlockAction from "./core/types/DFBlockAction";

import { EntityAction, EntityEvent } from "./codeblocks/Entity";
import Func from "./codeblocks/Func";
import CallFunction from "./codeblocks/CallFunction";
import Process from "./codeblocks/Process";
import StartProcess from "./codeblocks/StartProcess";
import { GameAction/*, GameCondition */} from "./codeblocks/Game";
import { PlayerAction, PlayerEvent/*, PlayerCondition */} from "./codeblocks/Player";
import SelectObject from "./codeblocks/SelectObject";
import Control from "./codeblocks/Control";
import SetVariable from "./codeblocks/SetVariable";
// import VariableCondition from "./codeblocks/VariableCondition";

import BLTag, { Ibl_tag } from "./values/BLTag";
import GameValue, { Ig_val } from "./values/GameValue";
import Location, { Iloc } from "./values/Location";
import MinecraftItem, { Iitem } from "./values/MinecraftItem";
import Number, { Inum } from "./values/Number";
import Potion, { Ipot } from "./values/Potion";
import Sound, { Isnd } from "./values/Sound";
import Text, { Itxt } from "./values/Text";
import Variable, { Ivar } from "./values/Variable";
import Vector, { Ivec } from "./values/Vector";

export const blockMap = {
	"bracket": ({}: any, _: DFValueType[]) => {throw new Error("Cannot parse a bracket block.")},
	"else": ({}: any, _: DFValueType[]) => {throw new Error("(unimplemented)")},

	"event": ({action}: RawDFActionBlock<"event">, _: DFValueType[]) => new PlayerEvent(action),
	"player_action": ({action, target}: RawDFActionBlock<"player_action">, args: DFValueType[]) => new PlayerAction(action, target, ...args),
	"if_player": ({}: RawDFConditionalBlock<"if_player">, args: DFValueType[]) => {args;throw new Error("(unimplemented)")},

	"entity_event": ({action}: RawDFActionBlock<"entity_event">, _: DFValueType[]) => new EntityEvent(action),
	"entity_action": ({action, target}: RawDFActionBlock<"entity_action">, args: DFValueType[]) => new EntityAction(action, target, ...args),
	"if_entity": ({}: RawDFConditionalBlock<"if_player">, args: DFValueType[]) => {args;throw new Error("(unimplemented)")},

	"game_action": ({action}: RawDFActionBlock<"game_action">, args: DFValueType[]) => new GameAction(action, ...args),
	"if_game": ({}: RawDFConditionalBlock<"if_game">, args: DFValueType[]) => {args;throw new Error("(unimplemented)")},

	"select_obj": ({action}: RawDFSubActionBlock<"select_obj">, args: DFValueType[]) => new SelectObject(action, ...args),
	"control": ({action}: RawDFActionBlock<"control">, args: DFValueType[]) => new Control(action, ...args),
	"repeat": ({}: RawDFSubActionBlock<"repeat">, args: DFValueType[]) => {args;throw new Error("(unimplemented)")},

	"set_var": ({action}: RawDFActionBlock<"set_var">, args: DFValueType[]) => new SetVariable(action, ...args),
	"if_var": ({}: RawDFConditionalBlock<"if_player">, args: DFValueType[]) => {args;throw new Error("(unimplemented)")},

	"func": ({data}: RawDFDataBlock<"func">, args: DFValueType[]) => new Func(data, ...args),
	"call_func": ({data}: RawDFDataBlock<"call_func">, _: DFValueType[]) => new CallFunction(data),

	"process": ({data}: RawDFDataBlock<"func">, args: DFValueType[]) => new Process(data, ...args),
	"start_process": ({data}: RawDFDataBlock<"func">, args: DFValueType[]) => new StartProcess(data, ...args),
} as const;

import NBT = require("nbt-ts");
type TValueMapArguments<T extends DFValueDataType> = {v: RawDFValueDataRecord<T>, s?: number};
export const valueMap = {
	"bl_tag": ({v,s}: TValueMapArguments<Ibl_tag>) => new BLTag(v.block, v.action, v.tag, v.option, s),
	"txt": ({v,s}: TValueMapArguments<Itxt>) => new Text(v.name, s),
	"num": ({v,s}: TValueMapArguments<Inum>) => Number.parse(v.name, s),
	"var": ({v,s}: TValueMapArguments<Ivar>) => new Variable(v.name, varScopeMap[v.scope || "unsaved"] as DFSafeVarScope, s),
	"loc": ({v,s}: TValueMapArguments<Iloc>) => new Location(v.loc.x, v.loc.y, v.loc.z, v.loc.pitch, v.loc.yaw, s),
	"pot": ({v,s}: TValueMapArguments<Ipot>) => new Potion(v.pot, v.dur, v.amp, s),
	"g_val": ({v,s}: TValueMapArguments<Ig_val>) => new GameValue(v.type, v.target, s),
	"item": ({v,s}: TValueMapArguments<Iitem>) => MinecraftItem.fromNBT(typeof v.item === "string" ? v.item : NBT.stringify(v.item as unknown as NBT.TagObject), s),
	"vec": ({v,s}: TValueMapArguments<Ivec>) => new Vector(v.x, v.y, v.z, s),
	"snd": ({v,s}: TValueMapArguments<Isnd>) => new Sound(v.sound, v.vol, v.pitch, s),
} as const;

export const varScopeMap = {
	"local": "local",
	"game": "unsaved",
	"save": "saved",
	"unsaved": "unsaved",
	"saved": "saved",
} as const;

export function blockMapper<T extends DFBlockCodename>(type: T, serializedData: Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock): SparkscriptMapper<T> {
	if(typeof serializedData !== "object" || !("args" in serializedData) || !("block" in serializedData)) throw new Error("Cannot map serialized block data because it is invalid.");
	const args = serializedData.args.items.map((i: RawDFValue) => valueMapper(i.item.id, i))
	const constructor = blockMap[type];
	if(!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire block type. Template may be corrupted or just invalid.`);
	return constructor(serializedData, args as DFValueType[]) as SparkscriptMapper<T>;
}
export function valueMapper<T extends DFValueCodename>(type: T, serializedData: RawDFValue<T, ValueDataMapper<T>>): SparkscriptMapper<T> {
	if(typeof serializedData !== "object" || !("slot" in serializedData) || !("item" in serializedData)) throw new Error("Cannot map serialized value data because it is invalid.");
	const constructor = valueMap[type];
	if(!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire value type. Template may be corrupted or just invalid.`);
	return constructor({
		v: serializedData.item.data as RawDFValueDataRecord<any>,
		s: serializedData.slot
	}) as SparkscriptMapper<T>
}

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
 * Map any codename or friendly variable name `T` scope to the correct variable scope codename.
 */
export type VarScopeMapper<T extends keyof typeof varScopeMap> = typeof varScopeMap[T];
/**
 * Extract string union of action names from an action block.
 * @deprecated Use {@link DFBlockAction} from `types/` folder instead.
 * @see {@link DFBlockAction}
 */
export type ActionNamesInBlock<T extends DFBlockCodename> = DFBlockAction<T>;
/**
 * Extract a specific tag's data from an action.
 */
export type TagDataInAction<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]> = DFDumpScheme["actionTags"][Tag];
/**
 * Extract available options for a tag from an action.
 */
export type OptionsInTag<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]> = TagDataInAction<Action, Tag>["options"][number];

type DefaultMapperFunction = {
	<T extends DFBlockCodename>(type: T, serializedData: Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock): SparkscriptMapper<T>;
	<T extends DFValueCodename>(type: T, serializedData: RawDFValue<T, ValueDataMapper<T>>): SparkscriptMapper<T>;
	from: <T extends DFCodeSerializedBlock | RawDFValue>(raw: T) => FromFunction<T>;
};
/**
 * ## Sparkscript global mapper.
 * Convert DiamondFire's raw value or codeblock data to the respective sparkscript's class instance.
 * by @UserUNP
 *
 * @param type Codename type to be mapped.
 * @param serializedData Respective data for the type.
 * @returns Converted sparkscript object instance.
 */
const mapper: DefaultMapperFunction = <T extends DFBlockCodename | DFValueCodename>(
	type: T,
	serializedData: (T extends DFBlockCodename ? Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock : T extends DFValueCodename ? RawDFValue<T, ValueDataMapper<T>> : never)
) => {
	if(typeof serializedData !== "object") throw new Error(`Cannot map a variable with type ${typeof serializedData}.`);
	if(isOfTypeRawValue(serializedData)) return valueMapper<(T extends DFBlockCodename ? never : T)>(
		type as (T extends DFBlockCodename ? never : T),
		serializedData
	);
	else return blockMapper<(T extends DFValueCodename ? never : T)>(
		type as (T extends DFValueCodename ? never : T),
		serializedData
	);
}

/**
 * SparkscriptMapper equivelent for the mapper.from function.
 */
type FromFunction<T extends DFCodeSerializedBlock | RawDFValue> = SparkscriptMapper<
	T extends DFCodeSerializedBlock ? T["block"] :
	T extends RawDFValue ? T["item"]["id"] :
	never
>
/**
 * Transform serialized data into readable sparkscript data.
 * @description Most type intellisense is lost due to abstraction.
 * @param raw Raw action codeblock data.
 * @returns New instance of the respective sparkscript class.
 */
mapper.from = <T extends DFCodeSerializedBlock | RawDFValue>(raw: T): FromFunction<T> => {
	if(isOfTypeRawValue(raw)) return mapper(raw.item.id, raw) as FromFunction<T>;
	else return mapper(raw.block, raw) as FromFunction<T>;
}

export default mapper;

/**
 * Check if a codeblock is supported.
 * @param type Codeblock codename to check.
 * @returns `true` if `type` is supported in sparkscript, otherwise `false`.
 */
export function codeblockSupported(type: DFBlockCodename): type is DFBlockCodename {
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

// ---------------------------------------------------------------------------------

import codeDump from "./core/codeDump";
import { isOfTypeRawValue, sparkscriptWarn } from "./utilities";

export function getCodeblockByType<T extends DFBlockCodename>(type: T) {
	const codeblock = codeDump.getDump().codeblocks[type];
	if(!codeblock) return null;
	if(!codeblockSupported(type)) sparkscriptWarn(`Codeblock type "${codeblock}" is not implemented yet. You might experience issues, such a sudden error.`);
	return codeblock;
}

export function getCodeblockByName<T extends DFBlockName>(name: T) {
	return codeDump.getDump().codeblocks[codeDump.getDump().codeblockNames[name]];
}

export function getActionOwner<T extends keyof DFDumpScheme["actions"]>(action: T) {
	return (codeDump.getDump().actions[action].codeblockType || null) as DFDumpScheme["actions"][T]["codeblockType"];
}

export function getCodeblockActions<T extends DFBlockCodename>(type: T): DFDumpScheme["codeblocks"][T]["actions"] {
	return codeDump.getDump().codeblocks[type].actions;
}

export function getCodeblockType<T extends DFBlockName>(name: T) {
	return codeDump.getDump().codeblockNames[name];
}
