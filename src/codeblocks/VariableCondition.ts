import ConditionalBlock from "../core/components/ConditionalBlock";
import DFValueType from "../core/types/DFValueType";

export default class VariableCondition
<T extends string = string>
extends ConditionalBlock<"if_var", "Default"> {

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param args Arguments to pass.
	 */
	constructor(condition: T, ...args: DFValueType[]) {
		super("if_var", condition, args, false);
	}
}
