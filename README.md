## Simple to use DiamondFire library for Javascript.

Check out [DiamondFire](https://mcdiamondfire.com), its pretty cool.  

[![gh-actions](https://github.com/UserUNP/sparkscript/actions/workflows/sparkscript.yml/badge.svg)](https://github.com/UserUNP/sparkscript/actions/workflows/sparkscript.yml)
[![gh-actions](https://github.com/UserUNP/sparkscript/actions/workflows/codeql.yml/badge.svg)](https://github.com/UserUNP/sparkscript/actions/workflows/codeql.yml)  
[![npm-sparkscript](https://nodei.co/npm/sparkscript.png)](https://npmjs.org/package/sparkscript)  
***Warning***: *No stable version yet.. everything might flop and/or change*  

Example: *for current git build*
```javascript
// import the quick editor
// import df from "sparkscript";
const df = require("sparkscript").default;

const template = df("Test template", (e, s) =>{
  // e short for "editor"
  // s short for "settings" 
  e.defAction("give_items", (/* args */) => { //! strings & numbers get parsed into their respective df values
    e.player.action("SetHotbar", e.mc("cod", "§b§l<-§c§o killer fish §b§l->"), e.mc("bow", "§b§l<-§c§o le bow §b§l->"))
    //* you can use & for other things. use § for color codes
  });

  e.player.event("Join");
  e.action.give_items();
  
  e.player.event("Respawn");
  e.action.give_items();

});

const code = template.export();
console.log(code.compressed);
```
What i want next release: *subject to change*
```javascript
const df = require("sparkscript").default;

const core = df.lib("core", (e, s, arg) => {
  // arg( ) used for referencing input variables
  s.args = [
    s.lib.arg("message", df.TXT, "message to send"),
    s.lib.arg("times", df.NUM, "*insert short description*")
  ];
  s.icon = "cod";

  e.repeat.multiple(arg("times"), (loop) => {
    loop.player.action("SendMessage", s.lib.get("message"));
  });
});

const template = df.lib.assemble(">> how2df !!1", core, template_1, template_2/* ... etc */)
const code = template.export();
console.log(code.compressed);
```


Key features:  
\> Read from template data with `require( ).default.from( )`.  
\> ~~Read & compile from Spark file, buffer or string.~~ **_not anytime soon._**  
\> Easy to use template editor.  

# Build from source

You can use either `npm` or `yarn` for this.  

```sh
mkdir sparkscript
cd sparkscript
git clone https://github.com/UserUNP/sparkscript .
npm install
npm run build
```

IF you need to use a different version of the actiondump.json file,
then you'll have to replace it by yourself, for now.
