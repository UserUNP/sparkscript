import ActionBlock from "../core/components/ActionBlock";
import DFValueType from "../core/types/DFValueType";
import Variable from "../values/Variable";

export default class SetVariable
<T extends string = string>
extends ActionBlock<"set_var"> {

	variable: Variable;

	/**
	 * Set a variable using a specific action.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	constructor(action: T, variable: Variable, ...args: DFValueType[])
	constructor(action: T, ...args: DFValueType[])
	constructor(action: T, ...args: [Variable, ...DFValueType[]]) {
		if(!("scope" in args[0]) || !("name" in args[0])) throw new Error("First given argument in a SetVariable block should be a variable.");
		super("set_var", action, args as DFValueType[]);
		this.variable = args[0];
	}
}
