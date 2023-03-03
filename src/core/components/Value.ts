import { DFValueCodename, DFValueType } from "../types";

import { ValueDataMapper } from "../../common/mapperUtils";
import { makeStringifier } from "../../common/utilities";

import DataStorage from "./DataStorage";
import SerializableComponent from "./SerializableComponent";

export interface RawDFValue
<T extends DFValueCodename = DFValueCodename, DataType extends ValueDataMapper<T> = ValueDataMapper<T>> {
	slot: number;
	item: {
		id: T;
		data: DataType
	}
}

/**
 * ### Value.
 *
 * @template T Value codename.
 * @template DataType Value object data type.
 */
export default class Value
<T extends DFValueCodename = DFValueCodename, DataType extends ValueDataMapper<T> = ValueDataMapper<T>>
extends SerializableComponent<RawDFValue<T, DataType>> {

	data: DataStorage<T, DataType>;

	/**
	 * Create a new value.
	 * @param type Type of the value.
	 * @param value The value property.
	 * @param slot Specific slot number.
	 */
	constructor(public type: T, value: DataType, public slot?: number) {
		super(`${type} value`)
		this.data = DataStorage.from<T, DataType>(value);
	}

	/**
	 * Stringify the value.
	 */
	toString(): string {
		return makeStringifier(this.type, JSON.stringify(this.data));
	}

	export(selfValues: DFValueType[]): RawDFValue<T, DataType> {
		return {
			slot: this.slot || selfValues.indexOf(this as unknown as DFValueType),
			item: {
				id: this.type,
				data: this.data.raw
			}
		}
	}
}
