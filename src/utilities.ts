function createKeybindComponent(keybind: string, stringify: boolean = true): (string|object) {
	if(stringify) return JSON.stringify({ keybind: `key.${keybind}` })
	return { keybind: `key.${keybind}` }
}

export default {
	createKeybindComponent
}
