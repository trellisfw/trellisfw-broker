import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`OSCMenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`OSCMenuList.current`, props.item);
}

export function provisionToken(evt){
	console.log("Provision Token Event ->" + evt);
	console.log(evt);
}

export function provisionData({props, state}){
	console.log("Provision Data");
}

export function generatePAC({props, state}){
	console.log("Generate PAC");
}

export function initRA({props, state}){
	console.log("Init RA");
}

export function checkOSCHash({props, state}){
	console.log("Check OSC Hash");
}

export function restartOSC({props, state}){
	console.log("Restart OSC");
}

export function killOSC({props, state}){
	console.log("Kill OSC");
}
