import Value from "../core/components/Value";
import DFTarget from "../core/types/DFTarget";

export interface Ig_val { //TODO: g_val "type" types
	type: string;
	target: DFTarget;
}

export default class GameValue
extends Value<"g_val", Ig_val> {
	/**
	 * Create a new game value.
	 * @param value The value.
	 * @param target The target of the value, "Default" is the default target.
	 */
	constructor(
		public value: string,
		public target: DFTarget = "Default",
		slot?: number
	) {
		super("g_val", { type: value, target }, slot);
	}
}
