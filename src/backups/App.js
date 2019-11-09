import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/global';
import MenuBar from './components/MenuBar';
import './App.css';
import OSCList from "./components/OSCList";

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
