import { DFSafeVarScope, DFVarScope } from "../core/types";

import { Value } from "../core/components";

export interface Ivar {
	name: string;
	scope: DFVarScope;
}

export const varScopeMap = {
	"local": "local",
	"game": "unsaved",
	"save": "saved",
	"unsaved": "unsaved",
	"saved": "saved",
} as const;

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
