import { Module } from "cerebral";

//import oadaModule from "@oada/cerebral-module";
//import oadaProvider from "@oada/cerebral-provider";

import App from "./App";
import MenuList from "./MenuList";
import OSCList from "./OSCList";
//import OSCMenuList from "./OSCMenuList";
//import Connections from "./Connections";

export default Module({
  modules: {
		App,
		OSCList,
		MenuList,
		//OSCMenuList,
	//	Connections,
	//	oada: oadaModule,
	},

	providers: {
		//oada: oadaProvider
	}
})
