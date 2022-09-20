import Value from "../core/components/Value";

export type num = `${number}`;

export default class Number extends Value {
	/**
	 * Create a number value.
	 * @param number Number.
	 */
	constructor(public number: number, slot?: number) {
		super("num", { name: `${number}` as num } as {name: num}, slot);
	}
}
