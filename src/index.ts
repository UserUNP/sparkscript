import zlib 		from "node:zlib";
import WebSocket	from 'ws';

// Components.
import SerializableComponent		from "./core/components/SerializableComponent";				export { SerializableComponent };
import Template, { RawDFTemplate }	from './core/components/Template';							export { Template };
import ActionBlock					from './core/components/ActionBlock';						export { ActionBlock };
import DataBlock					from "./core/components/DataBlock";							export { DataBlock };
import ConditionalBlock				from "./core/components/ConditionalBlock";					export { ConditionalBlock };
import SubActionBlock				from "./core/components/SubActionBlock";					export { SubActionBlock };
import Value						from './core/components/Value';								export { Value };
import DataStorage					from './core/components/DataStorage';						export { DataStorage };
import MinecraftColor				from './core/components/minecraft/MinecraftColor';			export { MinecraftColor };
import SimpleMinecraftString		from './core/components/minecraft/SimpleMinecraftString';	export { SimpleMinecraftString};
import MinecraftString				from './core/components/minecraft/MinecraftString';			export { MinecraftString };

// Values.
import BLTag			from "./values/BLTag";			export { BLTag };
import MinecraftItem	from "./values/MinecraftItem";	export { MinecraftItem };
import Text				from './values/Text';			export { Text };
import Number			from './values/Number';			export { Number };
import Variable			from './values/Variable';		export { Variable };
import Location			from "./values/Location";		export { Location };
import Potion			from "./values/Potion";			export { Potion };
import GameValue		from "./values/GameValue";		export { GameValue };
import Vector 			from "./values/Vector";			export { Vector };

// Codeblocks.
import player		from "./codeblocks/Player";			export { player };
import entity		from "./codeblocks/Entity";			export { entity };
import setvar		from "./codeblocks/SetVariable";	export { setvar };
import SelectObject	from "./codeblocks/SelectObject";	export { SelectObject };
import GameAction	from "./codeblocks/Game";			export { GameAction };
import Func			from "./codeblocks/Func";			export { Func };

// Quick editor & playground.
import utils							from "./utilities";					export { utils };
import codeDump							from "./core/codeDump";				export { codeDump };
import DFDumpScheme						from "./core/types/DFDumpScheme";	export { DFDumpScheme };
import getEditor						from "./editor/quickeditor";		export { getEditor }
import getEditorSettings, { Isettings }	from "./editor/qeSettings";
import Ieditor 							from "./editor/Iquickeditor";

/**
 * Quick editor.
 * @param name Name of the template, false for nothing.
 * @param callback Editor callback.
 */
function quickEditor(name: string|false, callback: (editor: Ieditor<ReturnType<typeof quickEditor>>, settings: Isettings) => void): Template {
	const template = new Template(name);

	// Get the editor.
	const editor = template.self;
	getEditor.applyActions(editor, getEditor.defaultActDefs);
	const settings = getEditorSettings(name)

	callback(editor, settings);
	template.author = settings.author;
	template.name = settings.name;

	if(settings.usingCodeutils) {
		const socket = new WebSocket(`${settings.cuConf.protocol}://${settings.cuConf.host}:${settings.cuConf.port}/${settings.cuConf.endpoint}`);
		template.cuSocket = socket;
	}

	return template;
}

/**
 * Extract a raw DiamondFire template.
 * @param raw Raw template data.
 * @param callback Editor callback.
 */
quickEditor.from = (raw: string, callback?: (editor: Ieditor<ReturnType<typeof quickEditor>>, settings: Isettings) => void) => {
	const data: RawDFTemplate = JSON.parse(zlib.gunzipSync(Buffer.from(raw, "base64")).toString()) as RawDFTemplate;
	const template = Template.from(data);
	return quickEditor(template.name, (e, s) => {
		e._from(template);
		if(callback) callback(e, s);
	});
}

quickEditor.setActionDump = (dump: DFDumpScheme) => codeDump.loadDump(dump);

export default quickEditor;

/*
df("test template", (e) => {
	e.player.action("SendMessage", e.text("Hello world!"));

});
*/
