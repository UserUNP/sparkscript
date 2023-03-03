import { DFBlockAction, DFValueType } from "../core/types";
import { ActionBlock, ConditionalBlock } from "../core/components";

export class GameAction
<Action extends DFBlockAction<"game_action">>
extends ActionBlock<"game_action", Action> {

	/**
	 * Used to do something related to the plot and everyone playing it.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: Action, ...args: DFValueType[]) {
		super("game_action", action, args, false);
	}
}

export class GameCondition
<Condition extends DFBlockAction<"if_game">>
extends ConditionalBlock<"if_game", Condition> {

	/**
	 *
	 */
	constructor(action: Condition, ...args: DFValueType[]) {
		super("if_game", action, args, false);
	}
}

export default {
	GameAction,
	GameCondition
}
