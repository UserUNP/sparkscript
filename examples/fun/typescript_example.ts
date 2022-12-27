import { getEditor } from "../../";

const editor = getEditor.default();
editor.defAction("give", "GiveItems");

const kits = {
  basic: [
    editor.mc("minecraft:cod", "§c§lKiller Fish from §nsandiago§c!!", 1),
    editor.mc("minecraft:steak", "fish au chocolate", 32)
  ],
  noble: [
	// fill this out yourself.
  ],
  advanced: [
	// fill this out yourself.
  ],
} as const;

const kitVar = editor.var("%default kit", "save");
//* kitVar.toString() -> "%var(%default kit)"
//* you can control data stored in values
//* ex: kitVar.set("name", "%killer kit")
//* or: kitVar.raw.name = "%killer kit"

for(const kit in kits) {
  const items = kits[kit as keyof typeof kits];
  editor.function("loadkit "+kit);
  editor.action.give(...items);
}

console.log(editor.getTemplate().blocks);

editor.player.event("Join");
editor.ifVariable("=", kitVar, editor.false).then(editor => {
  editor.player.action("SendMessage", editor.txt("Welcome %default!"));
  editor.setVar("=", kitVar, editor.txt("basic"));
});
editor.callFunction("loadKit "+kitVar); // gets coerced into %var(%default kit)

console.log(editor.getTemplate().export().compressed);
