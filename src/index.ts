
import pako			from "pako";
import WebSocket	from 'ws';
import utils		from "./utilities"; export { utils }

// Components.
import Template, { serializedTemplate }	from './components/Template';							export {Template};
import Block							from './components/Block';								export {Block};
import Value							from './components/Value';								export {Value};
import DataStorage						from './components/DataStorage';						export {DataStorage};
import MinecraftColor					from './components/minecraft/MinecraftColor';			export {MinecraftColor};
import SimpleMinecraftString			from './components/minecraft/SimpleMinecraftString';	export {SimpleMinecraftString};
import MinecraftString					from './components/minecraft/MinecraftString';			export {MinecraftString};

// Values.
import MinecraftItem	from "./values/MinecraftItem";	export {MinecraftItem};
import Text				from './values/Text';			export {Text};
import Number			from './values/Number';			export {Number};
import Variable			from './values/Variable';		export {Variable};
import Location			from "./values/Location";		export {Location};
import Potion			from "./values/Potion";			export {Potion};
import GameValue		from "./values/GameValue";		export {GameValue};
import Vector 			from "./values/Vector";			export {Vector};

// Codeblocks.
import player, { PlayerAction, PlayerEvent }	from "./codeblocks/Player";			export {player};
import { SetVariable }							from "./codeblocks/SetVariable";	export {SetVariable};
import SelectObject								from "./codeblocks/SelectObject";	export {SelectObject};

// Quick editor & playground.

import mapper, { getActionOwner } from "./mapper";

type action_definition = {
	/**
	 * @param name Name of this action
	 * @param callback Callback for when this action is executed.
	 */
	(name: string, callback: ()=>void): void;
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
	 * Create a Minecraft item value.
	 * @param count Amount of items.
	 * @param id Item ID name.
	 * @param name Item name.
	 */
	item: (count: number, id: string, name: string | MinecraftString, slot?: number) => MinecraftItem;
	/**
	 * Alias for `item(...)`.
	 */
	mc: (count: number, id: string, name: string | MinecraftString, slot?: number) => MinecraftItem;

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
	variable: (name: string, scope: "local" | "game" | "save", slot?: number) => Variable;
	var: (name: string, scope: "local" | "game" | "save", slot?: number) => Variable;
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
		value: (value: string, target: string, slot?: number) => GameValue;
		val: (val: string, target: string, slot?: number) => GameValue;
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
	setvariable: (action: string, variable: Variable,...args: Value[]) => void;
	select: (condition: string, ...args: Value[]) => void;
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
				editor.action[name] = function(...args: any[]) {doCustomAction(name, ...args);};
			});
		},
		action: {},

		//* Values.
		item: (amount: number, id: string, name: string | MinecraftString, slot?: number) => new MinecraftItem(amount, id, name, slot),
		mc: (amount: number, id: string, name: string | MinecraftString, slot?: number) => new MinecraftItem(amount, id, name, slot),

		text: (text: string, slot?: number) => new Text(text, slot),
		txt: (txt: string, slot?: number) => new Text(txt, slot),

		number: (number: number, slot?: number) => new Number(number, slot),
		num: (num: number, slot?: number) => new Number(num, slot),

		variable: (name: string, scope: "local" | "game" | "save", slot?: number) => new Variable(name, scope, slot),
		var: (name: string, scope: "local" | "game" | "save"="game", slot?: number) => new Variable(name, scope, slot),

		location: (x: number, y: number, z: number, pitch: number=90, yaw: number=0, slot?: number) => new Location(x, y, z, pitch, yaw, slot),
		loc: (x: number, y: number, z: number, pitch: number=90, yaw: number=0, slot?: number) => new Location(x, y, z, pitch, yaw, slot),

		potion: (potion: string, duration: number, amplifier: number=0, slot?: number) => new Potion(potion, duration, amplifier, slot),
		pot: (pot: string, dur: number, amp: number=0, slot?: number) => new Potion(pot, dur, amp, slot),

		vector: (x: number, y: number, z: number, slot?: number) => new Vector(x, y, z, slot),
		vec: (x: number, y: number, z: number, slot?: number) => new Vector(x, y, z, slot),

		game: {
			//* Game values.
			value: (value: string, target: string, slot?: number) => new GameValue(value, target, slot),
			val: (val: string, target: string, slot?: number) => new GameValue(val, target, slot),
			//* Game actions.
		},

		//* Codeblocks.
		player: {
			action: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			act: (action: string, ...args: Value[]) => template.push(new PlayerAction(action, ...args)),
			
			event: (event: string) => template.push(new PlayerEvent(event)),
			evt: (event: string) => template.push(new PlayerEvent(event)),
		},
		setvariable: (action: string, variable: Variable,...args: Value[]) => template.push(new SetVariable(action, variable, ...args)),
		select: (condition: string, ...args: Value[]) => template.push(new SelectObject(condition, ...args)),
	};
	function doCustomAction(name: string, ...args: any[]) {
		if(actDefs[name]) {
			const action = actDefs[name];
			if(typeof action === "string") {
				const actionOwnerType = getActionOwner(action)?.identifier;
				if(!actionOwnerType) throw new Error(`Action ${action} does not exist.`);
				const parsedArgs: any = args.map((a: any) => {
					if(typeof a === "string") return new Text(a);
					if(typeof a === "number") return new Number(a);
					else return a;
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
		editor.action[name] = function(...args: any[]) {doCustomAction(name, ...args);};
	});
	const settings: settings = { 
		strict: true,
		usingCodeutils: false,
		cuConf: {
			port: 31371,
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
