import NBT = require("nbt-ts");
import { RawMCString } from "../core/components/minecraft/MinecraftString";
import { Value, MinecraftString } from "../core/components";
import { ValueOf, removeEmptyItems } from "../common/utilities";
import { RawDFValue } from "../core/components/Value";

export type SafeMetadata<ID extends `minecraft:${string}` = `minecraft:${string}`> = ItemMetadata<true, ID>;
export type RawMetadata<ID extends `minecraft:${string}` = `minecraft:${string}`> = ItemMetadata<false, ID>;

export interface ItemMetadata
<Safe extends boolean = false, ID extends `minecraft:${string}` = `minecraft:${string}`> {
	id: ID;
	Count: Safe extends true ? number : NBT.Byte;
	tag: {
		Tags: string[];
		PublicBukkitValues: Record<`hypercube:${string}`, number | bigint | string>;
		display: {
			Name: Safe extends true ? RawMCString<false, string[]> | MinecraftString<string> : string;
			Lore: Safe extends true ? RawMCString<false, string[]>[] : string[];
		}
	}
}

export interface Iitem
	<Safe extends boolean = false, ID extends `minecraft:${string}` = `minecraft:${string}`> {
	item: ItemMetadata<Safe, ID> | string;
}

export default class MinecraftItem
<T extends string = string, ID extends `minecraft:${string}` = `minecraft:${string}`>
extends Value<"item", Iitem<boolean, ID>> {

	static fromNBT(value: string, s?: number) {
		const v = NBT.parse(value) as unknown as RawMetadata;
		const item = new MinecraftItem(v.id, JSON.parse(typeof v.tag.display.Name === "string" ? v.tag.display.Name : NBT.stringify(v.tag.display.Name)), v.Count.value, s);
		return item;
	}

	/**
	 * Create a Minecraft item as a DiamondFire value.
	 * @param id Item ID name.
	 * @param count Amount.
	 * @param name Item name.
	 */
	constructor(
		public readonly id: SafeMetadata<ID>["id"],
		public name: SafeMetadata<ID>["tag"]["display"]["Name"] | string,
		public count: SafeMetadata<ID>["Count"] = 1,
		slot?: number
	) {
		id = id.indexOf("minecraft:") == -1 ? `minecraft:${id}` as ID : id
		if (typeof name === "string") name = new MinecraftString(name as `§f§r${T}`);
		super("item", {
			item: {
				id,
				Count: count,
				tag: {
					Tags: [],
					PublicBukkitValues: {},
					display: {
						Name: name instanceof MinecraftString ? name.export() : name,
						Lore: []
					}
				}
			}
		}, slot);
	}

	setTag(key: string, value: ValueOf<SafeMetadata["tag"]["PublicBukkitValues"]>) {
		(this.data.raw.item as SafeMetadata<ID>).tag.PublicBukkitValues[`hypercube:${key}`] =
			typeof value === "number" ? new NBT.Int(value).value : `${value}`;
		return this;
	}

	addVanillaTag(tag: string) {
		(this.data.raw.item as SafeMetadata<ID>).tag.Tags.push(`${tag}`);
		return this;
	}

	addLore<T extends string>(text: T | MinecraftString<T>) {
		if (typeof text === "string") (this.data.raw.item as SafeMetadata<ID>).tag.display.Lore.push(new MinecraftString(`§f§r${text}`).export())
		else (this.data.raw.item as SafeMetadata<ID>).tag.display.Lore.push(text.export());
		return this;
	}

	setLore<T extends string>(index: number, text: T | MinecraftString<T>) {
		const string = typeof text === "string" ? new MinecraftString(`§f§r${text}`) : text;
		const display = (this.data.raw.item as SafeMetadata<ID>).tag.display;
		display.Lore[index] = string.export();
		display.Lore = removeEmptyItems(display.Lore, MinecraftString.emptyString.export());
	}

	export(containingBlockArguments: Value[]) {
		const result = { ...super.export(containingBlockArguments) };
		result.item.data.item = result.item.data.item as RawMetadata<ID>;
		if (typeof result.item.data.item === "string") throw new Error("You either a smart fella or a fart smella");

		const display = (result.item.data.item as RawMetadata<ID>).tag.display;
		display.Name = JSON.stringify(result.item.data.item.tag.display.Name);
		display.Lore = removeEmptyItems(display.Lore, JSON.stringify(MinecraftString.emptyString.export())).map(l => JSON.stringify(l));
		result.item.data.item = NBT.stringify(result.item.data.item as unknown as NBT.TagObject);
		return result as RawDFValue<"item", { item: string }>;
	}

}
