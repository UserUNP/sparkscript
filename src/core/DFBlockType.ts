import { PlayerAction, PlayerEvent } from "../codeblocks/Player";
import { EntityEvent, EntityAction } from "../codeblocks/Entity";
import { SetVariable } from "../codeblocks/SetVariable";
import SelectObject from "../codeblocks/SelectObject";
import GameAction from "../codeblocks/GameAction";
import Func from "../codeblocks/Func";

/**
 * Sparkscript codeblock type.
 */
type DFBlockType =
	| PlayerEvent
	| PlayerAction
	| EntityEvent
	| EntityAction
	| SetVariable
	| SelectObject
	| GameAction	
	| Func
	;

export default DFBlockType;
