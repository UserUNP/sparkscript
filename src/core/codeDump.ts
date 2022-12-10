import DFDumpScheme from "./types/DFDumpScheme";
import actiondump from "./ssActiondump"; // "sparkscript actiondump".

let laodedDump: DFDumpScheme | null = null;

export function validateDump<T extends DFDumpScheme>(test: unknown | T): asserts test is T  {
	if(!test || typeof test !== "object") throw new Error(`Expected a type of object, got ${typeof test} instead. Make sure you're passing the actiondump object and not the file path.`);
	if(!("codeblocks" in test)) throw new Error("Invalid action dump. A 'codeblocks' property with accurate fields are required. For more info read the documentation.");
	if(!test.codeblocks || typeof test.codeblocks !== "object" || Array.isArray(test.codeblocks)) throw new Error(`Invalid action dump. "codeblocks" is either not an object or an array. For more info read the documentation.`)
}

/**
 * Get the currently loaded actiondump.
 * @returns The actiondump.
 */
export function getDump(): DFDumpScheme {
	if(!laodedDump) return actiondump;
	return laodedDump;
};

/**
 * Load the actiondump.
 * @param maybeDump The actiondump object.
 */
export function loadDump(maybeDump: unknown) {
	validateDump(maybeDump);
	laodedDump = maybeDump
};

export default {
	loadDump,
	getDump,
};
