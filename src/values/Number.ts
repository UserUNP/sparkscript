import { Value } from "../core/components";

export interface Inum {
	name: `${number}`;
};

export default class Number
extends Value<"num", Inum> {

	static parse(stringified: `${number}`, slot?: number) {
		return new Number(parseInt(stringified), slot);
	}
	/**
	 * Create a number value.
	 * @param number Number.
	 */
	constructor(
		public number: number,
		slot?: number
	) {
		super("num", { name: `${number}` }, slot);
	}

	toString(): `${number}` {
		return `${this.number}`;
	}
}
