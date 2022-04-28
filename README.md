# Sparkscript
### Simple to use DiamondFire library for Javascript.
Check out [DiamondFire](https://mcdiamondfire.com), its pretty cool.

Example:
```javascript
// import df from "sparkscript";
const df = require("sparkscript").default;

const template = df("Test template", (e, s) =>{
  // e short for "editor"
  // s short for "settings"
  e.defAction("onJoin", (shouldWelcomePlayer, message) => {
    e.player.event("Join");
    if(shouldWelcomePlayer) {
      e.player.action("SendMessage", e.txt("Welcome %default !"), e.txt(message));
    }
    else {
      e.player.action("SendMessage", e.txt(message))
    }
  });

  e.action.onJoin(true, "Your daily dose of DiamondFire.");
});

const code = template.export();
console.log(code.compressed);
```

Keyfeatures:
\> Read from template data with `require( )...from( )`.
\> ~~Read & compile from Spark file, buffer or string.~~ **_W.I.P._**
\> Easy to use template editor.
