import { ActionBlock } from "../core/components";

export default class StartProcess
extends ActionBlock<"start_process", string> {

	/**
	 * Start a process thread.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	 constructor(name: string) {
		super("start_process", name, []);
	}
}
