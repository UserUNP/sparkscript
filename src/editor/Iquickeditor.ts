import DFDumpScheme		from "../core/types/DFDumpScheme";
import DFTarget			from "../core/types/DFTarget";
import DFSafeVarScope	from "../core/types/DFSafeVarScope";
import DFValueType		from "../core/types/DFValueType";

import MCPotion			from "../core/types/MCPotion";
import MCSound			from "../core/types/MCSound";

import Template			from "../core/components/Template";
import MinecraftString	from "../core/components/minecraft/MinecraftString";

import MinecraftItem	from "../values/MinecraftItem";
import Text			 	from '../values/Text';
import Number			from '../values/Number';
import Variable			from '../values/Variable';
import Location			from "../values/Location";
import Potion			from "../values/Potion";
import Sound			from "../values/Sound";
import GameValue		from "../values/GameValue";
import Vector 			from "../values/Vector";

import { PlayerAction, PlayerCondition, PlayerEvent }	from "../codeblocks/Player";
import { EntityAction, EntityCondition, EntityEvent }	from "../codeblocks/Entity";
import { GameAction, GameCondition }					from "../codeblocks/Game";
import SetVariable										from "../codeblocks/SetVariable";
import VariableCondition								from "../codeblocks/VariableCondition";
import SelectObject										from "../codeblocks/SelectObject";
import Control											from "../codeblocks/Control";
import Func												from "../codeblocks/Func";
import CallFunction										from "../codeblocks/CallFunction";
import Process											from "../codeblocks/Process";
import StartProcess										from "../codeblocks/StartProcess";

import { ActionNamesInBlock } from "../mapper";

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
	(name: string, action: keyof DFDumpScheme["actions"]): void;
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
	potion: (potion: MCPotion, duration: number, amplifier: number, slot?: number) => Potion;
	pot: (potion: MCPotion, duration: number, amplifier: number, slot?: number) => Potion;
	/**
	 * Create a new sound value.
	 * @param potion The potion name.
	 * @param volume The volume of the sound.
	 * @param pitch The pitch of the sound.
	 */
	sound: (sound: MCSound, volume: number, pitch: number, slot?: number) => Sound;
	snd: (sound: MCSound, volume: number, pitch: number, slot?: number) => Sound;
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
		action: (action: ActionNamesInBlock<"game_action">, ...args: DFValueType[]) => GameAction;
		/**
		 * Alias for `action`.
		 */
		act: (action: ActionNamesInBlock<"game_action">, ...args: DFValueType[]) => GameAction;
		/**
		 *
		 */
		condition: (action: ActionNamesInBlock<"if_game">, ...args: DFValueType[]) => GameCondition;
		/**
		 * Alias for `condition`.
		 */
		if: (action: ActionNamesInBlock<"if_game">, ...args: DFValueType[]) => GameCondition;
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
		action: (action: ActionNamesInBlock<"player_action">, ...args: DFValueType[]) => PlayerAction;
		/**
		 * Alias for `action`.
		 */
		act: (action: ActionNamesInBlock<"player_action">, ...args: DFValueType[]) => PlayerAction;
		/**
		 * When a player does something.
		 * @param event Event to listen for.
		 */
		event: (event: ActionNamesInBlock<"event">) => PlayerEvent;
		/**
		 * Alias for `event`.
		 */
		evt: (event: ActionNamesInBlock<"event">) => PlayerEvent;
		/**
		 * If a player did something.
		 * @param condition Action of condition.
		 * @param target Target of the condition.
		 * @param isInverted If the condition should NOT match the action.
		 * @param args Arguments to pass.
		 */
		condition: (condition: ActionNamesInBlock<"if_player">, ...args: DFValueType[]) => PlayerCondition;
		/**
		 * Alias for `condition`.
		 */
		if: (condition: ActionNamesInBlock<"if_player">, ...args: DFValueType[]) => PlayerCondition;
	};
	entity: {
		/**
		 * Do an entity action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: (action: ActionNamesInBlock<"entity_action">, ...args: DFValueType[]) => EntityAction;
		/**
		 * Alias for `action`.
		 */
		act: (action: ActionNamesInBlock<"entity_action">, ...args: DFValueType[]) => EntityAction;
		/**
		 * When an entity does something.
		 * @param event Event to listen for.
		 */
		event: (event: ActionNamesInBlock<"entity_event">) => EntityEvent;
		/**
		 * Alias for `event`.
		 */
		evt: (event: ActionNamesInBlock<"entity_event">) => EntityEvent;
		/**
		 * If an entity did something.
		 * @param condition Action of condition.
		 * @param target Target of the condition.
		 * @param isInverted If the condition should NOT match the action.
		 * @param args Arguments to pass.
		 */
		 condition: (condition: ActionNamesInBlock<"if_entity">, ...args: DFValueType[]) => EntityCondition;
		 /**
		  * Alias for `condition`.
		  */
		 if: (condition: ActionNamesInBlock<"if_entity">, ...args: DFValueType[]) => EntityCondition;
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
	setVariable: (action: ActionNamesInBlock<"set_var">, variable: Variable,...args: DFValueType[]) => SetVariable;
	/**
	 * Alias for `setVariable`.
	 */
	setVar: (action: ActionNamesInBlock<"set_var">, variable: Variable,...args: DFValueType[]) => SetVariable;

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param isInverted If the condition should NOT match the variable.
	 * @param args Arguments to pass.
	 */
	ifVariable: (condition: ActionNamesInBlock<"if_var">, ...args: DFValueType[]) => VariableCondition;
	/**
	 * Alias for `ifVariable`.
	 */
	ifVar: (condition: ActionNamesInBlock<"if_var">, ...args: DFValueType[]) => VariableCondition;

	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	select: (condition: ActionNamesInBlock<"select_obj">, ...args: DFValueType[]) => SelectObject;
	/**
	 * Alias for `select`.
	 */
	sel: (cond: ActionNamesInBlock<"select_obj">, ...args: DFValueType[]) => SelectObject;

	/**
	 * Control yr'ou game.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	control: (action: ActionNamesInBlock<"control">, ...args: DFValueType[]) => Control;
	/**
	 * Alias for `control`.
	 */
	ctrl: (act: ActionNamesInBlock<"control">, ...args: DFValueType[]) => Control;
}
