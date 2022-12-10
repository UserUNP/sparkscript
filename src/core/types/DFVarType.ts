/**
 * All types that a variable can be.
 */
enum DFVarType {
	NEVER = "<never>", //* Use if you don't want the var to be set.
	ANY = "<any>",
	TXT = "<txt>",
	NUM = "<num>",
	VAR = "<var>",
	ITEM = "<item>",
	LIST = "<list>",
	POT = "<potion>",
	SND = "<sound>",
	PART = "<particle>",
	DICT = "<dict>",
	COLOR = "<color>"
}

export default DFVarType;
