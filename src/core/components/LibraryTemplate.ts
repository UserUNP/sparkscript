import DFVarType from "../types/DFVarType";
import Template from "./Template";
import getEditor from "../../editor/quickeditor";

export type ArgVarName = `${string}.${string}`
export interface IlibArgument {
	name: ArgVarName;
	description: string;
	type: DFVarType;
}

export default class LibraryTemplate extends Template {

	/**
	 * Internal editor.
	 */
	_selfArgs = getEditor.default(new Template(false));
	_args: IlibArgument[] = [];

	/**
	 * Create a template for a library.
	 * @param name A name is required.
	 */
	constructor(name: string) {
		super(name)
		this.self.func(name)
	}

	/**
	 * Add a function argument to the template.
	 * @param arg Argument object to add.
	 */
	addArg(arg: IlibArgument) {
		this._args.push(arg)
		this._selfArgs.setvar("GetListValue", this._selfArgs.var(`${this.name}.${arg.name}`, "local"))
		return this;
	}

	/**
	 * Return as a template.
	 */
	get template() {
		return this as Template;
	}

	/**
	 * Function arguments.
	 */
	get args() {
		return [...this._args];
	}
	
}
