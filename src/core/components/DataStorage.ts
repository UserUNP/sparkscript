import Value from "./Value";

export type RawDFValueDataRecord = Record<string, any>;

export default class DataStorage {

	/**
	 * Create a new DataStorage from a JSON object.
	 * @param raw Raw data to be converted to DataStorage.
	 * @returns DataStorage object.
	 */
	static from(raw: RawDFValueDataRecord) {
		const storage = new DataStorage();
		for (const [k, v] of Object.entries(raw)) {
			storage.set(k as keyof RawDFValueDataRecord, v);
		}
		return storage;
	}

	raw: RawDFValueDataRecord = {};
	owner: Value | null = null;

	/**
	 * Assign owner to this DataStorage for later use.
	 * @param owner Value object that owns this DataStorage.
	 */
	assignOwner(owner: Value) {
		if(this.owner) throw new Error("Property owner cannot be reinitialized!");
		this.owner = owner;
	}

	/**
	 * Set a value in the DataStorage.
	 * @param key Key to be set.
	 * @param value Value to be set.
	 * @returns Chainable DataStorage object.
	 */
	set(key: keyof RawDFValueDataRecord, value: any): this {
		this.raw = {...this.raw, [key]: value} as RawDFValueDataRecord;
		return this;
	}

	/**
	 * Get a value from the DataStorage.
	 * @param key Key to be retrieved.
	 * @returns Value of the key.
	 */
	get(key: string) {
		return this.raw[key];
	}

	/**
	 * Check if the DataStorage has a key.
	 * @param key Key to be checked.
	 * @returns True if the key exists, false otherwise.
	 */
	has(key: string): boolean {
		return this.keys.includes(key as string);
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
	delete(key: string) {
		delete this.raw[key];
	}

	/**
	 * Clear entire DataStorage.
	 */
	clear() {
		this.raw = {};
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
