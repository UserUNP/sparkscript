import SubActionBlock from "../core/components/SubActionBlock";
import DFValueType from "../core/types/DFValueType";

export default class SelectObject
<T extends string = string>
extends SubActionBlock<"select_obj"> {

	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	constructor(condition: T, ...args: DFValueType[]) {
		super("select_obj", condition, "(unimplemented)", args);
	}
}
