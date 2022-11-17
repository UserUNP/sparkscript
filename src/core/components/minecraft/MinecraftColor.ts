export type ColorObj = {red: number, green: number, blue: number}

/**
 * ### Minecraft color value.
 *
 * @template R Red color amount.
 * @template G Green color amount.
 * @template B Blue color amount.
 */
export default class MinecraftColor
<R extends ColorObj["red"], G extends ColorObj["blue"], B extends ColorObj["green"]> {

	/**
	 * Object map containing the Minecraft color codes and their corresponding hex values.
	 */
	static readonly colors = {
        dark_red: ["AA","00","00"],
        red: ["FF","55","55"],
        gold: ["FF","AA","00"],
        yellow: ["FF","FF","55"],
        dark_green: ["00","AA","00"],
        green: ["55","FF","55"],
        aqua: ["55","FF","FF"],
        dark_aqua: ["00","AA","AA"],
        dark_blue: ["00","00","AA"],
        blue: ["55","55","FF"],
        light_purple: ["FF","55","FF"],
        dark_purple: ["AA","00","AA"],
        white: ["FF","FF","FF"],
        gray: ["AA","AA","AA"],
        dark_gray: ["55","55","55"],
        black: ["00","00","00"]
    } as const;

	/**
	 * Object map containing the Minecraft color codes and their corresponding names.
	 */
	static readonly colorMap = {
		"1": "dark_blue",
        "2": "dark_green",
        "3": "dark_aqua",
		"4": "dark_red",
        "5": "dark_purple",
        "6": "gold",
        "7": "gray",
        "8": "dark_gray",
        "9": "blue",
        "0": "black",
        "a": "green",
        "b": "aqua",
        "c": "red",
        "d": "light_purple",
        "e": "yellow",
        "f": "white",
	} as const;

	/**
	 * Returns a new MinecraftColor with the given color code.
	 * @param code Minecraft color code.
	 * @returns A new MinecraftColor.
	 */
	static fromCode(code: keyof typeof MinecraftColor.colorMap) {
		code = code.replace("§", "") as keyof typeof MinecraftColor.colorMap;
		if(!MinecraftColor.colorMap[code]) throw new Error(`Invalid color code "${code}"`);
		const color = MinecraftColor.colorMap[code];
		const rgb = MinecraftColor.colors[color];
		return new MinecraftColor({red: parseInt(rgb[0], 16), green: parseInt(rgb[1], 16), blue: parseInt(rgb[2], 16)});

	}

	/**
	 * Returns a new MinecraftColor from the given hex string.
	 * @param hex Hex string representation of the color.
	 * @returns A new MinecraftColor.
	 */
	static fromHex(hex: `#${string}`) {
		hex.replace("#", "");
		if(hex.length !== 6) throw new Error(`Invalid hex color "${hex}". I don't think you need more than 6 characters for a hex color`);
		const red = parseInt(hex.substr(0, 2), 16);
		const green = parseInt(hex.substr(2, 2), 16);
		const blue = parseInt(hex.substr(4, 2), 16);
		return new MinecraftColor({red, green, blue});
	}

	/**
	 * Turn vanilla Minecraft color code into a MinecraftColor object.
	 * @param hexOrCode Hex string or Minecraft color code.
	 * @returns A new MinecraftColor.
	 */
	static from<T extends `#${string}` | keyof typeof MinecraftColor.colorMap>(hexOrCode: T) {
		if(hexOrCode.startsWith("#")) return MinecraftColor.fromHex(hexOrCode as `#${string}`);
		return MinecraftColor.fromCode(hexOrCode as keyof typeof MinecraftColor.colorMap);
	}

	public red: R;
	public green: G;
	public blue: B;

	/**
	 * Returns a new MinecraftColor with the given RGB values.
	 * @param red Red amount.
	 * @param green Green amount.
	 * @param blue Blue amount.
	 */
	constructor({red, green, blue}: {red: R, green: G, blue: B}) {
		this.red = red; this.green = green; this.blue = blue;
		if(red < 0 || red > 255) throw new Error(`Expected red color to be in range 0 to 255, got ${red}`);
		if(green < 0 || green > 255) throw new Error(`Expected green color to be in range 0 to 255, got ${green}`);
		if(blue < 0 || blue > 255) throw new Error(`Expected blue color to be in range 0 to 255, got ${blue}`);
	}

	/**
	 * Stringify the color into a readable format.
	 * @param spigotmc Should turn into a SpigotMC compatible color code.
	 * @param codeSymbol Character symbol to use for SpigotMC if true.
	 * @returns Hex string representation of the color.
	 */
	toString<IsSpigotMC extends boolean = false, CSymbol extends string = "&">(spigotmc: IsSpigotMC, codeSymbol: CSymbol = "&" as CSymbol) {
		const r = this.red.toString(16);
		const g = this.green.toString(16);
		const b = this.blue.toString(16);
		if(spigotmc) {
			const c = codeSymbol;
			let result = `${c}x`
			result += `${c}${r.substring(0,1)}`;
			result += `${c}${r.substring(1,2)}`;

			result += `${c}${g.substring(0,1)}`;
			result += `${c}${g.substring(1,2)}`;

			result += `${c}${b.substring(0,1)}`;
			result += `${c}${b.substring(1,2)}`;
			return result as IsSpigotMC extends true ? `&x${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}` :`#${string}`;
		}
		return `#${r}${g}${b}` as IsSpigotMC extends true ? `&x${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}${CSymbol}${number}` :`#${string}`;
		//* i went a little frisky with types a bit..
	}

	/**
	 * Turn into the vanilla Minecraft color code if applicable.
	 * @returns The minecraft color code for the color.
	 */
	toCode() {
		for(const code in MinecraftColor.colorMap) {
			const color = MinecraftColor.colorMap[code as keyof typeof MinecraftColor.colorMap];
			const rgb = MinecraftColor.colors[color];
			if(this.red === parseInt(rgb[0], 16) && this.green === parseInt(rgb[1], 16) && this.blue === parseInt(rgb[2], 16)) return code;
		}
		throw new Error("Not a vanilla color. Use toString(true) to make it into a spigotmc compatible color code.");
	}


}
