import { ConditionalBlock } from "../src/core/components/";

class TesterCond
extends ConditionalBlock<"control", "Skip", "AllPlayers"> {

  constructor() {
    super("control", "Skip", [], true, "AllPlayers");
  }
}

describe("conditional block", () => {

  const tester = new TesterCond;

  it("is an action but doesn't inherit the action class", () => {
    if(!(tester.action && tester.target && tester.isInverted && tester instanceof ConditionalBlock)) throw new Error("literally 1984.");
  });

  it("has bracket pairs", () => {
    expect(tester).toHaveProperty("openingBracket");
    expect(tester).toHaveProperty("closingBracket");
    if(!tester.openingBracket && tester.closingBracket) throw new Error("ConditionalBlock was not initialized with bracket pairs, this is devistating and will continue to be a disappointment as we know it.");
  });
})
