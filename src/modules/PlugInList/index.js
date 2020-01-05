// "modulesPlugInList/index.js"
import { Module } from "cerebral";
import stateTree from "./stateTree";

import * as sequences from "./sequences";

export default Module({
  state : stateTree,
  sequences 
});
