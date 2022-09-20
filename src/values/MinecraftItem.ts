import Value from "../core/components/Value";
import MinecraftString from "../core/components/minecraft/MinecraftString";
import nbt from "nbt-ts";

type ValuesOf<T> = T[keyof T];

export interface Imetadata {
	id: `minecraft:${string}`;
	Count: nbt.Byte;
	tag: {
		Tags: string[];
		PublicBukkitValues: {
			[key: `hypercube:${string}`]:	| number
											| bigint
											| string
		}
		display: {
			Name: string | MinecraftString,
			Lore: (string | MinecraftString)[]
		}
	}
}

export default class MinecraftItem extends Value {
	
	/**
	 * Create a Minecraft item value.
	 * @param count Amount of items.
	 * @param id Item ID name.
	 * @param name Item name.
	 */
	constructor(public id: Imetadata["id"], public count: number, public name: Imetadata["tag"]["display"]["Name"], slot?: number) {
		if(typeof name === "string") {
			name = name.indexOf("minecraft:") == -1 ? `minecraft:${name}` : name
			name = new MinecraftString(name);
		}
		super("item", { item: {
			id,
			Count: new nbt.Byte(count),
			tag: {
				Tags: [],
				PublicBukkitValues: {},
				display: {
					Name: JSON.stringify(name.export()),
					Lore: []
				}
			}
		} as Imetadata } as {item: Imetadata}, slot);
	}

	setTag(key: string, value: ValuesOf<Imetadata["tag"]["PublicBukkitValues"]>): MinecraftItem {
		this.data.raw.item.tag.PublicBukkitValues[`hypercube:${key}`] =	
			typeof value==="number" ? new nbt.Int(value).value : `${value}`;
		return this;
	}

	setVanillaTag(tag: string) {
		this.data.raw.item.tag.Tags.push(`${tag}`);
		return this;
	}

	export(containingBlockArguments: Value[]) {
		const result = super.export(containingBlockArguments);
		result.item.data.item = nbt.stringify(result.item.data.item);
		return result;
	}

}
