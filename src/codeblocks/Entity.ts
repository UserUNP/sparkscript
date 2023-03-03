import { DFBlockAction, DFTarget, DFValueType } from "../core/types";
import { ActionBlock, ConditionalBlock } from "../core/components";

export class EntityAction
<Action extends DFBlockAction<"entity_action">>
extends ActionBlock<"entity_action", Action> {

	/**
	 * Used to do something related to an entity or multiple entities.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: Action, target?: DFTarget, ...args: DFValueType[]) {
		super("entity_action", action, args, false, target);
	}
}

export class EntityEvent
<Action extends DFBlockAction<"entity_event">>
extends ActionBlock<"entity_event", Action> {

	/**
	 * When an entity does something.
	 * @param event Event to listen for.
	 */
	constructor(event: Action) {
		super("entity_event", event, []);
	}
}

export class EntityCondition
<Condition extends DFBlockAction<"if_entity">>
extends ConditionalBlock<"if_entity", Condition> {

	/**
	 * If an entity did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: Condition, target?: DFTarget, ...args: DFValueType[]) {
		super("if_entity", condition, args, false, target);
	}
}

export default {
	Action: EntityAction,
	Event: EntityEvent,
}
