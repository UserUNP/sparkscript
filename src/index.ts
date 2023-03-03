import zlib 		from "node:zlib";
import WebSocket	from 'ws';

export * as components	from "./core/components/";
export * as types		from "./core/types/"
export * as values		from "./values/";
export * as codeblocks	from "./codeblocks/";
export * as utils		from "./common/utilities";

// Quick editor & playground.
import codeDump							from "./core/codeDump";				export { codeDump };
import getEditor						from "./common/editor/quickeditor";		export { getEditor };
import * as mapper						from "./mapper";					export { mapper };
import getEditorSettings, { Isettings }	from "./common/editor/qeSettings";
import Ieditor 							from "./common/editor/Iquickeditor";
import Template, { RawDFTemplate }		from "./core/components/Template";

/**
 * Quick editor.
 * @param name Name of the template, false for nothing.
 * @param callback Editor callback.
 */
function quickEditor(name: string|false, callback: (editor: Ieditor<ReturnType<typeof quickEditor>>, settings: Isettings) => void): Template {
	const template = new Template(name);

	// Get the editor.
	const editor = getEditor.default(template);
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
	const template = new Template(data.name || false, data.author);
	const blocks = data.blocks.map(b => {
		if(b.id === "bracket") throw new Error(`Found a bracket block while parsing template "${template.name}" with no parent block. Either fix your code or this might be a bug.`);
		return mapper.default.from(b);
	});
	template.push(...blocks);
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
