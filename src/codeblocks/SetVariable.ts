import Block from "../core/components/Block";
import Value from "../core/components/Value";
import Variable from "../values/Variable";

export class SetVariable extends Block {
	
	variable: Variable;

	/**
	 * Create a new SetVariable codeblock.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	constructor(action: string, ...args: Value[])
	constructor(action: string, variable: Variable, ...args: Value[])
	constructor(action: string, ...args: [Variable, ...Value[]]) {
		super("set_var", action, args);
		this.variable = args[0];
	}

}

export default {
	Set: SetVariable,
}
