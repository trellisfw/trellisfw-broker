/* oscs/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";

let _localPath = "/bookmarks/osc";

//let _TYPE = "application/vnd.oada.oscs.1+json";
//let _TYPE_OSC = "application/vnd.oada.osc.1+json";

let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    osc: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const CONNECTION_ID = "oscs.connection_id";

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree,
		   watch:         { signals: ["oscs.handleWatchUpdate"] }
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("oscs.fetch", [
	({state, props}) => ({
		connection_id: state.get(CONNECTION_ID),
		path:          _localPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.osc`),
	{
		true: sequence("fetchOSCsSuccess", [
            mapOadaToOscs,
			      set(state`oscs.emptyDataSet`, false),
		      ]),
    false: sequence("fetchOSCsEmptySet", [
		        () => ( console.log("--> OSCs empty set") ),
			      set(state`oscs.emptyDataSet`, true)
		]),
	}
]);

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
  let connection_id = state.get(CONNECTION_ID);
	let oscs = state.get(`oada.${connection_id}.bookmarks.osc`);
  if (oscs) {
    return Promise.map(Object.keys(oscs || {}), osc => {
			if (osc[0] !== "_" && osc !== "oscs") {
				let currentOSC = 
					     state.get(`oada.${connection_id}.bookmarks.osc.${osc}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`oscs.records.${osc}`, oscs[osc]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToOscs

export const updateOSC = sequence("oscs.updateOSC", [
  createOSC,
  buildOSCRequest,
  oada.put
]);

function createOSC({props, state}){
  let id = state.get('OSCList.current');
  let oscs = [];
	state.set(`oscs.records.${id}.token`, "servio");
  if (id !== "none") {
    let osc = state.get(`oscs.records.${id}`);
    oscs.push(osc);
  }
  return {oscs: oscs};
}

function buildOSCRequest({ props, state }){
  let connection_id = state.get(CONNECTION_ID);
  let requests = [];
  if (props.oscs[0]) {
    let osc = props.oscs[0];
    let request = {
      connection_id: connection_id,
      data:          props.oscs[0],
      path:          `${_localPath}/${osc.id}`,
      tree:          tree
    };
    requests.push(request);
    return {
      connection_id: connection_id,
      requests:      requests,
      domain:        state.get("oada_domain")
    }
  }
}

function buildFetchRequestNoWatch({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree,
		   watch:         { signals: ["oscs.handleWatchUpdate"] }
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetchNoWatch = sequence("oscs.fetchNoWatch", [
  ({ state, props }) => ({
    connection_id: state.get(CONNECTION_ID),
    path: _localPath,
    tree
  }),
	buildFetchRequestNoWatch,
  oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.osc`),
  {
    true: sequence("fetchOscsSuccess", [
      mapOadaToOscs,
      set(state`oscs.emptyDataSet`, false),
    ]),
    false: sequence("fetchOscsEmptySetNoWatch", [
      () => (
        console.log("--> Oscs empty set no watch")
      ),
      set(state`oscs.emptyDataSet`, true),
    ])
  }
]);

/**********************************************************
 * refresh the oscs module
 * when handling updates/watches
 * @type {Primitive}
 *********************************************************/
export const refresh = sequence("oscs.refresh", [
  set(state`oscs.connection_id`, props`connection_id`),
  set(state`oscs.loading`, true),
  fetchNoWatch,
  set(state`oscs.loading`, false),
  set(props`type`, "oscs")
]);

// ========================================================
// OSC Control Sequences (Token Provisioning, Restart ...)
// ========================================================
export function updateToken({ props, state }) {
  let id = state.get('OSCList.current');
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.token`, "servio");
	}
}

export function updateData({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.private_data`, "all");
	}
}

export function updateGeneratePAC({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.generate_pac`, true);
	}
}

export function updateInitRA({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.init_ra`, true);
	}
}

export function updateRestartOSC({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.restart`, true);
	}
}

export function updateKillOSC({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.turnoff`, true);
	}
}
