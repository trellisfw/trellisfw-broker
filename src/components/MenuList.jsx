// "MenuList.jsx"
import React              from "react";
import PropTypes          from "prop-types";
import { connect }        from "@cerebral/react";
import { state, sequences }  from "cerebral/tags";
import { Menu, MenuItem } from "@material-ui/core";
import IconButton         from "@material-ui/core/IconButton";
import MoreVertIcon       from "@material-ui/icons/MoreVert";
import { withStyles }     from "@material-ui/core/styles";

//The DOM element used to set the position of the menu.
let anchorEl;

const styles = theme => ({
  menuButton: {
    marginLeft: 2,
    marginRight: 2
  },
});

class MenuList extends React.Component {

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
          key={1}
          color="inherit"
          aria-label="simple-menu-button"
          id="simple-menu-button"
          aria-owns={"simple-menu"}
          aria-haspopup="true"
          onClick={ (evt) => {
						          this.handleMenuList(evt); 
						        	this.props.handleMenuListOpen({})
					          }
					        }
          className={classes.menuButton}
          disabled={ false }
        >
          <MoreVertIcon />
        </IconButton>
        {
					(this.props.open) ?
          <Menu
            id="menu"
            open={this.props.open}
            onClose={this.props.handleMenuListOpen}
            anchorEl={anchorEl}
          >
            <MenuItem onClick={this.props.pacList}>
					    PAC List
					  </MenuItem>
            <MenuItem onClick={this.props.blockchain}>
					    Blockchain 
					  </MenuItem>
            <MenuItem onClick={this.props.oscList}>
					    OSC List
					  </MenuItem>
            <MenuItem onClick={this.props.regulatorRepo}>
					    Regulator Repo 
					  </MenuItem>
            <MenuItem onClick={this.props.trellisRepo}>
					    Trellis Repo 
					  </MenuItem>
            <MenuItem onClick={ () => {
							          this.props.handlePACListOpen({});   
							          this.props.offline({});
						          }}
					  >
					    Offline
					  </MenuItem>
            <MenuItem onClick={() => {
							this.props.handleMenuListOpen({});
							this.props.demoInit({});
						}}>
					    Demo Dataset 
					  </MenuItem>
          </Menu>
          : null
				}
      </div>
    )}
}

MenuList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  {
    menuItems:          state`MenuList.records`,
    current:            state`MenuList.current`,
    open:               state`MenuList.open`,

    setCurrentItem:     sequences`MenuList.setCurrentItem`,
    handleMenuListOpen: sequences`MenuList.handleMenuListOpen`,
    pacList:            sequences`MenuList.pacList`,
    oscList:            sequences`MenuList.oscList`,
    blockchain:         sequences`MenuList.blockchain`,
    regulatorRepo:      sequences`MenuList.regulatorRepo`,
    trellisRepo:        sequences`MenuList.trellisRepo`,
		offline:            sequences`MenuList.offline`,
		handlePACListOpen:  sequences`PACList.handlePACListOpen`,
		demoInit:           sequences`demo.init`
  },
  withStyles(styles, {withTheme: true})(MenuList)
);
