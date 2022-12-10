import ConditionalBlock from "../src/core/components/ConditionalBlock";

class TesterCond
extends ConditionalBlock<"control", "AllPlayers"> {

  constructor() {
    super("control", "Skip", [], true, "AllPlayers");
  }
}

describe("conditional block", () => {

  const tester = new TesterCond;

  it("is an action but doesn't inherit the action class", () => {
    if(!(tester.action && tester.target && tester.isInverted && tester.toString() === "<@>{ [ConditionalBlock] }")) throw new Error("literally 1986.");
  });

  it("has bracket pairs", () => {
    expect(tester).toHaveProperty("openingBracket");
    expect(tester).toHaveProperty("closingBracket");
    if(!tester.openingBracket && tester.closingBracket) throw new Error("ConditionalBlock was not initialized with bracket pairs, this is devistating and will continue to be a disappointment as we know it.");
  });
})
