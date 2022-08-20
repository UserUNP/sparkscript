import Block, { serializedBlock } from "../components/Block";
import Value from "../components/Value";

export default class Func extends Block {
	
	/**
	 * Place a function
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	constructor(public name: string, ...args: Value[]) {
		super("func", name, args);
	}

	export(): serializedBlock {
		const result = super.export();
		delete result.action;
		result.data = this.name;
		return result;
	}
	
}
