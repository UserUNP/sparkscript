import Block from "../core/components/Block";
import Value from "../core/components/Value";

export default class SelectObject extends Block {
	
	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	constructor(public condition: string, ...args: Value[]) {
		super("select_obj", condition, args);
	}
	
}
