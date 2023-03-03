import { PlayerAction, PlayerCondition, PlayerEvent } from "../../codeblocks/Player";
import { EntityEvent, EntityAction, EntityCondition } from "../../codeblocks/Entity";
import { GameAction, GameCondition } from "../../codeblocks/Game";
import SetVariable from "../../codeblocks/SetVariable";
import SelectObject from "../../codeblocks/SelectObject";
import Func from "../../codeblocks/Func";
import Control from "../../codeblocks/Control";
import Process from "../../codeblocks/Process";
import StartProcess from "../../codeblocks/StartProcess";
import CallFunction from "../../codeblocks/CallFunction";
import VariableCondition from "../../codeblocks/VariableCondition";

/**
 * Sparkscript codeblock type.
 */
type DFBlockType =
	| PlayerEvent<any>
	| PlayerAction<any>
	| PlayerCondition<any>
	| EntityEvent<any>
	| EntityAction<any>
	| EntityCondition<any>
	| SetVariable<any>
	| VariableCondition<any>
	| GameAction<any>
	| GameCondition<any>
	| Control<any>
	| SelectObject
	| Func
	| CallFunction
	| Process
	| StartProcess
	;

export default DFBlockType;
