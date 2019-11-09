import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import MenuBar from './MenuBar';
import './App.css';
import OSCList from "./OSCList";

function App() {
  const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
	<div className="App">	
		<MenuBar />
		<ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
		    <div>
		      <OSCList />
		    </div>
        <footer>
          Credits:
          <small>The Open AG Technology and Systems Center (OATS)</small>
        </footer>
      </>
    </ThemeProvider>
	</div>
  );
}

export default App;
