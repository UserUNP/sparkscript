import {Template} from "../src/index";

describe("Template", () => {
	it("should create an instance", () => {
		expect(new Template()).toBeTruthy();
	});
	it("should create an instance with name and author", () => {
		expect(new Template("test", "test")).toBeTruthy();
	});

});
