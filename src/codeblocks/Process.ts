import DataBlock from "../core/components/DataBlock";
import DFValueType from "../core/types/DFValueType";

export default class Func
<T extends string = string>
extends DataBlock<"process"> {

	/**
	 * Place a process.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	constructor(name: T, ...args: DFValueType[]) {
		super("process", name, args);
	}
}
