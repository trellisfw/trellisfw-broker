import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`OSCList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`OSCList.current`, props.item);
}
