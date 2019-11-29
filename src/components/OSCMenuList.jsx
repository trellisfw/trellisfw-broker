import React              from 'react';
import PropTypes          from "prop-types";
import { connect }        from "@cerebral/react";
import { state, sequences }  from "cerebral/tags";
import { Menu, MenuItem } from "@material-ui/core";
import IconButton         from '@material-ui/core/IconButton';
import MoreVertIcon       from '@material-ui/icons/MoreVert';
import { withStyles }     from '@material-ui/core/styles';

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
    return (
      <div>
        <IconButton
          key={1}
          color="inherit"
          aria-label="simple-menu-button"
          id={this.props.id}
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
            id={"OSC-menu-"+this.props.id}
            open={this.props.open}
            onClose={this.props.handleOpen}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={ (evt) => {this.props.pacList({evt: evt, oscid: this.props.id})}}>
					    PAC List
					  </MenuItem>
            <MenuItem onClick={this.props.provisionToken}>
					    Provision Token
					  </MenuItem>
            <MenuItem onClick={this.props.provisionData}>
					    Provision Data
					  </MenuItem>
            <MenuItem onClick={this.props.generatePAC}>
					    Generate PAC
					  </MenuItem>
            <MenuItem onClick={this.props.initRA}>
					    Initiate RA
					  </MenuItem>
            <MenuItem onClick={this.props.checkOSCHash}>
					    Verify OSC Hash
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
    menuItems:          state`OSCMenuList.records`,
    current:            state`OSCMenuList.current`,
    open:               state`OSCMenuList.open`,

    setCurrentItem:     sequences`OSCMenuList.setCurrentItem`,
    clearConnection:    sequences`Connections.clearConnection`,
    handleOpen:         sequences`OSCMenuList.handleOpen`,
    pacList:            sequences`OSCMenuList.pacList`,
    provisionToken:     sequences`OSCMenuList.provisionToken`,
    provisionData:      sequences`OSCMenuList.provisionData`,
    generatePAC:        sequences`OSCMenuList.generatePAC`,
    initRA:             sequences`OSCMenuList.initRA`,
    checkOSCHash:       sequences`OSCMenuList.checkOSCHash`,
    restartOSC:         sequences`OSCMenuList.restartOSC`,
    killOSC:            sequences`OSCMenuList.killOSC`,
  },
  withStyles(styles, {withTheme: true})(OSCMenuList)
);
