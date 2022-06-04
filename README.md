# Sparkscript
### Simple to use DiamondFire library for Javascript.

Check out [DiamondFire](https://mcdiamondfire.com), its pretty cool.  

*Current build status*: [![CircleCI](https://circleci.com/gh/UserUNP/sparkscript/tree/master.svg?style=svg)](https://circleci.com/gh/UserUNP/sparkscript/tree/master)  
[![npm sparkscript](https://nodei.co/npm/sparkscript.png)](https://npmjs.org/package/sparkscript)  
***Warning***: *No stable version yet..*

Example:
```javascript
// import df from "sparkscript";
const df = require("sparkscript").default;

const template = df("Test template", (e, s) =>{
  // e short for "editor"
  // s short for "settings"   
  e.defAction("give_items", (/* args */) => {
    e.player.action("SetHotbar", e.mc("stone_sword", { name: "epic sword" }))
  });

  e.player.event("Join");
  e.action.give_items();
  
  e.player.event("Respawn");
  e.action.give_items();

});

const code = template.export();
console.log(code.compressed);
```

Key features:  
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
