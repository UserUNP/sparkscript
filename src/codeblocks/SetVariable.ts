"use strict";

import Block from "../components/Block";
import Value from "../components/Value";
import Variable from "../values/Variable";

export class SetVariable extends Block {
	/**
	 * Create a new SetVariable codeblock.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	constructor(action: string, variable: Variable, ...args: Value[]) {
		super("set_var", action, [variable, ...args]);
	}

}

export default {
	Set: SetVariable,
}
