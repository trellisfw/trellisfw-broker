// "MenuBar.jsx"
import React          from "react";
import { connect }    from "@cerebral/react";
import { sequences }  from "cerebral/tags";
import { withStyles } from "@material-ui/core/styles";
import AppBar         from "@material-ui/core/AppBar";
import Toolbar        from "@material-ui/core/Toolbar";
import Typography     from "@material-ui/core/Typography";
import Button         from "@material-ui/core/Button";
import packageJson    from "../package.alias.json";
import MenuList       from "./MenuList";

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
	menuBar: {
    flexGrow: 1,
		background: 'linear-gradient(45deg, #00994C  30%, #00CC66 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class MenuBar extends React.Component {
  
	render(){
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.menuBar}>
			      <MenuList />
						<Typography variant="h6" className={classes.title}>
							Broker v{packageJson.version}
						</Typography>
						<Button onClick={this.props.openConnections} 
			              color="inherit">
							Login
						</Button>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default connect(
	{
    openConnections:       sequences`Connections.openConnections`,
		handleMenuListOpen:    sequences`MenuList.handleMenuListOpen`
	},
	withStyles(useStyles, {withTheme: true})(MenuBar)
);
