import SerializableComponent from "./core/components/SerializableComponent";
import { RawDFValue } from "./core/components/Value";
import DFDumpScheme from "./core/types/DFDumpScheme";
import DFValueType from "./core/types/DFValueType";

type KeybindComponent<T extends boolean = true> = T extends true ? `{"keybind":"key.${string}"}` : {keybind: `key.${string}`};

export function createKeybindComponent<T extends boolean = true>(keybind: string, stringify: T = true as T): KeybindComponent<T> {
	if(stringify) return JSON.stringify({ keybind: `key.${keybind}` }) as KeybindComponent<T>;
	return { keybind: `key.${keybind}`} as KeybindComponent<T>;
}

export function dummyDump(): DFDumpScheme {
	return {
		codeblocks: [{identifier: "event", name: "PLAYER EVENT"}],
		actions: [{codeblockName: "PLAYER EVENT", name: "Vote"}]
	};
}

export function isOfTypeValue(test: unknown): test is DFValueType {
	if(!test || typeof test !== "object") return false;
	if(!("data" in test)) return false;
	return true;
}

export function isOfTypeRawValue(test: unknown): test is RawDFValue {
	if(!test || typeof test !== "object") return false;
	if(!("item" in test) || !("slot" in test)) return false;
	return true;
}

export function sparkscriptWarn(message: string, traceInstead: boolean = false) {
	if(!traceInstead) console.warn(`[sparkscript] WARNING: ${message}`);
	else console.trace(`[sparkscript] WARNING: ${message}`);
}

export function makeStringification<T extends string, V extends string>(type: T, value: V): `<${T}>${V}` {
	return `<${type}>${value}`
}
makeStringification.serializable = <V extends string>(value: V) => makeStringification("@", value);
makeStringification.component = <T extends string, V extends object>(comp: SerializableComponent<any, string>, type: T, value: V) => makeStringification(type, JSON.stringify({
	COMPONENT: comp._componentName,
	...value
}));

export default {
	createKeybindComponent,
	makeStringification,
	dummyDump,
}
