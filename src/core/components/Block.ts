export interface RawDFBlock {
	id: "block";
	block: DFBlockCodename;
	args: { items: RawDFValue[] };
	action?: string;
	target?: string;
	data?: string;
}

abstract class Block {
	
	static from(raw: RawDFBlock) {
		const type = raw.block;
		const args: Value[] = raw.args.items.map((arg: any) => Value.from(arg));
		const instance = mapper(type, raw.data||raw.action||"", args);
		return instance;
	}

	/**
	 * Create a new codeblock.
	 * @param type Type of the codeblock.
	 */
	constructor(public type: DFBlockCodename, public action: string, public args: Value[]=[]) {}

	/**
	 * Export the codeblock to a JSON object.
	 * @returns DiamondFire JSON-ified codeblock.
	 */
	export(): RawDFBlock {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args)) },
			action: this.action || ""
		};
	}
}

export default Block;

import mapper from "../../mapper";
import DFBlockCodename from "../DFBlockCodename";
import Value, { RawDFValue } from "./Value";
