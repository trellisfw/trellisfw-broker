// "components/PACList.jsx"
import React from "react";
import { connect } from "@cerebral/react";
import { state } from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useStyles, backColor, backColorList } from "./config.js";

class PACList extends React.Component {

  renderPAC( params ) {
    const { pac, classes } = params;
		if (pac) {
			const avaColor = {backgroundColor: backColor[pac.trust_level]};
			const listColor= {backgroundColor: backColorList[pac.trust_level]};
			return (
					<ListItem className={`${classes.pill}`} style={listColor}
                    key={pac.id}
				  >
						<ListItemAvatar>
							<Avatar style={avaColor}>
				      {pac.label}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={pac.title || null} 
				                  secondary={pac.timestamp || null} />
					</ListItem>
			);
		} else {
			return null;
	  }
	}//renderPAC

	render() {
		const { classes } = this.props;

		return (
			<div className={!this.props.open ? classes.hidden : classes.pill}>
				<List className={classes.pacList}>
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

