import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFValueType from "../core/types/DFValueType";
import { ActionNamesInBlock } from "../mapper";

export class GameAction
extends ActionBlock<"game_action"> {

	/**
	 * Used to do something related to the plot and everyone playing it.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: ActionNamesInBlock<"game_action">, ...args: DFValueType[]) {
		super("game_action", action, args, false);
	}
}

export class GameCondition
extends ConditionalBlock<"if_game"> {

	/**
	 *
	 */
	constructor(action: ActionNamesInBlock<"if_game">, ...args: DFValueType[]) {
		super("if_game", action, args, false);
	}
}

export default {
	GameAction,
	GameCondition
}
