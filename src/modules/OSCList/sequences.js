import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleOSCListOpen = [toggle(state`OSCList.open`)];

export function setCurrent({props, state}){
  if (props.id) {
    state.set(`OSCList.current`, props.id);
	}
}

export function handlePACListOpen({props, state}) {
	let id = state.get(`OSCList.current`);
	let pacListOpen = state.get(`OSCList.records.${id}.pacListOpen`);
  state.set(`OSCList.records.${id}.pacListOpen`, ! pacListOpen);
}
