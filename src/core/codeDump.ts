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

// ---------------------------------------------------------------------------------

import { DFBlockCodename, DFBlockName } from "./types";

export function getCodeblockByType<T extends DFBlockCodename>(type: T) {
	const codeblock = getDump().codeblocks[type];
	if(!codeblock) return null;
	return codeblock;
}

export function getCodeblockByName<T extends DFBlockName>(name: T) {
	return getDump().codeblocks[getDump().codeblockNames[name]];
}

export function getActionOwner<T extends keyof DFDumpScheme["actions"]>(action: T) {
	return (getDump().actions[action].codeblockType || null) as DFDumpScheme["actions"][T]["codeblockType"];
}

export function getCodeblockActions<T extends DFBlockCodename>(type: T): DFDumpScheme["codeblocks"][T]["actions"] {
	return getDump().codeblocks[type].actions;
}

export function getCodeblockType<T extends DFBlockName>(name: T) {
	return getDump().codeblockNames[name];
}
