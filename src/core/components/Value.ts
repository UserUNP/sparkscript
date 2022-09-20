export interface RawDFValue {
	slot: number;
	item: {
		id: string;
		data: RawDFValueDataRecord
	}
}

abstract class Value {

	static from(raw: RawDFValue) {
		const type = raw.item.id;
		const instance = mapper(type, raw.item.data, raw.slot);
		return instance as Value;
	}

	data: DataStorage;

	/**
	 * Create a new value.
	 * @param type Type of the value.
	 * @param value The value property.
	 * @param slot Specific slot number.
	 */
	constructor(public type: string, value: { [x: string]: any }, public slot?: number) {
		this.data = DataStorage.from(value);
		this.data.assignOwner(this);
	}

	/**
	 * Export the value to a JSON object.
	 * @returns DiamondFire JSON-ified value.
	 */
	export(containingBlockArguments: Value[]): RawDFValue {
		return {
			slot: this.slot || containingBlockArguments.indexOf(this),
			item: {
				id: this.type,
				data: this.data?.raw || {}
			}
		};
	}

}

export default Value;

import mapper from "../../mapper";
import DataStorage, { RawDFValueDataRecord } from "./DataStorage";
