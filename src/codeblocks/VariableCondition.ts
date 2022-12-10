import ConditionalBlock from "../core/components/ConditionalBlock";
import DFValueType from "../core/types/DFValueType";
import { ActionNamesInBlock } from "../mapper";

export default class VariableCondition
extends ConditionalBlock<"if_var", "Default"> {

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param args Arguments to pass.
	 */
	constructor(condition: ActionNamesInBlock<"if_var">, ...args: DFValueType[]) {
		super("if_var", condition, args, false);
	}
}
