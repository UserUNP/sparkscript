const df = require("../../").default;

const template = df("Test template", (e, s) =>{

  e.defAction("greet", (target) => {
    // Generate a greet message code for the target argument.
    e.ifVariable("=", e.var(target+" joined", "save"), e.true).then(e => {

      // Alias "SendMessage" with "send".
      e.defAction("send", "SendMessage");
      //* Texts & numbers automatically get parsed for alias actions.

      /* -----------------------------------------------------------------------------------
       ! It's important to note that custom actions that were defined outside any nested editor callback will
       ! only refer to that specific editor's template for very good reasons.. because nested editor objects have their own template to edit.
      --------------------------------------------------------------------------------------
       * Custom actions still transfer over to the nested editor. You can overwrite them inside the nested editor
       * because they will not affect the outside editor.
      ----------------------------------------------------------------------------------- */

      debugger; // use this to atleast understand how stuff work in sparkscript.

      e.player.action("PlaySound", e.sound("Amethyst Block Chime"));
      e.action.send("Welcome back, "+target+"!");

    })
    e.player.act("SendMessage", e.txt(target+" Joined the game.")).setTarget("AllPlayers");
  });

  e.player.event("Join");
  e.action.greet("%default");

});

console.log(template.blocks.map(b => b.toString()));

const code = template.export();
console.log(code.compressed);
