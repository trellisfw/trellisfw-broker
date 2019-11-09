import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`MenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`MenuList.current`, props.item);
}
