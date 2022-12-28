import { makeStringifier } from "../../utilities";
import BLTag from "../../values/BLTag";
import DFBaseBlockStructure from "../types/DFBaseBlockStructure";
import DFBlockAction from "../types/DFBlockAction";
import DFBlockCodename from "../types/DFBlockCodename";
import DFDumpScheme from "../types/DFDumpScheme";
import DFTarget from "../types/DFTarget";
import DFValueType from "../types/DFValueType";
import SerializableComponent from "./SerializableComponent";
import Value, { RawDFValue } from "./Value";

export interface RawDFActionBlock
<T extends DFBlockCodename = DFBlockCodename, Action extends DFBlockAction<T> = DFBlockAction<T>>
extends DFBaseBlockStructure<"block"> {
	block: T;
	args: { items: RawDFValue[] };
	action: Action;
	target: DFTarget;
	inverted: "NOT" | "";
};

type TagArray<T extends DFBlockCodename, Action extends DFBlockAction<T>> = Action extends keyof DFDumpScheme["actionsWithTags"] ? BLTag<Action, DFDumpScheme["actionsWithTags"][Action][number]>[] : [];

/**
 * ### Action block.
 *
 * @template T Block codename.
 * @template Target Selection to target.
 */
export default abstract class ActionBlock
<T extends DFBlockCodename, Action extends DFBlockAction<T>, Target extends DFTarget = DFTarget>
extends SerializableComponent<RawDFActionBlock<T>> {

	/**
	 * The tags of the action on this action block.
	 * @deprecated
	 * @note i am unsure how tf to make an initializer for this..
	 */
	tags: TagArray<T, Action> = [] as TagArray<T, Action>;

	/**
	 * Create a new action codeblock.
	 * @param type Type of the codeblock.
	 * @param action The action to perform.
	 * @param args Arguments to pass.
	 * @param isInverted If the codeblock is inverted (mostly for conditional blocks).
	 * @param target The target for the action.
	 */
	constructor(
		public readonly type: T,
		public action: Action,
		public args: DFValueType[],
		public isInverted: boolean = false,
		public target: Target = "Default" as Target
	) {
		super("action block");
	}

	toString(): string {
		return makeStringifier.component(this, this.type, {
			action: this.action,
			target: this.target,
			inverted: !!this.isInverted,
			args: this.args.map(a => a.toString()),
			tags: this.tags.map(t => t.toString())
		});
	}

	export(): RawDFActionBlock<T> {
		return {
			id: "block",
			block: this.type,
			args: { items: this.args.map(arg => arg.export(this.args as Value[])) },
			action: this.action,
			target: this.target,
			inverted: this.isInverted ? "NOT": ""
		}
	}

	/**
	 * Invert into a 'NOT' action (mostly for conditional blocks).
	 * @returns True if inverted, otherwise false.
	 */
	invert() {
		return this.isInverted = !this.isInverted;
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
