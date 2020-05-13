import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";
import * as oscs from "../oscs/sequences";
//import * as privatedatas from "../privatedata/sequences";
import * as pacs from "../pacs/sequences";

export let handleOpen = [toggle(state`OSCMenuList.open`)];

export function setCurrentItem({props, store}) {
	console.log("--> setCurrentItem");
	console.log(props);
  if (props && props.id) {
    store.set(`OSCList.current`, props.id);
		store.set(`oscs.current_id`, props.id);
	}
}

export let pacList = [
  handleOpen,
	pacList_action
];

export function pacList_action({props, store}) {
	console.log("PAC List ->");
	console.log(props);
}

export let provisionToken = [
  handleOpen,
	oscs.updateToken,
	oscs.updateOSC,
  provisionToken_action
];

export function provisionToken_action(evt){
	console.log("-->provisioning token ->" + evt);
	console.log(evt);
}

export let provisionData = [
  handleOpen,
	oscs.updateData,
	oscs.updateOSC,
  provisionData_action
];

export function provisionData_action({props, state}) {
	console.log("-->provisioning data");
}

export let generatePAC = [
  handleOpen,
	oscs.updateGeneratePAC,
	oscs.updateOSC,
	//privatedatas.compute,
  generatePAC_action,
	pacs.newPAC
];

export function generatePAC_action({props, state}) {
	console.log("-->generate PAC");
}

export let generatePACFalse = [
  handleOpen,
	oscs.updateGeneratePACFalse,
	oscs.updateOSC,
  generatePACFalse_action
];

export function generatePACFalse_action({props, state}) {
	console.log("-->generate PAC False");
}

export let initRA = [
  handleOpen,
	oscs.updateInitRA,
	oscs.updateOSC,
  initRA_action
]

export function initRA_action({props, state}) {
	console.log("-->init RA");
}

export let checkOSCHash = [
  handleOpen,
	oscs.checkOSCHash,
	oscs.updateOSC,
  checkOSCHash_action
];

export function checkOSCHash_action({props, state}) {
	console.log("--> checking OSC hash");
	//state.set(`oscs.records.3ac90b25-1d17-4eb7-9c51-0f47cfb1417a.control_signals.osc_hash`, true);
}

export let restartOSC = [
  handleOpen,
	oscs.updateRestartOSC,
	oscs.updateOSC,
  restartOSC_action
];

export function restartOSC_action({props, state}) {
	console.log("-->restart OSC");
}

export let killOSC = [
  handleOpen,
	oscs.updateKillOSC,
	oscs.updateOSC,
  killOSC_action
];

export function killOSC_action({props, state}) {
	console.log("-->kill OSC");
}
