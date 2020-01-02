// "components/ProgressBar.jsx"
import React                from "react";
import { connect }          from "@cerebral/react";
import { state } from "cerebral/tags";
import { withStyles }       from "@material-ui/core/styles";
import LinearProgress       from '@material-ui/core/LinearProgress';
import { useStyles }        from "./config.js";

class ProgressBar extends React.Component {
  
	render() {
		const { classes } = this.props;
		return (
			 <div className={!this.props.open ? classes.hidden: classes.progressBar}>
        <LinearProgress color="secondary" style={{color: "#0099e6", thickness:10}}/>
      </div>
		);
	}
}

export default connect(
	{
		open:    state`ProgressBar.open`,
    appName: state`ProgressBar.completed`
	},
	withStyles(useStyles, {withTheme: true})(ProgressBar)
);

