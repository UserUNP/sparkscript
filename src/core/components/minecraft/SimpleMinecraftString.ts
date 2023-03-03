import MinecraftColor, { ColorObj } from "./MinecraftColor";
import { Byte } from "nbt-ts";

const ifNBT = <T extends boolean>(nbt: T, mcstring: SimpleMinecraftString<string>, property: Exclude<keyof IsegmentOptions, "color">): T extends true ? Byte : T extends false ? boolean : never => nbt ? (new Byte(mcstring[property] ? 1 : 0) as T extends true ? Byte : T extends false ? boolean : never ) : (mcstring[property] as T extends true ? Byte : T extends false ? boolean : never );

export interface SimpleRawMCString
<UseBytes extends boolean, Text extends string> {
	text: Text;
	color?: `#${string}`;
	bold: UseBytes extends true ? Byte : boolean;
	italic: UseBytes extends true ? Byte : boolean;
	underlined: UseBytes extends true ? Byte : boolean;
	strikethrough: UseBytes extends true ? Byte : boolean;
	obfuscated: UseBytes extends true ? Byte : boolean;
}

type TsegmentOptions
<TColor extends ColorObj = ColorObj> = {
	color: MinecraftColor<TColor["red"], TColor["green"], TColor["blue"]>;
	bold: boolean;
	italic: boolean;
	underlined: boolean;
	strikethrough: boolean;
	obfuscated: boolean;
};
export interface IsegmentOptions
<TColor extends ColorObj = ColorObj, TObj extends TsegmentOptions<TColor> = TsegmentOptions<TColor>> {
	color?: MinecraftColor<TColor["red"], TColor["green"], TColor["blue"]>;
	bold?: TObj["bold"];
	italic?: TObj["italic"];
	underlined?: TObj["underlined"];
	strikethrough?: TObj["strikethrough"];
	obfuscated?: TObj["obfuscated"];
}

/**
 * ### Simple Minecraft string.
 *
 * @template T String to apply effects on.
 * @template Color Color object with RGB values.
 * @template U Effects to apply.
 */
export default class SimpleMinecraftString
<T extends string, Color extends ColorObj = ColorObj, U extends IsegmentOptions<Color> = IsegmentOptions<Color>> {

	static from(obj: SimpleRawMCString<false, string>): SimpleMinecraftString<string> {
		return new SimpleMinecraftString(obj.text, {
			color: obj.color ? MinecraftColor.from(obj.color) : undefined,
			bold: (typeof obj.bold==="boolean")?obj.bold:!!obj.bold,
			italic: (typeof obj.italic==="boolean")?obj.italic:!!obj.italic,
			underlined: (typeof obj.underlined==="boolean")?obj.underlined:!!obj.underlined,
			strikethrough: (typeof obj.strikethrough==="boolean")?obj.strikethrough:!!obj.strikethrough,
			obfuscated: (typeof obj.obfuscated==="boolean")?obj.obfuscated:!!obj.obfuscated
		});
	}

	bold: U["bold"];
	italic: U["italic"];
	underlined: U["underlined"];
	strikethrough: U["strikethrough"];
	obfuscated: U["obfuscated"];
	color: U["color"];

	/**
	 * Construct a Minecraft string with basic formatting & options.
	 * @param text The text to format.
	 * @param options The options to apply to the string.
	 * @returns A new Minecraft string with the given formatting.
	 */
	constructor(public text: T, options: U = {} as U) {
		this.bold = options.bold || false;
		this.italic = options.italic || false;
		this.underlined = options.underlined || false;
		this.strikethrough = options.strikethrough || false;
		this.obfuscated = options.obfuscated || false;
		const colors = MinecraftColor.colors.white.map(c => parseInt(c, 16));
		this.color = options.color || new MinecraftColor({red: colors[0], green: colors[1], blue: colors[2]});
	}

	/**
	 * Export the Minecraft string as a JSON object.
	 * @returns The serialized version of this string.
	 */
	export<T extends boolean = false>(nbt: T): SimpleRawMCString<T, this["text"]> {
		return {
			text: this.text,
			color: this.color?.toString(false),
			bold: ifNBT(nbt, this, "bold"),
			italic: ifNBT(nbt, this, "italic"),
			underlined: ifNBT(nbt, this, "underlined"),
			strikethrough: ifNBT(nbt, this, "strikethrough"),
			obfuscated: ifNBT(nbt, this, "obfuscated")
		};
	}

	/**
	 * @param altCode An alternate code symbol to use.
	 * @returns Vanilla Minecraft text with the given formatting.
	 */
	toString(altCode: string = "&"): string {
		const color = this.color ? this.color.toString(true) : "";
		const styles = [];
		if (this.bold) styles.push("l");
		if (this.italic) styles.push("o");
		if (this.strikethrough) styles.push("m");
		if (this.underlined) styles.push("n");
		if (this.obfuscated) styles.push("k");
		return `${altCode?styles:""}${styles.join(altCode)}${color}${this.text}`;
	}
}
