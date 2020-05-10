import { state }             from "cerebral/tags";
import { toggle }            from "cerebral/operators";
import { pac_dataset }       from "../../components/offline_datasets.js";
import { osc_dataset }       from "../../components/offline_datasets.js";
import { handlePACListOpen } from "../PACList/sequences"; 
import { handleOSCListOpen } from "../OSCList/sequences"; 
import { openConnections }   from "../Connections/sequences";
import { queryAll }           from "../blockchaingateway/sequences";

export let handleMenuListOpen = [toggle(state`MenuList.open`)];

export function setCurrentItem({props, state}) {
  if(props.item)
    state.set(`MenuList.current`, props.item);
}

export let pacList = [
	handleMenuListOpen,
	handlePACListOpen,
	handleOSCListOpen
];

export let oscList = [
	handleMenuListOpen,
	handlePACListOpen,
	handleOSCListOpen
];

export let blockchain = [
	handleMenuListOpen,
  blockchain_action,
	queryAll
];

export function blockchain_action({props, state}) {
	//state.set(`Messages.open`, true);
	console.log("--> connected to blockchain gateway");
	//let _timer = setInterval(() => { state.set("Messages.open", false) }, 2000);
	state.set(`blockchaingateway.connected`, true);
}

/*function closeMessage({props, state}) {
  state.set("Messages.open", false);
}*/

export let regulatorRepo = [
	handleMenuListOpen,
  regulatorRepo_action
];

export function regulatorRepo_action({props, state}) {
	console.log("--> regulator repo");
}

export let trellisRepo = [
	handleMenuListOpen,
	openConnections
];

export let offline = [
	handleMenuListOpen,
  offline_action  
];

export function offline_action({props, state}) {
	console.log("--> offline demo");
	state.set(`PACList.records`, pac_dataset.records);
	state.set(`OSCList.records`, osc_dataset.records);
	state.set(`PACList.open`, true);
	state.set(`OSCList.open`, false);
}
