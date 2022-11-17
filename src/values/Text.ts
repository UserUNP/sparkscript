import Value from "../core/components/Value";
export interface Itxt {
	name: string
};

export default class Text
extends Value<"txt", Itxt> {
	/**
	 * Create a text value.
	 * @param text The text.
	 */
	constructor(
		public text: string,
		slot?: number
	) {
		super("txt", { name: text }, slot);
	}

	toString(): `"${string}"` {
		return `"${this.text}"`;
	}
}
