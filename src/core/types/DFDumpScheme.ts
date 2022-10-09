import DFBlockCodename from "./DFBlockCodename";
import DFBlockName from "./DFBlockName";

export default interface DumpScheme {
	codeblocks:  { name: DFBlockName; identifier: DFBlockCodename }[];
	actions: { name: string; codeblockName: DFBlockName }[];
}
