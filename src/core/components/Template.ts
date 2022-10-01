import Block, { RawDFBlock } from "./Block";
import zlib from "node:zlib";
import WebSocket from 'ws';
import getEditor from "../../editor/quickeditor";

export interface RawDFTemplate {
	blocks: RawDFBlock[];
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
	 * Self editor.
	 */
	public readonly self = getEditor.default(this);
	
	/**
	 * Create a new template.
	 * @param name Template name, defaults to "untitled".
	 * @param author Template author, defaults to "anonymous".
	 */
	constructor(public name: string|false, public author?: string) {
		this.name = name || "untitled";
		this.author = author || "anonymous";
	}

	export(): { compressed: string, serialized: RawDFTemplate, sendToCodeutils: Function } {
		if(this.length == 0) console.trace("[sparkscript] WARNING: Exporting an empty template.")

		const result: RawDFTemplate = { blocks: [], name: `${this.name}`, author: this.author };
		let compressed: string = "";
		for (const block of this._blocks) result.blocks.push(block.export());
		compressed = zlib.gzipSync(JSON.stringify(result)).toString("base64");

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
