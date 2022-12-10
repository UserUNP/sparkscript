import ActionBlock from "../core/components/ActionBlock";
import DFValueType from "../core/types/DFValueType";
import { ActionNamesInBlock } from "../mapper";

export default class Control
extends ActionBlock<"control"> {

	/**
	 * Control.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: ActionNamesInBlock<"control">, ...args: DFValueType[]) {
		super("control", action, args, false);
	}
}
