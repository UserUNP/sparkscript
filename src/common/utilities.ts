export type ValueOf<T> = T[keyof T];
type KeybindComponent<T extends boolean = true> = T extends true ? `{"keybind":"key.${string}"}` : {keybind: `key.${string}`};

export function createKeybindComponent<T extends boolean = true>(keybind: string, stringify: T = true as T): KeybindComponent<T> {
	if(stringify) return JSON.stringify({ keybind: `key.${keybind}` }) as KeybindComponent<T>;
	return { keybind: `key.${keybind}`} as KeybindComponent<T>;
}

export function sparkscriptWarn(message: string, traceInstead: boolean = false) {
	if(!traceInstead) console.warn(`[sparkscript] WARNING: ${message}`);
	else console.trace(`[sparkscript] WARNING: ${message}`);
}

export function makeStringifier<T extends string, V extends string>(type: T, value: V): `<${T}>${V}` {
	return `<${type}>${value}`
}
makeStringifier.serializable = <V extends string>(value: V) => makeStringifier("@", value);
makeStringifier.component = <T extends string, V extends object>(comp: string, type: T, value: V) => makeStringifier(type, JSON.stringify({
	COMPONENT: comp,
	...value
}));

export function removeEmptyItems<T extends any[], V extends ValueOf<T>>(arr: T, replacer: V) {
	for(let i=0;i<arr.length;i++) !!arr[i] ? void 0 : arr[i] = replacer
	return arr;
}

export default {
	sparkscriptWarn,
	createKeybindComponent,
	makeStringifier,
	removeEmptyItems,
}
