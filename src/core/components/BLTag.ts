import DFBlockCodename from "../types/DFBlockCodename";
import Value from "./Value";

export interface Ibl_tag<T extends DFBlockCodename> {
	block: T;
	action: string;
	tag: string;
	option: string;
}

export default class BLTag<T extends DFBlockCodename = DFBlockCodename> extends Value<"bl_tag", Ibl_tag<T>> {

	constructor(slotFromLastIndex: number = 0) {
		super("bl_tag", {}, 26-slotFromLastIndex);
	}
}
