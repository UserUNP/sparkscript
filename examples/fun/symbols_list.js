const df = require("../../").default;

const t = df("symbols", (e) => {
  e.player.event("Join");
  e.setVariable("CreateList", e.variable("symbols"));
  var curr = 0;
  const blockamount = 50;

  e.defAction("addSyms", (symbols) => {
    e.setVariable("AppendValue", e.var("symbolsTable"), ...symbols);
  });

  for (let i = 0; i < blockamount; i++) {
    const symbols = [];
    for (var j = curr; j < curr + 26; j++) {
      symbols.push(e.txt(String.fromCharCode(j)));
    }
    curr = j;
    e.action.addSyms(symbols);
  }
});

t.author = "UserUNP";

console.log(t.export().compressed);
