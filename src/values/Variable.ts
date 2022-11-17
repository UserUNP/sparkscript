import Value from "../core/components/Value";
import DFSafeVarScope from "../core/types/DFSafeVarScope";
import DFVarScope from "../core/types/DFVarScope";
import { varScopeMap } from "../mapper";

export interface Ivar {
	name: string;
	scope: DFVarScope;
}

export default class Variable
extends Value<"var", Ivar> {
	/**
	 * Create a variable value.
	 * @param name Name of the variable.
	 * @param scope Variable scope.
	 */
	constructor(
		public name: string,
		public scope: DFSafeVarScope = "game",
		slot?: number
	) {
		super("var", { name, scope: varScopeMap[scope] }, slot);
	}

	toString(): `%var(${string})` {
		return `%var(${this.name})`;
	}
}
