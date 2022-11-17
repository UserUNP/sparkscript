import { makeStringification } from "../../utilities";
import DFBaseBlockStructure from "../types/DFBaseBlockStructure";
import DFBlockCodename from "../types/DFBlockCodename";
import DFValueType from "../types/DFValueType";
import SerializableComponent from "./SerializableComponent";
import Value, { RawDFValue } from "./Value";

export interface RawDFSubActionBlock
<T extends DFBlockCodename = DFBlockCodename>
extends DFBaseBlockStructure<"block"> {
	block: T;
	args: { items: RawDFValue[] };
	action: string;
	subAction: string;
	inverted: "NOT" | "";
};

/**
 * ### Subaction block.
 *
 * @template T Block codename.
 */
export default abstract class SubActionBlock
<T extends DFBlockCodename>
extends SerializableComponent<RawDFSubActionBlock<T>, "subaction block"> {

	/**
	 * Create a new codeblock.
	 * @param type Type of the codeblock.
	 * @param action The action to check for.
	 * @param args Arguments to pass.
	 * @param isInverted If the codeblock is inverted (mostly for conditional blocks).
	 */
	constructor(
		public readonly type: T,
		public action: string,
		public subAction: string,
		public args: DFValueType[],
		public isInverted: boolean = false
	) {
		super("subaction block");
	}

	toString(): string {
		return makeStringification.component(this, this.type, {
			action: this.action,
			subAction: this.subAction,
			inverted: this.isInverted,
			args: this.args.map(a => a.toString())
		});
	}

	/**
	 * Export the codeblock to a JSON object.
	 * @returns DiamondFire JSON-ified codeblock.
	 */
	export(): RawDFSubActionBlock<T> {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args as Value[])) },
			action: this.action,
			subAction: this.subAction,
			inverted: this.isInverted ? "NOT" : ""
		}
	}
}
