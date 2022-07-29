import Value from "../components/Value";
import MinecraftString from "../components/minecraft/MinecraftString";
import nbt = require("nbt-ts");

export default class MinecraftItem extends Value {
	
	/**
	 * Create a Minecraft item value.
	 * @param count Amount of items.
	 * @param id Item ID name.
	 * @param name Item name.
	 */
	constructor(public count: number, public id: string, public name: string | MinecraftString, slot?: number) {
		id = `minecraft:${id.replace("minecraft:", "")}`;
		if(typeof name === "string") name = new MinecraftString(name);
		super("item", { item: {
			id,
			Count: new nbt.Byte(count),
			tag: {
				Tags: [],
				PublicBukkitValues: {},
				display: {
					//! i hate mojangson.
					Name: JSON.stringify(name.export())
				}
			}
		} }, slot);
	}

	setTag(key: string, value: string|number|boolean): MinecraftItem {
		if(this.data) this.data.raw.item.tag.PublicBukkitValues[`hypercube:${key}`] = typeof value==="number"?nbt.parse(`${value}d`):nbt.parse(`"${value}"`);
		return this;
	}

	setVanillaTag(tag: string) {
		if(this.data) this.data.raw.item.tag.Tags.push(`${tag}`);
		return this;
	}

	export(containingBlockArguments: Value[]) {
		const result = super.export(containingBlockArguments);
		result.item.data.item = nbt.stringify(result.item.data.item);
		return result;
	}

}
