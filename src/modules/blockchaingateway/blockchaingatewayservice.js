import BlockchainGateway from './blockchaingateway'

export default {
  createPAC(pac) {
    return BlockchainGateway().post('createPAC', pac);
  },
  readPAC(pacId) {
    return BlockchainGateway().get('readPAC', pacId);
  },
  queryAll() {
    return BlockchainGateway().get('queryAll')
  },
}
