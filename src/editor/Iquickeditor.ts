import DFTarget			from "../core/types/DFTarget";
import DFSafeVarScope	from "../core/types/DFSafeVarScope";
import DFValueType		from "../core/types/DFValueType";

import Template			from "../core/components/Template";
import MinecraftString	from "../core/components/minecraft/MinecraftString";

import MinecraftItem	from "../values/MinecraftItem";
import Text			 	from '../values/Text';
import Number			from '../values/Number';
import Variable			from '../values/Variable';
import Location			from "../values/Location";
import Potion			from "../values/Potion";
import GameValue		from "../values/GameValue";
import Vector 			from "../values/Vector";

import { PlayerAction, PlayerCondition, PlayerEvent }	from "../codeblocks/Player";
import { GameAction, GameCondition }					from "../codeblocks/Game";
import { EntityAction, EntityCondition, EntityEvent }					from "../codeblocks/Entity";
import SetVariable										from "../codeblocks/SetVariable";
import VariableCondition								from "../codeblocks/VariableCondition";
import SelectObject										from "../codeblocks/SelectObject";
import Control											from "../codeblocks/Control";
import Func												from "../codeblocks/Func";
import CallFunction										from "../codeblocks/CallFunction";
import Process											from "../codeblocks/Process";
import StartProcess										from "../codeblocks/StartProcess";

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

type GetCodeblock<T extends Template> = {
	/**
	 * Get codeblock by index in order.
	 * @param index Codeblock index, indexes start at 0.
	 */
	<K extends number>(index: K): T["blocks"][K];
	//TODO: get by name
}

export default interface editor<T extends Template = Template> {
	/**
	 * Overwrite the template with the provided template.
	 * @param template Template to use.
	 */
	_from: (template: Template) => void;

	/**
	 * Get the current template.
	 */
	getTemplate: () => Template;

	get: GetCodeblock<T>;

	/**
	 * Define an action.
	 */
	defAction: DefineAction;
	/**
	 * Perform a *pre-defined* action.
	 * @param name Name of the action.
	 * @param args Arguments to pass to the action.
	 */
	action: Record<string, ((...args: any[])=>void)>;

	/**
	 * Create a Minecraft item value.
	 * @param count Amount of items.
	 * @param id Item ID name.
	 * @param name Item name.
	 */
	item: <T extends string, ID extends `minecraft:${string}`>(id: ID, name: T | MinecraftString<T>, count: number, slot?: number) => MinecraftItem<T, ID>;
	/**
	 * Alias for `item(...)`.
	 */
	mc: <T extends string, ID extends `minecraft:${string}`>(id: ID, name: T | MinecraftString<T>, count: number, slot?: number) => MinecraftItem<T, ID>;

	/**
	 * Create a new text value.
	 * @param text Text to make a value from.
	 * @param slot Slot to put the value in.
	 * @returns A new Text value.
	 */
	text: (text: string, slot?: number) => Text;
	txt: (text: string, slot?: number) => Text;
	/**
	 * Create a new number value.
	 * @param number Number to make a value from.
	 * @param slot Slot to put the value in.
	 * @returns A new Number value.
	 */
	number: (number: number, slot?: number) => Number;
	num: (number: number, slot?: number) => Number;
	/**
	 * Create a new variable value.
	 * @param variable Name of the variable.
	 * @param scope Scope of the variable.
	 * @param slot Slot to put the value in.
	 * @returns A new Variable value.
	 */
	variable: (name: string, scope: DFSafeVarScope, slot?: number) => Variable;
	var: (name: string, scope: DFSafeVarScope, slot?: number) => Variable;
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
	pot: (potion: string, duration: number, amplifier: number, slot?: number) => Potion;
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
		value: <T extends string>(value: T, target?: DFTarget, slot?: number) => GameValue;
		val: <T extends string>(value: T, target?: DFTarget, slot?: number) => GameValue;
		/**
		 * Used to do something related to the plot and everyone playing it.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: <T extends string>(action: T, ...args: DFValueType[]) => GameAction<T>;
		/**
		 * Alias for `action`.
		 */
		act: <T extends string>(action: T, ...args: DFValueType[]) => GameAction<T>;
		/**
		 *
		 */
		condition: <T extends string>(action: T, ...args: DFValueType[]) => GameCondition<T>;
		/**
		 * Alias for `condition`.
		 */
		if: <T extends string>(action: T, ...args: DFValueType[]) => GameCondition<T>;
	}

	/**
	 * Resolves to `num(1)` equivelent.
	 */
	true: Number
	/**
	 * Resolves to `num(0)` equivelent.
	 */
	false: Number

	player: {
		/**
		 * Do a player action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: <T extends string, Target extends DFTarget = DFTarget>(action: T, target?: Target, ...args: DFValueType[]) => PlayerAction<T, Target>;
		/**
		 * Alias for `action`.
		 */
		act:  <T extends string, Target extends DFTarget = DFTarget>(action: T, target?: Target, ...args: DFValueType[]) => PlayerAction<T, Target>;
		/**
		 * When a player does something.
		 * @param event Event to listen for.
		 */
		event: <T extends string>(event: T) => PlayerEvent<T>;
		/**
		 * Alias for `event`.
		 */
		evt: <T extends string>(event: T) => PlayerEvent<T>;
		/**
		 * If a player did something.
		 * @param condition Action of condition.
		 * @param target Target of the condition.
		 * @param isInverted If the condition should NOT match the action.
		 * @param args Arguments to pass.
		 */
		condition: <T extends string, Target extends DFTarget = DFTarget>(condition: T, target?: Target, ...args: DFValueType[]) => PlayerCondition<T, Target>;
		/**
		 * Alias for `condition`.
		 */
		if: <T extends string, Target extends DFTarget = DFTarget>(condition: T, target?: Target, ...args: DFValueType[]) => PlayerCondition<T, Target>;
	};
	entity: {
		/**
		 * Do an entity action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: <T extends string, Target extends DFTarget = DFTarget>(action: T, target?: Target, ...args: DFValueType[]) => EntityAction<T, Target>;
		/**
		 * Alias for `action`.
		 */
		act: <T extends string, Target extends DFTarget = DFTarget>(action: T, target?: Target, ...args: DFValueType[]) => EntityAction<T, Target>;
		/**
		 * When an entity does something.
		 * @param event Event to listen for.
		 */
		event: <T extends string>(event: T) => EntityEvent<T>;
		/**
		 * Alias for `event`.
		 */
		evt: <T extends string>(event: T) => EntityEvent<T>;
		/**
		 * If an entity did something.
		 * @param condition Action of condition.
		 * @param target Target of the condition.
		 * @param isInverted If the condition should NOT match the action.
		 * @param args Arguments to pass.
		 */
		 condition: <T extends string, Target extends DFTarget = DFTarget>(condition: T, target?: Target, ...args: DFValueType[]) => EntityCondition<T, Target>;
		 /**
		  * Alias for `condition`.
		  */
		 if: <T extends string, Target extends DFTarget = DFTarget>(condition: T, target?: Target, ...args: DFValueType[]) => EntityCondition<T, Target>;
	};

	/**
	 * Place a function.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	function: <T extends string>(name: T, ...args: DFValueType[]) => Func<T>;
	/**
	 * Alias for `function`.
	 */
	func: <T extends string>(name: T, ...args: DFValueType[]) => Func<T>;

	/**
	 * Call a specific function.
	 * @param name Function name to call.
	 */
	callFunction: <T extends string>(name: T) => CallFunction<T>;
	/**
	 * Alias for `callFunction`.
	 */
	callFunc: <T extends string>(name: T) => CallFunction<T>;

	/**
	 * Place a process.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	process: <T extends string>(name: T, ...args: DFValueType[]) => Process<T>;
	/**
	 * Alias for `process`.
	 */
	proc: <T extends string>(name: T, ...args: DFValueType[]) => Process<T>;

	/**
	 * Start a process thread.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	startProcess: <T extends string>(name: T, ...args: DFValueType[]) => StartProcess<T>;
	/**
	 * Alias for `startProcess`.
	 */
	startProc: <T extends string>(name: T, ...args: DFValueType[]) => StartProcess<T>;

	/**
	 * Set a variable using a specific action.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	setVariable: <T extends string>(action: T, variable: Variable,...args: DFValueType[]) => SetVariable<T>;
	/**
	 * Alias for `setVariable`.
	 */
	setVar: <T extends string>(action: T, variable: Variable,...args: DFValueType[]) => SetVariable<T>;

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param isInverted If the condition should NOT match the variable.
	 * @param args Arguments to pass.
	 */
	ifVariable: <T extends string>(condition: T, ...args: DFValueType[]) => VariableCondition<T>;
	/**
	 * Alias for `ifVariable`.
	 */
	ifVar: <T extends string>(condition: T, ...args: DFValueType[]) => VariableCondition<T>;

	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	select: <T extends string>(condition: T, ...args: DFValueType[]) => SelectObject<T>;
	/**
	 * Alias for `select`.
	 */
	sel: <T extends string>(cond: T, ...args: DFValueType[]) => SelectObject<T>;

	/**
	 * Control yr'ou game.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	control: <T extends string>(action: T, ...args: DFValueType[]) => Control<T>;
	/**
	 * Alias for `control`.
	 */
	ctrl: <T extends string>(act: T, ...args: DFValueType[]) => Control<T>;
}
