"use strict";

import Block, { serializedBlock } from "./Block";
import pako from "pako";
import WebSocket from 'ws';

export interface serializedTemplate {
	blocks: serializedBlock[];
	author?: string,
	name?: string
}

export default class Template {
	/**
	 * Never use this unless you want to explicitly set the codeblocks array.
	 */
	_blocks: Block[] = [];
	cuSocket?: WebSocket;
	
	/**
	 * Create a new template.
	 * @param name Template name, defaults to "untitled".
	 * @param author Template author, defaults to "anonymous".
	 */
	constructor(public name?: string, public author?: string) {
		this.name = name || "untitled";
		this.author = author || "anonymous";
	}

	export(): { compressed: string, serialized: serializedTemplate, sendToCodeutils: Function } {
		const result: serializedTemplate = { blocks: [] };
		let compressed: string = "";

		for (const block of this._blocks) {
			result.blocks.push(block.export());
		}
		
		result.author = this.author;
		result.name = this.name;

		compressed = String.fromCharCode.apply(null, new Uint16Array(pako.gzip(JSON.stringify(result))) as unknown as []);
		compressed = btoa(compressed);
		return {
			compressed,
			serialized: result,
			sendToCodeutils: async () => {
				if(this.cuSocket !== undefined) {
					try {
						this.cuSocket.on("open", () => {
							this.cuSocket?.send(JSON.stringify({
								type: "template",
								source: this.author,
								data: JSON.stringify(compressed)
							}));
							this.cuSocket?.addEventListener("message", (e) => {
								const resp = JSON.parse(e.data.toString());
								if(resp.status === "error") throw new Error(resp.error)
								else return true;
							});
							this.cuSocket?.on("error", (e) => { throw e; });
						});
					} catch(e) { throw e; }
				} else throw new Error("Not connected to the Codeutilities WebSocket")
			}
		} as const;
	}

	/**
	 * Add to.
	 * @param blocks Codeblock(s) to add to the template.
	 */
	push(...blocks: Block[]) {
		this._blocks.push(...blocks);
	}

	/**
	 * Remove from.
	 * @param index Index of the codeblock to remove.
	 */
	pop(index?: number) {
		if (index) this._blocks.splice(index, 1);
		else this._blocks.pop();
	}

	get(index?: number) {
		if (index) return this._blocks[index];
		else return this._blocks[this._blocks.length - 1];
	}

	/**
	 * The codeblocks that make up this template.
	 */
	get blocks(): Block[] {
		return this._blocks;
	}

	get length(): number {
		return this._blocks.length;
	}

	/**
	 * Get the last codeblock in the template.
	 */
	get last(): Block {
		return this._blocks[this._blocks.length - 1];
	}

	/**
	 * Get the first codeblock in the template.
	 */
	get first(): Block {
		return this._blocks[0];
	}
}