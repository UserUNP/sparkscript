import { RawDFValue } from "./core/components/Value";

import {
	DFCodeSerializedBlock,
	DFBlockCodename,
	DFValueCodename,
	DFValueType,
} from "./core/types";

import {
	SparkscriptMapper,
	ValueDataMapper,
	blockMap, valueMap
} from "./common/mapperUtils";



export function blockMapper<T extends DFBlockCodename>(type: T, serializedData: Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock): SparkscriptMapper<T> {
	if (typeof serializedData !== "object" || !("args" in serializedData) || !("block" in serializedData)) throw new Error("Cannot map serialized block data because it is invalid.");
	const args = serializedData.args.items.map((i: RawDFValue) => valueMapper(i.item.id, i))
	const constructor = blockMap[type];
	if (!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire block type. Template may be corrupted or just invalid.`);
	return constructor(serializedData, args as DFValueType[]) as SparkscriptMapper<T>;
}
export function valueMapper<T extends DFValueCodename>(type: T, serializedData: RawDFValue<T, ValueDataMapper<T>>): SparkscriptMapper<T> {
	if (typeof serializedData !== "object" || !("slot" in serializedData) || !("item" in serializedData)) throw new Error("Cannot map serialized value data because it is invalid.");
	const constructor = valueMap[type];
	if (!constructor) throw new Error(`Type "${type}" cannot be recongized as a DiamondFire value type. Template may be corrupted or just invalid.`);
	return constructor({
		v: serializedData.item.data as any,
		s: serializedData.slot
	}) as SparkscriptMapper<T>
}

type DefaultMapperFunction = {
	<T extends DFBlockCodename>(type: T, serializedData: Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock): SparkscriptMapper<T>;
	<T extends DFValueCodename>(type: T, serializedData: RawDFValue<T, ValueDataMapper<T>>): SparkscriptMapper<T>;
	from: <T extends DFCodeSerializedBlock | RawDFValue>(raw: T) => FromFunction<T>;
};
/**
 * ## Sparkscript global mapper.
 * Convert DiamondFire's raw value or codeblock data to the respective sparkscript's class instance.
 * @author UserUNP
 *
 * @param type Codename type to be mapped.
 * @param serializedData Respective data for the type.
 * @returns Converted sparkscript object instance.
 */
const mapper: DefaultMapperFunction = <T extends DFBlockCodename | DFValueCodename>(
	type: T,
	serializedData: (T extends DFBlockCodename ? Parameters<typeof blockMap[T]>["0"] | DFCodeSerializedBlock : T extends DFValueCodename ? RawDFValue<T, ValueDataMapper<T>> : never)
) => {
	if (typeof serializedData !== "object") throw new Error(`Cannot map a variable with type ${typeof serializedData}.`);
	if (isOfTypeRawValue(serializedData)) return valueMapper<(T extends DFBlockCodename ? never : T)>(
		type as (T extends DFBlockCodename ? never : T),
		serializedData
	);
	else return blockMapper<(T extends DFValueCodename ? never : T)>(
		type as (T extends DFValueCodename ? never : T),
		serializedData
	);
}

function isOfTypeRawValue(test: unknown): test is RawDFValue {
	if (!test || typeof test !== "object") return false;
	if (!("item" in test) || !("slot" in test)) return false;
	return true;
}

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
	if (isOfTypeRawValue(raw)) return mapper(raw.item.id, raw) as FromFunction<T>;
	else return mapper(raw.block, raw) as FromFunction<T>;
}

export default mapper;
