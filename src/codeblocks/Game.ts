import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFValueType from "../core/types/DFValueType";
import DFBlockAction from "../core/types/DFBlockAction";

export class GameAction<Action extends DFBlockAction<"game_action">>
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
extends ConditionalBlock<"if_game"> {

	/**
	 *
	 */
	constructor(action: DFBlockAction<"if_game">, ...args: DFValueType[]) {
		super("if_game", action, args, false);
	}
}

export default {
	GameAction,
	GameCondition
}
