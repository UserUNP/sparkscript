import { getEditor } from "../../src/index";

const editor = getEditor.default();
editor.defAction("send", "SendMessage");
editor.defAction("give", "GiveItems");

const kits = {
  basic: [
    editor.mc("minecraft:cod", "§c§lKiller Fish from §nsandiago§c!!", 1),
    editor.mc("minecraft:steak", "fish au chocolate", 32)
  ],
  noble: [],
  advanced: [],
} as const;

for(const kit in kits) {
  const items = kits[kit];
  editor.function("loadkit "+kit);
  editor.action.give(...items);
}

editor.player.event("Join");
editor.ifVariable("=", editor.var("%default kit", "save"), editor.num(0)).then(editor => {
  editor.action.send("Welcome %default!");
  editor.setVar("=", editor.var("%default kit", "save"), editor.txt("basic"));
}).else(editor => {
  editor.action.send("Welcome back %default!");
});
editor.callFunction("loadKit "+editor.var("%default kit", "save")); // gets coerced into %var(%default kit)
