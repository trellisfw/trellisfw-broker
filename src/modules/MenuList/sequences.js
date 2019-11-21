import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`MenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`MenuList.current`, props.item);
}

export function pacList() {
	console.log("PAC List ->");
}

export function oscList(evt) {
	console.log("OSC List ->" + evt);
	console.log(evt);
}

export function blockchain(){
	console.log("Blockchain ->");
}

export function regulatorRepo({props, state}){
	console.log("Regulator Repo");
}

export function trellisRepo({props, state}){
	console.log("Trellis Repo");
}

