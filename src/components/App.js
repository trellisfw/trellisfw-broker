import React, { Component } from 'react';
import { connect }          from "@cerebral/react";
import { signal }           from "cerebral/tags";
import { ThemeProvider }    from 'styled-components';
import { darkTheme }        from './theme';
import { GlobalStyles }     from './global';
import MenuBar              from './MenuBar';
import './App.css';
import OSCList              from "./OSCList";
import Connections          from "./Connections";

class App extends Component {

	UNSAFE_componentWillMount(){
    this.props.init({});
	}

	//including GlobalStyles changes the layout
	render(){
		return (
		<div className="App">	
			<MenuBar />
			<ThemeProvider theme={darkTheme}>
				<>
					<GlobalStyles />
					<div>
						<OSCList />
					</div>
			    <Connections />
					<footer>
						Credits:
						<small>The Open AG Technology and Systems Center (OATS)</small>
					</footer>
				</>
			</ThemeProvider>
		</div>
		);
  }
}

export default connect({
	  init: signal`App.init`
  },
	(App)
);
