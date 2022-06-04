
import Block from "../components/Block";
import Value from "../components/Value";

export class PlayerAction extends Block {

	/**
	 * Do a player action.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: string, ...args: Value[]) {
		super("player_action", action, args);
	}

}

export class PlayerEvent extends Block {
	
	/**
	 * When a player does something.
	 * @param event Event to listen for.
	 */
	constructor(public event: string) {
		super("event", event, []);
	}
	
}

export default {
	Action: PlayerAction,
	Event: PlayerEvent,
};
