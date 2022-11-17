import DataBlock from "../core/components/DataBlock";

export default class CallFunction
<T extends string = string>
extends DataBlock<"call_func"> {

	/**
	 * Call a specific function.
	 * @param name Function name to call.
	 */
	constructor(name: T) {
		super("call_func", name, []);
	}
}
