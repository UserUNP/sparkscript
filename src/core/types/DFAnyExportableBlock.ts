import ActionBlock from "../components/ActionBlock";
import BracketBlock from "../components/BracketBlock";
import ConditionalBlock from "../components/ConditionalBlock";
import DataBlock from "../components/DataBlock";
import SubActionBlock from "../components/SubActionBlock";
import DFBlockCodename from "./DFBlockCodename";

/**
 * Any block.
 */
type DFAnyExportableBlock =
	| ActionBlock<DFBlockCodename>
	| DataBlock<DFBlockCodename>
	| SubActionBlock<DFBlockCodename>
	| ConditionalBlock<DFBlockCodename>
	| BracketBlock
	;

export default DFAnyExportableBlock;
