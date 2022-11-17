import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFValueType from "../core/types/DFValueType";

export class GameAction
<T extends string = string>
extends ActionBlock<"game_action"> {

	/**
	 * Used to do something related to the plot and everyone playing it.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: T, ...args: DFValueType[]) {
		super("game_action", action, args, false);
	}
}

export class GameCondition
<T extends string = string>
extends ConditionalBlock<"if_game"> {

	/**
	 *
	 */
	constructor(action: T, ...args: DFValueType[]) {
		super("if_game", action, args, false);
	}
}

export default {
	GameAction,
	GameCondition
}