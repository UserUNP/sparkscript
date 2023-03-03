import { DFValueType } from "../core/types";
import { DataBlock } from "../core/components";

export default class Process
extends DataBlock<"process"> {

	/**
	 * Place a process.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	constructor(name: string, ...args: DFValueType[]) {
		super("process", name, args);
	}
}
