# Sparkscript
### Simple to use DiamondFire library for Javascript.

Check out [DiamondFire](https://mcdiamondfire.com), its pretty cool.  

Latest version: 1.0.0-alpha.1.1
No stable version yet..

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

# Build from source

If you can use either `npm` or `yarn` for this.  

```bash
mkdir sparkscript
cd sparkscript
git clone https://github.com/UserUNP/sparkscript .
npm install
npm run build
```

IF you need to use a different version of the actiondump.json file,
then you'll have to replace it by yourself.
