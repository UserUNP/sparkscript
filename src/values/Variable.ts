import Value from "../core/components/Value";
import DFVarScope from "../core/DFVarScope";

const varScopeMap: {[key: string]: string} = {
	'local':'local',
	'unsaved':'unsaved',
	'game':'unsaved',
	'saved':'saved',
	'save':'saved'
}

export interface Ivar {
	name: string;
	scope: DFVarScope;
}

export default class Variable extends Value {
	/**
	 * Create a variable value.
	 * @param name Name of the variable.
	 */
	constructor(public name: Ivar["name"], public scope: Ivar["scope"]="game", slot?: number) {
		super("var", { name, scope: varScopeMap[scope] } as Ivar, slot);
	}
}
