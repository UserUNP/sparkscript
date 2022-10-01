import zlib 		from "node:zlib";
import WebSocket	from 'ws';
import utils		from "./utilities"; export { utils }

// Components.
import Template, { RawDFTemplate }		from './core/components/Template';							export {Template};
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
import { SparkscriptMapper, codeblockSupported }	from "./mapper";				export { SparkscriptMapper, codeblockSupported }
import getEditor, { ActDefs }						from "./editor/quickeditor";	export { getEditor }
import getEditorSettings, { Isettings }				from "./editor/qeSettings";
import Ieditor 										from "./editor/Iquickeditor";

/**
 * New template.
 * @param name Name of the template, not required.
 * @param callback Callback for editing the template.
 */
function quickEditor(name: string|false, callback: (editor: Ieditor, settings: Isettings) => void): Template {
	const template = new Template(name);
	const actDefs: ActDefs = {};

	// Quick editor.
	const editor = template.self;
	getEditor.applyActions(editor, actDefs);
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

// Import from raw data.
quickEditor.from = (raw: string, callback?: (editor: Ieditor, settings: Isettings) => void): Template => {
	const data: RawDFTemplate = JSON.parse(zlib.gunzipSync(Buffer.from(raw, "base64")).toString()) as RawDFTemplate;
	
	const template = new Template(data.name || false, data.author);
	for(const block of data.blocks) template.push(Block.from(block));
	
	return quickEditor(template.name, (e, s) => {
		e._from(template);
		if(callback) callback(e, s);
	});
}

// Variable types.
import DFVarType from "./core/DFVarType";
quickEditor.NEVER	= DFVarType.	NEVER;
quickEditor.ANY		= DFVarType.	  ANY;
quickEditor.TXT		= DFVarType.	  TXT;
quickEditor.NUM		= DFVarType.	  NUM;
quickEditor.VAR		= DFVarType.	  VAR;
quickEditor.ITEM	= DFVarType.	 ITEM;
quickEditor.LIST	= DFVarType.	 LIST;
quickEditor.POT		= DFVarType.	  POT;
quickEditor.SND		= DFVarType.	  SND;
quickEditor.DICT	= DFVarType.	 DICT;

export default quickEditor;

/*
df("test template", (e) => {
	e.player.action("SendMessage", e.text("Hello world!"));

});
*/
