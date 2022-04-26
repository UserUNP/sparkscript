import { PlayerAction } from "../src/codeblocks/Player";
import df from "../src/index";

describe("editor", () => {

	it("should create a new template", () => {
		const template = df("test", () => {});
		expect(template).toBeTruthy();
		expect(template.blocks).toStrictEqual([]);
	});

	it('should create be able to add codeblocks', () => {
		const template = df("test", (e) => {
			e.player.action("Kick");
		});
		expect(template.blocks).toStrictEqual([
			new PlayerAction("Kick")
		]);
	});

	it("can make values", () => {
		const template = df("test", (e) => {
			e.player.action("SendMessage", e.text("Hello world!"));
		});
		expect(template).toBeTruthy();
	});

});