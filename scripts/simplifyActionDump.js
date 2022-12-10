const fs = require("node:fs");
const db = require("../actiondump.json");

const newdb = {
	codeblockNames: {},
	codeblocks: {},
	actions: {},
	sounds: [],
	potions: [],
	particles: [],
	gvals: []
};

db.codeblocks.forEach(blk => {
	let actions = [];
	db.actions.filter(a => a.codeblockName == blk.name).forEach(a => {
		actions.push(a.name.replace(/\s/g, ""));
	});
	newdb.codeblockNames[blk.name] = blk.identifier;
	newdb.codeblocks[blk.identifier] = {
		name: blk.name,
		type: blk.identifier,
		actions
	}
});

db.actions.forEach(a => {
	a.tags.forEach(t => {
		t.options = t.options.map(o => o.name);
	});
	const codeblockType = [];
	const codeblockName = [];
	db.actions.forEach(dupA => {
		if(a.name === dupA.name) {
			codeblockName.push(dupA.codeblockName);
			codeblockType.push(newdb.codeblockNames[dupA.codeblockName]);
		}
	})
	if((codeblockType || codeblockName).length > 1) {
		console.log(`duplicate action "${a.name}" found in ${codeblockType.toString().replace(/,/g, " ")}`);
	}
	newdb.actions[a.name.replace(/\s/g, "")] = {
		codeblockType, codeblockName,
		name: a.name.replace(/\s/g, ""),
		tags: a.tags
	}
});

newdb.sounds = db.sounds.map(s => {return {sound: s.icon.name, name: s.sound}});
newdb.potions = db.potions.map(p => {return {potion: p.icon.name, name: p.potion}});
newdb.particles = db.particles.map(p => {return {particle: p.icon.name, name: p.particle, category: p.category}});
newdb.gvals = db.gameValues.map(v => {return {name: v.icon.name, type: v.icon.returnType, category: v.category}});

console.log()
console.dir(Object.keys(newdb))

if(fs.existsSync("./ssActiondump.json")) fs.rmSync("./ssActiondump.json");
if(fs.existsSync("./ssActiondump.ts")) fs.rmSync("./ssActiondump.ts");
fs.writeFileSync("./ssActiondump.json", JSON.stringify(newdb));
fs.writeFileSync("./ssActiondump.ts", `export default ${JSON.stringify(newdb)} as const;`);
