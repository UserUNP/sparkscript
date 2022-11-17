import DFBlockCodename from "../types/DFBlockCodename";
import Value from "./Value";

export interface Ibl_tag
<T extends DFBlockCodename = DFBlockCodename> {
	block: T;
	action: string;
	tag: string;
	option: string;
}

export default class BLTag<T extends DFBlockCodename = DFBlockCodename> extends Value<"bl_tag", Ibl_tag<T>> {

	constructor(blkCodename: T, slotFromLastIndex: number = 0) {
		super("bl_tag", {
			block: blkCodename,
			action: "(unimplemented)",
			option: "(unimplemented)",
			tag: "(unimplemented)"
		}, 26-slotFromLastIndex);
	}
}
