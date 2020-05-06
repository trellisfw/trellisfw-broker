// "components/PACContent.jsx"
import React          from "react";
import { connect }    from "@cerebral/react";
import { state }      from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import List           from "@material-ui/core/List";
import { useStyles }  from "./config.js";
import JSONPretty     from "react-json-pretty";
let monikai = require("react-json-pretty/themes/monikai.css");

class PACContent extends React.Component {
	
  render() {
    
    let visible = false;
    let _osc = this.props.oscs[this.props.pac.oscid];
    if (_osc) {
      visible = _osc.generated_pacs[this.props.pac.id].visible || false;
    }
    
		const { classes } = this.props;

		return (
			<div className={visible ? classes.paccontent : classes.hidden} id={`paccontent_${this.props.pac.id}`}>
				<List className={classes.pacList}>
          <JSONPretty id="json-pretty" data={this.props.pac} theme={monikai}></JSONPretty>
        </List>
			</div>
		)
	}//render

}

export default connect(
	{
		oscs:                  state`oscs.records`
	},
	withStyles(useStyles, {withTheme: true})(PACContent)
);
