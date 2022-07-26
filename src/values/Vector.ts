import Value from "../components/Value";

export default class Vector extends Value {
	/**
	 * 
	 */
	constructor(public x: number, public y: number, public z: number, slot?: number) {
		super("vec", { x, y, z }, slot);
	}
}
