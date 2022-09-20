import MinecraftColor from "./MinecraftColor";
import { Byte } from "nbt-ts";

export interface SimpleRawMCString {
	text: string,
	color: string,
	bold: boolean | Byte,
	italic: boolean | Byte,
	underlined: boolean | Byte,
	strikethrough: boolean | Byte,
	obfuscated: boolean | Byte,
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
	export(nbt: boolean = false): SimpleRawMCString {
		return {
			text: this.text,
			color: this.color.toString(),
			bold: nbt ? new Byte(this.bold?1:0) : this.bold,
			italic: nbt ? new Byte(this.italic?1:0) : this.italic,
			underlined: nbt ? new Byte(this.underlined?1:0) : this.underlined,
			strikethrough: nbt ? new Byte(this.strikethrough?1:0) : this.strikethrough,
			obfuscated: nbt ? new Byte(this.obfuscated?1:0) : this.obfuscated
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
	
	static from(obj: SimpleRawMCString): SimpleMinecraftString {
		return new SimpleMinecraftString(obj.text, {
			color: MinecraftColor.from(obj.color),
			bold: (typeof obj.bold==="boolean")?obj.bold:!!obj.bold.value,
			italic: (typeof obj.italic==="boolean")?obj.italic:!!obj.italic.value,
			underlined: (typeof obj.underlined==="boolean")?obj.underlined:!!obj.underlined.value,
			strikethrough: (typeof obj.strikethrough==="boolean")?obj.strikethrough:!!obj.strikethrough.value,
			obfuscated: (typeof obj.obfuscated==="boolean")?obj.obfuscated:!!obj.obfuscated.value
		});
	}

}
