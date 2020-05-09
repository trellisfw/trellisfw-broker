import { Module }     from "cerebral";
import stateTree      from "./stateTree.js";
import * as sequences from "./sequences";

export default Module({
  state: stateTree,
  sequences
});
