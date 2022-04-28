const df = require("sparkscript").default;

const t = df("symbols", (e) => {
	e.player.event("Join");
	e.setvariable("CreateList", e.variable("symbols"));
	var curr = 0;
	const blockamount = 50;

	for(let i = 0; i < blockamount; i++) {
		const symbols = [];
		for(var j = curr; j < curr+26; j++) {
			symbols.push(String.fromCharCode(j));
		}
		curr = j;
		e.setvariable("AppendList", e.var("symbolsTable"), ...symbols.map(sym => e.text(sym)));
	}
});

t.author = "UserUNP";

console.log(t.export().compressed);
