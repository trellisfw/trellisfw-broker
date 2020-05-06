/* cerebral imports */
import { state, props } from "cerebral/tags";
import { set } from "cerebral/operators";
import { ConnE, _SCOPE, _TOKEN } from "./config.js";
import { _CURRENT_METADATA } from "./config.js";
import { _CURRENT_REDIRECT } from "./config.js";
import { _OSCS_CONN_ID } from "./config.js";
/* oscs module */
import * as oscs from "../oscs/sequences";
import * as pacs from "../pacs/sequences";
import * as PlugInList from "../PlugInList/sequences";
import * as privatedatas from "../privatedata/sequences";

export let signOut = [
  set(state`${ConnE.token}`,       ''),
  set(state`${ConnE.domain}`,      ''),
  set(state`${ConnE.domain_text}`, ''),
];

export let updateOadaDomain = [
  set(state`${ConnE.domain_text}`, props`value`),
];

export let clearConnection = [
  connectionCleanUp
];

export let init = [
  ({state}) => ({
    domain:   state.get(`${ConnE.domain}`),
    options: {
      redirect: _CURRENT_REDIRECT,
      metadata: _CURRENT_METADATA,
      scope:    _SCOPE
    },
    token:         _TOKEN,
    connection_id: state.get(`${_OSCS_CONN_ID}`),
  }),
	set(state`ProgressBar.open`, true),
	oscs.init,
	pacs.init,
	PlugInList.init,
	privatedatas.init,
  set(state`${ConnE.open}`, false),
	set(state`ProgressBar.open`, false),
];

export let setConnection = [
  set(state`${ConnE.open}`, false),
  set(state`${ConnE.domain}`, state`${ConnE.domain_text}`),
  init,
  set(props`domain`, state`${ConnE.domain}`),
];

export let cancelConnection = [
  set(state`${ConnE.open}`, false),
  set(state`${ConnE.domain}`, state`${ConnE.domain}`),
];

export let openConnections = [
  set(state`${ConnE.open}`, true),
];

function connectionCleanUp({state, props}){
  let connection_id = state.get(`${_OSCS_CONN_ID}`);
  /* cleaning up connections from oada state */
  state.unset('oada.connections');
  /* cleaning up previous connection_id from oada state */
  state.unset('oada.' + connection_id)
}
