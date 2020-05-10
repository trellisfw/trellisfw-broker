import { state }  from "cerebral/tags";
import { toggle } from "cerebral/operators";
import * as pacs  from "../pacs/sequences";

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
  console.log("--> sending PAC to the regulator");
	state.set(`PACList.current`, props.pacid);
}

export const signPAC = [
  pacs.signPAC
]

export function setCurrentPAC({props, state}){
  if (props.pacid && props.oscid) {
    state.set(`PACList.currentPAC`, props.pacid);
    state.set(`PACList.currentOSC`, props.oscid);
  }
}

export function handlePACContentOpen({props, state}) {
  let pacid = state.get(`PACList.currentPAC`);
  let oscid = state.get(`PACList.currentOSC`);
  // visible or pacContentOpen
  let pacContentOpen = state.get(`oscs.records.${oscid}.generated_pacs.${pacid}.visible`);
  if (typeof pacContentOpen !== 'undefined') {
    state.set(`oscs.records.${oscid}.generated_pacs.${pacid}.visible`, ! pacContentOpen);
  }
}
