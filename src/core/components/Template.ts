import zlib from "node:zlib";
import WebSocket from 'ws';

import { DFAnySerializedBlock, DFCodeExportableBlock } from "../types";

import { sparkscriptWarn } from "../../common/utilities";
import blockExportHandler from "../../common/blockExportHandler";

import SerializableComponent from "./SerializableComponent";

export interface RawDFTemplate {
	blocks: DFAnySerializedBlock[];
	author?: string,
	name?: string
}

/**
 * ### Template.
 *
 */
export default class Template
extends SerializableComponent<{serialized: RawDFTemplate, compressed: string}> {

	/**
	 * Never use this unless you want to explicitly set the codeblocks array.
	 */
	_blocks: DFCodeExportableBlock[] = [];
	cuSocket?: WebSocket;

	/**
	 * Create a new template.
	 * @param name Template name, defaults to "untitled".
	 * @param author Template author, defaults to "anonymous".
	 */
	constructor(public name: string|false, public author?: string) {
		super("template");
		this.name = name || "untitled";
		this.author = author || "anonymous";
	}

	export() {
		if(this.length == 0) sparkscriptWarn("Exporting an empty template", true);

		const serialized: RawDFTemplate = { blocks: [], name: `${this.name}`, author: `${this.author}` };
		for (const block of this._blocks) serialized.blocks.push(...blockExportHandler(block));

		const compressed = zlib.gzipSync(JSON.stringify(serialized)).toString("base64");
		return {
			compressed,
			serialized,
			sendToCodeutils: async () => {
				if(!this.cuSocket) return sparkscriptWarn("Not connected to the Codeutilities WebSocket.");
				try {
					this.cuSocket.on("open", () => {
						if(!this.cuSocket) throw new Error("Connection terminated.");
						this.cuSocket.send(JSON.stringify({
							type: "template", source: this.author,
							data: JSON.stringify(compressed)
						}));
						this.cuSocket.addEventListener("message", (e) => {
							const res = JSON.parse(e.data.toString());
							if(res.status === "error") throw new Error(res.error);
							else return true;
						});
						this.cuSocket.on("error", (e) => { throw e; });
					});
				} catch(e) { throw e; }
			}
		} as const;
	}

	/**
	 * Add to.
	 * @param blocks Block(s) to add to the template.
	 */
	push(...blocks: DFCodeExportableBlock[]) {
		this._blocks.push(...blocks);
		return this;
	}

	/**
	 * Alias for `push`.
	 * @param block Block to add.
	 * @returns The block that was pushed.
	 */
	add<T extends DFCodeExportableBlock>(block: T) {
		this._blocks.push(block);
		return block;
	}

	/**
	 * Remove from.
	 * @param index Index of the codeblock to remove.
	 */
	pop(index?: number) {
		if (index) this._blocks.splice(index, 1);
		else this._blocks.pop();
		return this;
	}

	get(index?: number) {
		if (index) return this._blocks[index];
		else return this._blocks[this._blocks.length - 1];
	}

	/**
	 * The codeblocks that make up this template.
	 */
	get blocks() {
		return [...this._blocks]
	}

	/**
	 * Size of the template.
	 */
	get length() {
		return this._blocks.length;
	}

	/**
	 * Get the last codeblock in the template.
	 */
	get last() {
		return this._blocks[this._blocks.length - 1];
	}

	/**
	 * Get the first codeblock in the template.
	 */
	get first() {
		return this._blocks[0];
	}
}
