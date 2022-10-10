import DFDumpScheme from "./core/types/DFDumpScheme";

type keybindComponent<T extends boolean = true> = T extends true ? `{"keybind":"key.${string}"}` : {keybind: `key.${string}`};

export function createKeybindComponent<T extends boolean = true>(keybind: string, stringify: T): keybindComponent<T> {
	if(stringify) return JSON.stringify({ keybind: `key.${keybind}` }) as keybindComponent<T>;
	return { keybind: `key.${keybind}`} as keybindComponent<T>;
}

export function dummyDump(): DFDumpScheme {
	return {
		codeblocks: [{identifier: "event", name: "PLAYER EVENT"}],
		actions: [{codeblockName: "PLAYER EVENT", name: "Vote"}]
	};
}

export default {
	createKeybindComponent,
	dummyDump,
}
