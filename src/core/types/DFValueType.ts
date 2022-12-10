import Text from "../../values/Text";
import Number from "../../values/Number";
import Variable from "../../values/Variable";
import Location from "../../values/Location";
import Potion from "../../values/Potion";
import GameValue from "../../values/GameValue";
import MinecraftItem from "../../values/MinecraftItem";
import Vector from "../../values/Vector";

/**
 * Sparkscript value type.
 */
type DFValueType =
	| Text
	| Number
	| Location
	| Variable
	| Potion
	| GameValue
	| MinecraftItem
	| Vector
	;

export default DFValueType;
