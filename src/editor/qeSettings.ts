export interface Isettings {
	/**
	 * Set to ```true``` if you need to use codeutilities ("recode").
	 */
	usingCodeutils: boolean;
	/**
	 * Configuration for codeutilities ("recode") WebSocket (if used).
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
		/**
		 * Endpoint to use for the Item API.
		 */
		endpoint: string | "codeutilities/item";
	},
	author?: string;
	name: string|false;
}

export default function getEditorSettings(name: Isettings["name"]): Isettings {
	return {
		usingCodeutils: false,
		cuConf: {
			port: 31371,
			host: "localhost",
			protocol: "ws",
			endpoint: "codeutilities/item"
		},
		name
	};
}

