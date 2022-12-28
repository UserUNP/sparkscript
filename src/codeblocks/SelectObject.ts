import SubActionBlock from "../core/components/SubActionBlock";
import DFValueType from "../core/types/DFValueType";
import DFBlockAction from "../core/types/DFBlockAction";

export default class SelectObject
extends SubActionBlock<"select_obj"> {

	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	constructor(condition: DFBlockAction<"select_obj">, ...args: DFValueType[]) {
		super("select_obj", condition, "(unimplemented)", args);
	}
}
