import Value from "../core/components/Value";
import MinecraftString, { RawMCString } from "../core/components/minecraft/MinecraftString";
const NBT = require("nbt-ts");

type ValuesOf<T> = T[keyof T];

export interface Imetadata {
	id: `minecraft:${string}`;
	Count: typeof NBT.Byte;
	tag: {
		Tags: string[];
		PublicBukkitValues: Record<`hypercube:${string}`, number | bigint | string>
		display: {
			Name: RawMCString,
			Lore: RawMCString[]
		}
	}
}

export default class MinecraftItem extends Value {

	static fromNBT(value: string, s?: number) {
		const v = NBT.parse(value);
		return new MinecraftItem(v.id, JSON.parse(v.tag.display.Name), v.Count, s)
	}
	
	/**
	 * Create a Minecraft item as a DiamondFire value.
	 * @param id Item ID name.
	 * @param count Amount.
	 * @param name Item name.
	 */
	constructor(public id: Imetadata["id"], public name: Imetadata["tag"]["display"]["Name"] | MinecraftString | string, public count: Imetadata["Count"] | number = 1, slot?: number) {
		id = id.indexOf("minecraft:") == -1 ? `minecraft:${id}` : id
		if(typeof name === "string") name = new MinecraftString(name);
		super("item", { item: {
			id,
			Count: typeof count === "number" ? new NBT.Byte(count) : count,
			tag: {
				Tags: [],
				PublicBukkitValues: {},
				display: {
					Name: name instanceof MinecraftString ? name.export() : name,
					Lore: []
				}
			}
		} as Imetadata } as {item: Imetadata}, slot);
	}

	setTag(key: string, value: ValuesOf<Imetadata["tag"]["PublicBukkitValues"]>): MinecraftItem {
		this.data.raw.item.tag.PublicBukkitValues[`hypercube:${key}`] =	
			typeof value==="number" ? new NBT.Int(value).value : `${value}`;
		return this;
	}

	addVanillaTag(tag: string) {
		this.data.raw.item.tag.Tags.push(`${tag}`);
		return this;
	}

	export(containingBlockArguments: Value[]) {
		const result = super.export(containingBlockArguments);
		result.item.data.item.tag.display.Name = JSON.stringify(result.item.data.item.tag.display.Name);
		result.item.data.item = NBT.stringify(result.item.data.item);
		return result;
	}

}
