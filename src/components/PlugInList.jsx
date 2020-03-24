// "components/PlugInList.jsx"
import React from "react";
import Button from "@material-ui/core/Button";
import CheckedIcon from "@material-ui/icons/AssignmentTurnedIn";
import { connect } from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useStyles, backColor, backColorList } from "./config.js";

class PlugInList extends React.Component {

  renderPlugIn( params ) {
    const { oscs, plugin, classes } = params;
		if (plugin) {
			const avaColor = {backgroundColor: backColor[plugin.trust_level]};
			const listColor= {backgroundColor: backColorList[plugin.trust_level]};
			let pluginInstalled = false;
			if (oscs.hasOwnProperty(plugin.id)) {
				pluginInstalled = true;
			}

			return (
				<div key={plugin.id}>
					<ListItem className={`${classes.pill}`} style={listColor}
                    key={plugin.id}
				  >
						<ListItemAvatar>
							<Avatar style={avaColor}>
				      {plugin.label}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={plugin.title || null} 
				                  secondary={plugin.date_init || null} />
						<Button
							variant="outlined"
							color="default"
				      size="small"
							className={classes.button}
							startIcon={pluginInstalled ? null : <CheckedIcon />}
				      onClick={ () => {
								            this.props.setCurrentItem(
															{pluginid: plugin.id});
								            this.props.install({});
							        }}
				      disabled={pluginInstalled}
						 >
				      {pluginInstalled ? "Installed" : "Install"}	
						</Button>
					</ListItem>
				</div>
			);
		} else {
			return null;
	  }
	}//renderPAC

	render() {
		const { classes } = this.props;

		return (
			<div className={!this.props.open ? classes.hidden : classes.pill}>
				<List className={classes.pacList}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" 
						               color="inherit">
              Certified OSCs available 
            </ListSubheader>
      }
			>
        {
					Object.keys(this.props.plugins || {}).map(pluginid => {
						return this.renderPlugIn(
							{
								plugin:  this.props.plugins[pluginid],
								classes: classes,
								oscs:    this.props.oscs
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
		open:           state`PlugInList.open`,
		plugins:        state`PlugInList.records`,
		oscs:           state`oscs.records`,

		setCurrentItem: sequences`PlugInList.setCurrentItem`,
		install:        sequences`PlugInList.install`
	},
	withStyles(useStyles, {withTheme: true})(PlugInList)
);

