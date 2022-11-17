import { ValueDataMapper } from "../../mapper";
import DFValueCodename from "../types/DFValueCodename";
import DFValueDataType from "../types/DFValueDataType";

export type RawDFValueDataRecord<T extends DFValueDataType> = {
	[P in keyof T]: T[P];
};

/**
 * ### Data storage for a value.
 *
 * @template T Value codename.
 * @template DataType Value object data type.
 */
export default class DataStorage
<T extends DFValueCodename, DataType extends ValueDataMapper<T> = ValueDataMapper<T>> {

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

	raw: DataType = {} as DataType;

	/**
	 * Set a value in the DataStorage.
	 * @param key Key to be set.
	 * @param value Value to be set.
	 * @returns Chainable DataStorage object.
	 */
	set(key: keyof DataType, value: any): this {
		this.raw[key] = value;
		return this;
	}

	/**
	 * Get a value from the DataStorage.
	 * @param key Key to be retrieved.
	 * @returns Value of the key.
	 */
	get(key: keyof DataType) {
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
	has(key: keyof DataType) {
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
	delete(key: keyof DataType) {
		delete this.raw[key];
	}

	get length() {
		return Object.keys(this.raw).length;
	}

	get keys() {
		return Object.keys(this.raw);
	}

	get values() {
		return Object.values(this.raw);
	}

	get entries() {
		return Object.entries(this.raw);
	}

	toString() {
		return JSON.stringify(this.raw);
	}

}
