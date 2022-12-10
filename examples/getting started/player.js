const df = require("../../").default;
// const df = require("sparkscript").default;

const template = df("test template", (e, s) => {
  // "e" short for editor
  // "s" short for settings

  s.author = "UserUNP";
  console.log("Creating new template with name: " + s.name);
  console.log("Made by: " + s.author);
  console.log("\n");

  // > enabling codeutilities
  //s.usingCodeutils = true;
  // > default codeutilities configuration:
  //s.cuConf = {
  //  host: "localhost",
  //  port: 31372,
  //  protocol: "ws"
  //};

  // add player event block
  e.player.event("Join");

  // e.player.action(actionName, argument1, argument2, ...)
  e.player.action("SendMessage", e.text("Hello world!"), e.text("get real"));
})

// export the template, returns an object with "compressed" and "serialized"
//     code.compressed is the compressed template data
//     code.serialized is the uncompressed template data
const code = template.export();

console.log(code.compressed);
// code.sendToCodeutils().catch(console.error);
