import {
	BLTag,
	GameValue,
	Location,
	MinecraftItem,
	Number,
	Potion,
	Sound,
	Text,
	Variable,
	Vector,
} from "../../values";
import { Value } from "../components";

/**
 * Sparkscript value type.
 */
type DFValueType =
	| Value<any, any>
	| BLTag<any, any>
	| Text
	| Number
	| Location
	| Variable
	| Potion
	| Sound
	| GameValue
	| MinecraftItem
	| Vector
	;

export default DFValueType;
