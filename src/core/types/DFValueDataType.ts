import {
	Ibl_tag,
	Ig_val,
	Iloc,
	Iitem,
	Inum,
	Ipot,
	Isnd,
	Itxt,
	Ivar,
	Ivec,
} from "../../values";

/**
 * Type of a value's data.
 */
type DFValueDataType =
	| Ibl_tag
	| Itxt
	| Inum
	| Iloc
	| Ivar
	| Ipot
	| Ig_val
	| Iitem
	| Ivec
	| Isnd
	;

export default DFValueDataType;
