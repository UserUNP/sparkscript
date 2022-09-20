import Value from "../core/components/Value";

export type text = string;

export default class Text extends Value {
	/**
	 * Create a text value.
	 * @param text The text.
	 */
	constructor(public text: string, slot?: number) {
		super("txt", { name: text as text } as {name: text}, slot);
	}
}
