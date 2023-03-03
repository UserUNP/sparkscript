import { DFBaseBlockStructure, DFValueType, DFDynamicBlockCodename } from "../types";

import { BLTagArray, getActionTags } from "../../common/blockTagUtils";
import { makeStringifier } from "../../common/utilities";

import SerializableComponent from "./SerializableComponent";
import Value, { RawDFValue } from "./Value";

export interface RawDFDataBlock
<T extends DFDynamicBlockCodename = DFDynamicBlockCodename>
extends DFBaseBlockStructure<"block"> {
	block: T;
	args: { items: RawDFValue[] };
	data: string;
};

/**
 * ### Data block.
 *
 * @template T Block codename.
 */
export default abstract class DataBlock
<T extends DFDynamicBlockCodename>
extends SerializableComponent<RawDFDataBlock<T>> {

	/**
	 * The tags of the action on this conditional block.
	 * @remark Will be an empty array if the action has no tags.
	 */
	//@ts-ignore //! TODO: tf is going on here
	readonly tags: BLTagArray<T, "dynamic"> = getActionTags(this.type, "dynamic");

	/**
	 * Create a new codeblock.
	 * @param type Type of the codeblock.
	 */
	constructor(
		public readonly type: T,
		public data: string,
		public args: DFValueType[]
	) {
		super(`${type} block`);
	}

	toString(): string {
		return makeStringifier.component(this._componentName, this.type, {
			data: this.data,
			args: this.args.map(a => a.toString())
		});
	}

	export(): RawDFDataBlock<T> {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args as Value[])) },
			data: this.data
		}
	}
}
