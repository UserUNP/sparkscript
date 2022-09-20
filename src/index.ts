import zlib 		from "node:zlib";
import WebSocket	from 'ws';
import utils		from "./utilities"; export { utils }

// Components.
import Template, { RawDFTemplate }	from './core/components/Template';							export {Template};
import Block							from './core/components/Block';								export {Block};
import Value							from './core/components/Value';								export {Value};
import DataStorage						from './core/components/DataStorage';						export {DataStorage};
import MinecraftColor					from './core/components/minecraft/MinecraftColor';			export {MinecraftColor};
import SimpleMinecraftString			from './core/components/minecraft/SimpleMinecraftString';	export {SimpleMinecraftString};
import MinecraftString					from './core/components/minecraft/MinecraftString';			export {MinecraftString};

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
import player		from "./codeblocks/Player";			export {player};
import entity		from "./codeblocks/Entity";			export {entity};
import SetVariable	from "./codeblocks/SetVariable";	export {SetVariable};
import SelectObject	from "./codeblocks/SelectObject";	export {SelectObject};
import GameAction	from "./codeblocks/GameAction";		export {GameAction};
import Func			from "./codeblocks/Func";			export {Func};

// Quick editor & playground.

import mapper, { getActionOwner }		from "./mapper";
import getEditor						from "./quickeditor";
import getEditorSettings, { Isettings }	from "./qeSettings";
import Ieditor 							from "./Iquickeditor";

/**
 * New template.
 * @param name Name of the template, not required.
 * @param callback Callback for editing the template.
 */
function quickEditor(name: string|false, callback: (editor: Ieditor, settings: Isettings) => void): Template {
	if(!name) name = "untitled";
	const template = new Template(name);
	const actDefs: {[name: string]: (()=>void)|string} = {};

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

	// Quick editor.
	const editor = getEditor(template, { actDefs, doCustomAction });
	const settings = getEditorSettings(name)

	callback(editor, settings);
	template.author = settings.author;
	template.name = settings.name;

	if(settings.usingCodeutils) {
		const socket = new WebSocket(`${settings.cuConf.protocol}://${settings.cuConf.host}:${settings.cuConf.port}`);
		template.cuSocket = socket;
	}

	return template;
}

quickEditor.from = (raw: string, callback?: (editor: Ieditor, settings: Isettings) => void): Template => {
	const data: RawDFTemplate = JSON.parse(zlib.gunzipSync(Buffer.from(raw, "base64")).toString()) as RawDFTemplate;
	
	const template = new Template(data.name ?? false);
	for(const block of data.blocks) template.push(Block.from(block));
	
	return quickEditor(template.name, (e, s) => {
		e._from(template);
		if(callback) callback(e, s);
	});
}

export default quickEditor;

/*
df("test template", (e) => {
	e.player.action("SendMessage", e.text("Hello world!"));

});
*/
