import { Module } from "cerebral";
import { showConnections } from "../Connections/sequences";

export default Module({
  state: {
    open: false
  },

  sequences: {
    connectionsClicked: showConnections,
  }
});
