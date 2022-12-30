import MCStyleCode from "../../types/MCStyleCode";
import MCStyle from "../../types/MCStyle";
import MinecraftColor from "./MinecraftColor";
import SimpleMinecraftString from "./SimpleMinecraftString";
import { SimpleRawMCString, IsegmentOptions } from "./SimpleMinecraftString";
import MCColorCode from "../../types/MCColorCode";

export type RawMCString<UseBytes extends boolean, Segments extends string[]> = SimpleRawMCString<UseBytes, Segments[number]>[];

/**
 * ### Minecraft exportable string.
 *
 * @template T Raw string to be parsed.
 */
export default class MinecraftString
<T extends string> {

	/**
	 * Object containing the style codes and their corresponding style.
	 */
	static readonly styleMap = {
		"l": "bold",
		"o": "italic",
		"m": "strikethrough",
		"n": "underlined",
		"k": "obfuscated",
		"r": "reset",
	} as const;

	/**
	 * Apply the obfuscated style to the string.
	 * @param text The text to obfuscate.
	 * @returns A new Minecraft string with obfuscated text.
	 */
	static obfuscated<T extends string>(text: T, color: MinecraftColor<number, number, number> = MinecraftColor.from("f")) {
		return new SimpleMinecraftString(text, { obfuscated: true, color });
	}

	/**
	 * Apply the bold style to the string.
	 * @param text The text to bold.
	 * @returns A new Minecraft string with bold text.
	 */
	static bold<T extends string>(text: T, color: MinecraftColor<number, number, number> = MinecraftColor.from("f")) {
		return new SimpleMinecraftString(text, { bold: true, color });
	}

	/**
	 * Apply the italic style to the string.
	 * @param text The text to italicize.
	 * @returns A new Minecraft string with italicized text.
	 */
	static italic<T extends string>(text: T, color: MinecraftColor<number, number, number> = MinecraftColor.from("f")) {
		return new SimpleMinecraftString(text, { italic: true, color });
	}

	/**
	 * Apply the underline style to the string.
	 * @param text The text to underline.
	 * @returns A new Minecraft string with underlined text.
	 */
	static underlined<T extends string>(text: T, color: MinecraftColor<number, number, number> = MinecraftColor.from("f")) {
		return new SimpleMinecraftString(text, { underlined: true, color });
	}

	/**
	 * Apply the strikethrough style to the string.
	 * @param text The text to strikethrough.
	 * @returns A new Minecraft string with strikethrough text.
	 */
	static strikethrough<T extends string>(text: T, color: MinecraftColor<number, number, number> = MinecraftColor.from("f")) {
		return new SimpleMinecraftString(text, { strikethrough: true, color });
	}

	static get emptyString() {
		return new MinecraftString("§f ");
	}

	/**
	 * Regular expression to match Minecraft color & style codes.
	 */
	static readonly regex = /§[\dA-FK-OR].*?(?=§[\dA-FK-OR])|§[\dA-FK-OR].*/gi;
	static readonly colorRegex = /§[\dA-F].*?(?=§[\dA-F])|§[\dA-F].*/gi;
	static readonly styleRegex = /§[K-OR].*?(?=§[K-OR])|§[K-OR].*/gi;
	static readonly javaStringLimit = 2_147_483_647;
	static readonly mcStringLimit = 262144;

	/**
	 * The segments of the Minecraft string.
	 */
	segments: SimpleMinecraftString<string>[] = [];
	/**
	 * Clean stripped coloring & styling codes text
	 */
	text: string;
	raw: `§f${T}`;

	/**
	 * Construct a Minecraft string from a string of text,
	 * can include color and style codes.
	 * @param text The text to parse.
	 * @param unsafe Test the length against the Java string limit instead of Minecraft's.
	 */
	constructor(text: `§f${T}`, unsafe: boolean=false) {
		text = text.indexOf("§f") == -1 ? `§f${text}` as `§f${T}` : text;
		if(text.length > MinecraftString.mcStringLimit || text.length > MinecraftString.javaStringLimit) {
			if(unsafe) throw new Error(`A Minecraft string shouldn't surpass the Java String limit. Overshot by ${text.length-MinecraftString.javaStringLimit} chars, includes 2 chars for the default text color "§f".`);
			else throw new Error(`String too big. limit is ${MinecraftString.mcStringLimit} chars. Overshot by ${text.length-MinecraftString.mcStringLimit} chars, includes 2 chars for the default text color "§f".`)
		}
		this.raw = text;
		const colorSegments = text.match(MinecraftString.colorRegex);
		if(!colorSegments) throw new Error("??? what the..");
		for(let colorSegment of colorSegments) {
			const color = MinecraftColor.fromCode(colorSegment.substring(1,2) as MCColorCode);
			const styleSegments = colorSegment.match(MinecraftString.styleRegex);

			colorSegment = colorSegment.replace(new RegExp(`§${colorSegment.substring(1,2)}`, "g"), "");
			if(styleSegments) colorSegment = colorSegment.replace(new RegExp(`${styleSegments.join("|")}`, "g"), "");

			const colorSegmentStyleOpts: IsegmentOptions = {
				color,
				obfuscated: false,
				bold: false,
				strikethrough: false,
				underlined: false,
				italic: false
			};

			if(colorSegment.length > 0) this.segments.push(new SimpleMinecraftString(colorSegment, { color }));
			if(styleSegments) for(let styleSegment of styleSegments) {
				const style = MinecraftString.styleMap[styleSegment.substring(1,2) as MCStyleCode] as Exclude<MCStyle, "reset">;
				colorSegmentStyleOpts[style] = true;
				styleSegment = styleSegment.replace(new RegExp(`§${styleSegment.substring(1,2)}`, "g"), "");
				if(styleSegment.length > 0) this.segments.push(new SimpleMinecraftString(styleSegment, {...colorSegmentStyleOpts, [style]: true }));
				colorSegment = colorSegment.replace(styleSegment, "");
			}
		}
		this.text = this.segments.map(s => s.text).join("");
	}

	/**
	 * Export the Minecraft string to a list of simple Minecraft strings.
	 * @returns Vanilla Minecraft text with the given formatting.
	 */
	export<T extends boolean = false>(nbt: T=false as T): RawMCString<T, this["segments"][number]["text"][]> {
		return this.segments.map(s => s.export(nbt));
	}
}
