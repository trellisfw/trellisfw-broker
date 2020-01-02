import { Module } from "cerebral";

import oadaModule   from "@oada/cerebral-module";
import oadaProvider from "@oada/cerebral-provider";

import App          from "./App";
import OSCList      from "./OSCList";
import OSCMenuList  from "./OSCMenuList";
import MenuList     from "./MenuList";
import PACList      from "./PACList";
import Connections  from "./Connections";
import oscs         from "./oscs";
import pacs         from "./pacs";
import demo         from "./demo";
import ProgressBar  from "./ProgressBar";

export default Module({
  modules: {
		App,
		ProgressBar,
		OSCList,
		OSCMenuList,
		MenuList,
		PACList,
		Connections,
		oscs,
		pacs,
		demo,
		oada: oadaModule
	},

	providers: {
		oada: oadaProvider
	}
})
