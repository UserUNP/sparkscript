import { Value } from "../core/components";

export interface Ivec {
	x: number;
	y: number;
	z: number;
}

export default class Vector
extends Value<"vec", Ivec> {

	/**
	 * Create a new vector value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 */
	constructor(
		public x: number,
		public y: number,
		public z: number,
		slot?: number
	) {
		super("vec", { x, y, z }, slot);
	}

	toString(): `<${number}, ${number}, ${number}>` {
		return `<${this.x}, ${this.y}, ${this.z}>`;
	}
}
