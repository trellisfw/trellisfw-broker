import React from "react";
import { connect } from "@cerebral/react";
import { TextField, DialogTitle } from "@material-ui/core";
import { DialogContent, DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { state, sequences } from "cerebral/tags";

export default connect(
  {
    oadaDomainText:     state`Connections.oada_domain_text`,
    open:               state`Connections.open`,

    submitClicked:      sequences`Connections.setConnection`,
    cancelClicked:      sequences`Connections.cancelConnection`,
    oadaDomainChanged:  sequences`Connections.updateOadaDomain`,
  },

  class Connections extends React.Component {
    render() {
      return (
        <Dialog open={this.props.open} className={"connections-dialog"}>
          <DialogTitle id="alert-dialog-title">
            {"OADA Data Source"}
          </DialogTitle>
          <DialogContent>
            OADA domain?
          </DialogContent>
          <DialogContent>
            <div>
              <TextField
                label="Domain: https://oada.openatk.com"
                value={this.props.oadaDomainText}
                onChange={e => this.props.oadaDomainChanged({ value: e.target.value })}
                style={{ width: 250 }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {this.props.cancelClicked({});}}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {this.props.submitClicked({});}}
              color="secondary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  }
);
