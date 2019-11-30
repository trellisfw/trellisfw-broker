/* demo/sequences.js */
import { sequence } from "cerebral";
import { set } from "cerebral/operators";
import { state } from "cerebral/tags";
import oada from "@oada/cerebral-module/sequences";
import { pac_dataset } from "../../components/offline_datasets.js";

let _localPACSPath = "/bookmarks/pacs";

let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    pacs: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const upload_demo_pacs = [
  createPACS,
	createPACRequest,
	oada.put
];

export const init = sequence("demo.init", [
	set(state`demo.loading`, true),
	upload_demo_pacs,
	set(state`demo.loading`, false),
]);

function createPACS({ props, state }) {
	let pacs = [];
  let keys = Object.keys(pac_dataset.records);
	
	for (let key of keys) {
    let pac = pac_dataset.records[key];
    pacs.push(pac);
	}

	return { pacs: pacs };
}

function createPACRequest({ props, state }) {
  let connection_id = state.get("oscs.connection_id");
  let requests = [];

	for (let pac of props.pacs) {
		console.log(pac.id);
		let request = {
			connection_id: connection_id,
			data:          pac,
			path:          `${_localPACSPath}/${pac.id}`,
			tree: tree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}
