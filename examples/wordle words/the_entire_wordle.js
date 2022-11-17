const df = require("../").default;
const fs = require("node:fs");

const raw = fs.readFileSync("raw_wordle_list.txt"); // Add your own words if you want to.
const theEntireWorlde = raw.toString()
  .split("\n") // Split the strings.
  .filter(v => !!v) // Filter falsey strings, such as empty ones.
  .sort(() => Math.random() >= 0.5 ? 1 : -1); // Shufle.

if(fs.existsSync("wordle_list_serialized_templ.json")) fs.rmSync("wordle_list_serialized_templ.json");
if(fs.existsSync("wordle_list_templ.txt")) fs.rmSync("wordle_list_templ.txt");

const template = df("The entire wordle.", (e, s) => {
  s.author = "UserUNP";

  e.defAction("addWords", (words) => {
    e.setVar("AppendList", e.var("wordleList"), ...words);
  });
  e.setVar("CreateList", e.var("wordleList"))

  let wordsBuffer = [];
  for (let i = 0; i < theEntireWorlde.length; i++) {
    if(i!=0 && i % 26 == 0) {
      e.action.addWords(wordsBuffer);
      wordsBuffer = [];
    }
    if(i == theEntireWorlde.length-1) {
      e.action.addWords(wordsBuffer);
      break;
    }
    wordsBuffer.push(e.txt(theEntireWorlde[i]));
  }
})

const {compressed, serialized} = template.export();
console.log("Finished writing & exporting.. attempting to write to 'wordle_list_templ.txt'.");

fs.writeFileSync("wordle_list_serialized_templ.json", JSON.stringify(serialized));
fs.writeFileSync("wordle_list_templ.txt", compressed);

console.log(`DONE. ${fs.statSync("wordle_list_templ.txt").size/1000} Kilobytes.`);
console.log(`Decompresses to -> ${fs.statSync("wordle_list_serialized_templ.json").size/1000} Kilobytes.`);
console.log();
console.log(theEntireWorlde.length + " words.");
console.log(template.blocks.length + " total blocks..");
