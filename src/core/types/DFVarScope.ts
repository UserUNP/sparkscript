/**
 * DiamondFire variable scope.
 * - "local" - Local variable.
 * - "unsaved" - Game variable.
 * - "save" - Saved variable.
 */
type DFVarScope =
	| "unsaved"
	| "local"
	| "saved"
	;

export default DFVarScope;
