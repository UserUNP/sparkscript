import { DFValueType } from "../types";
import { makeStringifier } from "../../common/utilities";

export type Signature<ComponentName extends string = "serializable"> = `<@>{ [${ComponentName}] }`;

/**
 * ### Exportable & Serializable object.
 *
 * @template T Serialized object type.
 * @template ComponentName Name of the component.
 */
export default abstract class SerializableComponent<T extends object> {

	/**
	 * @param _componentName The component's name
	 */
	constructor(public readonly _componentName: string = "serializable") {}

	toString(): string {
		return makeStringifier.serializable(`{ [${this._componentName}] }`);
	}

	/**
	 * Serialize the object into a readable DiamondFire format.
	 * @returns DiamondFire codeblock object.
	 */
	abstract export(selfValues?: DFValueType[]): T;
}
