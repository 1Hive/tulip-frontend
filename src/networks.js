import environment from './environment'
import { getNetworkType, isLocalOrUnknownNetwork } from './lib/web3-utils'

const SUBGRAPH_NAME = environment('SUBGRAPH_NAME')

export const RINKEBY_COURT = '0x7Ecb121a56BF92442289Dddb89b28A58640e76F5'
export const RINKEBY_STAGING_COURT =
  '0x52180Af656A1923024D1ACcF1D827AB85cE48878'

export const networkConfigs = {
  main: {
    court: '0x3b26bc496aebaed5b3E0E81cDE6B582CDe71396e',
    nodes: {
      defaultEth: 'https://mainnet.infura.io/v3/undefined',
      subgraph: '',
    },
  },
  xdai: {
    court: '',
    nodes: {
      defaultEth: 'https://rinkeby.eth.aragon.network/',
      subgraph: '',
    },
  },
  rinkeby: {
    court: getRinkebyCourtAddress(SUBGRAPH_NAME),
    nodes: {
      defaultEth: 'https://rinkeby.eth.aragon.network/',
      subgraph: getRinkebySubgraphUrls(SUBGRAPH_NAME),
    },
  },
  ropsten: {
    court: '0x3b26bc496aebaed5b3E0E81cDE6B582CDe71396e',
    nodes: {
      defaultEth: 'https://ropsten.eth.aragon.network/',
      subgraph: '',
    },
  },
  local: {
    court: '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb',
    nodes: {
      defaultEth: 'http://localhost:8545',
      subgraph: '',
    },
  },
}

export function getInternalNetworkName() {
  return isLocalOrUnknownNetwork() ? 'local' : getNetworkType()
}

export function getNetworkConfig() {
  console.log(networkConfigs[getInternalNetworkName()])
  return networkConfigs[getInternalNetworkName()]
}

export const networkAgentAddress = getNetworkConfig().network_agent

export const networkReserveAddress = getNetworkConfig().network_reserve

function getRinkebyCourtAddress(subgraphName) {
  if (subgraphName === 'staging') {
    return RINKEBY_STAGING_COURT
  }
  return RINKEBY_COURT
}

function getRinkebySubgraphUrls(subgraphName) {
  return `https://api.thegraph.com/subgraphs/name/1hive/celeste-${subgraphName ||
    'rinkeby'}`
}
