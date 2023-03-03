import {
	DFBlockAction,
	DFBlockCodename,
	DFDumpScheme,
	DFDynamicBlockCodename
} from "../core/types";

import { BLTag } from "../values";
import { getDump } from "../core/codeDump";

/**
 * Extract a specific tag's data from an action.
 */
export type TagDataInAction<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]> = DFDumpScheme["actionTags"][Tag];

/**
 * Get BLTag array from an action.
 * @note If the action has no tags it'll return a type of `never[]`
 */
//@ts-ignore //! TODO: typescript forgets that Action was made sure to extend actionsWithTags. either that or some other problem idk how to fix this
export type BLTagArray<T extends DFBlockCodename, Action extends DFBlockAction<T>> = (T extends DFDynamicBlockCodename ? "dynamic" : Action) extends keyof DFDumpScheme["actionsWithTags"] ? BLTag<(T extends DFDynamicBlockCodename ? "dynamic" : Action), DFDumpScheme["actionsWithTags"][(T extends DFDynamicBlockCodename ? "dynamic" : Action)][number]>[] : [];

/**
 * Extract available options for a tag from an action.
 */
export type OptionsInTag<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]> = TagDataInAction<Action, Tag>["options"][number];

export function getActionTags<T extends DFBlockCodename, Action extends DFBlockAction<T>>(type: T, action: Action): BLTagArray<T, Action> {
	let result: BLTag<keyof DFDumpScheme["actionsWithTags"]>[] = [];
	for(const _ in getDump().actionsWithTags) {
		const checkAction = _ as keyof DFDumpScheme["actionsWithTags"];
		if(checkAction !== action) continue;
		const tags = getDump().actionsWithTags[action as keyof DFDumpScheme["actionsWithTags"]];
		if(!tags) break;
		for(const t of tags) {
			//@ts-ignore //! TODO: idk how to fix this.
			const tagValue = new BLTag(type, action, t);
			result.push(tagValue);
		}
	}
	return result as BLTagArray<T, Action>;
}

export function getDefaultSlot<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]>(tag: Tag) {
	return getDump().actionTags[tag].slot;
}

export function getDefaultOption<Action extends keyof DFDumpScheme["actionsWithTags"], Tag extends DFDumpScheme["actionsWithTags"][Action][number]>(tag: Tag) {
	return getDump().actionTags[tag].defaultOption;
}
