import zlib 		from "node:zlib";
import WebSocket	from 'ws';

export * as components	from "./core/components/";
export * as values		from "./values/";
export * as codeblocks	from "./codeblocks/";

// Quick editor & playground.
export * as mapper	from "./mapper"
export * as types	from "./core/types/"
export * as utils	from "./utilities";

import codeDump							from "./core/codeDump";				export { codeDump };
import getEditor						from "./editor/quickeditor";		export { getEditor };
import getEditorSettings, { Isettings }	from "./editor/qeSettings";
import Ieditor 							from "./editor/Iquickeditor";
import Template, { RawDFTemplate }		from "./core/components/Template";

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
	const data = JSON.parse(zlib.gunzipSync(Buffer.from(raw, "base64")).toString()) as RawDFTemplate;
	const template = Template.from(data);
	return quickEditor(template.name, (e, s) => {
		e._from(template);
		if(callback) callback(e, s);
	});
}

quickEditor.setActionDump = codeDump.loadDump;

export default quickEditor;

/*
df("test template", (e) => {
	e.player.action("SendMessage", e.text("Hello world!"));

});
*/
