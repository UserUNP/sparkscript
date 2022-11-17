import DFBlockCodename from "./DFBlockCodename";
import DFBlockName from "./DFBlockName";

/**
 * The layout of DiamondFire's actiondump file.
 */
export default interface DFDumpScheme {
	codeblocks:  { name: DFBlockName; identifier: DFBlockCodename }[];
	actions: { name: string; codeblockName: DFBlockName }[];
}
