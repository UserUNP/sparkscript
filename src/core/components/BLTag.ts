import DFBlockCodename from "../types/DFBlockCodename";
import Value from "./Value";

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

export interface BLTagBooleanOption
<T extends boolean = boolean>
extends BLTagOption {
	name: T extends true ? "True" : T extends false ? "False" : never;
	icon: {
		material: T extends true ? "LIME_DYE" : T extends false ? 'RED_DYE' : never;
	}
}

export interface Ibl_tag
<TagOptions extends BLTagOption[] = BLTagOption[]> {
	name: string;
	options: TagOptions;
	defaultOption: TagOptions[number]["name"];
	slot: number;

}

export default class BLTag
<T extends DFBlockCodename, TagOptions extends BLTagOption[] = BLTagOption[]>
extends Value<"bl_tag", Ibl_tag<TagOptions>> {

	constructor(public blkCodename: T, value: Ibl_tag<TagOptions>, slotFromLastIndex: number = 0) {
		super("bl_tag", value, 26-slotFromLastIndex);
	}
}
