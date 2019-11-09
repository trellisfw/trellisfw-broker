import React from 'react';
import PropTypes from "prop-types";
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import { Menu, MenuItem } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

var anchorEl;

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

    const { classes } = this.props;

    anchorEl = this.props.open ? anchorEl : null;
    return (
      <div>
        <IconButton
          key={7}
          color="inherit"
          aria-label="simple-menu-button"
          id="simple-menu-button"
          aria-owns={"simple-menu"}
          aria-haspopup="true"
          onClick={(evt) => {this.handleMenuList(evt); this.props.handleMenuListOpen({})}}
          className={classes.menuButton}
          disabled={
            this.props.connection_id === "none" || this.props.fieldsEditing || this.props.emptyDataSet
          }
        >
          <MoreVertIcon />
        </IconButton>
        {(this.props.open) ?
          <Menu
            id="OSC-menu"
            open={this.props.open}
            onClose={this.props.handleMenuListOpen}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Provision Token</MenuItem>
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Generate PAC</MenuItem>
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Initiate RA</MenuItem>
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Verify OSC Hash</MenuItem>
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Restart OSC</MenuItem>
            <MenuItem onClick={()=>{ this.props.handleMenuListOpen({}); 
							this.props.handleMenuListOpen({}) }}>Turn OSC Off</MenuItem>
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

    setCurrentItem:     signal`OSCMenuList.setCurrentItem`,
    clearConnection:    signal`Connections.clearConnection`,
    handleMenuListOpen: signal`OSCMenuList.handleMenuListOpen`,
  },
  withStyles(styles, {withTheme: true})(OSCMenuList)
);
