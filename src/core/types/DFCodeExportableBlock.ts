import ActionBlock from "../components/ActionBlock";
import ConditionalBlock from "../components/ConditionalBlock";
import DataBlock from "../components/DataBlock";
import SubActionBlock from "../components/SubActionBlock";

/**
 * Any codeblock.
 */
type DFCodeExportableBlock =
	| ActionBlock<any>
	| DataBlock<any>
	| SubActionBlock<any>
	| ConditionalBlock<any>
	;

export default DFCodeExportableBlock;
