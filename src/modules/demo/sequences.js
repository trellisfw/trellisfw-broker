/* demo/sequences.js */
import { sequence } from "cerebral";
import { set } from "cerebral/operators";
import { state } from "cerebral/tags";
import oada from "@oada/cerebral-module/sequences";
//import { pac_dataset } from "../../components/offline_datasets.js";
import { osc_dataset } from "../../components/offline_datasets.js";
import { pac_template } from "../../components/offline_datasets.js";
import { private_dataset } from "../../components/offline_datasets.js";
//import { local_oscs } from "../../components/offline_datasets.js";
import _ from "lodash";
import uuid from "uuid";
//import now from "performance-now";

let _localPACSPath = "/bookmarks/pacs";
//let _localOSCSPath = "/bookmarks/oscs";
let _regulatorCodePath = "/bookmarks/code";
let _localPrivateDataPath = "/bookmarks/privatedata";
let _localFilteredPrivateDataPath = "/bookmarks/filteredprivatedata";

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

/*let OSCtree = {
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
};*/

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

let FilteredPrivateDataTree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    filteredprivatedata: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};
/*const upload_demo_pacs = [
  createPACS,
	createPACRequest,
	oada.put
];
*/

const upload_demo_oscs = [
  //createOSCS,
	//createOSCRequest,
	//oada.put,
	createCode,
	createCodeRequest,
	oada.put
];

export const upload_demo_privatedata = [
	set(state`ProgressBar.open`, true),
  createPrivateData,
	createPrivateDataRequest,
	oada.put,
  //montecarlo_osc_main,
	set(state`ProgressBar.open`, false)
];

export const upload_demo_filteredprivatedata = [
	set(state`ProgressBar.open`, true),
  createFilteredPrivateData,
	createFilteredPrivateDataRequest,
	oada.put,
	set(state`ProgressBar.open`, false)
];

// paper experiments
/*function montecarlo_osc_main() {
   let tests = 1000;
   let init_n = 1000000;
   let ns = [];
   for(let i=0; i<10; i++){
     let total = 0;
     let n = init_n * (2**i);
     let times = [];
     ns.push(n);
		 for(let j=0; j<tests; j++){
			 let start0 = now();
			 //let start = new Date();
			 let pi = montecarlo_osc(n); 
			 //let end = new Date();
			 let end0 = now();
			 let elapsed0 = end0-start0;
			 //let elapsed = end.getTime() - start.getTime();
       total += elapsed0;
			 times.push(elapsed0);
			}//for 2
     let mean = total / tests;
     const std = Math.sqrt(times.map(x => Math.pow(x-mean,2)).reduce((a,b)=> a+b)/n);
		 console.log(`${i} iteration -> n=${ns[i]} ->-> std ${std} -> elapsed time`, mean);
   }//for 1
}*/

/*function montecarlo_osc(n) {
  //let n = 512000000;
 let total = 0;
  let i, count;
  let x,y,z,pi;

  count =0; 
  for (i=0; i<n; i++) {
    x = Math.random();
    y = Math.random();
    z = x*x + y*y;
    if (z<=1) count++;
  }
  pi = count / n*4;

  return pi; 
}*/

export const init = sequence("demo.init", [
	set(state`ProgressBar.open`, true),
	set(state`demo.loading`, true),
	//upload_demo_pacs,
	upload_demo_oscs,
	set(state`demo.loading`, false),
	set(state`ProgressBar.open`, false),
]);

/*function createPACS({ props, state }) {
	let pacs = [];
  let keys = Object.keys(pac_dataset.records);
	
	for (let key of keys) {
    let pac = pac_dataset.records[key];
    pacs.push(pac);
	}

	return { pacs: pacs };
}
*/

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

/*function createOSCS({ props, state }) {
	let oscs = [];
  let keys = Object.keys(osc_dataset.records);
	
	for (let key of keys) {
		if (local_oscs.includes(key)) {
      let osc = osc_dataset.records[key];
      oscs.push(osc);
		}//if
	}//for

	return { oscs: oscs };
}*/

function getDate() {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;//January is 0!`

	let yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd}
	if(mm<10){mm='0'+mm}
	return  mm + '/' + dd + '/' + yyyy;
}

function createCode({ props, state }) {
	let oscs = [];
  let keys = Object.keys(osc_dataset.records);
	
	for (let key of keys) {
		//if (local_oscs.contains(key)) {
      let osc = _.cloneDeep(osc_dataset.records[key]);
		  osc.date_init = getDate(); 
		  osc.timestamp = new Date().getTime();

      oscs.push(osc);
		//}//if
	}//for

	return { oscs: oscs };
}

/*function createOSCRequest({ props, state }) {
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
}*/

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

function createFilteredPrivateData({ props, state }) {
	let pdata = [];

  let _datum = { };
	let _samples = 10;

	for (let i=1; i<=_samples; i++) {
    //_datum[uuid()] = Math.floor((Math.random()*_samples) + 1);
    //_datum[uuid()] = Math.floor((Math.random()*30) + 1);
    _datum[uuid()] = i;
	}
  console.log("--> created filtered data ", _datum);
  pdata.push(_datum);
	let _id = "3f862025-6856-43f9-b4ec-013a40aa8ea6";

	return { pdata: pdata, id: _id };
}

function createFilteredPrivateDataRequest({ props, state }) {
  let connection_id = state.get("oscs.connection_id");
  let requests = [];

	for (let datum of props.pdata) {
		let _path = `${_localFilteredPrivateDataPath}/${props.id}`;
		console.log(_path);
		let request = {
			connection_id: connection_id,
			data:          datum,
			path:          _path,
			tree:          FilteredPrivateDataTree
		};
		requests.push(request);
	}//for
 
	return {
    connection_id: connection_id,
    requests:      requests,
    domain:        state.get("oada_domain")
  };
}
