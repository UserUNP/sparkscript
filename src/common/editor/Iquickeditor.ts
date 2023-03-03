import DFDumpScheme		from "../../core/types/DFDumpScheme";
import DFTarget			from "../../core/types/DFTarget";
import DFSafeVarScope	from "../../core/types/DFSafeVarScope";
import DFValueType		from "../../core/types/DFValueType";
import DFGameValueName	from "../../core/types/DFGameValueName";
import DFBlockAction	from "../../core/types/DFBlockAction";

import MCPotion			from "../../core/types/MCPotion";
import MCSound			from "../../core/types/MCSound";

import Template			from "../../core/components/Template";
import MinecraftString	from "../../core/components/minecraft/MinecraftString";

import MinecraftItem	from "../../values/MinecraftItem";
import Text			 	from '../../values/Text';
import Number			from '../../values/Number';
import Variable			from '../../values/Variable';
import Location			from "../../values/Location";
import Potion			from "../../values/Potion";
import Sound			from "../../values/Sound";
import GameValue		from "../../values/GameValue";
import Vector 			from "../../values/Vector";

import { PlayerAction, PlayerCondition, PlayerEvent }	from "../../codeblocks/Player";
import { EntityAction, EntityCondition, EntityEvent }	from "../../codeblocks/Entity";
import { GameAction, GameCondition }					from "../../codeblocks/Game";
import SetVariable										from "../../codeblocks/SetVariable";
import VariableCondition								from "../../codeblocks/VariableCondition";
import SelectObject										from "../../codeblocks/SelectObject";
import Control											from "../../codeblocks/Control";
import Func												from "../../codeblocks/Func";
import CallFunction										from "../../codeblocks/CallFunction";
import Process											from "../../codeblocks/Process";
import StartProcess										from "../../codeblocks/StartProcess";

type DefineActionFunction = {
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

	get: {
		/**
		 * Get codeblock by index in order.
		 * @param index Codeblock index, indexes start at 0.
		 */
		<K extends number>(index: K): T["blocks"][K];
		//TODO: get by name
	}

	/**
	 * Define a custom action.
	 */
	defAction: DefineActionFunction;
	/**
	 * Perform a \***pre-defined**\* action.
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
		value: (value: DFGameValueName, target?: DFTarget, slot?: number) => GameValue;
		val: (value: DFGameValueName, target?: DFTarget, slot?: number) => GameValue;
		/**
		 * Used to do something related to the plot and everyone playing it.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: <Action extends DFBlockAction<"game_action">>(action: Action, ...args: DFValueType[]) => GameAction<Action>;
		/**
		 * Alias for `action`.
		 */
		act: <Action extends DFBlockAction<"game_action">>(action: Action, ...args: DFValueType[]) => GameAction<Action>;
		/**
		 *
		 */
		condition: <Condition extends DFBlockAction<"if_game">>(condition: Condition, ...args: DFValueType[]) => GameCondition<Condition>;
		/**
		 * Alias for `condition`.
		 */
		if: <Condition extends DFBlockAction<"if_game">>(condition: Condition, ...args: DFValueType[]) => GameCondition<Condition>;
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
		action: <Action extends DFBlockAction<"player_action">>(action: Action, ...args: DFValueType[]) => PlayerAction<Action>;
		/**
		 * Alias for `action`.
		 */
		act: <Action extends DFBlockAction<"player_action">>(action: Action, ...args: DFValueType[]) => PlayerAction<Action>;
		/**
		 * When a player does something.
		 * @param event Event to listen for.
		 */
		event: <Action extends DFBlockAction<"event">>(action: Action) => PlayerEvent<Action>;
		/**
		 * Alias for `event`.
		 */
		evt: <Action extends DFBlockAction<"event">>(action: Action) => PlayerEvent<Action>;
		/**
		 * If a player did something.
		 * @param condition Action of condition.
		 * @param args Arguments to pass.
		 */
		condition: <Condition extends DFBlockAction<"if_player">>(condition: Condition, ...args: DFValueType[]) => PlayerCondition<Condition>;
		/**
		 * Alias for `condition`.
		 */
		if: <Condition extends DFBlockAction<"if_player">>(condition: Condition, ...args: DFValueType[]) => PlayerCondition<Condition>;
	};
	entity: {
		/**
		 * Do an entity action.
		 * @param action Action to perform.
		 * @param args Arguments to pass.
		 */
		action: <Action extends DFBlockAction<"entity_action">>(action: Action, ...args: DFValueType[]) => EntityAction<Action>;
		/**
		 * Alias for `action`.
		 */
		act: <Action extends DFBlockAction<"entity_action">>(action: Action, ...args: DFValueType[]) => EntityAction<Action>;
		/**
		 * When an entity does something.
		 * @param event Event to listen for.
		 */
		event: <Action extends DFBlockAction<"entity_event">>(action: Action) => EntityEvent<Action>;
		/**
		 * Alias for `event`.
		 */
		evt: <Action extends DFBlockAction<"entity_event">>(action: Action) => EntityEvent<Action>;
		/**
		 * If an entity did something.
		 * @param condition Action of condition.
		 * @param args Arguments to pass.
		 */
		 condition: <Condition extends DFBlockAction<"if_entity">>(condition: Condition, ...args: DFValueType[]) => EntityCondition<Condition>;
		 /**
		  * Alias for `condition`.
		  */
		 if: <Condition extends DFBlockAction<"if_entity">>(condition: Condition, ...args: DFValueType[]) => EntityCondition<Condition>;
	};

	/**
	 * Place a function.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	function: <T extends string>(name: T, ...args: DFValueType[]) => Func;
	/**
	 * Alias for `function`.
	 */
	func: <T extends string>(name: T, ...args: DFValueType[]) => Func;

	/**
	 * Call a specific function.
	 * @param name Function name to call.
	 */
	callFunction: <T extends string>(name: T) => CallFunction;
	/**
	 * Alias for `callFunction`.
	 */
	callFunc: <T extends string>(name: T) => CallFunction;

	/**
	 * Place a process.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	process: <T extends string>(name: T, ...args: DFValueType[]) => Process;
	/**
	 * Alias for `process`.
	 */
	proc: <T extends string>(name: T, ...args: DFValueType[]) => Process;

	/**
	 * Start a process thread.
	 * @param name Function name.
	 * @param args Arguments, can be used as notes since they're not used in the function.
	 */
	startProcess: <T extends string>(name: T, ...args: DFValueType[]) => StartProcess;
	/**
	 * Alias for `startProcess`.
	 */
	startProc: <T extends string>(name: T, ...args: DFValueType[]) => StartProcess;

	/**
	 * Set a variable using a specific action.
	 * @param action Action to perform.
	 * @param variable Variable to set.
	 * @param args Arguments to pass.
	 */
	setVariable: <Action extends DFBlockAction<"set_var">>(action: Action, variable: Variable,...args: DFValueType[]) => SetVariable<Action>;
	/**
	 * Alias for `setVariable`.
	 */
	setVar: <Action extends DFBlockAction<"set_var">>(action: Action, variable: Variable,...args: DFValueType[]) => SetVariable<Action>;

	/**
	 * If a specific variable has or is equal to a property.
	 * @param condition Condition to match for.
	 * @param args Arguments to pass.
	 */
	ifVariable: <Condition extends DFBlockAction<"if_var">>(condition: Condition, ...args: DFValueType[]) => VariableCondition<Condition>;
	/**
	 * Alias for `ifVariable`.
	 */
	ifVar: <Condition extends DFBlockAction<"if_var">>(condition: Condition, ...args: DFValueType[]) => VariableCondition<Condition>;

	/**
	 * Select an object (Entities, Items, ..etc).
	 * @param condition Condition to select by.
	 * @param args Arguments to pass specified by the chosen condition.
	 */
	select: (condition: DFBlockAction<"select_obj">, ...args: DFValueType[]) => SelectObject;
	/**
	 * Alias for `select`.
	 */
	sel: (cond: DFBlockAction<"select_obj">, ...args: DFValueType[]) => SelectObject;

	/**
	 * Control yr'ou game.
	 * @param action Action to perform.
	 * @param args Arguments to pass.
	 */
	control: <Action extends DFBlockAction<"control">>(action: Action, ...args: DFValueType[]) => Control<Action>;
	/**
	 * Alias for `control`.
	 */
	ctrl: <Action extends DFBlockAction<"control">>(action: Action, ...args: DFValueType[]) => Control<Action>;
}
