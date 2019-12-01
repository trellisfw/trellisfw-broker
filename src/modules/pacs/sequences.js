/* pacs/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";

let _localPath = "/bookmarks/pacs";

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
			      set(state`PACList.emptyDataSet`, false),
		      ]),
    false: sequence("fetchPACsEmptySet", [
		        () => ( console.log("--> PACs empty set") ),
			      set(state`PACList.emptyDataSet`, true)
		]),
	}
]);
		//watch:        {signals: ["pacs.handleWatchUpdate"]}

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
	set(state`pacs.loading`, false),
	set(state`PACList.open`, false)
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


export const updatePAC = sequence("pacs.updatePAC", [
  createPAC,
  buildPACRequest,
  oada.put
]);

function createPAC({props, state}){
  let id = state.get('PACList.current');
	let pacs = [];
	if (id !== "none") {
    let pac = state.get(`pacs.records.${id}`);
		pacs.push(pac);
	}
	return {pacs: pacs};
}

function buildPACRequest({ props, state }){
	let connection_id = state.get("oscs.connection_id");
	let requests = [];
  if (props.pacs[0]){
		let pac = props.pacs[0];
    let request = {
			connection_id: connection_id,
			data:          props.pacs[0],
			path:          `${_localPath}/${pac.id}`,
			tree:          tree
		};
		requests.add(request);
		return {
		  connection_id: connection_id,
			requests:      requests,
			domain:        state.get("oada_domain")
		}
	}

}
