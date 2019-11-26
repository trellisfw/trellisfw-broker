import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`OSCMenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`OSCMenuList.current`, props.item);
}

export let pacList = [
  handleMenuListOpen,
	pacList_action
];

export function pacList_action(evt) {
	console.log("PAC List ->" + evt);
	console.log(evt);
}

export let provisionToken = [
  handleMenuListOpen,
  provisionToken_action
];

export function provisionToken_action(evt){
	console.log("Provision Token Event ->" + evt);
	console.log(evt);
}

export let provisionData = [
  handleMenuListOpen,
  provisionData_action
];

export function provisionData_action({props, state}){
	console.log("Provision Data");
}

export let generatePAC = [
  handleMenuListOpen,
  generatePAC_action
];

export function generatePAC_action({props, state}){
	console.log("Generate PAC");
}

export let initRA = [
  handleMenuListOpen,
  initRA_action
]

export function initRA_action({props, state}){
	console.log("Init RA");
}

export let checkOSCHash =[
  handleMenuListOpen,
  checkOSCHash_action
];
export function checkOSCHash_action({props, state}){
	console.log("Check OSC Hash");
}

export let restartOSC = [
  handleMenuListOpen,
  restartOSC_action
];

export function restartOSC_action({props, state}){
	console.log("Restart OSC");
}

export let killOSC = [
  handleMenuListOpen,
  killOSC_action
];

export function killOSC_action({props, state}){
	console.log("Kill OSC");
}
