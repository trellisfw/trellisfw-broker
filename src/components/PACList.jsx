// "components/PACList.jsx"
import React from "react";
import { connect } from "@cerebral/react";
import { state } from "cerebral/tags";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { useStyles, backColor } from "./OSCConfig.js";

/*const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
*/
class PACList extends React.Component {

  renderPAC( params ) {
    const { pac, classes } = params;
		if (pac) {
			return (
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<ImageIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={pac.label} 
				                  secondary="Jan 9, 2020" />
					</ListItem>
			);
		} else {
			return null;
	  }
	}//renderPAC

	render() {
		const { classes } = this.props;

		return (
			<div>
				<List className={classes.root}>
        {
					Object.keys(this.props.pacs || {}).map(pacid => {
						return this.renderPAC(
							{
								pac:     this.props.pacs[pacid],
								classes: classes
							});
					})
				}
				</List>
			</div>
		)
	}//render

}

export default connect(
	{
		open: state`PACList.open`,
		pacs: state`PACList.records`
	},
	withStyles(useStyles, {withTheme: true})(PACList)
);

