/**
 * DiamondFire variable scope.  
 * "local" - Local variable.  
 * "Unsaved" - Game variable.  
 * "Save" - Saved variable.  
 */
type DFVarScope = 
	| "local"
	| "unsaved"
	| "save"
	;

export default DFVarScope;