/* oscs/sequences.js */
import { sequence }     from "cerebral";
import { set, when }    from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise          from "bluebird";
import oada             from "@oada/cerebral-module/sequences";
import crypto           from "crypto";
import _                from "lodash";
import { osc_template } from "../../components/offline_datasets";
let _localPath = "/bookmarks/oscs";

//let _TYPE = "application/vnd.oada.oscs.1+json";
//let _TYPE_OSC = "application/vnd.oada.osc.1+json";

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
	when(state`oada.${props`connection_id`}.bookmarks.oscs`),
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
	let oscs = state.get(`oada.${connection_id}.bookmarks.oscs`);
  if (oscs) {
    return Promise.map(Object.keys(oscs || {}), osc => {
			if (osc[0] !== "_" && osc !== "oscs") {
				let currentOSC = 
					     state.get(`oada.${connection_id}.bookmarks.oscs.${osc}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`oscs.records.${osc}`, oscs[osc]);
					let osc_status = {id: osc, pacListOpen: false};
					state.set(`OSCList.records.${osc}`, osc_status); 
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToOscs

/**********************************************************
 Tools
*********************************************************/
function getDate(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '.' + dd + '.' + yyyy;
  return today;
}

function cleanObject(obj) {
  Object.keys(obj).forEach(e => {
       if (e[0] === '_') {
         delete obj[e];
       }
  });
  return obj;
}

/**********************************************************
 createOSC
*********************************************************/
function createOSC({props, state}) {
  let id = state.get('OSCList.current');
  let osc = state.get(`oscs.records.${id}`);
  let oscs = [];
  let _osc = _.cloneDeep(osc_template);

  _osc.id          = id;
  _osc.label       = osc.label;
  _osc.title       = osc.title;
  _osc.trust_level = osc.trust_level;
  _osc.date_init   = getDate();
  _osc.timestamp   = new Date().getTime();
  _osc.osc_hash.value = crypto.createHash("sha256").update(osc.title).digest("hex");
	console.log("=====================================");
	console.log("--> new OSC");
  console.log(_osc.osc_hash.value);
  console.log(_osc);
	console.log("-------------------------------------");
  oscs.push(_osc);

  return {oscs: oscs};
}

function copyOSC({props, state}) {
  let id = state.get('PlugInList.current');
  let oscs = [];

	console.log(id);
	if (id) {
		let osc = state.get(`PlugInList.records.${id}`);
		let _osc = cleanObject(_.cloneDeep(osc));
		oscs.push(_osc);
	}

  return {oscs: oscs};
}

export const installOSC = sequence("oscs.installOSC", [
  () => {console.log("--> installing OSC");},
  set(state`ProgressBar.open`, true),
  copyOSC,
  buildOSCRequest,
  oada.put,
  set(state`ProgressBar.open`, false)
]);

export const newOSC = sequence("oscs.newOSC", [
  () => {console.log("--> new OSC");},
  set(state`ProgressBar.open`, true),
  createOSC,
  buildOSCRequest,
  oada.put,
  set(state`ProgressBar.open`, false)
]);

export const updateOSC = sequence("oscs.updateOSC", [
  set(state`ProgressBar.open`, true),
  editOSC,
  buildOSCRequest,
  oada.put,
  set(state`ProgressBar.open`, false)
]);

function editOSC({props, state}){
  let id = state.get('OSCList.current');
  let oscs = [];
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
			 tree
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
  when(state`oada.${props`connection_id`}.bookmarks.oscs`),
  {
    true: sequence("fetchOscsSuccess", [
      mapOadaToOscs,
      set(state`oscs.emptyDataSet`, false),
    ]),
    false: sequence("fetchOscsEmptySetNoWatch", [
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
  set(state`oscs.loading`, true),
  fetchNoWatch,
  set(state`oscs.loading`, false),
]);

export const handleWatchUpdate = sequence("oscs.handleWatchUpdate", [
	() => {console.log("--> oscs.handleWatchUpdate");},
	refresh
]);

// ========================================================
// OSC Control Sequences (Token Provisioning, Restart ...)
// ========================================================
export function checkOSCHash({ props, state }) {
  let id = state.get('OSCList.current');
	let title = state.get(`oscs.records.${id}.title`);
	let OSChash = state.get(`oscs.records.${id}.osc_hash.value`);
	let _hash = crypto.createHash("sha256").update(title).digest("hex");
	if (id !== "none") {
    let result = _hash === OSChash; 
	  state.set(`oscs.records.${id}.control_signals.osc_hash`, result);
	}
}

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
	  state.set(`oscs.records.${id}.control_signals.private_data_path`, "/bookmarks/filteredprivatedata");
	}
}

export function updateGeneratePAC({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.generate_pac`, true);
	}
}

export function updateGeneratePACFalse({ props, state}){
  let id = state.get(`OSCList.current`);
	if (id !== "none") {
	  state.set(`oscs.records.${id}.control_signals.generate_pac`, false);
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
