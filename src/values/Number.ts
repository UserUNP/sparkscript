import Value from "../components/Value";

export default class Number extends Value {
	/**
	 * Create a number value.
	 * @param number Number.
	 */
	constructor(public number: number, slot?: number) {
		super("num", { name: String(number) }, slot);
	}
}
