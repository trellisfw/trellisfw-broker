/* pacs/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";
import { pac_dataset } from "../../components/offline_datasets.js";

let _localPath = "/bookmarks/pacs";
/*
let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    pacs: {
      _type: "application/vnd.oada.pacs.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.pac.1+json",
        _rev: "0-0"
      }
    }
  }
};
*/

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

export const fetchNoWatch = sequence("pacs.fetchNoWatch", [
]);

export const refresh = sequence("pacs.refresh", [
  set(state`pacs.connection_id`, props`connection_id`),
	set(state`pacs.loading`, true),
	fetchNoWatch,
	set(state`pacs.loading`, false),
]);

export const handleWatchUpdate = sequence("pacs.handleWatchUpdate", [
  () => {console.log("--> pacs.handleWatchUpdate");},
	refresh
]);

/*  watch:         { signals: ["pacs.handleWatchUpdate"] }*/

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get("pacs.connection_id"),
			 path:          _localPath,
			 tree
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("pacs.fetch", [
  ({ state, props }) => ({
		connection_id: state.get("pacs.connection_id"),
		path:         _localPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.pacs`),
	{
		true: sequence("fetchPACsSuccess", [
            mapOadaToPacs,
			      set(state`App.emptyDataSet`, false),
		      ]),
    false: sequence("fetchPACsEmptySet", [
		        () => ( console.log("--> PACs empty set") ),
			      set(state`App.emptyDataSet`, true)
		]),
	}
]);
		//watch:        {signals: ["pacs.handleWatchUpdate"]}

export const uploadDemo = [
];

export const init = sequence("pacs.init", [
	when(state`Connections.connection_id`),
	{
    true: [oada.connect],
		false: [
			      oada.connect,
			      set(state`pacs.connection_id`, props`connection_id`),
            set(state`Connections.connection_id`, props`connection_id`),
			     ]
	},
	set(state`pacs.loading`, true),
	fetch,
	uploadDemo,
	set(state`pacs.loading`, false),
	set(state`PACList.open`, true)
]);

export function mapOadaToPacs({ props, state }){
  let connection_id = state.get("pacs.connection_id");
	let pacs = state.get(`oada.${connection_id}.bookmarks.pacs`);
  if (pacs) {
    return Promise.map(Object.keys(pacs || {}), pac => {
			if (pac[0] !== "_" && pac !== "pacs") {
				let currentPAC = 
					     state.get(`oada.${connection_id}.bookmarks.pacs.${pac}`);
				if ( currentPAC && currentPAC.id ) {
					state.set(`pacs.records.${pac}`, pacs[pac]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToPacs



//iterate through the pac_dataset and build the request accordingly
// set PUT requests
// fetch recently submitted changes and populate React components

