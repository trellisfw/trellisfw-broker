import React from "react";
import { connect } from "@cerebral/react";
import { state } from "cerebral/tags";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import CardMedia from '@material-ui/core/CardMedia';
//import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
//import FavoriteIcon from '@material-ui/icons/Favorite';
//import ShareIcon from '@material-ui/icons/Share';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
//import CheckIcon from '@material-ui/icons/CheckBox';
import CloudCheckIcon from '@material-ui/icons/CloudDone';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import VerifiedCodeIcon from '@material-ui/icons/AccountBalance';
//import PACStepper from "./PACStepper";
import OSCMenuList from "./OSCMenuList";
import { withStyles } from "@material-ui/core/styles";
import { useStyles, backColor, CardEnum } from "./OSCConfig.js";

/**
 * List of OSCs
 * Component created fro the Trellis Data store 
 * The OSC populate de records/resources in the backend
 * The Broker watches all OSC resources created
 */
class OSCList extends React.Component {

	/**
	 * Renders individual OSC object
	 * osc -> Oblivious Smart Contract Object
	 * returns jsx object for an individual OSC
	**/
	renderOSC( params ) {
		const {osc, classes} = params;
		const avaColor = {backgroundColor: backColor[osc.trustLevel]};
    
		if( osc ) {
			return (
				<div id={osc.id} className={classes.container}>
				  <Card className={classes.card}>
						<CardHeader
							avatar={
								<Avatar aria-label={CardEnum.OSC} 
								style={avaColor}>
								{osc.label}
								</Avatar>
							}
							action={
								<IconButton aria-label={CardEnum.Set}>
								  <OSCMenuList id={osc.id} />
								</IconButton>
							}
							title={osc.title}
							subheader={CardEnum.Run + osc.dateInit}
						/>
						<CardActions disableSpacing>
							<IconButton aria-label={CardEnum.VerCode}>
								<VerifiedCodeIcon />
							</IconButton>
							<IconButton aria-label={CardEnum.VerUser}>
								<VerifiedUserIcon />
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}>
								<CloudCheckIcon />
							</IconButton>
						</CardActions>
						
					</Card>
				</div>
			)
		} else {
			return null;
		}
	}//renderOSC

	/**
	 * Renders a List of OSCs 
	 * Invidual OSC records are populated by the Compute Engine
	 */
	render() {
		const { classes } = this.props;
		
		return (
			<div>
			{
				Object.keys(this.props.oscs || {}).map(oscid => {
					return this.renderOSC( 
						{
							osc:     this.props.oscs[oscid], 
						  classes: classes
						});
				})
			}
			</div>
  )}// render
}

/**
 * Connects to Cerebral
 * Defines state and signals here
 */
export default connect(
	{
    label:		state`OSCList.label`,
		oscs:     state`OSCList.records`
	},
  withStyles(useStyles, {withTheme: true})(OSCList)
);
