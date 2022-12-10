import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFTarget from "../core/types/DFTarget";
import DFValueType from "../core/types/DFValueType";
import { ActionNamesInBlock } from "../mapper";

export class EntityAction
extends ActionBlock<"entity_action"> {

	/**
	 * Used to do something related to an entity or multiple entities.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: ActionNamesInBlock<"entity_action">, target?: DFTarget, ...args: DFValueType[]) {
		super("entity_action", action, args, false, target);
	}
}

export class EntityEvent
extends ActionBlock<"entity_event"> {

	/**
	 * When an entity does something.
	 * @param event Event to listen for.
	 */
	constructor(event: ActionNamesInBlock<"entity_event">) {
		super("entity_event", event, []);
	}
}

export class EntityCondition
extends ConditionalBlock<"if_entity"> {

	/**
	 * If an entity did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: ActionNamesInBlock<"if_entity">, target?: DFTarget, ...args: DFValueType[]) {
		super("if_entity", condition, args, false, target);
	}
}

export default {
	Action: EntityAction,
	Event: EntityEvent,
}
