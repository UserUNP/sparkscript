const df = require("../../").default;

const template = df("Test template", (e, s) => {
  // e short for "editor"
  // s short for "settings"
  e.defAction("giveItems", (/* args */) => {
    e.player.action("SetHotbar", e.mc("cod", "§b§l<-§c§o killer fish §b§l->"), e.mc("bow", "§b§l<-§c§o le bow §b§l->"))
    //* you can use & for other things. use § for color codes.
  });

  //* you can use .setTarget() to specify the player to target. you can also chain it amongst other functions
  //* ex:
  // const funnyAction = e.player.action("DoAFlip").setTarget("Default")
  // funnyAction.setInverted(true).setAction("NOTAFlip)

  e.player.event("Join");
  e.action.giveItems();

  e.player.event("Respawn");
  e.action.giveItems();

});

const code = template.export();
console.log(code.compressed);
