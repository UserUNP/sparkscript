import { getEditor, codeDump } from "../../src/index";
import actionDump from "../../actiondump.json";

codeDump.loadDump(actionDump);

const editor = getEditor.default();
editor.defAction("give", "GiveItems");

const kits = {
  basic: [
    editor.mc("minecraft:cod", "§c§lKiller Fish from §nsandiago§c!!", 1),
    editor.mc("minecraft:steak", "fish au chocolate", 32)
  ],
  noble: [
	// fill this out yourself lol.
  ],
  advanced: [
	// fill this out yourself lol.
  ],
} as const;

for(const kit in kits) {
  const items = kits[kit as keyof typeof kits];
  editor.function("loadkit "+kit);
  editor.action.give(...items);
}

console.log(editor.getTemplate().blocks);

editor.player.event("Join");
editor.ifVariable("=", editor.var("%default kit", "save"), editor.num(0)).then(editor => {
  editor.player.action("SendMessage", "Default", editor.txt("Welcome %default!"));
  editor.setVar("=", editor.var("%default kit", "save"), editor.txt("basic"));
});
editor.callFunction("loadKit "+editor.var("%default kit", "save")); // gets coerced into %var(%default kit)

console.log(editor.getTemplate().export().compressed);
