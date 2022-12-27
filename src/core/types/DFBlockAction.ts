import DFBlockCodename from "./DFBlockCodename";
import DFDumpScheme from "./DFDumpScheme";

/**
 * DiamondFire codeblock action name.
 */
type DFBlockAction<T extends DFBlockCodename = DFBlockCodename> = DFDumpScheme["actions"][DFDumpScheme["codeblocks"][T]["actions"][number]]["name"];

export default DFBlockAction;
