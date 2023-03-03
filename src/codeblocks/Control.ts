import { DFBlockAction, DFValueType } from "../core/types";
import { ActionBlock } from "../core/components";

export default class Control
<Action extends DFBlockAction<"control">>
extends ActionBlock<"control", Action> {

	/**
	 * Control.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: Action, ...args: DFValueType[]) {
		super("control", action, args, false);
	}
}
