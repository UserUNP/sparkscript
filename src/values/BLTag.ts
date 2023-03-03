import { OptionsInTag, getDefaultOption, getDefaultSlot } from "../common/blockTagUtils";
import { getDump } from "../core/codeDump";
import { Value } from "../core/components";
import { DFDumpScheme } from "../core/types";


export interface Ibl_tag
<Action extends keyof DFDumpScheme["actionsWithTags"] = keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number] = DFDumpScheme["actionsWithTags"][Action][number]> {
	block: DFDumpScheme["actions"][Action]["codeblockType"][number];
	action: Action;
	tag: Tag;
	option: OptionsInTag<Action, Tag>;
}

export default class BLTag
<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number] = DFDumpScheme["actionsWithTags"][Action][number]>
extends Value<"bl_tag", Ibl_tag<Action, Tag>> {

	defaultSlot = getDefaultSlot<Action, Tag>(this.tag);
	defaultOption = getDefaultOption<Action, Tag>(this.tag);

	constructor(public block: DFDumpScheme["actions"][Action]["codeblockType"][number], public action: Action, public tag: Tag, public option?: OptionsInTag<Action, Tag>, slot: number = getDump().actionTags[tag].slot) {
		super("bl_tag", {
			block, action,
			tag, option: option ??= getDump().actionTags[tag].defaultOption
		}, slot);
	}

	toString(): `#[${Tag}]: ${BLTag<Action, Tag>["option"]}` {
		return `#[${this.tag}]: ${this.option}`;
	}

	set(option: OptionsInTag<Action, Tag>) {
		this.data.set("option", option);
		return this;
	}

	/**
	 * Alias for `set`.
	 */
	setOption(option: OptionsInTag<Action, Tag>) {
		return this.set(option);
	}
}
