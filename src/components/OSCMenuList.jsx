// components/OSCMenuList.jsx
import React                 from "react";
import PropTypes             from "prop-types";
import { connect }           from "@cerebral/react";
import { state, sequences }  from "cerebral/tags";
import { Menu, MenuItem }    from "@material-ui/core";
import IconButton            from "@material-ui/core/IconButton";
import ListItemIcon          from "@material-ui/core/ListItemIcon";
import MoreVertIcon          from "@material-ui/icons/MoreVert";
import { withStyles }        from "@material-ui/core/styles";
import UnoIcon               from "@material-ui/icons/Filter1";
import DosIcon               from "@material-ui/icons/Filter2";
import TresIcon              from "@material-ui/icons/Filter3";
import CuatroIcon            from "@material-ui/icons/Filter4";
import Divider 							 from "@material-ui/core/Divider";

//The DOM element used to set the position of the menu.
let anchorEl;

const styles = theme => ({
  menuButton: {
    marginLeft: 2,
    marginRight: 2
  },
});

class OSCMenuList extends React.Component {

  handleClose = () => {
    anchorEl = null;
  };

  handleMenuList = event => {
    anchorEl = event.currentTarget;
  };

  render() {

    const { id, classes } = this.props;

    anchorEl = this.props.open ? anchorEl : null;
		/*console.log("============================================");
		console.log("-->id " + id);
		console.log(this.props);*/
		//let _osc = this.props.oscs[id];
		//console.log(_osc);
		
    return (
      <div>
        <IconButton
          key={`OSCMenuListIcon-${this.props.id}`}
          color="inherit"
          aria-label="simple-menu-button"
          id={`OSCMenuListIcon-${this.props.id}`}
          aria-owns={"simple-menu"}
          aria-haspopup="true"
          onClick={ (evt) => {
						          this.props.setCurrentItem({id: id});
						          this.handleMenuList(evt); 
						      	  this.props.handleOpen({})
					          }
					        }
          className={classes.menuButton}
          disabled={false}
        >
          <MoreVertIcon />
        </IconButton>
        {(this.props.open) ?
          <Menu
            id={`OSC-menu-${this.props.id}`}
            open={this.props.open}
            onClose={this.props.handleOpen}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={this.props.checkOSCHash}
					            disabled={false}>
					  	<ListItemIcon>
            		<UnoIcon style={{color: "#3399ff", marginRight: "5px"}}/>
          		</ListItemIcon>
					    Verify OSC
					  </MenuItem>
            <MenuItem onClick={this.props.provisionToken}
					            disabled={false}>
					  	<ListItemIcon>
            		<DosIcon  style={{color: "#0080ff"}}/>
          		</ListItemIcon>
					    Provision Token
					  </MenuItem>
            <MenuItem onClick={this.props.provisionData}
					            disabled={false}>
					  	<ListItemIcon>
            		<TresIcon style={{color: "#0066cc"}}/>
          		</ListItemIcon>
					    Provision Data
					  </MenuItem>
            <MenuItem onClick={this.props.generatePAC}>
					  	<ListItemIcon>
            		<CuatroIcon style={{color: "#004d99"}}/>
          		</ListItemIcon>
					    Generate PAC
					  </MenuItem>
					  <Divider />
            <MenuItem onClick={this.props.generatePACFalse}>
					    Stop PAC Generation 
					  </MenuItem>
            <MenuItem onClick={this.props.restartOSC}>
					    Restart OSC
					  </MenuItem>
            <MenuItem onClick={this.props.killOSC}>
					    Turn OSC Off
					  </MenuItem>
          </Menu>
          : null}
      </div>
    )}
}

OSCMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  {
    current:            state`OSCList.current`,
    open:               state`OSCMenuList.open`,
		oscs:               state`oscs.records`,

    setCurrentItem:     sequences`OSCMenuList.setCurrentItem`,
    clearConnection:    sequences`Connections.clearConnection`,
    handleOpen:         sequences`OSCMenuList.handleOpen`,
    pacList:            sequences`OSCMenuList.pacList`,
    provisionToken:     sequences`OSCMenuList.provisionToken`,
    provisionData:      sequences`OSCMenuList.provisionData`,
    generatePAC:        sequences`OSCMenuList.generatePAC`,
    generatePACFalse:   sequences`OSCMenuList.generatePACFalse`,
    initRA:             sequences`OSCMenuList.initRA`,
    checkOSCHash:       sequences`OSCMenuList.checkOSCHash`,
    restartOSC:         sequences`OSCMenuList.restartOSC`,
    killOSC:            sequences`OSCMenuList.killOSC`,
  },
  withStyles(styles, {withTheme: true})(OSCMenuList)
);
