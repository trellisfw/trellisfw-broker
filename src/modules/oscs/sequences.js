/* oscs/sequences.js */
import { sequence } from "cerebral";
import { set, when, equals } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";

let _localPath = "/bookmarks/operators";
let _TYPE = "applications/vnd.oada.osc.1+json";
let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    operators: {
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
/*
 *
			 watch:         { signals: ["oscs.handleWatchUpdate"] }
 */
/*function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get("oscs.connection_id"),
			 path:          _localPath,
			 tree
		};
	let requests = [];
	requests.push(request);

  return { requests };
}*/

function buildFetchRequest({ state }) {
  let requests = [
    {
      connection_id: state.get("oscs.connection_id"),
      path:          _localPath,
      tree
    }
  ];
  return { requests };
}

function loadOSCList({ state, props }){
  console.log("--> loadOSCList");
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
			      loadOSCList,
			      set(state`App.emptyDataSet`, false),
		      ]),
    false: sequence("fetchOSCsEmptySet", [
		        () => ( console.log("--> OSCs empty set") ),
			      set(state`App.emptyDataSet`, true)
		]),
	}
]);
		//watch:        {signals: ["oscs.handleWatchUpdate"]}

			      //() => ( console.log("--> oscs->init - when - false") ),
			      //() => ( console.log("--> oscs->init - after connect") ),
export const init = sequence("oscs.init", [
  getConnectionsFromStorage,
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
	when(state`oada.${props`connection_id`}.bookmarks.oscs`),
	{
		true: [],
		false: []
	},
	set(state`oscs.loading`, false)
]);

	//() => ( console.log("--> oscs->init - before fetch") ),
/**
 * gets the Connections from localCache, 
 * it updates all necessary state to auto-init the app
 * @param state
 */
function getConnectionsFromStorage({ state }) {
  /*let connections = JSON.parse(
    localStorage.getItem("_Broker.Connections")
  );
	*/
  console.log("--> oscs.init storage connections --> ");
  /*if (connections && connections["connection_id"]) {
    state.set("Connections.show", false);
    let connectionId = connections["connection_id"];
    let oadaDomain = connections["oada_domain"];
    console.log(
      "--> operations init connectionId and OadaDomain",
      connectionId,
      oadaDomain
    );
    state.set(`operations.connection_id`, connectionId);
    state.set("Connections.oada_domain", oadaDomain);
    state.set("Connections.oada_domain_text", oadaDomain);
  */
    state.set(`oscs.connection_id`, "localhost");
    state.set("Connections.oada_domain", "https://localhost");
    state.set("Connections.oada_domain_text", "https://localhost");
//	}
}

export function mapOadaToOscs({ props, state }){
  let connection_id = state.get("oscs.connection_id");
	let oscs = state.get(`oada.${connection_id}.bookmarks.oscs`);
  if (oscs) {
    return Promise.map(Object.keys(oscs || {}), osc => {
			if (osc[0] !== "_" && osc !== "oscs") {
				let currentOSC = state.get(`oada.${connection_id}.bookmarks.oscs.${osc}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`oscs.records.${osc}`, oscs[osc]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToOscs
