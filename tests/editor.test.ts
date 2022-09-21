import "../src/mapper";
import { PlayerAction } from "../src/codeblocks/Player";
import df from "../src/index";

describe("editor", () => {

  it("should create a new template", () => {
    const template = df("test", () => { });
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

  it("can define & execute actions", () => {
    const template = df("test", (e) => {
      e.defAction("kick", () => e.player.action("Kick"));
      e.defAction("send", "SendMessage");

      e.action.send(e.text("Hello world!"), "test");
      e.action.kick();
    });
    expect(template).toBeTruthy();
  });

});

describe("library mode", () => {

  it("has a property to enable library mode", () => {
    expect(df("test", (_, s) => {
      s.library = true;
    }).library).toBeTruthy();
  })

  it("has a default initializer")

  it("can use arguments", () => {
    expect(df("test", (_, s) => {
      s.library = true;
      s.lib.args = [
        s.lib.arg(df.ANY, "arg1", "test argument 1"),
        s.lib.arg(df.ANY, "arg2", "test argument 2"),
        s.lib.arg(df.ANY, "arg3", "test argument 3"),
      ]
    }).library.args.length).toEqual(3);
  })

})
