/**
 * DiamondFire variable scope.
 * "local" - Local variable.
 * "Unsaved" - Game variable.
 * "Save" - Saved variable.
 */
type DFVarScope =
	| "unsaved"
	| "local"
	| "saved"
	;

export default DFVarScope;
