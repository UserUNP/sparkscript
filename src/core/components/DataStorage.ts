import { DFValueCodename, DFValueDataType } from "../types";
import { ValueDataMapper } from "../../common/mapperUtils";

export type RawDFValueDataRecord<T extends DFValueDataType> = {
	[K in keyof T]: T[K];
};

/**
 * ### Data storage for a value.
 *
 * @template T Value codename.
 * @template ValueData Value object data type.
 */
export default class DataStorage
<T extends DFValueCodename, ValueData extends ValueDataMapper<T> = ValueDataMapper<T>> {

	/**
	 * Create a new DataStorage from a JSON object.
	 * @param raw Raw data to be converted to DataStorage.
	 * @returns DataStorage object.
	 */
	static from<T extends DFValueCodename, DataType extends ValueDataMapper<T>>(raw: DataType) {
		const storage = new DataStorage<T, DataType>();
		for (const [k, v] of Object.entries(raw)) {
			if(!k) throw new Error(`Key ${JSON.stringify(k)} is an invalid type.`);
			storage.set(k as keyof ValueDataMapper<T>, v);
		}
		return storage;
	}

	raw: ValueData = {} as ValueData;

	/**
	 * Set a value in the DataStorage.
	 * @param key Key to be set.
	 * @param value Value to be set.
	 * @returns Chainable DataStorage object.
	 */
	set(key: keyof ValueData, value: any): this {
		this.raw[key] = value;
		return this;
	}

	/**
	 * Get a value from the DataStorage.
	 * @param key Key to be retrieved.
	 * @returns Value of the key.
	 */
	get(key: keyof ValueData) {
		return this.raw[key];
	}

	/**
	 * Create a copy of the raw data.
	 */
	clone() {
		return {...this.raw};
	}

	/**
	 * Alias for `DataStorage.copy()`
	 */
	copy() {
		return this.clone();
	}

	/**
	 * Check if the DataStorage has a key.
	 * @param key Key to be checked.
	 * @returns True if the key exists, false otherwise.
	 */
	has(key: keyof ValueData) {
		return key in this.keys;
	}

	/**
	 * Alias for `DataStorage.keys`.
	 */
	list() {
		return this.keys;
	}

	/**
	 * Remove a key from the DataStorage.
	 * @param key Key to be removed.
	 */
	delete(key: keyof ValueData) {
		delete this.raw[key];
	}

	get length() {
		return Object.keys(this.raw).length;
	}

	get keys(): (keyof ValueData)[] {
		return Object.keys(this.raw) as (keyof ValueData)[];
	}

	get values(): ValueData[keyof ValueData] {
		return Object.values(this.raw) as ValueData[keyof ValueData];
	}

	get entries() {
		return Object.entries(this.raw);
	}

	toString() {
		return JSON.stringify(this.raw);
	}

}
