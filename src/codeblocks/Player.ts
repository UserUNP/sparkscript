import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFTarget from "../core/types/DFTarget";
import DFValueType from "../core/types/DFValueType";
import DFBlockAction from "../core/types/DFBlockAction";

export class PlayerAction<Action extends DFBlockAction<"player_action">>
extends ActionBlock<"player_action", Action> {

	/**
	 * Do a player action.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: Action, target?: DFTarget, ...args: DFValueType[]) {
		super("player_action", action, args, false, target);
	}
}

export class PlayerEvent<Action extends DFBlockAction<"event">>
extends ActionBlock<"event", Action> {

	/**
	 * When a player does something.
	 * @param event Event to listen for.
	 */
	constructor(event: Action) {
		super("event", event, []);
	}
}

export class PlayerCondition
extends ConditionalBlock<"if_player"> {

	/**
	 * If a player did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: DFBlockAction<"if_player">, target?: DFTarget, ...args: DFValueType[]) {
		super("if_player", condition, args, false, target);
	}
}

export default {
	Action: PlayerAction,
	Event: PlayerEvent,
	Condition: PlayerCondition,
}
