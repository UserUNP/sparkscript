import { DFAnySerializedBlock, DFCodeExportableBlock } from "../core/types";
import { ConditionalBlock } from "../core/components";

export default function(block: DFCodeExportableBlock) {
	const result: DFAnySerializedBlock[] = [];
	if (block instanceof ConditionalBlock) result.push(...ConditionalBlock.conditionalBlockHandler(block.export()));
	else result.push(block.export());
	return result;
}
