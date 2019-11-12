import { Module } from "cerebral";
import * as signals from "./sequences";

export default module({
	state: {
		records: {},
		loading: true,
		connection_id: "none"
	},

	signals: signals
});
