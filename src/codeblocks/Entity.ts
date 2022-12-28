import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFTarget from "../core/types/DFTarget";
import DFValueType from "../core/types/DFValueType";
import DFBlockAction from "../core/types/DFBlockAction";

export class EntityAction<Action extends DFBlockAction<"entity_action">>
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

export class EntityEvent<Action extends DFBlockAction<"entity_event">>
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
extends ConditionalBlock<"if_entity"> {

	/**
	 * If an entity did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: DFBlockAction<"if_entity">, target?: DFTarget, ...args: DFValueType[]) {
		super("if_entity", condition, args, false, target);
	}
}

export default {
	Action: EntityAction,
	Event: EntityEvent,
}
