import { Ig_val } from "../../values/GameValue";
import { Iloc } from "../../values/Location";
import { Iitem } from "../../values/MinecraftItem";
import { Inum } from "../../values/Number";
import { Ipot } from "../../values/Potion";
import { Isnd } from "../../values/Sound";
import { Itxt } from "../../values/Text";
import { Ivar } from "../../values/Variable";
import { Ivec } from "../../values/Vector";
import { Ibl_tag } from "../components/BLTag";

/**
 * Type of a value's data.
 */
type DFValueDataType =
	| Ibl_tag
	| Itxt
	| Inum
	| Iloc
	| Iloc
	| Ivar
	| Ipot
	| Ig_val
	| Iitem
	| Ivec
	| Isnd
	;

export default DFValueDataType;
