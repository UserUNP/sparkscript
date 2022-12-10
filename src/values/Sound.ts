import Value from "../core/components/Value";
import MCSound from "../core/types/MCSound";

export interface Isnd {
	sound: MCSound;
	vol: number;
	pitch: number;
}

export default class Sound
extends Value<"snd", Isnd> {
	/**
	 * Create a new sound value.
	 * @param potion The potion name.
	 * @param volume The volume of the sound.
	 * @param pitch The pitch of the sound.
	 */
	constructor(
		public sound: MCSound,
		public volume: number = 2,
		public pitch: number = 1,
		slot?: number
	) {
		super("snd", { sound, vol: volume, pitch }, slot);
	}
}
