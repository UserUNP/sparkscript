import { Value } from "../core/components";

export interface Iloc {
	loc: {
		x: number;
		y: number;
		z: number;
		pitch: number;
		yaw: number;
	}
}

export default class Location
extends Value<"loc", Iloc> {

	/**
	 * Create a new location value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 * @param pitch Pitch, defaults to 0.
	 * @param yaw Yaw, defaults to 0.
	 */
	constructor(
		public x: number, public y: number, public z: number,
		public pitch: number = 90, public yaw: number = 0,
		slot?: number
	) {
		super("loc", { loc: { x, y, z, pitch, yaw } }, slot);
	}
}
