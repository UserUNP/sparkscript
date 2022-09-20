import Value from "../core/components/Value";

export interface Iloc {
	x: number;
	y: number;
	z: number;
	pitch: number;
	yaw: number;
}

export default class Location extends Value {
	/**
	 * Create a new location value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 * @param pitch Pitch, defaults to 0.
	 * @param yaw Yaw, defaults to 0.
	 */
	constructor(public x: Iloc["x"], public y: Iloc["y"], public z: Iloc["z"], public pitch: Iloc["pitch"] = 90, public yaw: Iloc["yaw"] = 0, slot?: number) {
		super("Iloc", { loc: { x, y, z, pitch, yaw } as Iloc } as {loc: Iloc}, slot);
	}
}
