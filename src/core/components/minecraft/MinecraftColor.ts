export default class MinecraftColor {

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
    } as {[name:string]:[string,string,string]};

	/**
	 * Object map containing the Minecraft color codes and their corresponding names.
	 */
	static readonly colorMap = {
		"4": "dark_red",
        "c": "red",
        "6": "gold",
        "e": "yellow",
        "2": "dark_green",
        "a": "green",
        "b": "aqua",
        "3": "dark_aqua",
        "1": "dark_blue",
        "9": "blue",
        "d": "light_purple",
        "5": "dark_purple",
        "f": "white",   
        "7": "gray",
        "8": "dark_gray",
        "0": "black"
	};

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
		return new MinecraftColor(parseInt(rgb[0], 16), parseInt(rgb[1], 16), parseInt(rgb[2], 16));

	}

	/**
	 * Returns a new MinecraftColor from the given hex string.
	 * @param hex Hex string representation of the color.
	 * @returns A new MinecraftColor.
	 */
	static fromHex(hex: `#${string}`) {
		hex.replace("#", "");
		if(hex.length !== 6) throw new Error(`Invalid hex color "${hex}". I don't think you need more than 6 characters for a hex color`);
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		return new MinecraftColor(r, g, b);
	}

	/**
	 * Turn vanilla Minecraft color code into a MinecraftColor object.
	 * @param hexOrCode Hex string or Minecraft color code.
	 * @returns A new MinecraftColor.
	 */
	static from(hexOrCode: `#${string}` | keyof typeof MinecraftColor.colorMap) {
		if(hexOrCode.startsWith("#")) return MinecraftColor.fromHex(hexOrCode as `#${string}`);
		return MinecraftColor.fromCode(hexOrCode as keyof typeof MinecraftColor.colorMap);
	}

	constructor(...values: number[]);
	/**
	 * Returns a new MinecraftColor with the given RGB values.
	 * @param red Red amount.
	 * @param green Green amount.
	 * @param blue Blue amount.
	 */
	constructor(public red: number, public green: number, public blue: number) {
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
	toString(spigotmc: boolean = false, codeSymbol: string = "&") {
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
			return result;
		}
		return `#${r}${g}${b}`;
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
		throw new Error("Not a vanilla color"); 
	}


}
