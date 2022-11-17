import { RawDFActionBlock } from "../components/ActionBlock";
import { RawDFConditionalBlock } from "../components/ConditionalBlock";
import { RawDFDataBlock } from "../components/DataBlock";
import { RawDFSubActionBlock } from "../components/SubActionBlock";

/**
 * Any raw DiamondFire codeblock.
 */

type DFCodeSerializedBlock =
	| RawDFActionBlock
	| RawDFDataBlock
	| RawDFSubActionBlock
	| RawDFConditionalBlock
	;

export default DFCodeSerializedBlock;
