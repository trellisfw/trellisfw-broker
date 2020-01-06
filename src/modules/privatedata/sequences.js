/* privatedatas/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";
import uuid from "uuid";
import * as pacs from "../pacs/sequences";
import * as oscs from "../oscs/sequences";

let _localPath = "/bookmarks/privatedata";

let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
   privatedata: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const CONNECTION_ID = "privatedatas.connection_id";

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree,
		   watch:         { signals: ["privatedatas.handleWatchUpdate"] }
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("privatedatas.fetch", [
	({state, props}) => ({
		connection_id: state.get(CONNECTION_ID),
		path:          _localPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.privatedata`),
	{
		true: sequence("fetchOSCsSuccess", [
            mapOadaToPrivateData,
			      set(state`privatedatas.emptyDataSet`, false),
		      ]),
    false: sequence("fetchOSCsEmptySet", [
			      set(state`privatedatas.emptyDataSet`, true)
		       ]),
	}
]);

export const init = sequence("privatedatas.init", [
	when(state`Connections.connection_id`),
	{
    true: [oada.connect],
		false: [
			      oada.connect,
			      set(state`privatedatas.connection_id`, props`connection_id`),
            set(state`Connections.connection_id`, props`connection_id`),
			     ]
	},
	set(state`privatedatas.loading`, true),
	fetch,
	set(state`privatedatas.loading`, false),
]);


export function mapOadaToPrivateData({ props, state }) {
  let connection_id = state.get(CONNECTION_ID);
	let privatedatas = state.get(`oada.${connection_id}.bookmarks.privatedata`);
  if (privatedatas) {
    return Promise.map(Object.keys(privatedatas || {}), privatedata => {
			if (privatedata[0] !== "_" && privatedata !== "privatedatas") {
				let currentOSC = 
					     state.get(`oada.${connection_id}.bookmarks.privatedata.${privatedata}`);
				if ( currentOSC && currentOSC.id ) {
					state.set(`privatedatas.records.${privatedata}`, privatedatas[privatedata]);
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToPrivateData

export const compute = [
  compute_action,
	when(props`pass`),
	{
		true: [
	          pacs.newPAC,
				    getGeneratedPacs,
			      oscs.updateOSC
		      ],
			false: []
	}
];

function getGeneratedPacs({ props, state }) {
	let _current_id = state.get(`oscs.current_id`);
	console.log("-----------------------------------");
	console.log(props);
	console.log("-----------------------------------");
	let pacid = props.pacs[0].id;
	console.log(pacid);
	let generatedPACs = state.get(`oscs.${_current_id}.generated_pacs`);
	if (!generatedPACs) {
		generatedPACs = {};
	}
	generatedPACs[pacid] = {id: pacid};

	state.set(`oscs.records.${_current_id}.generated_pacs`, generatedPACs);
}

export function compute_action({ props, state }) {
	let privatedatas = state.get(`privatedatas.records`);
	let _current_id = state.get(`oscs.current_id`);
	console.log("--------------------");
	console.log("-->compute");
	console.log(_current_id);
	if (_current_id) {
		let _osc = state.get(`oscs.records.${_current_id}`);
		let _total = 0;
		let _pass = true;
		console.log(_osc);
		if (_osc && _osc.control_signals.generate_pac && privatedatas) {
			return Promise.map(Object.keys(privatedatas || {}), privatedata => {
					let _datum = state.get(`privatedatas.records.${privatedata}`);
					_total += _datum.temperature;
				if (_datum.temperature<35 || _datum.temperature>40){
					_pass = false;
				}
				
			}).then( () => { 
				console.log("-->Computing Total " + _total);
				state.set(`oscs.records.${_current_id}.control_signals.generate_pac`, false);
				return {pass: _pass}; 
			});
		}//if
		else {
			return {pass: false};
		}
	}
}//compute

export const updateOSC = sequence("privatedatas.updateOSC", [
  createEditOSC,
  buildOSCRequest,
  oada.put
]);

export const newOSC = sequence("privatedatas.newOSC", [
  () => {console.log("--> new OSC");},
	//createOSC,
  buildOSCRequest,
  oada.put
]);

function createEditOSC({props, state}){
  let id = uuid();
  let privatedatas = [];
	state.set(`privatedatas.records.${id}.token`, "servio");
  if (id !== "none") {
    let privatedata = state.get(`privatedatas.records.${id}`);
    privatedatas.push(privatedata);
  }
  return {privatedatas: privatedatas};
}

function buildOSCRequest({ props, state }){
  let connection_id = state.get(CONNECTION_ID);
  let requests = [];
  if (props.privatedatas[0]) {
    let privatedata = props.privatedatas[0];
    let request = {
      connection_id: connection_id,
      data:          props.privatedatas[0],
      path:          `${_localPath}/${privatedata.id}`,
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
		   watch:         { signals: ["privatedatas.handleWatchUpdate"] }
		};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetchNoWatch = sequence("privatedatas.fetchNoWatch", [
  ({ state, props }) => ({
    connection_id: state.get(CONNECTION_ID),
    path: _localPath,
    tree
  }),
	buildFetchRequestNoWatch,
  oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.privatedata`),
  {
    true: sequence("fetchOscsSuccess", [
      mapOadaToPrivateData,
      set(state`privatedatas.emptyDataSet`, false),
    ]),
    false: sequence("fetchOscsEmptySetNoWatch", [
            set(state`privatedatas.emptyDataSet`, true),
           ])
  }
]);

/**********************************************************
 * refresh the privatedatas module
 * when handling updates/watches
 * @type {Primitive}
 *********************************************************/
export const refresh = sequence("privatedatas.refresh", [
  set(state`privatedatas.loading`, true),
  fetchNoWatch,
  set(state`privatedatas.loading`, false),
]);

export const handleWatchUpdate = sequence("privatedatas.handleWatchUpdate", [
  () => {console.log("--> privatedatas.handleWatchUpdate");},
  refresh
]);

