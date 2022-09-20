import Value from "../core/components/Value";

export interface Ivec {
	x: number;
	y: number;
	z: number;
}

export default class Vector extends Value {
	/**
	 * Create a new vector value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 */
	constructor(public x: Ivec["x"], public y: Ivec["y"], public z: Ivec["z"], slot?: number) {
		super("vec", { x, y, z } as Ivec, slot);
	}
}
