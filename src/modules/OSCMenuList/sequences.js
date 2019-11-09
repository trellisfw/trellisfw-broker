import { state } from "cerebral/tags";
import { toggle } from "cerebral/operators";

export var handleMenuListOpen = [toggle(state`OSCMenuList.open`)];

export function setCurrentItem({props, state}){
  if(props.item)
    state.set(`OSCMenuList.current`, props.item);
}
