"use strict";

import Value from "./Value";

export interface serializedDataProperty {
	[key: string]: any;
}

export default class DataStorage {

	/**
	 * Create a new DataStorage from a JSON object.
	 * @param raw Raw data to be converted to DataStorage.
	 * @returns DataStorage object.
	 */
	static from(raw: serializedDataProperty) {
		const storage = new DataStorage();
		for (const key in raw) {
			storage.set(key, raw[key]);
		}
		return storage;
	}

	raw: serializedDataProperty = {};
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
	set(key: string, value: any): this {
		this.raw[key] = value;
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
		return this.raw.hasOwnProperty(key);
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