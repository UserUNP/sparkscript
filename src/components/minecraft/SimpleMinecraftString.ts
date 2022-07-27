import MinecraftColor from "./MinecraftColor";

export interface serializedSimpleMCString {
	text: string,
	color: string,
	bold: boolean,
	italic: boolean,
	underlined: boolean,
	strikethrough: boolean,
	obfuscated: boolean
}

interface options {
	color?: MinecraftColor,
	bold?: boolean,
	italic?: boolean,
	underlined?: boolean,
	strikethrough?: boolean,
	obfuscated?: boolean
}

export default class SimpleMinecraftString {
	
	bold: boolean;
	italic: boolean;
	underlined: boolean;
	strikethrough: boolean;
	obfuscated: boolean;
	color: MinecraftColor;

	/**
	 * Construct a Minecraft string with basic formatting & options.
	 * @param text The text to format.
	 * @param options The options to apply to the string.
	 * @returns A new Minecraft string with the given formatting.
	 */
	constructor(public text: string, options: options = {}) {
		this.bold = options.bold || false;
		this.italic = options.italic || false;
		this.underlined = options.underlined || false;
		this.strikethrough = options.strikethrough || false;
		this.obfuscated = options.obfuscated || false;
		this.color = options.color || new MinecraftColor(...MinecraftColor.colors.white.map(c => parseInt(c, 16)));
	}

	/**
	 * Export the Minecraft string as a JSON object.
	 * @returns The serialized version of this string.
	 */
	export(): serializedSimpleMCString {
		return {
			text: this.text,
			color: this.color.toString(),
			bold: this.bold,
			italic: this.italic,
			underlined: this.underlined,
			strikethrough: this.strikethrough,
			obfuscated: this.obfuscated
		};
	}

	/**
	 * 
	 * @param altCode An alternate code symbol to use.
	 * @returns Vanilla Minecraft text with the given formatting.
	 */
	toString(altCode: string = "&"): string {
		let color = this.color.toString(true);
		let styles = [];
		if (this.bold) styles.push("l");
		if (this.italic) styles.push("o");
		if (this.underlined) styles.push("n");
		if (this.strikethrough) styles.push("s");
		if (this.obfuscated) styles.push("k");
		return `${altCode?styles:""}${styles.join(altCode)}${color}${this.text}`;
	}
	
	static from(obj: serializedSimpleMCString): SimpleMinecraftString {
		return new SimpleMinecraftString(obj.text, {
			color: MinecraftColor.from(obj.color),
			bold: obj.bold,
			italic: obj.italic,
			underlined: obj.underlined,
			strikethrough: obj.strikethrough,
			obfuscated: obj.obfuscated
		});
	}

}
