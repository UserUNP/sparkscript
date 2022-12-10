import Value from "../core/components/Value";

export interface BLTagOption {
	name: string;
	icon: {
		material: string;
		name?: string;
		deprecatedNote?: string[]
		description?: string[];
		additionalInfo?: string[];
		advanced?: boolean;
	},
	aliases?: string[]
}

export type BLTagTrueOption = BLTagBooleanOption<true>;
export type BLTagFalseOption = BLTagBooleanOption<false>;
export interface BLTagBooleanOption
<T extends boolean = boolean>
extends BLTagOption {
	name: T extends true ? "True" : T extends false ? "False" : never;
	icon: {
		material: T extends true ? "LIME_DYE" : T extends false ? 'RED_DYE' : never;
	}
}

export interface Ibl_tag
<TagName extends string = string, TagOptions extends BLTagOption[] = BLTagOption[]> {
	name: TagName;
	options: TagOptions;
	defaultOption: TagOptions[number]["name"];
	slot: number;
}

export default class BLTag
<TagName extends string = string, TagOptions extends BLTagOption[] = BLTagOption[]>
extends Value<"bl_tag", Ibl_tag<TagName, TagOptions>> {

	constructor(value: Ibl_tag<TagName, TagOptions>, slotFromLastIndex: number = 0) {
		super("bl_tag", value, 26-slotFromLastIndex);
	}
}
