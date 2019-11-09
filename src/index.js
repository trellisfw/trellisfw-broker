import React from "react";
import ReactDOM from "react-dom";
import { Container } from "@cerebral/react";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import controller from "./controller";

ReactDOM.render(
	<Container controller={controller} style={{ height: "100vh" }}>
 	    <App />
  </Container>,
	
	document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
