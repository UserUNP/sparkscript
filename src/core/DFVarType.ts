/**
 * All types that a variable can be.
 */
enum DFVarType {
	NEVER, //* use if you already know a var can't be set to anything, just like typescript's never type
	ANY,
	TXT,
	NUM,
	VAR,
	ITEM,
	LIST,
	POT,
	SND,
	DICT,
}

export default DFVarType;
