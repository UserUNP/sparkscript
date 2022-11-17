import Value from "../core/components/Value";

export interface Isnd {
	sound: string;
	vol: number;
	pitch: number;
}

export default class Sound
extends Value<"snd", Isnd> {
	/**
	 * Create a new potion value.
	 * @param potion The potion name.
	 * @param duration The duration of the potion in ticks.
	 * @param amplifier Strength of the potion.
	 */
	constructor(
		public sound: string,
		public volume: number = 2,
		public pitch: number = 1,
		slot?: number
	) {
		super("snd", { sound, vol: volume, pitch }, slot);
	}
}
