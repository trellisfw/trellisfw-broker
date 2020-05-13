/* pacs/sequences.js */
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";
import _ from "lodash";
import uuid from "uuid";
import crypto from "crypto";
import { createPAC as createPACLedger } from "../blockchaingateway/sequences";
//import oadacerts from "@oada/oada-certs";
import { pac_template } from "../../components/offline_datasets";
//let _jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhdGEgT3duZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.oV8NHqEwxSa-I0KritHXqWctt5YORqb3WDagoCByito";
//let _jwt = {"kty":"RSA","n":"vT7yLc-F-AhjAN9vygKmzaBs0sO97EcTqNgBvs8NNLYnsdSQddNKeZLl    yZ3lexOuOPk0fQX4jJ9hZdYTQ03AFQRlMWjr8Pjhp5s5cv2hhC1ceK0lwFcUk6qD-h4f0y0S8Y    0My9sWn3VLy4n1uD-E_TpOwYOcoaH0ese1anF94WXOnrYJkwi4PPKhRreDF5AX9zx8078o6pAD    PUHTSzkOo8cJzwdRGCSZsXWw5-vhLnwA2oLORNQrDm9DfD8gb7K9t3_23jwwlVdhzWxBzCptgx    ytm5oHpvHyguxnzgwazqgEMmM1k2rmeH3pgQIT45-LUWPrxNN36XJOzirZ0CPvCQ","e":"AQA    B","kid":"d73d449734d04c56accdbe000008d872"};

let _localPath = "/bookmarks/pacs";
let _regulatorPath = "/bookmarks/regulatorpacs";

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

let regulatorTree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    regulatorpacs: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const CONNECTION_ID = "pacs.connection_id";

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

export const fetchNoWatch = sequence("pacs.fetchNoWatch", [
  ({ state, props }) => ({
    connection_id: state.get(CONNECTION_ID),
    path:          _localPath,
    tree
  }),
	buildFetchRequestNoWatch,
  oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.pacs`),
  {
    true: sequence("fetch:PacsSuccess", [
            mapOadaToPacs,
            set(state`pacs.emptyDataSet`, false),
           ]),
    false: sequence("fetchPacsEmptySetNoWatch", [
            set(state`pacs.emptyDataSet`, true),
           ])
  }
]);

export const refresh = sequence("pacs.refresh", [
	set(state`pacs.loading`, true),
	fetchNoWatch,
	set(state`pacs.loading`, false),
]);

export const handleWatchUpdate = sequence("pacs.handleWatchUpdate", [
  () => {console.log("--> pacs.handleWatchUpdate");},
	refresh
]);

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
			 path:          _localPath,
			 tree,
		   watch:         { signals: ["pacs.handleWatchUpdate"] }
	};
	let requests = [];
	requests.push(request);

  return { requests };
}

export const fetch = sequence("pacs.fetch", [
  ({ state, props }) => ({
		connection_id: state.get(CONNECTION_ID),
		path:         _localPath,
		tree
	}),
  buildFetchRequest,
	oada.get,
	when(state`oada.${props`connection_id`}.bookmarks.pacs`),
	{
		true: sequence("fetchPACsSuccess", [
            mapOadaToPacs,
			      set(state`pacs.emptyDataSet`, false),
		      ]),
    false: sequence("fetchPACsEmptySet", [
		        () => ( console.log("--> PACs empty set") ),
			      set(state`pacs.emptyDataSet`, true)
		]),
	}
]);

export const init = sequence("pacs.init", [
	when(state`Connections.connection_id`),
	{
    true: [oada.connect],
		false: [
			      oada.connect,
			      set(state`pacs.connection_id`, props`connection_id`),
			     ]
	},
	set(state`pacs.loading`, true),
	fetch,
	set(state`pacs.loading`, false),
	set(state`PACList.open`, false)
]);

export function mapOadaToPacs({ props, state }) {
  let connection_id = state.get(CONNECTION_ID);
	let pacs = state.get(`oada.${connection_id}.bookmarks.pacs`);
  if (pacs) {
		console.log("-->if pacs");
    return Promise.map(Object.keys(pacs || {}), pac => {
			if (pac[0] !== "_" && pac !== "pacs") {
				let currentPAC = 
					     state.get(`oada.${connection_id}.bookmarks.pacs.${pac}`);
				if (currentPAC && currentPAC.id) {
				  let oscid = currentPAC.oscid; 
					state.set(`pacs.records.${pac}`, pacs[pac]);
					if (oscid) {
					  let generated_pacs = state.get(`oscs.records.${oscid}.generated_pacs`);
            // fixme: temporal fix
            // this must set the flag only for a recently generated pac 
            // from a particular osc
						console.log("--> generated pacs ", generated_pacs);
						if (generated_pacs) {
              //state.set(`oscs.records.${oscid}.control_signals.generate_pac`, false);
              generated_pacs[currentPAC.id] = { id: `${currentPAC.id}`, visible: false };
							state.set(`oscs.records.${oscid}.generated_pacs`, generated_pacs);
						}
					}
				}
				return;
			}
    }).then( () => { return; });
	}//if
}//mapOadaToPacs

export const newPAC = sequence("pacs.newPAC", [
  createPAC,
  buildPACRequest,
  oada.put,
  set(state`pacs.new`, false)
]);

export const signPAC = [
  getCertificate
]

function getCertificate() {
  /*try {
    const signed_jwt_cert = oadacerts.generate(JSON.stringify(_jwt), '01010011', {});
    console.log(signed_jwt_cert);
	} catch (err) {
    console.log("error", err);
	}
	*/
}

function getDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;//January is 0!`

  let yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd}
  if(mm<10){mm='0'+mm}
  return  mm + '/' + dd + '/' + yyyy;
}

function createPAC({ props, state }) {
  let pacs = [];
  let _pac         = _.cloneDeep(pac_template);
  let _osc_id      = state.get(`oscs.current_id`);
  let _osc         = state.get(`oscs.records.${_osc_id}`);
  if (_osc.trust_level !== "tl3") {
		console.log("-->creating PAC ", _osc.trust_level);
		_pac.id          = uuid();
		_pac.label       = _osc.label;
		_pac.title       = _osc.title;
		_pac.trust_level = _osc.trust_level;
		_pac.oscid       = _osc_id;//_osc.oscid;
		_pac.timestamp   = new Date().getTime();
		_pac.date_init   = getDate();
		_pac.pac_hash    = {};
		_pac.pac_hash.value = crypto.createHash("sha256").update(_pac).digest("hex");
		_pac._sent_to_regulator = false;

		pacs.push(_pac);
	}

  return { pacs: pacs };
}

export const sendPAC = sequence("pacs.sendPAC", [
  editPAC,
  buildRegulatorPACRequest,
  oada.put,
	editPACSentToRegulator,
	buildPACRequest,
	oada.put,
	editPACBlockchainGateway,
	createPACLedger
]);

export const updatePAC = sequence("pacs.updatePAC", [
  editPAC,
  buildPACRequest,
  oada.put
]);

function cleanObject(obj) {
	Object.keys(obj).forEach(e => {
			 if (e[0] === '_') {
				 delete obj[e];
			 }
	});
  return obj;
}

function editPAC({props, state}) {
  let id = state.get('PACList.current');
	let pacs = [];
	if (id !== "none") {
    let pac = state.get(`pacs.records.${id}`);
		console.log(pac);
		let cleanPAC = cleanObject(_.cloneDeep(pac));
		console.log("editPAC", cleanPAC);
		console.log(crypto.createHash("sha256").update(cleanPAC).digest("hex"));
		pacs.push(cleanPAC);
	}
	return {pacs: pacs};
}

function editPACSentToRegulator({props, state}) {
  let id = state.get('PACList.current');
	let pacs = [];
	if (id !== "none") {
    let pac = state.get(`pacs.records.${id}`);
		console.log(pac);
		let cleanPAC = cleanObject(_.cloneDeep(pac));
		console.log("editPACSentToRegulator", cleanPAC);
		cleanPAC._sent_to_regulator = true;
		console.log(crypto.createHash("sha256").update(cleanPAC).digest("hex"));
		pacs.push(cleanPAC);
	}
	return {pacs: pacs};
}

function editPACBlockchainGateway({props, state}) {
  let id = state.get('PACList.current');
	let pac = {};
	if (id !== "none") {
    let _pac = state.get(`pacs.records.${id}`);
		console.log(_pac);
		let cleanPAC = cleanObject(_.cloneDeep(_pac));
		console.log("-->creating PAC for Blockchain-Gateway", cleanPAC);

		cleanPAC._sent_to_regulator = true;
		pac["pacId"]     = cleanPAC.id;
		pac["quoteHash"] = cleanPAC.quote_hash;
		pac["pacHash"]   = crypto.createHash("sha256").update(cleanPAC).digest("hex"); 
		//console.log(crypto.createHash("sha256").update(cleanPAC).digest("hex"));
		console.log("-->PAC ", pac);
	}
	return {pac: pac};
}

function buildPACRequest({ props, state }) {
	let connection_id = state.get("oscs.connection_id");
	let requests = [];
  if (props.pacs[0]) {
		let pac = props.pacs[0];
    let request = {
			connection_id: connection_id,
			data:          props.pacs[0],
			path:          `${_localPath}/${pac.id}`,
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

function buildRegulatorPACRequest({ props, state }) {
	let connection_id = state.get("oscs.connection_id");
	let requests = [];
  if (props.pacs[0]) {
		let pac = props.pacs[0];
    let request = {
			connection_id: connection_id,
			data:          props.pacs[0],
			path:          `${_regulatorPath}/${pac.id}`,
			tree:          regulatorTree
		};
		requests.push(request);
		return {
		  connection_id: connection_id,
			requests:      requests,
			domain:        state.get("oada_domain")
		}
	}
}
