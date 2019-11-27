/* oscs/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";

let _localPath = "/bookmarks/oscs";
/*
let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    oscs: {
      _type: "application/vnd.oada.oscs.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.osc.1+json",
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
    oscs: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

export const fetchNoWatch = sequence("oscs.fetchNoWatch", [
]);

export const refresh = sequence("oscs.refresh", [
  set(state`oscs.connection_id`, props`connection_id`),
	set(state`oscs.loading`, true),
	fetchNoWatch,
	set(state`oscs.loading`, false),
]);

export const handleWatchUpdate = sequence("oscs.handleWatchUpdate", [
  () => {console.log("--> oscs.handleWatchUpdate");},
	refresh
]);

/*  watch:         { signals: ["oscs.handleWatchUpdate"] }*/

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get("oscs.connection_id"),
			 path:          _localPath,
			 tree
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("oscs.fetch", [
  ({ state, props }) => ({
		connection_id: state.get("oscs.connection_id"),
		path:         _localPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.oscs`),
	{
		true: sequence("fetchOSCsSuccess", [
            mapOadaToOscs,
			      set(state`App.emptyDataSet`, false),
		      ]),
    false: sequence("fetchOSCsEmptySet", [
		        () => ( console.log("--> OSCs empty set") ),
			      set(state`App.emptyDataSet`, true)
		]),
	}
]);
		//watch:        {signals: ["oscs.handleWatchUpdate"]}

export const init = sequence("oscs.init", [
	when(state`Connections.connection_id`),
	{
    true: [oada.connect],
		false: [
			      oada.connect,
			      set(state`oscs.connection_id`, props`connection_id`),
            set(state`Connections.connection_id`, props`connection_id`),
			     ]
	},
	set(state`oscs.loading`, true),
	fetch,
	set(state`oscs.loading`, false),
	set(state`OSCList.open`, true)
]);

export function mapOadaToOscs({ props, state }){
  let connection_id = state.get("oscs.connection_id");
	let oscs = state.get(`oada.${connection_id}.bookmarks.oscs`);
  if (oscs) {
    return Promise.map(Object.keys(oscs || {}), osc => {
			if (osc[0] !== "_" && osc !== "oscs") {
				let currentOSC = 
					     state.get(`oada.${connection_id}.bookmarks.oscs.${osc}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`oscs.records.${osc}`, oscs[osc]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToOscs
