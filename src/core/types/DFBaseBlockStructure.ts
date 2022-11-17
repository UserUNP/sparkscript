import DFBlockIDType from "./DFBlockIDType";

/**
 * Basic barebones structure for a raw DiamondFire block.
 */
export default interface DFBaseBlockStructure
<T extends DFBlockIDType = DFBlockIDType> {
	id: T;
}
