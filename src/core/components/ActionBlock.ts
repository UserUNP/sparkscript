import { makeStringification } from "../../utilities";
import DFBaseBlockStructure from "../types/DFBaseBlockStructure";
import DFBlockCodename from "../types/DFBlockCodename";
import DFTarget from "../types/DFTarget";
import DFValueType from "../types/DFValueType";
import SerializableComponent from "./SerializableComponent";
import Value, { RawDFValue } from "./Value";

export interface RawDFActionBlock
<T extends DFBlockCodename = DFBlockCodename>
extends DFBaseBlockStructure<"block"> {
	block: T;
	args: { items: RawDFValue[] };
	action: string;
	target: DFTarget;
	inverted: "NOT" | "";
};

/**
 * ### Action block.
 *
 * @template T Block codename.
 * @template Target Selection to target.
 */
export default abstract class ActionBlock
<T extends DFBlockCodename, Target extends DFTarget = DFTarget>
extends SerializableComponent<RawDFActionBlock<T>, "action block"> {

	/**
	 * Create a new action codeblock.
	 * @param type Type of the codeblock.
	 * @param action The action to perform.
	 * @param args Arguments to pass.
	 * @param isInverted If the codeblock is inverted (mostly for conditional blocks).
	 * @param target The target for the action.
	 */
	constructor(
		public readonly type: T,
		public action: string,
		public args: DFValueType[],
		public isInverted: boolean = false,
		public target: Target = "Default" as Target
	) {
		super("action block");
	}

	/**
	 * Invert into a 'NOT' action.
	 * @returns True if inverted, otherwise false.
	 */
	invert() {
		return this.isInverted = !this.isInverted;
	}

	toString(): string {
		return makeStringification.component(this, this.type, {
			action: this.action,
			target: this.target,
			inverted: !!this.isInverted,
			args: this.args.map(a => a.toString())
		});
	}

	export(): RawDFActionBlock<T> {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args as Value[])) },
			action: this.action,
			target: this.target,
			inverted: this.isInverted ? "NOT": ""
		}
	}
}
