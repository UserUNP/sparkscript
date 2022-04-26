"use strict";

import Value from "../components/Value";

const varscopes: {[key: string]: string} = {
	'local':'local',
	'unsaved':'unsaved',
	'game':'unsaved',
	'saved':'saved',
	'save':'saved'
}

export default class Variable extends Value {
	/**
	 * Create a variable value.
	 * @param name Name of the variable.
	 */
	constructor(public name: string, public scope: "local" | "game" | "save"="game", slot?: number) {
		super("var", { name, scope: varscopes[scope] }, slot);
		
	}
}