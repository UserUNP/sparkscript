import Block from "../core/components/Block";
import Value from "../core/components/Value";

export class EntityAction extends Block {

	/**
	 * Used to do something related to an entity or multiple entities.
	 * @param action Action to perform.
	 * @param args Arguments to pass. 
	 */
	constructor(action: string, ...args: Value[]) {
		super("entity_action", action, args);
	}

}

export class EntityEvent extends Block {
	
	/**
	 * When an entity does something.
	 * @param event Event to listen for.
	 */
	constructor(public event: string) {
		super("entity_event", event, []);
	}
	
}

export default {
	Action: EntityAction,
	Event: EntityEvent,
};
