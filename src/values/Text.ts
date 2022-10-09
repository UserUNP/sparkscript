import Value from "../core/components/Value";

export type txt = string;

export default class Text extends Value {
	/**
	 * Create a text value.
	 * @param text The text.
	 */
	constructor(public text: string, slot?: number) {
		super("txt", { name: text as txt } as {name: txt}, slot);
	}

	toString(): `"${typeof this.text}"` {
		return `"${this.text}"`
	}
}
