const df = require("../../").default;

const template = df("Test template", (e, s) =>{
  // e short for "editor"
  // s short for "settings"
  e.defAction("giveItems", (/* args */) => {
    e.player.action("SetHotbar", "Default", e.mc("cod", "§b§l<-§c§o killer fish §b§l->"), e.mc("bow", "§b§l<-§c§o le bow §b§l->"))
    //* you can use & for other things. use § for color codes
  });
  e.player.event("Join");
  e.action.giveItems();

  e.player.event("Respawn");
  e.action.giveItems();

});

const code = template.export();
console.log(code.compressed);
