const fs = require("node:fs");
const db = require("../actiondump.json");

const newdb = {
	codeblockNames: {},
	codeblocks: {},
	actions: {},
	actionsWithTags: {},
	actionTags: {},
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
	const actName = a.name.replace(/\s/g, "");
	const tags = [];
	a.tags.forEach(t => {
		delete t.aliases;
		t.options = t.options.map(o => o.name);
		tags.push(t.name);
		newdb.actionTags[t.name] = {
			...t,
			action: a.name, codeblock: newdb.codeblockNames[a.codeblockName]
		}
	});
	const hasTags = tags.length >= 1;
	if(hasTags) newdb.actionsWithTags[actName] = tags;

	const codeblockType = [];
	const codeblockName = [];
	db.actions.forEach(dupA => {
		if(a.name === dupA.name) {
			codeblockName.push(dupA.codeblockName);
			codeblockType.push(newdb.codeblockNames[dupA.codeblockName]);
		}
	});
	newdb.actions[actName] = {
		codeblockType, codeblockName,
		name: actName,
		hasTags
	}
});

newdb.sounds = db.sounds.map(s => ({sound: s.icon.name, name: s.sound}));
newdb.potions = db.potions.map(p => ({potion: p.icon.name, name: p.potion}));
newdb.particles = db.particles.map(p => ({particle: p.icon.name, name: p.particle, category: p.category}));
newdb.gvals = db.gameValues.map(v => ({name: v.icon.name, type: v.icon.returnType, category: v.category}));

console.log();
console.dir(Object.keys(newdb));
console.log(`Df has a total of ${Object.keys(newdb.actions).length} unique actions in all codeblocks.`);
console.log(`There are ${Object.keys(newdb.actionTags).length} unique action tags in ${Object.keys(newdb.actionsWithTags).length} codeblocks.`);
console.log(`You can use ${newdb.sounds.length} sounds, ${newdb.particles.length} particles and ${newdb.potions.length} potions in df.`);
console.log(`There's only ${newdb.gvals.length} available game values.`);
console.log();
console.log("Writing ts and json files..")
if(fs.existsSync("./ssActiondump.json")) fs.rmSync("./ssActiondump.json");
if(fs.existsSync("./ssActiondump.ts")) fs.rmSync("./ssActiondump.ts");
fs.writeFileSync("./ssActiondump.json", JSON.stringify(newdb));
fs.writeFileSync("./ssActiondump.ts", `export default ${JSON.stringify(newdb)} as const;`);
