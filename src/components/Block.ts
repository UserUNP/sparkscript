
export interface serializedBlock {
	id: "block";
	block: string;
	args: { items: serializedValue[] };
	action?: string;
}

abstract class Block {
	
	static from(raw: serializedBlock) {
		const type = raw.block;
		const args = raw.args.items.map(arg => Value.from(arg));
		const instance = mapper(type, raw.action||"", args);
		return instance as Block;
	}

	/**
	 * Create a new codeblock.
	 * @param type Type of the codeblock.
	 */
	constructor(public type: string, public action: string, public args: Value[]=[]) {}

	/**
	 * Export the codeblock to a JSON object.
	 * @returns DiamondFire JSON-ified codeblock.
	 */
	export(): serializedBlock {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args)) },
			action: this.action || ""
		};
	}
}

export default Block;

import mapper from "../mapper";
import Value, { serializedValue } from "./Value";
