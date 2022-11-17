import { makeStringification } from "../../utilities";
import Value from "./Value";

export type Signature<ComponentName extends string = "serializable"> = `<@>{ [${ComponentName}] }`;

/**
 * ### Exportable & Serializable object.
 *
 * @template T Serialized object type.
 * @template ComponentName Name of the component.
 */
export default abstract class SerializableComponent<T extends object, ComponentName extends string = "serializable"> {

	/**
	 * @param _componentName The component's name
	 */
	constructor(public readonly _componentName: ComponentName = "serializable" as ComponentName) {}

	toString(): string {
		return makeStringification.serializable(`{ [${this._componentName}] }`);
	}

	/**
	 * Serialize the object into a readable DiamondFire format.
	 * @returns DiamondFire JSON-ified codeblock.
	 */
	abstract export(selfValues?: Value[]): T;
}
