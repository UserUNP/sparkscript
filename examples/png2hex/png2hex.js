const {default: df, components: { MinecraftColor }} = require("../../");
const PNG = require("pngjs").PNG;
const fs = require("fs");

new PNG({}).parse(fs.readFileSync("./image.png"), (_, png) => {
  if (_) throw _;
  const width = png.width;
  const height = png.height;
  png = png.data;

  const pixels = [];
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = (width * y + x) << 2;
      pixels.push({red: png[idx], green: png[idx+1], blue: png[idx+2]});
    }
  }

  const t = df("bruh", (e, s) => {

    s.author = "UserUNP";
    const listVar = e.var("hexValues", "local");

    e.func("loadImg");
    e.setVar("CreateList", listVar);
    
    let buffer = [];
    for (let i = 0; i < pixels.length; i++) {
      const color = new MinecraftColor(pixels[i]);
      if (i!=0 && i % 26 == 0) {
        e.setVar("AppendValue", listVar, ...buffer);
        buffer = [];
      }
      if (i == pixels.length-1) {
        e.setVar("AppendValue", listVar, ...buffer);
        buffer = [];
      }
      buffer.push(e.txt(color.toString()));
    }

  });

  console.log(t.export().compressed);

});


