import ActionBlock from "../core/components/ActionBlock";
import DFBlockAction from "../core/types/DFBlockAction";
import DFValueType from "../core/types/DFValueType";

export default class Control<Action extends DFBlockAction<"control">>
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
