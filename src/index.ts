"use strict";

import pako from "pako";
import WebSocket from 'ws';

// Componenets.
import Template, { serializedTemplate } from './components/Template'; export {Template};
import Block from './components/Block'; export {Block};
import DataStorage from './components/DataStorage'; export {DataStorage};
import Value from './components/Value'; export {Value};

// Values.
import Text from './values/Text'; export {Text};
import Number from './values/Number'; export {Number};
import Variable from './values/Variable'; export {Variable};

// Codeblocks.
import player, { PlayerAction, PlayerEvent } from "./codeblocks/Player"; export {player};
import { SetVariable } from "./codeblocks/SetVariable"; export {SetVariable};

// Spark
import spark from "./spark/emulator"; export {spark};

// Quick editor & playground.

import mapper, { getActionOwner } from "./mapper";

type action_definition = {
	/**
	 * @param name Name of this action
	 * @param callback Callback for when this action is executed.
	 */
	(name: string, callback: (()=>void)): void;
	/**
	 * @param name Name of this action
	 * @param action Action to perform when this action is executed.
	 */
	(name: string, action: string): void;
}
interface editor {
	/**
	 * Overwrite the template with the provided template.
	 * @param template Template to use.
	 */
	_from: (template: Template) => void;

	getTemplate: () => Template;

	// Spark stuff.

	/**
	 * Define an action.
	 */
	defAction: action_definition;
	/**
	 * Perform a *pre-defined* action.
	 * @param name Name of the action.
	 * @param args Arguments to pass to the action.
	 */
	action: {
		[name: string]: (...args: any[]) => void;
	};

	//

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
	variable: (name: string, scope: "local" | "game" | "save", slot?: number) => Variable;
	var: (name: string, scope: "local" | "game" | "save", slot?: number) => Variable;
	
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
	setvariable: (action: string, variable: Variable,...args: Value[]) => void;
}

interface settings {
	/**
	 * If disabled, Type & action checking will be skipped.
	 */
	strict: boolean;
	/**
	 * Set to ```true``` if you need to use codeutilities.
	 */
	usingCodeutils: boolean;
	/**
	 * Configuration for codeutilities WebSocket (if used).
	 */
	cuConf: {
		/**
		 * Port of the WebSocket. defaults to 31372.
		 */
		port: number | 31372;
		/**
		 * Host of the WebSocket. defaults to localhost.
		 */
		host: string | "localhost";
		/**
		 * Protocol of the WebSocket. defaults to ws.
		 */
		protocol: "ws" | "wss" | "http" | "https";
	},
	author?: string;
	name?: string;
}

/**
 * New template.
 * @param name Name of the template, not required.
 * @param callback Callback for editing the template.
 */
function df(name: string|undefined, callback: (editor: editor, settings: settings) => void): Template {
	if(!name) name = "untitled";
	const template = new Template(name);
	const actDefs: {[name: string]: (()=>void)|string} = {};
	const editor: editor = {
		_from: (other: Template) => {
			template._blocks = other.blocks;
		},

		getTemplate: () => {
			return template;
		},

		//* Spark stuff.
		defAction: (name: string, cbOrAction: (()=>void)|string) => {
			actDefs[name] = cbOrAction;
			Object.keys(actDefs).forEach((name: string) => {
				editor.action[name] = function(...args: any[]) {doCustmAction(name, ...args);};
			});
		},
		action: {},

		//* Values.
		text: (text: string, slot?: number) => new Text(text, slot),
		txt: (text: string, slot?: number) => new Text(text, slot),

		number: (number: number, slot?: number) => new Number(number, slot),
		num: (number: number, slot?: number) => new Number(number, slot),

		variable: (name: string, scope: "local" | "game" | "save", slot: number=0) => new Variable(name, scope, slot),
		var: (name: string, scope: "local" | "game" | "save"="game", slot: number=0) => new Variable(name, scope, slot),

		//* Codeblocks.
		player: {
			action: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			act: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			
			event: (event: string) => template.push(new PlayerEvent(event)),
			evt: (event: string) => template.push(new PlayerEvent(event)),
		},
		setvariable: (action: string, variable: Variable,...args: Value[]) => template.push(new SetVariable(action, variable, ...args)),
	};
	function doCustmAction(name: string, ...args: any[]) {
		if(actDefs[name]) {
			const action = actDefs[name];
			if(typeof action === "string") {
				const actionOwnerType = getActionOwner(action)?.identifier;
				if(!actionOwnerType) throw new Error(`Action ${action} does not exist.`);
				const parsedArgs: any = args.map((a: any) => {
					if(typeof a === "string") return new Text(a);
					if(typeof a === "number") return new Number(a);
					if(a instanceof Value) return a;
					else throw new Error(`Unknown argument type: ${a} is type of ${typeof a}`);
				});
				const instance = mapper(actionOwnerType, action || "", parsedArgs);
				// const instance = new clazz(actionOwnerType, action || "", parsedArgs);
				template.push(instance as Block);
			} else {
				//@ts-ignore
				action(...args);
			}
		} else throw new Error(`Action ${name} is not defined.`);
	};
	Object.keys(actDefs).forEach((name: string) => {
		editor.action[name] = function(...args: any[]) {doCustmAction(name, ...args);};
	});
	const settings: settings = { 
		strict: true,
		usingCodeutils: false,
		cuConf: {
			port: 31372,
			host: "localhost",
			protocol: "ws",
		},
		name,
	};
	callback(editor, settings);
	template.author = settings.author;
	template.name = settings.name;

	if(settings.usingCodeutils) {
		const socket = new WebSocket(`${settings.cuConf.protocol}://${settings.cuConf.host}:${settings.cuConf.port}`);
		template.cuSocket = socket;
	}

	return template;
}

df.from = (raw: string, callback?: (editor: editor, settings: settings) => void): Template => {
	const data = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(pako.inflate(new Uint8Array(atob(raw).split('').map(function(e) {return e.charCodeAt(0);})))) as unknown as []).replace(/Â§/g,'\u00A7')) as serializedTemplate;
	const template = new Template("untitled");
	for(const block of data.blocks) {
		template.push(Block.from(block));
	}
	return df(template.name, (e, s) => {
		e._from(template);
		if(callback) callback(e, s);
	});
}

export default df

/*
df("test template", (e) => {
	e.player.action("SendMessage", e.text("Hello world!"));

});
*/
