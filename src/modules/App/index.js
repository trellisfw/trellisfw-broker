import { Module } from "cerebral";
import stateTree from "./stateTree.js";
import * as sequences from "./sequences";
//import StorageModule from "@cerebral/storage";

/*const LocalCache = StorageModule({
  target: window.localStorage ? localStorage : null,
  json: true,
  sync: {
    Connections: "Connections"
  },
  prefix: "_Broker"
});
*/

export default Module({
  state: stateTree,
  sequences
	//modules: { LocalCache }
});
