import Value from "../components/Value";

export default class GameValue extends Value {
	/**
	 * Create a new game value.
	 * @param value The value.
	 * @param target The target of the value, "Default" is the default target.
	 */
	constructor(public value: string, public target: string = "Default", slot?: number) {
		super("g_val", { type: value, target }, slot);
	}
}
