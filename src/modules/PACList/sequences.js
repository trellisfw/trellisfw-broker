import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handlePACListOpen= [toggle(state`PACList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`PACList.current`, props.item);
}
