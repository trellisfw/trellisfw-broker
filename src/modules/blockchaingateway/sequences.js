import BKGatewayService from "./blockchaingatewayservice";

export function connectToBlockchainGateway({props, state}) {
  console.log("Connecting to Blockchain Gateway");
}

export async function queryAll({props, state}) {
  const pacRes = await BKGatewayService.queryAll();
	console.log("--> response --> ", pacRes);
}

export async function readPAC({props, state}) {
  const pacRes = await BKGatewayService.readPAC();
	console.log("--> response --> ", pacRes);
}

export async function createPAC({props, state}) {
	console.log("--> props", props);
	let _ledger_pac = {
		           "pacId": props.pac.pacId, 
		           "quoteHash": props.pac.quoteHash,
		           "pacHash": props.pac.pacHash
	           };
  console.log("--> ledger pac", _ledger_pac);
  const pacRes = await BKGatewayService.createPAC(_ledger_pac);
	console.log("--> response --> ", pacRes);
}
