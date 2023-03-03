import { Value } from "../core/components";
import { DFGameValueName, DFTarget } from "../core/types";

export interface Ig_val {
	type: DFGameValueName;
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
		public value: DFGameValueName,
		public target: DFTarget = "Default",
		slot?: number
	) {
		super("g_val", { type: value, target }, slot);
	}
}
