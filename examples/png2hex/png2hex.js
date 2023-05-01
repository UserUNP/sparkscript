const {
	default: df,
	components: { MinecraftColor },
} = require("../../");
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
			pixels.push({
				red: png[idx],
				green: png[idx + 1],
				blue: png[idx + 2],
			});
		}
	}

	const template = df("Image data", e => {
		e.func("loadedImage");

		const items = [];
		e.defAction("addValues", (pixels) => {
			const chunk = e.mc(
				"minecraft:book",
				`imagechunk.${items.length + 1}`,
				1
			);
			chunk.addLore(`${pixels.join(",")}`);
			items.push(chunk);
			console.log(`finished chunk ${items.length} (${pixels.length})`);
		});

		const listVar = e.var("imageData", "local");
		e.setVar("CreateList", listVar);

		let buffer = [];
		for (let i = 0; i < pixels.length; i++) {
			const color = new MinecraftColor(pixels[i]);
			if (i != 0 && i % width == 0) {
				e.action.addValues(buffer);
				buffer = [];
			}
      buffer.push(color.toString());
			if (i == pixels.length - 1) {
				e.action.addValues(buffer);
			}
		}

		buffer = [];
		for (let i = 0; i < items.length; i++) {
			if (i != 0 && i % 26 == 0) {
				e.setVar("AppendValue", listVar, ...buffer);
				buffer = [];
			}
			buffer.push(items[i]);
			if (i == items.length - 1) {
				e.setVar("AppendValue", listVar, ...buffer);
			}
		}
	});

	const code = template.export();

	const SET_TXT_WITH_URL = true;

	console.log(
		"Finished writing & exporting.. attempting to write to 'image_data.txt' and send to recode."
	);

	fs.writeFileSync(
		"image_data.txt",
		SET_TXT_WITH_URL
			? "https://dfonline.dev/edit?template=" + code.compressed
			: code.compressed
	);

	console.log(
		`DONE. ${fs.statSync("image_data.txt").size / 1000} Kilobytes.`
	);

	console.log();
  console.log(width + "x" + height);
	console.log(pixels.length + " pixels");
	console.log(template.blocks.length + " total blocks..");
});
