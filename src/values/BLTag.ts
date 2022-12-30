import { getDump } from "../core/codeDump";
import Value from "../core/components/Value";
import DFDumpScheme from "../core/types/DFDumpScheme";
import { OptionsInTag } from "../mapper";

// export interface BLTagOption<T extends DFBlockCodename> {
// 	block: T;
// 	action: DFBlockActions<T>;
// 	tag: ;
// 	option: string;
// }

export interface Ibl_tag
<Action extends keyof DFDumpScheme["actionsWithTags"] = keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number] = DFDumpScheme["actionsWithTags"][Action][number]> {
	block: DFDumpScheme["actions"][Action]["codeblockType"][number];
	action: Action;
	tag: Tag;
	option: OptionsInTag<Action, Tag>;
}

export default class BLTag
<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]>
extends Value<"bl_tag", Ibl_tag<Action, Tag>> {

	defaultSlot = getDump().actionTags[this.tag].slot;
	defaultOption = getDump().actionTags[this.tag].defaultOption;

	constructor(public block: DFDumpScheme["actions"][Action]["codeblockType"][number], public action: Action, public tag: Tag, public option?: OptionsInTag<Action, Tag>, slot: number = getDump().actionTags[tag].slot) {
		super("bl_tag", {
			block, action,
			tag, option: option || getDump().actionTags[tag].defaultOption
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
