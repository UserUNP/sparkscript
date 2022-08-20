import Block from "../components/Block";
import Value from "../components/Value";

export default class GameAction extends Block {
	/**
	 * Used to do something related to the plot and everyone playing it.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	constructor(action: string, ...args: Value[]) {
		super("game_action", action, [...args]);
	}

}
