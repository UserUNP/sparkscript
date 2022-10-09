import DFDumpScheme from "./types/DFDumpScheme";

let dump: DFDumpScheme | null = null;

export function validateDump<T extends DFDumpScheme>(test: unknown | T): asserts test is T  {
	if(!test || typeof test !== "object") throw new Error("I made your code fail. Screw you in particular; get good.");
	if(!("codeblocks" in test)) throw new Error("Invalid action dump. a 'codeblocks' property with accurate fields are required. For more info read the documentation.");
	if(!("actions" in test)) throw new Error("Invalid action dump. an 'actions' property with accurate fields are required. For more info read the documentation.");
}

export function getDump() {
	if(!dump) throw new Error("Action dump not initialized yet! You have to specify an action dump json object. For more info read the documentation.");
	return dump;
};

export function loadDump(maybeDump: DFDumpScheme) {
	validateDump(maybeDump);
	dump = maybeDump
};

export default {
	validateDump,
	loadDump,
	getDump,
}
