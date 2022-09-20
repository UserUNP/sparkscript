import MinecraftColor from "./MinecraftColor";
import SimpleMinecraftString from "./SimpleMinecraftString";
import { SerializedSimpleMCString } from "./SimpleMinecraftString";

export type SerializedMCString = SerializedSimpleMCString[];

export default class MinecraftString {
	
	/**
	 * Object containing the style codes and their corresponding style.
	 */
	static readonly styleMap = {
		"r": "reset",
		"k": "obfuscated",
		"l": "bold",
		"n": "underlined",
		"o": "italic",
		"m": "strikethrough"
	} as {[code:string]:string};

	/**
	 * Apply the obfuscated style to the string.
	 * @param text The text to obfuscate.
	 * @returns A new Minecraft string with obfuscated text.
	 */
	static obfuscated(text: string) {
		return new SimpleMinecraftString(text, { obfuscated: true });
	}

	/**
	 * Apply the bold style to the string.
	 * @param text The text to bold.
	 * @returns A new Minecraft string with bold text.
	 */
	static bold(text: string) {
		return new SimpleMinecraftString(text, { bold: true });
	}

	/**
	 * Apply the italic style to the string.
	 * @param text The text to italicize.
	 * @returns A new Minecraft string with italicized text.
	 */
	static italic(text: string) {
		return new SimpleMinecraftString(text, { italic: true });
	}

	/**
	 * Apply the underline style to the string.
	 * @param text The text to underline.
	 * @returns A new Minecraft string with underlined text.
	 */
	static underlined(text: string) {
		return new SimpleMinecraftString(text, { underlined: true });
	}

	/**
	 * Apply the strikethrough style to the string.
	 * @param text The text to strikethrough.
	 * @returns A new Minecraft string with strikethrough text.
	 */
	static strikethrough(text: string) {
		return new SimpleMinecraftString(text, { strikethrough: true });
	}
	
	/**
	 * Regular expression to match Minecraft color & style codes.
	 */
	static readonly regex = /§[\dA-FK-OR].*?(?=§[\dA-FK-OR])|§[\dA-FK-OR].*/gi;
	static readonly colorRegex = /§[\dA-F].*?(?=§[\dA-F])|§[\dA-F].*/gi;
	static readonly styleRegex = /§[K-OR].*?(?=§[K-OR])|§[K-OR].*/gi;

	/**
	 * The segments of the Minecraft string.
	 */
	segments: SimpleMinecraftString[] = [];
	text: string;
	raw: string;

	/**
	 * Construct a Minecraft string from a string of text,
	 * can include color and style codes.
	 * @param text The text to parse.
	 */
	constructor(text: string) {
		text = `§f${text}`;
		this.raw = text;
		const colorSegments = text.match(MinecraftString.colorRegex);
		if(!colorSegments) throw new Error("??? what the..");
		for(let colorSegment of colorSegments) {
			const color = MinecraftColor.fromCode(colorSegment.substring(1,2));
			const styleSegments = colorSegment.match(MinecraftString.styleRegex);
			
			colorSegment = colorSegment.replace(new RegExp(`§${colorSegment.substring(1,2)}`, "g"), "");
			if(styleSegments) colorSegment = colorSegment.replace(new RegExp(`${styleSegments.join("|")}`, "g"), "");

			const colorSegmentStyle: {[key:string]:MinecraftColor|boolean} = {
				color,
				obfuscated: false,
				bold: false,
				strikethrough: false,
				underlined: false,
				italic: false
			};

			if(colorSegment.length > 0) this.segments.push(new SimpleMinecraftString(colorSegment, { color }));
			if(styleSegments) for(let styleSegment of styleSegments) {
				const style = MinecraftString.styleMap[styleSegment.substring(1,2)];
				styleSegment = styleSegment.replace(new RegExp(`§${styleSegment.substring(1,2)}`, "g"), "");
				colorSegmentStyle[style] = true;
				if(styleSegment.length > 0) this.segments.push(new SimpleMinecraftString(styleSegment, {...colorSegmentStyle, [style]: true }));
				colorSegment = colorSegment.replace(styleSegment, "");
			}
		}
		this.text = this.segments.map(s => s.text).join("");
	}

	/**
	 * Export the Minecraft string to a list of simple Minecraft strings.
	 * @returns Vanilla Minecraft text with the given formatting.
	 */
	export(nbt: boolean = false) {
		return this.segments.map(s => s.export(nbt));
	}
}
