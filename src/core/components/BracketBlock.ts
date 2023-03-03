import { DFBaseBlockStructure, DFBracketBlockDirection, DFBracketBlockType } from "../types";
import SerializableComponent from "./SerializableComponent";


export interface RawDFBracketBlock
<T extends DFBracketBlockType = DFBracketBlockType, S extends DFBracketBlockDirection = DFBracketBlockDirection>
extends DFBaseBlockStructure<"bracket"> {
	type: T;
	direct: S;
}

/**
 * ### Bracket block.
 *
 * @template T Bracket type.
 * @ŧemplate S Bracket Direction.
 */
export default class BracketBlock
<T extends DFBracketBlockType = DFBracketBlockType, S extends DFBracketBlockDirection = DFBracketBlockDirection>
extends SerializableComponent<RawDFBracketBlock<T, S>> {

	/**
	 * Transform raw data into readable sparkscript data.
	 * @description Most typings are lost due to abstraction.
	 * @param raw Raw action codeblock data.
	 * @returns New instance of the respective sparkscript class.
	 */
	static from(raw: RawDFBracketBlock) {
		return new BracketBlock(raw.direct, raw.type);
	}

	/**
	 * Create a new bracket block.
	 * @param direction Specify is the bracket is closing or opening.
	 * @param type Variant of the bracket.
	 */
	constructor(
		public readonly direction: S,
		public readonly type: T
	) {
		super(`${direction}-${type} bracket`);
	}

	/**
	 * Serialize the object into a readable DiamondFire format.
	 * @returns DiamondFire JSON-ified codeblock.
	 */
	export(): RawDFBracketBlock<T, S> {
		return {
			id: "bracket",
			direct: this.direction,
			type: this.type
		}
	}
}
