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
	| PlayerEvent
	| PlayerAction
	| PlayerCondition
	| EntityEvent
	| EntityAction
	| EntityCondition
	| SetVariable
	| VariableCondition
	| SelectObject
	| GameAction
	| GameCondition
	| Func
	| CallFunction
	| Control
	| Process
	| StartProcess
	;

export default DFBlockType;
