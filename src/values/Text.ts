"use strict";

import Value from "../components/Value";

export default class Text extends Value {
	/**
	 * Create a text value.
	 * @param text The text.
	 */
	constructor(public text: string, slot?: number) {
		super("txt", { name: text }, slot);
	}
}