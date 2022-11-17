import ActionBlock from "../core/components/ActionBlock";
import ConditionalBlock from "../core/components/ConditionalBlock";
import DFTarget from "../core/types/DFTarget";
import DFValueType from "../core/types/DFValueType";

export class EntityAction
<T extends string = string, Target extends DFTarget = "Default">
extends ActionBlock<"entity_action", Target> {

	/**
	 * Used to do something related to an entity or multiple entities.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	 constructor(action: T, target?: Target, ...args: DFValueType[]) {
		super("entity_action", action, args, false, target);
	}
}

export class EntityEvent
<T extends string = string>
extends ActionBlock<"entity_event"> {

	/**
	 * When an entity does something.
	 * @param event Event to listen for.
	 */
	constructor(event: T) {
		super("entity_event", event, []);
	}
}

export class EntityCondition
<T extends string = string, Target extends DFTarget = "Default">
extends ConditionalBlock<"if_entity", Target> {

	/**
	 * If an entity did something.
	 * @param condition Action of condition.
	 * @param target Target of the condition.
	 * @param args Arguments to pass.
	 */
	constructor(condition: T, target?: Target, ...args: DFValueType[]) {
		super("if_entity", condition, args, false, target);
	}
}

export default {
	Action: EntityAction,
	Event: EntityEvent,
}
