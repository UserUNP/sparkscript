import { DFBlockAction, DFValueType } from "../core/types";
import { ActionBlock } from "../core/components";
import { Variable } from "../values";

export default class SetVariable
<Action extends DFBlockAction<"set_var">>
extends ActionBlock<"set_var", Action> {

	variable: Variable;

	/**
	 * Set a variable using a specific action.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	constructor(action: Action, variable: Variable, ...args: DFValueType[])
	constructor(action: Action, ...args: DFValueType[])
	constructor(action: Action, ...args: [Variable, ...DFValueType[]]) {
		if(!("scope" in args[0]) || !("name" in args[0])) throw new Error("First given argument in a SetVariable block should be a variable.");
		super("set_var", action, args as DFValueType[]);
		this.variable = args[0];
	}
}
