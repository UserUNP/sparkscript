import { ActionBlock } from "../core/components";

export default class CallFunction
extends ActionBlock<"call_func", string> {

	/**
	 * Call a specific function.
	 * @param name Function name to call.
	 */
	constructor(name: string) {
		super("call_func", name, []);
	}
}
