import Value from "../core/components/Value";
import DFTarget from "../core/DFTarget";

export interface Ig_val {
	type: string;
	target: DFTarget;
}

export default class GameValue extends Value {
	/**
	 * Create a new game value.
	 * @param value The value.
	 * @param target The target of the value, "Default" is the default target.
	 */
	constructor(public value: Ig_val["type"], public target: Ig_val["target"] = "Default", slot?: number) {
		super("g_val", { type: value, target } as Ig_val, slot);
	}
}
