"use strict";

import DataStorage, { serializedDataProperty } from "./DataStorage";

export interface serializedValue {
	slot: number;
	item: {
		id: string;
		data: serializedDataProperty
	}
}

abstract class Value {

	static from(raw: serializedValue) {
		const type = raw.item.id;
		const clazz = mapper(type); //? can't use the keyword "class"
		if (!clazz) throw new Error(`Unknown value type: ${type}`);
		const data = DataStorage.from(raw.item.data);
		return new clazz(type, data, raw.slot);
	}

	data: DataStorage | null = null;

	/**
	 * Create a new value.
	 * @param type Type of the value.
	 * @param value The value property.
	 * @param slot Specific slot number.
	 */
	constructor(public type: string, value: object, public slot?: number) {
		this.data = DataStorage.from(value);
		this.data.assignOwner(this);
	}

	/**
	 * Export the value to a JSON object.
	 * @returns DiamondFire JSON-ified value.
	 */
	export(containingBlockArguments: Value[]): serializedValue {
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

import Number from "../values/Number";
import Text from "../values/Text";
import Variable from "../values/Variable";

function mapper(type: string): any {
	const valuemap: { [key: string]: Function } = {
		"txt": Text,
		"num": Number,
		"var": Variable,
	} as const;
	return valuemap[type];
}
