/* PlugInList/sequences.js */
import { toggle } from "cerebral/operators";
import { sequence } from "cerebral";
import { set, when } from "cerebral/operators";
import { state, props } from "cerebral/tags";
import Promise from "bluebird";
import oada from "@oada/cerebral-module/sequences";
import * as oscs from "../oscs/sequences";
let _localPath = "/bookmarks/code";

export let handleOpen = [
	toggle(state`PlugInList.open`),
	toggle(state`OSCList.open`),
	set(state`PACList.open`, false),
];

export function setCurrentItem({props, state}){
  if(props.pluginid)
    state.set(`PlugInList.current`, props.pluginid);
}

/*function cleanObject(obj) {
  Object.keys(obj).forEach(e => {
       if (e[0] === '_') {
         delete obj[e];
       }
  });
  return obj;
}
*/

export const install = sequence("PlugInList.install", [
  oscs.installOSC
]);

let tree = {
  bookmarks: {
    _type: "application/vnd.oada.bookmarks.1+json",
    _rev: "0-0",
    code: {
      _type: "application/vnd.oada.yield.1+json",
      _rev: "0-0",
      "*": {
        _type: "application/vnd.oada.yield.1+json",
        _rev: "0-0"
      }
    }
  }
};

const CONNECTION_ID = "oscs.connection_id";

function buildFetchRequest({ state }) {
  let request =  {
       connection_id: state.get(CONNECTION_ID),
       path:          _localPath,
       tree
    };
  let requests = [];
  requests.push(request);

  return { requests };
}

export const fetch = sequence("PlugInList.fetch", [
  ({state, props}) => ({
    connection_id: state.get(CONNECTION_ID),
    path:          _localPath,
    tree
  }),
  buildFetchRequest,
  oada.get,
  when(state`oada.${props`connection_id`}.bookmarks.code`),
  {
    true: sequence("fetchPlugInListSuccess", [
            mapOadaToOscs,
            set(state`PlugInList.emptyDataSet`, false),
          ]),
    false: sequence("fetchPlugInListEmptySet", [
            () => ( console.log("--> PlugInList empty set") ),
            set(state`PlugInList.emptyDataSet`, true)
    ]),
  }
]);

export const init = sequence("PlugInList.init", [
  when(state`Connections.connection_id`),
  {
    true: [oada.connect],
    false: [
            oada.connect,
            set(state`PlugInList.connection_id`, props`connection_id`),
            set(state`Connections.connection_id`, props`connection_id`),
           ]
  },
  set(state`PlugInList.loading`, true),
  fetch,
  set(state`PlugInList.loading`, false),
  set(state`PlugInList.open`, false)
]);

export function mapOadaToOscs({ props, state }){
  let connection_id = state.get(CONNECTION_ID);
  let oscs = state.get(`oada.${connection_id}.bookmarks.code`);
  if (oscs) {
    return Promise.map(Object.keys(oscs || {}), osc => {
      if (osc[0] !== "_" && osc !== "oscs") {
        let currentOSC =
               state.get(`oada.${connection_id}.bookmarks.code.${osc}`);
        if ( currentOSC && currentOSC.id ) {
          state.set(`PlugInList.records.${osc}`, oscs[osc]);
        }
        return;
      }
    }).then( () => { return; });
  }//if
}//mapOadaToOscs
