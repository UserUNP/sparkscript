import Value from "../components/Value";

export default class Vector extends Value {
	/**
	 * Create a new vector value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 */
	constructor(public x: number, public y: number, public z: number, slot?: number) {
		super("vec", { x, y, z }, slot);
	}
}
