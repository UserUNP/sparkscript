const fs = require("fs");
const df = require("../../").default;
// https://github.com/PrismarineJS/minecraft-data/blob/master/data/pc/1.19.2/blocks.json
const blocksjson = JSON.parse(fs.readFileSync("./blocks.json")).filter(b => b.boundingBox == "block"); // 1.19.2 blocks

const t = df("blocks list", e => {
  let buffer = [];
  const items = [];

  for (let i = 0; i < blocksjson.length; i++) {
    const blk = blocksjson[i];
    if (i!=0 && i % 50 == 0) {
      const chunk = e.mc("minecraft:book", `${items.length+1}`, 1);
      chunk.addLore(buffer.join(","));
      items.push(chunk);
      buffer = [];
    }
    if (i == blocksjson.length-1) {
      const chunk = e.mc("minecraft:book", `${items.length+1}`, 1);
      chunk.addLore(buffer.join(","));
      items.push(chunk);
      break;
    }
    buffer.push(blk.name);
  }
  
  e.func("initBlocks");
  e.setVar("CreateList", e.var("blocksList"))
  e.setVar("=", e.var("blocksCount"), e.num(blocksjson.length));

  buffer = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (i!=0 && i % 26 == 0) {
      e.setVar("AppendValue", e.var("blocksList"), ...buffer);
      buffer = [];
    }
    if (i == items.length-1) {
      e.setVar("AppendValue", e.var("blocksList"), ...buffer);
      break;
    }
    buffer.push(item);
  }

 });

console.log(t.export().compressed)

