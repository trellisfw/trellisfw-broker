import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";
import * as pacs from "../pacs/sequences";

export let handlePACListOpen = [toggle(state`PACList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`PACList.current`, props.item);
}

export const sendPACtoRegulator = [
  sendPACtoRegulatorAction,
	pacs.sendPAC
];

export function sendPACtoRegulatorAction({props, state}) {
  console.log(" -->sending PAC to the regulator");
	state.set(`PACList.current`, props.pacid);
}

export const signPAC = [
  pacs.signPAC
]
