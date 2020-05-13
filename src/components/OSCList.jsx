// "OSCList.jsx"
import React                from "react";
import { connect }          from "@cerebral/react";
import { state, sequences } from "cerebral/tags";
import Card                 from "@material-ui/core/Card";
import CardHeader           from "@material-ui/core/CardHeader";
import CardContent          from "@material-ui/core/CardContent";
import CardActions          from "@material-ui/core/CardActions";
import Collapse             from "@material-ui/core/Collapse";
import Avatar               from "@material-ui/core/Avatar";
import IconButton           from "@material-ui/core/IconButton";
import RegulatorIcon        from "@material-ui/icons/AccountBalance";
import VpnKeyIcon           from "@material-ui/icons/VpnKey";
import StorageIcon          from "@material-ui/icons/Storage";
import GeneratePACIcon      from "@material-ui/icons/HourglassEmpty";
import RestartIcon          from "@material-ui/icons/RestorePage";
import TurnoffIcon          from "@material-ui/icons/PowerSettingsNew";
import ExpandMoreIcon       from "@material-ui/icons/ExpandMore";
import OSCMenuList          from "./OSCMenuList";
import { withStyles }       from "@material-ui/core/styles";
import { useStyles, backColor, CardEnum } from "./config.js";
import { green }            from "@material-ui/core/colors";
import PACList              from "./PACList";

/**
 * List of OSCs
 * Component created from the Trellis Data store 
 * The OSC populate de records/resources in the backend
 * The Broker watches all OSC resources created
 */
class OSCList extends React.Component {

	getColor(value) {
    return value ? '#ffcc66' : green[500];
  }

	/**
	 * Renders individual OSC object
	 * osc -> Oblivious Smart Contract Object
	 * returns jsx object for an individual OSC
	**/
	renderOSC( params ) {
		const {osc, classes} = params;
		if (osc) {
		  const avaColor     = {backgroundColor: backColor[osc.trust_level]};
      const hashOSCStyle = { color: green[500], marginLeft: '5px' };
      hashOSCStyle.color = this.getColor(!osc.control_signals.osc_hash);
      const tokenStyle   = { color: green[500], marginLeft: '5px' };
      tokenStyle.color   = this.getColor(osc.control_signals.token === "");
      const dataStyle    = { color: green[500], marginLeft: '5px' };
      dataStyle.color    = this.getColor(osc.control_signals.private_data === "");
      const generatePACStyle = { color: green[500], marginLeft: '5px' };
      generatePACStyle.color = this.getColor(!osc.control_signals.generate_pac);
      const restartStyle     = { color: '#ffffff', marginLeft: '5px' };
      const turnoffStyle     = { color: '#ffffff', marginLeft: '5px' };
      const expandStyle      = { color: '#00b33c', marginLeft: '5px' };
			return (
				<div id={osc.id} className={classes.container} key={osc.id}>
				  <Card className={classes.card} key={osc.id}>
						<CardHeader
							avatar={
								<Avatar aria-label={CardEnum.OSC} 
								style={avaColor}>{osc.label}</Avatar>
							}
							action={
								<IconButton aria-label={CardEnum.Set}>
								  <OSCMenuList id={osc.id} />
								</IconButton>
							}
							title={osc.title}
							subheader={CardEnum.Run + osc.date_init}
						/>
						<CardActions disableSpacing>
							<IconButton aria-label={CardEnum.VerCode}>
				        <RegulatorIcon style={hashOSCStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.VerUser}>
                <VpnKeyIcon style={tokenStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}>
                <StorageIcon style={dataStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}>
                <GeneratePACIcon style={generatePACStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}>
                <RestartIcon style={restartStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}>
                <TurnoffIcon style={turnoffStyle}/>
							</IconButton>
							<IconButton aria-label={CardEnum.Blockchain}
				             onClick={ () => {
							                 this.props.setCurrent({id: osc.id});
							                 this.props.handlePACListOpen();
											        }
											       }
											 >
                <ExpandMoreIcon style={expandStyle}/>
							</IconButton>
						</CardActions>

				    <Collapse in={this.props.oscs_list[osc.id].pacListOpen} 
				              timeout="auto" unmountOnExit>
              <CardContent>
				        <PACList id={osc.id}/>
              </CardContent>
            </Collapse>
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
			<div className={!this.props.open ? classes.hidden : classes.container}>
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
  )}//render
}

/**
 * Connects to Cerebral
 * Defines state and signals
 */
export default connect(
	{
		open:              state`OSCList.open`,
		oscs:              state`oscs.records`,
		oscs_list:         state`OSCList.records`,
    stepperOpen:       state`OSCList.stepperOpen`,
    pacListOpen:       state`OSCList.pacListOpen`,
		handlePACListOpen: sequences`OSCList.handlePACListOpen`,
		setCurrent:        sequences`OSCList.setCurrent`
	},
  withStyles(useStyles, {withTheme: true})(OSCList)
);
