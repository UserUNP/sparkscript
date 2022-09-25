enum DFVarType {
	NEVER, //* use if you already know a var can't be set to anything
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
//? the types that a variable can be, not the type of values.

export default DFVarType;
