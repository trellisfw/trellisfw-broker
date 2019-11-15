import { Module } from "cerebral";
import * as signals from "./sequences";

let _OADA_HOST = "https://localhost";
let _CURRENT_HOST = _OADA_HOST;

export default Module({

	state : {
		oada_domain_text:        _CURRENT_HOST,
    oada_fields_domain_text: _CURRENT_HOST,
		oada_domain:             _CURRENT_HOST,
    oada_fields_domain:      _CURRENT_HOST,
		open:                    false
	}, 

	signals: signals
});
