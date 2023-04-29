const df = require("../../").default;
const fs = require("node:fs");

let raw = fs.readFileSync("dictionary.json"); // Add your own words if you want to.
if (String.fromCharCode(raw[0]) != "[") raw = raw.subarray(3);

const theEntireWordle = JSON.parse(raw)
  .filter(v => v.length === 5) // Filter falsey strings, such as empty ones.
  .sort(() => Math.random() >= 0.5 ? 1 : -1); // Shufle.

const wordsAmount = process.argv[2] || theEntireWordle.length;
if (wordsAmount > theEntireWordle.length) throw new Error(`There's only ${theEntireWordle.length} words`);

if (fs.existsSync("wordle_list_serialized_templ.json")) fs.rmSync("wordle_list_serialized_templ.json");
if (fs.existsSync("wordle_list_templ.txt")) fs.rmSync("wordle_list_templ.txt");

const template = df("The entire wordle.", (e, s) => {
  s.author = "UserUNP";

  e.func("wordleWords");

  const items = [];
  e.defAction("addWords", (words) => {
    const chunk = e.mc("minecraft:book", `wordle chunk ${items.length+1}`, 1);
    chunk.addLore(`${words.join(",")}`);
    items.push(chunk);
    console.log(`finished chunk ${items.length} (${words.length})`);
  });
  const listVar = e.var("wordleList");
  e.setVar("CreateList", listVar);

  let wordsBuffer = [];
  for (let i = 0; i < wordsAmount; i++) {
    if(i!=0 && i % 100 == 0) {
      e.action.addWords(wordsBuffer);
      wordsBuffer = [];
    }
    if (i == theEntireWordle.length-1) {
      e.action.addWords(wordsBuffer);
      break;
    }
    wordsBuffer.push(theEntireWordle[i]);
  }

  wordsBuffer = [];
  for (let i = 0; i < items.length; i++) {
    if(i!=0 && i % 26 == 0) {
      e.setVar("AppendValue", listVar, ...wordsBuffer);
      wordsBuffer = [];
    }
    if (i == theEntireWordle.length-1) {
      e.setVar("AppendValue", listVar, ...wordsBuffer);
      break;
    }
    wordsBuffer.push(items[i]);
  }
});

const {compressed, serialized} = template.export();
console.log("Finished writing & exporting.. attempting to write to 'wordle_list_templ.txt'.");

fs.writeFileSync("wordle_list_serialized_templ.json", JSON.stringify(serialized));
fs.writeFileSync("wordle_list_templ.txt", compressed);

console.log(`DONE. ${fs.statSync("wordle_list_templ.txt").size/1000} Kilobytes.`);
console.log(`Decompresses to -> ${fs.statSync("wordle_list_serialized_templ.json").size/1000} Kilobytes.`);
console.log();
console.log(theEntireWordle.length + " words.");
console.log(template.blocks.length + " total blocks..");
