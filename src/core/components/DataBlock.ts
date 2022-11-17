import { makeStringification } from "../../utilities";
import DFBaseBlockStructure from "../types/DFBaseBlockStructure";
import DFBlockCodename from "../types/DFBlockCodename";
import DFValueType from "../types/DFValueType";
import SerializableComponent from "./SerializableComponent";
import Value, { RawDFValue } from "./Value";

export interface RawDFDataBlock
<T extends DFBlockCodename = DFBlockCodename>
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
<T extends DFBlockCodename>
extends SerializableComponent<RawDFDataBlock<T>, `${T} block`> {

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
		return makeStringification.component(this, this.type, {
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
