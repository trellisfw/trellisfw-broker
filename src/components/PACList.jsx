// "components/PACList.jsx"
import React from "react";
import Button from "@material-ui/core/Button";
import CheckedIcon from '@material-ui/icons/AssignmentTurnedIn';
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

class PACList extends React.Component {

  renderPAC( params ) {
    const { pac, classes } = params;
    let _sent_to_regulator = pac.hasOwnProperty("_sent_to_regulator") ? 
			                       pac._sent_to_regulator : false;
		if (pac) {
			const avaColor = {backgroundColor: backColor[pac.trust_level]};
			const listColor= {backgroundColor: backColorList[pac.trust_level]};
			return (
				<div key={pac.id}>
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
						<Button
							variant="outlined"
							color="default"
				      size="small"
							className={classes.button}
							startIcon={<CheckedIcon />}
				      onClick={ () => {this.props.sendPACtoRegulator({pacid: pac.id})}}
				disabled={_sent_to_regulator}
						 >
				   { _sent_to_regulator ? "Sent" : "Send" }	
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
			<div className={!this.props.oscs_list[this.props.id].pacListOpen ? classes.hidden : classes.pill}>
				<List className={classes.pacList}
         subheader={
            <ListSubheader component="div" id="nested-list-subheader"
                           color="inherit">
              Private Automated Certifications List
            </ListSubheader>
         }
			>
        {
					Object.keys(this.props.oscs[this.props.id].generated_pacs || {}).map(pacid => {
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
		pacs:      state`pacs.records`,
		oscs:      state`oscs.records`,
		oscs_list: state`OSCList.records`,
		//sendPACtoRegulator:  sequences`PACList.signPAC`
		sendPACtoRegulator:  sequences`PACList.sendPACtoRegulator`

	},
	withStyles(useStyles, {withTheme: true})(PACList)
);
