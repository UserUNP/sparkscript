export interface Isettings {
	/**
	 * If disabled, Type & action checking will be skipped.
	 */
	strict: boolean;
	/**
	 * Set to ```true``` if you need to use codeutilities.
	 */
	usingCodeutils: boolean;
	/**
	 * Configuration for codeutilities WebSocket (if used).
	 */
	cuConf: {
		/**
		 * Port of the WebSocket. defaults to 31372.
		 */
		port: number | 31372;
		/**
		 * Host of the WebSocket. defaults to localhost.
		 */
		host: string | "localhost";
		/**
		 * Protocol of the WebSocket. defaults to ws.
		 */
		protocol: "ws" | "wss" | "http" | "https";
	},
	author?: string;
	name: string|false;
}

export default function getEditorSettings(name: Isettings["name"]) {
	return { 
		strict: true,
		usingCodeutils: false,
		cuConf: {
			port: 31371,
			host: "localhost",
			protocol: "ws",
		},
		name,
	} as Isettings
}

