import { DFBlockAction, DFTarget, DFValueType } from "../core/types";

import { ActionBlock, ConditionalBlock } from "../core/components";

export class PlayerAction
<Action extends DFBlockAction<"player_action">>
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

export class PlayerEvent
<Action extends DFBlockAction<"event">>
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
<Condition extends DFBlockAction<"if_player">>
extends ConditionalBlock<"if_player", Condition> {

	/**
	 * If a player did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: Condition, target?: DFTarget, ...args: DFValueType[]) {
		super("if_player", condition, args, false, target);
	}
}

export default {
	Action: PlayerAction,
	Event: PlayerEvent,
	Condition: PlayerCondition,
}
