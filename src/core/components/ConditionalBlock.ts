import editor from "../../editor/Iquickeditor";
import getEditor, { ActDefs } from "../../editor/quickeditor";
import DFAnySerializedBlock from "../types/DFAnySerializedBlock";
import DFBlockCodename from "../types/DFBlockCodename";
import DFTarget from "../types/DFTarget";
import DFValueType from "../types/DFValueType";
import { RawDFActionBlock } from "./ActionBlock";
import BracketBlock from "./BracketBlock";
import DFBracketBlockType from "../types/DFBracketBlockType";
import SerializableComponent from "./SerializableComponent";
import Value from "./Value";
import DFAnyExportableBlock from "../types/DFAnyExportableBlock";
import Template from "./Template";
import Ieditor from "../../editor/Iquickeditor";
import { makeStringification } from "../../utilities";

export interface RawDFConditionalBlock
<T extends DFBlockCodename = DFBlockCodename>
extends RawDFActionBlock<T> {
	__sparkscriptInternalBlocks?: DFAnySerializedBlock[];
	__sparkscriptBracketPairType?: DFBracketBlockType;
}

/**
 * ### Conditional "if" block.
 *
 * @template T Block codename.
 * @template Target Selection to target.
 */
export default abstract class ConditionalBlock
<T extends DFBlockCodename, Target extends DFTarget = DFTarget>
extends SerializableComponent<RawDFConditionalBlock<T>, "conditional block"> {

	static conditionalBlockHandler(raw: RawDFConditionalBlock) {
		if(!raw.__sparkscriptBracketPairType || !raw.__sparkscriptInternalBlocks) throw new Error("Cannot find important properties for conditional block to be exported.");
		const opening = new BracketBlock("open", raw.__sparkscriptBracketPairType).export();
		const closing = new BracketBlock("close", raw.__sparkscriptBracketPairType).export();
		const content = raw.__sparkscriptInternalBlocks;
		delete raw.__sparkscriptInternalBlocks;
		delete raw.__sparkscriptBracketPairType;
		return [raw, opening, ...content, closing] as const;
	}

	openingBracket: BracketBlock<"norm", "open"> = new BracketBlock("open", "norm");
	closingBracket: BracketBlock<"norm", "close"> = new BracketBlock("close", "norm");
	_selfEditor: editor;

	/**
	 * Create a new conditional codeblock.
	 * @param type Type of the codeblock.
	 * @param action The action to check for.
	 * @param args Arguments to pass.
	 * @param isInverted If the condition is inverted.
	 * @param target Target of the action.
	 */
	constructor(
		public readonly type: T,
		public action: string,
		public args: DFValueType[],
		public isInverted: boolean = false,
		public target: Target = "Default" as Target,
		editorCustomActions?: ActDefs
	) {
		super("conditional block");
		if(editorCustomActions) this._selfEditor = getEditor(new Template(`${this}`), {
			actDefs: editorCustomActions
		}); else this._selfEditor = getEditor.default(`${this}`);
	}

	/**
	 * Add to inside blocks.
	 * @param blocks Codeblock(s) to add to the template.
	 */
	 push(...blocks: DFAnyExportableBlock[]) {
		this._selfEditor.getTemplate().push(...blocks);
		return this;
	}

	/**
	 * Remove from inside blocks.
	 * @param index Index of the codeblock to remove.
	 */
	 pop(index?: number) {
		this._selfEditor.getTemplate().pop(index);
		return this;
	}

	/**
	 * Toggle the 'NOT' inversion.
	 * @returns True if's inverted, otherwise false.
	 */
	invert() {
		return this.isInverted = !this.isInverted;
	}

	/**
	 * Once the condition is met.
	 * @param callback Editor callback.
	 */
	then(callback: (editor: Ieditor) => void) {
		callback(this._selfEditor);
		return this;
	}

	else(callback: (editor: Ieditor) => void) {
		callback(this._selfEditor);
		return this;
	}

	/**
	 * Re-set this block's editor's custom actions to a specific
	 */
	_setEditorCustomActions(editorCustomActions?: ActDefs) {
		const t = this._selfEditor.getTemplate();
		const newEditor = editorCustomActions ? getEditor(t, {actDefs: editorCustomActions}) : getEditor.default(t);
		this._selfEditor = newEditor;
		return this;
	}

	toString(): string {
		return makeStringification.component(this, this.type, {
			action: this.action,
			target: this.target,
			inverted: !!this.isInverted,
			args: this.args.map(a => a.toString())
		});
	}

	export(): RawDFConditionalBlock<T> {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args as Value[])) },
			action: this.action,
			target: this.target,
			inverted: this.isInverted ? "NOT" : "",

			__sparkscriptInternalBlocks: this._selfEditor.getTemplate()._blocks.map(b => b.export()),
			__sparkscriptBracketPairType: "norm"
		}
	}
}
