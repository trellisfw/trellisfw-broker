// "MenuList.jsx"
import React              from "react";
import PropTypes          from "prop-types";
import { connect }        from "@cerebral/react";
import { state, sequences }  from "cerebral/tags";
import { Menu, MenuItem } from "@material-ui/core";
import IconButton         from "@material-ui/core/IconButton";
import MoreVertIcon       from "@material-ui/icons/MoreVert";
import { withStyles }     from "@material-ui/core/styles";
import Divider            from "@material-ui/core/Divider";
import ListItemIcon       from "@material-ui/core/ListItemIcon";
import BlockchainIcon     from "@material-ui/icons/ViewComfy";
import CertCodeIcon       from "@material-ui/icons/CardMembership";
import GitHubIcon         from "@material-ui/icons/GitHub";
import ListIcon           from "@material-ui/icons/ViewList";

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
		let bk_color = "#606060";

		if (this.props.bk_connected) {
			bk_color = "#00CC66";
			console.log("==> connected");
		}

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
            <MenuItem onClick={this.props.regulatorRepo}>
					    <ListItemIcon>
					      <GitHubIcon style={{color: "#0066CC"}} />
					    </ListItemIcon>
					    Regulator 
					  </MenuItem>
            <MenuItem onClick={() => {
							  this.props.handleMenuListOpen({});
							  this.props.handlePlugInListOpen({})
						}}>
					    <ListItemIcon>
					      <CertCodeIcon style={{color: "#00994C"}} />
					    </ListItemIcon>
					    Certified OSCs
					  </MenuItem>
					  <Divider />
            <MenuItem onClick={this.props.trellisRepo}>
					    <ListItemIcon>
					      <GitHubIcon style={{color: "#0066CC"}} />
					    </ListItemIcon>
					    Trellis 
					  </MenuItem>
            <MenuItem onClick={this.props.oscList}>
					    <ListItemIcon>
					      <ListIcon style={{color: "#9933FF"}} />
					    </ListItemIcon>
					    OSC
					  </MenuItem>
					  <Divider />
            <MenuItem onClick={this.props.blockchain}>
					    <ListItemIcon>
					      <BlockchainIcon style={{color: bk_color}} />
					    </ListItemIcon>
					    Blockchain 
					  </MenuItem>
					  <Divider />
            <MenuItem onClick={ () => {
							this.props.handlePACListOpen({});   
							this.props.offline({});
						}}>
					    Offline
					  </MenuItem>
            <MenuItem onClick={() => {
							this.props.handleMenuListOpen({});
							this.props.demoInit({});
						}}>
					    Demo Dataset 
					  </MenuItem>
            <MenuItem onClick={() => {
							this.props.handleMenuListOpen({});
							this.props.demoPrivateData({});
						}}>
					    Demo Private Data 
					  </MenuItem>
            <MenuItem onClick={() => {
							this.props.handleMenuListOpen({});
							this.props.demoFilteredPrivateData({});
						}}>
					    Filtered Private Data 
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
		bk_connected:       state`blockchaingateway.connected`,

    setCurrentItem:          sequences`MenuList.setCurrentItem`,
    handleMenuListOpen:      sequences`MenuList.handleMenuListOpen`,
    pacList:                 sequences`MenuList.pacList`,
    oscList:                 sequences`MenuList.oscList`,
    blockchain:              sequences`MenuList.blockchain`,
    regulatorRepo:           sequences`MenuList.regulatorRepo`,
    trellisRepo:             sequences`MenuList.trellisRepo`,
    handlePlugInListOpen:    sequences`PlugInList.handleOpen`,
		offline:                 sequences`MenuList.offline`,
		handlePACListOpen:       sequences`PACList.handlePACListOpen`,
		demoInit:                sequences`demo.init`,
		newPAC:                  sequences`demo.newPAC`,
		demoPrivateData:         sequences`demo.upload_demo_privatedata`,
		demoFilteredPrivateData: sequences`demo.upload_demo_filteredprivatedata`
  },
  withStyles(styles, {withTheme: true})(MenuList)
);
