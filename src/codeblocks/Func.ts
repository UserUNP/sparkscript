import { DFValueType } from "../core/types";
import { DataBlock } from "../core/components";

export default class Func
extends DataBlock<"func"> {

	/**
	 * Place a function.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	constructor(name: string, ...args: DFValueType[]) {
		super("func", name, args);
	}
}
