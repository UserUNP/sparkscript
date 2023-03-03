import { DFBlockAction, DFValueType } from "../core/types";
import { ConditionalBlock } from "../core/components";

export default class VariableCondition
<Condition extends DFBlockAction<"if_var">>
extends ConditionalBlock<"if_var", Condition> {

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param args Arguments to pass.
	 */
	constructor(condition: Condition, ...args: DFValueType[]) {
		super("if_var", condition, args, false);
	}
}
