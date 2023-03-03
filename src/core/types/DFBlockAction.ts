import DFBlockCodename from "./DFBlockCodename";
import DFDumpScheme from "./DFDumpScheme";
import DFDynamicBlockCodename from "./DFDynamicBlockCodename";

/**
 * DiamondFire codeblock action name.
 */
type DFBlockAction<T extends DFBlockCodename = DFBlockCodename> = T extends DFDynamicBlockCodename ? string : DFDumpScheme["actions"][DFDumpScheme["codeblocks"][T]["actions"][number]]["name"];

export default DFBlockAction;
