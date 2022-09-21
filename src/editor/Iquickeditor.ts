import DFTarget			from	"../core/DFTarget";
import DFVarScopes		from	"../core/DFVarScopes";

import Template			from "../core/components/Template";
import Value 			from "../core/components/Value";
import Block			from "../core/components/Block";
import MinecraftString	from "../core/components/minecraft/MinecraftString";

import MinecraftItem	from "../values/MinecraftItem";
import Text			 	from '../values/Text';
import Number			from '../values/Number';
import Variable			from '../values/Variable';
import Location			from "../values/Location";
import Potion			from "../values/Potion";
import GameValue		from "../values/GameValue";
import Vector 			from "../values/Vector";

type DefineAction = {
	/**
	 * @param name Name of this action
	 * @param callback Callback for when this action is executed.
	 */
	(name: string, callback: (...args: any[])=>void): void;
	/**
	 * @param name Name of this action
	 * @param action Action to perform when this action is executed.
	 */
	(name: string, action: string): void;
}

type GetCodeblock = {
	/**
	 * Get codeblock by index in order.
	 * @param index Codeblock index, indexes start at 0.
	 */
	(index: number): Block;
	//TODO: get by name
}

export default interface editor {
	/**
	 * Overwrite the template with the provided template.
	 * @param template Template to use.
	 */
	_from: (template: Template) => void;

	/**
	 * Get the current template.
	 */
	getTemplate: () => Template;

	get: GetCodeblock;

	/**
	 * Define an action.
	 */
	defAction: DefineAction;
	/**
	 * Perform a *pre-defined* action.
	 * @param name Name of the action.
	 * @param args Arguments to pass to the action.
	 */
	action: { [name: string]: (...args: any[]) => void; };

	/**
	 * Create a Minecraft item value.
	 * @param count Amount of items.
	 * @param id Item ID name.
	 * @param name Item name.
	 */
	item: (id: `minecraft:${string}`, count: number, name: string | MinecraftString, slot?: number) => MinecraftItem;
	/**
	 * Alias for `item(...)`.
	 */
	mc: (id: `minecraft:${string}`, count: number, name: string | MinecraftString, slot?: number) => MinecraftItem;

	/**
	 * Create a new text value.
	 * @param text Text to make a value from.
	 * @param slot Slot to put the value in.
	 * @returns A new Text value.
	 */
	text: (text: string, slot?: number) => Text;
	txt: (txt: string, slot?: number) => Text;
	/**
	 * Create a new number value.
	 * @param number Number to make a value from.
	 * @param slot Slot to put the value in.
	 * @returns A new Number value.
	 */
	number: (number: number, slot?: number) => Number;
	num: (num: number, slot?: number) => Number;
	/**
	 * Create a new variable value.
	 * @param variable Name of the variable.
	 * @param scope Scope of the variable.
	 * @param slot Slot to put the value in.
	 * @returns A new Variable value.
	 */
	variable: (name: string, scope: DFVarScopes, slot?: number) => Variable;
	var: (name: string, scope: DFVarScopes, slot?: number) => Variable;
	/**
	 * Create a new location value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 * @param pitch Pitch, defaults to 0.
	 * @param yaw Yaw, defaults to 0.
	 */
	location: (x: number, y: number, z: number, pitch: number, yaw: number, slot?: number) => Location;
	loc: (x: number, y: number, z: number, pitch: number, yaw: number, slot?: number) => Location;
	/**
	 * Create a new potion value.
	 * @param potion The potion name.
	 * @param duration The duration of the potion.
	 * @param amplifier Strength of the potion.
 	 */
	potion: (potion: string, duration: number, amplifier: number, slot?: number) => Potion;
	pot: (pot: string, dur: number, amp: number, slot?: number) => Potion;
	/**
	 * Create a new vector value.
	 * @param x X coordinate.
	 * @param y Y coordinate.
	 * @param z Z coordinate.
	 */
	vector: (x: number, y: number, z: number, slot?: number) => Vector;
	vec: (x: number, y: number, z: number, slot?: number) => Vector;

	game: {
		/**
		 * Create a new game value.
		 * @param value The value.
		 * @param target The target of the value, "Default" is the default target.
		 */
		value: (value: string, target: DFTarget, slot?: number) => GameValue;
		val: (val: string, target: DFTarget, slot?: number) => GameValue;
		/**
		 * Do a game action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: (action: string, ...args: any[]) => void;
		act: (action: string, ...args: any[]) => void;
	}

	player: {
		/**
		 * Do a player action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: (action: string, ...args: Value[]) => void;
		/**
		 * Alias for action.
		 */
		act: (action: string, ...args: Value[]) => void;
		/**
		 * When a player does something.
		 * @param event Event to listen for.
		 */
		event: (event: string) => void;
		/**
		 * Alias for event.
		 */
		evt: (event: string) => void;
	};
	entity: {
		/**
		 * Do an entity action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: (action: string, ...args: Value[]) => void;
		/**
		 * Alias for action
		 */
		act: (action: string, ...args: Value[]) => void;
		/**
		 * When an entity does something.
		 * @param event Event to listen for.
		 */
		event: (event: string) => void;
		/**
		 * Alias for event.
		 */
		evt: (event: string) => void;
	};

	function: (name: string, ...args: Value[]) => void;
	func: (name: string, ...args: Value[]) => void;

	setvariable: (action: string, variable: Variable,...args: Value[]) => void;
	setvar: (action: string, variable: Variable,...args: Value[]) => void;

	select: (condition: string, ...args: Value[]) => void;
	sel: (condition: string, ...args: Value[]) => void;
}
