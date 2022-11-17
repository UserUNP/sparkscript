import Value from "../core/components/Value";

export interface Ipot {
	pot: string;
	dur: number;
	amp: number;
}

export default class Potion
extends Value<"pot", Ipot> {
	/**
	 * Create a new potion value.
	 * @param potion The potion name.
	 * @param duration The duration of the potion in ticks.
	 * @param amplifier Strength of the potion.
	 */
	constructor(
		public potion: string,
		public duration: number,
		public amplifier: number,
		slot?: number
	) {
		super("pot", { pot: potion, dur: duration, amp: amplifier }, slot);
	}
}
