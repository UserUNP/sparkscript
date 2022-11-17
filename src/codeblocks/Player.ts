import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFTarget from "../core/types/DFTarget";
import DFValueType from "../core/types/DFValueType";

export class PlayerAction
<T extends string = string, Target extends DFTarget = "Default">
extends ActionBlock<"player_action", Target> {

	/**
	 * Do a player action.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: T, target?: Target, ...args: DFValueType[]) {
		super("player_action", action, args, false, target);
	}
}

export class PlayerEvent
<T extends string = string>
extends ActionBlock<"event"> {

	/**
	 * When a player does something.
	 * @param event Event to listen for.
	 */
	constructor(event: T) {
		super("event", event, []);
	}
}

export class PlayerCondition
<T extends string = string, Target extends DFTarget = "Default">
extends ConditionalBlock<"if_player", Target> {

	/**
	 * If a player did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: T, target?: Target, ...args: DFValueType[]) {
		super("if_player", condition, args, false, target);
	}
}

export default {
	Action: PlayerAction,
	Event: PlayerEvent,
	Condition: PlayerCondition,
}
