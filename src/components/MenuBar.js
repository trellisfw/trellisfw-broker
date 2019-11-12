import React from "react";
import { connect } from "@cerebral/react";
import { signal } from "cerebral/tags";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import packageJson from "../package.alias.json";
//import { ThemeProvider } from 'styled-components';
//import { useDarkMode } from './useDarkMode';
//import { lightTheme, darkTheme } from './theme';
//FF8E53
//    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
	//console.log(packageJson);
  //const classes = useStyles();
	//const [theme, toggleTheme] = useDarkMode();
	//const themeMode = theme === 'light' ? lightTheme : darkTheme;
  render(){
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.menuBar}>
						<IconButton edge="start" className={classes.menuButton} 
												color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Trellis++ Broker v{packageJson.version}
						</Typography>
						<Button onClick={this.props.openConnections} color="inherit">
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
    openConnections: signal`Connections.openConnections`
	},
	withStyles(useStyles, {withTheme: true})(MenuBar)
);
