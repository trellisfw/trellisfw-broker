import { Module } from "cerebral";

import oadaModule   from "@oada/cerebral-module";
import oadaProvider from "@oada/cerebral-provider";

import App          from "./App";
import OSCList      from "./OSCList";
import OSCMenuList  from "./OSCMenuList";
import MenuList     from "./MenuList";
import Connections  from "./Connections";
import oscs         from "./oscs";

export default Module({
  modules: {
		App,
		OSCList,
		OSCMenuList,
		MenuList,
		Connections,
		oscs,
		oada: oadaModule,
	},

	providers: {
		oada: oadaProvider
	}
})
