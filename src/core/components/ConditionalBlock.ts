import { BLTagArray, getActionTags } from "../../common/blockTagUtils";
import { makeStringifier } from "../../common/utilities";

import {
	DFCodeExportableBlock,
	DFAnySerializedBlock,
	DFBracketBlockType,
	DFBlockCodename,
	DFBlockAction,
	DFValueType,
	DFTarget
} from "../types";

import SerializableComponent from "./SerializableComponent";
import { RawDFActionBlock } from "./ActionBlock";
import BracketBlock from "./BracketBlock";
import Template from "./Template";
import Value from "./Value";

export interface RawDFConditionalBlock
	<T extends DFBlockCodename = DFBlockCodename>
	extends RawDFActionBlock<T> {
	__sparkscriptInternalBlocks?: DFAnySerializedBlock[];
	__sparkscriptBracketPairType?: DFBracketBlockType;
}

/**
 * ### Conditional block.
 *
 * @template T Block codename.
 * @template Target Selection to target.
 */
export default abstract class ConditionalBlock
	<T extends DFBlockCodename, Action extends DFBlockAction<T>, Target extends DFTarget = DFTarget>
	extends SerializableComponent<RawDFConditionalBlock<T>> {

	static conditionalBlockHandler(raw: RawDFConditionalBlock) {
		if (!raw.__sparkscriptBracketPairType || !raw.__sparkscriptInternalBlocks) throw new Error(`silly :P :^) !! :bangbang:`);
		const opening = new BracketBlock("open", raw.__sparkscriptBracketPairType).export();
		const closing = new BracketBlock("close", raw.__sparkscriptBracketPairType).export();
		const content = raw.__sparkscriptInternalBlocks;
		delete raw.__sparkscriptInternalBlocks;
		delete raw.__sparkscriptBracketPairType;
		return [raw, opening, ...content, closing] as const;
	}

	/**
	 * Reference property to the opening bracket of this conditional block.
	 */
	openingBracket: BracketBlock<"norm", "open"> = new BracketBlock("open", "norm");
	/**
	 * Reference property to the closing bracket of this conditional block.
	 */
	closingBracket: BracketBlock<"norm", "close"> = new BracketBlock("close", "norm");
	/**
	 * Inside template.
	 */
	private _internalTemplate: Template = new Template("conditional block");

	/**
	 * The tags of the action on this conditional block.
	 * @remark Will be an empty array if the action has no tags.
	 */
	readonly tags: BLTagArray<T, Action> = getActionTags(this.type, this.action);

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
		public action: Action,
		public args: DFValueType[],
		public isInverted: boolean = false,
		public target: Target = "Default" as Target
	) {
		super("conditional block");
	}

	/**
	 * Add to inside blocks.
	 * @param blocks Codeblock(s) to add to the template.
	 */
	push(...blocks: DFCodeExportableBlock[]) {
		this._internalTemplate.push(...blocks);
		return this;
	}

	/**
	 * Remove from inside blocks.
	 * @param index Index of the codeblock to remove.
	 */
	pop(index?: number) {
		this._internalTemplate.pop(index);
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
	 * Stringify the component into JSON pseudo-code.
	 * @returns String representation
	 */
	toString(): string {
		return makeStringifier.component(this._componentName, this.type, {
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

			__sparkscriptInternalBlocks: this._internalTemplate._blocks.map(b => b.export()),
			__sparkscriptBracketPairType: "norm"
		}
	}

	setAction(action: Action) {
		this.action = action;
		return this;
	}

	setArgs(...args: DFValueType[]) {
		this.args = args;
		return this;
	}

	setTarget(target: Target) {
		this.target = target;
		return this;
	}

	setInverted(isInverted: boolean) {
		this.isInverted = isInverted;
		return this;
	}
}
