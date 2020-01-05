/* demo/sequences.js */
import { sequence } from "cerebral";
import { set } from "cerebral/operators";
import { state } from "cerebral/tags";
import oada from "@oada/cerebral-module/sequences";
import { pac_dataset } from "../../components/offline_datasets.js";
import { osc_dataset } from "../../components/offline_datasets.js";
import { pac_template } from "../../components/offline_datasets.js";
import { private_dataset } from "../../components/offline_datasets.js";
import _ from "lodash";
import uuid from "uuid";

let _localPACSPath = "/bookmarks/pacs";
let _localOSCSPath = "/bookmarks/oscs";
let _regulatorCodePath = "/bookmarks/code";
let _localPrivateDataPath = "/bookmarks/privatedata";

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

let OSCtree = {
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

let CodeTree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    code: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

let PrivateDataTree = {
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

const upload_demo_pacs = [
  createPACS,
	createPACRequest,
	oada.put
];

const upload_demo_oscs = [
  createOSCS,
//	createOSCRequest,
	//oada.put,
	createCodeRequest,
	oada.put
];

export const upload_demo_privatedata = [
  createPrivateData,
	createPrivateDataRequest,
	oada.put
];

export const init = sequence("demo.init", [
	set(state`ProgressBar.open`, true),
	set(state`demo.loading`, true),
	//upload_demo_pacs,
	upload_demo_oscs,
	set(state`demo.loading`, false),
	set(state`ProgressBar.open`, false),
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

export const newPAC = sequence("demo.newPAC", [
  createPAC,
	createPACRequest,
	oada.put
]);

function createPAC({ props, state }) {
	let pacs = [];
  let _pac = _.cloneDeep(pac_template);
	_pac.id = uuid();
	pacs.push(_pac);

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
			tree:          tree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}

function createOSCS({ props, state }) {
	let oscs = [];
  let keys = Object.keys(osc_dataset.records);
	
	for (let key of keys) {
    let osc = osc_dataset.records[key];
    oscs.push(osc);
	}

	return { oscs: oscs };
}

function createOSCRequest({ props, state }) {
  let connection_id = state.get("oscs.connection_id");
  let requests = [];

	for (let osc of props.oscs) {
		console.log(osc.id);
		let _path = `${_localOSCSPath}/${osc.id}`;
		console.log(_path);
		let request = {
			connection_id: connection_id,
			data:          osc,
			path:          _path,
			tree:          OSCtree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}

function createCodeRequest({ props, state }) {
  let connection_id = state.get("oscs.connection_id");
  let requests = [];

	for (let osc of props.oscs) {
		console.log(osc.id);
		let _path = `${_regulatorCodePath}/${osc.id}`;
		console.log(_path);
		let request = {
			connection_id: connection_id,
			data:          osc,
			path:          _path,
			tree:          CodeTree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}

function createPrivateData({ props, state }) {
	let pdata = [];
	console.log(private_dataset);
  let keys = Object.keys(private_dataset.records);
	
	for (let key of keys) {
    let datum = private_dataset.records[key];
    pdata.push(datum);
	}

	return { pdata: pdata };
}

function createPrivateDataRequest({ props, state }) {
  let connection_id = state.get("oscs.connection_id");
  let requests = [];

	for (let datum of props.pdata) {
		console.log(datum.id);
		let _path = `${_localPrivateDataPath}/${datum.id}`;
		console.log(_path);
		let request = {
			connection_id: connection_id,
			data:          datum,
			path:          _path,
			tree:          PrivateDataTree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}
