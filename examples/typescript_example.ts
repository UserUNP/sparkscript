import { SparkscriptMapper, getEditor } from "../";

type Item = SparkscriptMapper<"item">;
type Level = "basic" | "noble" | "advanced";

const editor = getEditor.default();
editor.defAction("send", "SendMessage");
editor.defAction("give", "GiveItems");

const kits: Record<Level, Item[]> = {
  basic: [
    editor.mc("minecraft:cod", "§c§lKiller Fish from §nsandiago§c!!", 1),
    editor.mc("minecraft:steak", "fish au chocolate", 32)
  ],
  noble: [],
  advanced: [],
}

for(const kit in Object.keys(kits)) {
  const items = kits[kit as Level];
  editor.function("loadkit "+kit);
  editor.action.give(...items);
}

editor.player.event("Join");
editor.action.send("Welcome %default!");
editor.ifvariable("=", editor.var("%default kit", "save"), editor.num(0)).do(editor => {
  editor.setvar(editor.var("%default kit", "save"), "basic");
});
editor.callfunction("loadKit "+editor.var("%default kit", "save")); // gets coreced into %var
