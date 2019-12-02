import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export let handlePACListOpen = [toggle(state`PACList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`PACList.current`, props.item);
}

export function verifySignature({props, state}) {
  console.log(" --> verifying signature");
}
