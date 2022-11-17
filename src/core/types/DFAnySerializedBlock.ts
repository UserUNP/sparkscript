import { RawDFActionBlock } from "../components/ActionBlock";
import { RawDFBracketBlock } from "../components/BracketBlock";
import { RawDFConditionalBlock } from "../components/ConditionalBlock";
import { RawDFDataBlock } from "../components/DataBlock";
import { RawDFSubActionBlock } from "../components/SubActionBlock";

/**
 * Any raw DiamondFire block.
 */

type DFAnySerializedBlock =
	| RawDFActionBlock
	| RawDFDataBlock
	| RawDFSubActionBlock
	| RawDFConditionalBlock
	| RawDFBracketBlock
	;

export default DFAnySerializedBlock;

