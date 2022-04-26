"use strict";

import Value, { serializedValue } from "./Value";

export interface serializedBlock {
	id: "block";
	block: string;
	args: { items: serializedValue[] };
	action?: string;
}

abstract class Block {
	
	static from(raw: serializedBlock) {
		const type = raw.block;
		const clazz = mapper(type); //? can't use the keyword "class"
		if (!clazz) throw new Error(`Unknown block type: ${type}`);
		const args = raw.args.items.map(arg => Value.from(arg));
		return new clazz(type, raw.action || "", args);
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

import { PlayerEvent } from "../codeblocks/Player";
import { PlayerAction } from "../codeblocks/Player";
import { SetVariable } from "../codeblocks/SetVariable";

function mapper(type: string): any {
	const blockmap: { [key: string]: Function } = {
		"event": PlayerEvent,
		"player_action": PlayerAction,
		"set_var": SetVariable,
	} as const;
	return blockmap[type];
}