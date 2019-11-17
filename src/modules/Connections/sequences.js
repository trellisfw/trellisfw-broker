/* cerebral imports */
import { state, props } from 'cerebral/tags';
import { set } from 'cerebral/operators';

/* oscs module */
import * as oscs from "../oscs/sequences";

const _SCOPE = 'oada.yield:all';
//const _OPENATK_METADATA = 'eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly9vcGVuYXRrLmNvbS9GaWVsZFdvcmtBcHAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0L29hdXRoMi9yZWRpcmVjdC5odG1sIl0sInRva2VuX2VuZHBvaW50X2F1dGhfbWV0aG9kIjoidXJuOmlldGY6cGFyYW1zOm9hdXRoOmNsaWVudC1hc3NlcnRpb24tdHlwZTpqd3QtYmVhcmVyIiwiZ3JhbnRfdHlwZXMiOlsiYXV0aG9yaXphdGlvbl9jb2RlIl0sInJlc3BvbnNlX3R5cGVzIjpbInRva2VuIiwiY29kZSIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iLCJjb2RlIGlkX3Rva2VuIiwiY29kZSB0b2tlbiIsImNvZGUgaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJPcGVuQVRLIiwiY2xpZW50X3VyaSI6Imh0dHA6Ly9vcGVuYXRrLmNvbSIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwiandrcyI6eyJrZXlzIjpbeyJrdHkiOiJSU0EiLCJuIjoiemF1WkZCdU1kbHYxa1lqelViNHEtXzNtNHNtRnhuZnc0U1lvYUhxN2NpOFNjdFkzeGo3cmRBSHlrUXBuUVZyajZLTzhtYUh2LTBCdlc1TWhjZ2l2a3VZcy16SEV2ZllCZVZCbmN2SGdPa0pQYmM5MUN3X2l3T1k3RUhXQjhoTTdWaUxRVmNfRHYwaDhuSnliQnZoTDA0Q0hRdDdDcE10VllHNmZvSlhjM2RxNTJqTlFiQkhJWjVtN1Z6MUt0eXpvTGNwOE8ybWhhTHA0NVVyM0NfMWVHdHY4bjVOejliV19CaDVYRlliRHh2N0JuaFpOSXcxR0NiampBd210Ym5uTDdHZ2Y0Q3k2MHdSSG1SNHZvZTIxT0lqb0FTcTJqWjAzeDEybVhzN0hQSTNZQjR5Mjl3dlpNdzJnTHpPZFRvcnJxTy10bG1uMWJvUGtXS0pKU1hvQXZ3IiwiZSI6IkFRQUIifV19LCJzb2Z0d2FyZV9pZCI6ImE3MDNiZmRjLTNmYTEtNDk5Zi1iOTA1LTExZjBiNTRmMzgwNyIsInJlZ2lzdHJhdGlvbl9wcm92aWRlciI6Imh0dHBzOi8vaWRlbnRpdHkub2FkYS1kZXYuY29tIiwiaWF0IjoxNTMzODQ2MTEyfQ.Y9BlbqHzOvufADGAW9HG4Yx2rqbg6zPalpcjSS_97Mpg36lOuADGJ4YTQ2iQfRlZjzqBi1sUq3iFhReBfk89Oy2nSEY6RVPnONK5v6a73jce3xGPUWk8DDl3rf3lcrt-IqWFoAieUie7WK5nrPFIe-_xcgYdChnuGrugjO9dGOY';
const _LOCALHOST_METADATA = 'eyJqa3UiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbS9jZXJ0cyIsImtpZCI6ImtqY1NjamMzMmR3SlhYTEpEczNyMTI0c2ExIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJyZWRpcmVjdF91cmlzIjpbImh0dHA6Ly92aXAzLmVjbi5wdXJkdWUuZWR1OjgwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiLCJodHRwOi8vbG9jYWxob3N0OjgwMDAvb2F1dGgyL3JlZGlyZWN0Lmh0bWwiXSwidG9rZW5fZW5kcG9pbnRfYXV0aF9tZXRob2QiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6Y2xpZW50LWFzc2VydGlvbi10eXBlOmp3dC1iZWFyZXIiLCJncmFudF90eXBlcyI6WyJpbXBsaWNpdCJdLCJyZXNwb25zZV90eXBlcyI6WyJ0b2tlbiIsImlkX3Rva2VuIiwiaWRfdG9rZW4gdG9rZW4iXSwiY2xpZW50X25hbWUiOiJPcGVuQVRLIiwiY2xpZW50X3VyaSI6Imh0dHBzOi8vdmlwMy5lY24ucHVyZHVlLmVkdSIsImNvbnRhY3RzIjpbIlNhbSBOb2VsIDxzYW5vZWxAcHVyZHVlLmVkdT4iXSwic29mdHdhcmVfaWQiOiIxZjc4NDc3Zi0zNTQxLTQxM2ItOTdiNi04NjQ0YjRhZjViYjgiLCJyZWdpc3RyYXRpb25fcHJvdmlkZXIiOiJodHRwczovL2lkZW50aXR5Lm9hZGEtZGV2LmNvbSIsImlhdCI6MTUxMjAwNjc2MX0.AJSjNlWX8UKfVh-h1ebCe0MEGqKzArNJ6x0nmta0oFMcWMyR6Cn2saR-oHvU8WrtUMEr-w020mAjvhfYav4EdT3GOGtaFgnbVkIs73iIMtr8Z-Y6mDEzqRzNzVRMLghj7CyWRCNJEk0jwWjOuC8FH4UsfHmtw3ouMFomjwsNLY0';
const _REDIRECT_LOCALHOST = 'http://localhost:8000/oauth2/redirect.html';
//const _REDIRECT_OPENATK = 'http://openatk.com/Broker/oauth2/redirect.html';
const _TOKEN = 'def';

const _CURRENT_METADATA = _LOCALHOST_METADATA;
const _CURRENT_REDIRECT = _REDIRECT_LOCALHOST;

//const _CURRENT_METADATA = _OPENATK_METADATA;
//const _CURRENT_REDIRECT = _REDIRECT_OPENATK;

export var signOut = [
  set(state`Connections.oada_token`,              ''),
  set(state`Connections.oada_domain`,             ''),
  set(state`Connections.oada_domain_text`,        ''),
];

export var updateOadaDomain = [
  set(state`Connections.oada_domain_text`, props`value`),
];

export var clearConnection = [
  connectionCleanUp
];

export var init = [
  ({state}) => ({
    domain:   state.get('Connections.oada_domain'),
    options: {
      redirect: _CURRENT_REDIRECT,
      metadata: _CURRENT_METADATA,
      scope:    _SCOPE
    },
    token:         _TOKEN,
    connection_id: state.get('oscs.connection_id'),
  }),
	oscs.init,
  set(state`Connections.open`, false)
];
//signals:       ['oscs.handleWatchUpdate']

export var setConnection = [
  set(state`Connections.open`, false),
  set(state`Connections.oada_domain`, state`Connections.oada_domain_text`),
  init,
  set(props`domain`, state`Connections.oada_domain`),
];

export var cancelConnection = [
  set(state`Connections.open`, false),
  set(state`Connections.oada_domain`, state`Connections.oada_domain`),
  set(state`Connections.oada_fields_domain`,  state`Connections.oada_domain`)
];

export var openConnections = [
  set(state`Connections.open`, true),
];

function connectionCleanUp({state, props}){
  let connection_id = state.get('oscs.connection_id');
  /* cleaning up connections from oada state */
  state.unset('oada.connections');
  /* cleaning up previous connection_id from oada state */
  state.unset('oada.' + connection_id)
}
