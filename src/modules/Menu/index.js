import { Module } from "cerebral";
import { showConnections } from "../Connections/sequences";

export default Module({
  state: {
    open: false
  },

  signals: {
    connectionsClicked: showConnections,
  }
});
