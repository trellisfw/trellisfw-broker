/* demo/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";
import { pac_dataset } from "../../components/offline_datasets.js";

//let _localOSCSPath = "/bookmarks/oscs";
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

export const fetchNoWatch = sequence("demo.fetchNoWatch", [
]);

export const refresh = sequence("demo.refresh", [
  set(state`demo.connection_id`, props`connection_id`),
	set(state`demo.loading`, true),
	fetchNoWatch,
	set(state`demo.loading`, false),
]);

export const handleWatchUpdate = sequence("demo.handleWatchUpdate", [
  () => {console.log("--> demo.handleWatchUpdate");},
	refresh
]);

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get("demo.connection_id"),
			 path:          _localPACSPath,
			 tree
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("demo.fetch", [
  ({ state, props }) => ({
		connection_id: state.get("demo.connection_id"),
		path:         _localPACSPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.pacs`),
	{
		true: sequence("fetchOSCsSuccess", [
            mapOadaToPacs,
			      set(state`App.emptyDataSet`, false),
		      ]),
    false: sequence("fetchOSCsEmptySet", [
		        () => ( console.log("--> OSCs empty set") ),
			      set(state`App.emptyDataSet`, true)
		]),
	}
]);

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

export function mapOadaToPacs({ props, state }){
  let connection_id = state.get("oscs.connection_id");
	let pacs = state.get(`oada.${connection_id}.bookmarks.pacs`);
  if (pacs) {
    return Promise.map(Object.keys(pacs || {}), pac => {
			if (pac[0] !== "_" && pac !== "pacs") {
				let currentOSC = 
					     state.get(`oada.${connection_id}.bookmarks.pacs.${pac}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`pacs.records.${pac}`, pacs[pac]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToOscs

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
			path:          _localPACSPath + "/" + pac.id,
			tree: tree
		};
		requests.push(request);
	}//for
 
	console.log("--> requests");
	console.log(requests);
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}
