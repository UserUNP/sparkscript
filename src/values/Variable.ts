import Value from "../core/components/Value";
import DFVarScope from "../core/types/DFVarScope";

const varScopeMap = {
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
	 * @param scope Variable scope.
	 */
	constructor(public name: Ivar["name"], public scope: Ivar["scope"]="unsaved", slot?: number) {
		super("var", { name, scope: varScopeMap[scope] } as Ivar, slot);
	}

	toString(): `%var(${typeof this.name})` {
		return `%var(${this.name})`;
	}
}
