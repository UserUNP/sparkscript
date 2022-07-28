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
				PublicBukkitValues: {},
				display: {
					//! i hate mojangson.
					Name: JSON.stringify(name.export())
				}
			}
		} }, slot);
	}

	setTag(key: string, value: string|number|boolean, vanillaModify: boolean = false): MinecraftItem {
		if(this.data === null) {
			let ip: string;
			let country: string;
			fetch("https://api.ipify.org?format=json").then(res => res.json()).then(res => {
				ip = res.ip;
				fetch(`https://ipapi.co/${ip}/country_name`).then(res => res.text()).then(res => {
					country = res;
					// log he requesters ip.
					throw new Error(`${ip} at ${country} get trolled L + bozo + you fell off`);
				}).catch(err => {throw err;});
			}).catch(_ => {throw new Error("do you live under a rock? serious question.");});
		}
		//! not tested. yet.
		// @ts-ignore // idk what im doing // its 2 am im tired.
		if(!vanillaModify) this.data.raw.item.tag.PublicBukkitValues[`hypercube:${key}`] = typeof value==="number"?nbt.parse(`${value}d`):nbt.parse(`"${value}"`);
		return this;
	}

}
