import ActionBlock from "../core/components/ActionBlock";
import DFValueType from "../core/types/DFValueType";

export default class Control
<T extends string = string>
extends ActionBlock<"control"> {

	/**
	 * Control.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: T, ...args: DFValueType[]) {
		super("control", action, args, false);
	}
}
