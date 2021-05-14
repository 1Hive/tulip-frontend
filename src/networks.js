import { getNetworkType, isLocalOrUnknownNetwork } from './lib/web3-utils'

export const RINKEBY_COURT = '0x7Ecb121a56BF92442289Dddb89b28A58640e76F5'
export const RINKEBY_STAGING_COURT =
  '0x52180Af656A1923024D1ACcF1D827AB85cE48878'

export const networkConfigs = {
  main: {
    nodes: {
      defaultEth: 'https://mainnet.infura.io/v3/undefined',
      subgraph: '',
    },
  },
  xdai: {
    honeyfarm: '',
    ReferralRewarder: '',
    StreamedAirdropper: '',
    xCombToken: '',
    txUrl: '',
    nodes: {
      defaultEth: '',
      subgraph: '',
    },
    token: {
      name: 'xComb',
      image: '/xComb.svg',
    },
  },
  polygon: {
    honeyfarm: '',
    ReferralRewarder: '',
    StreamedAirdropper: '',
    xCombToken: '',
    txUrl: '',
    nodes: {
      defaultEth: '',
      subgraph: '',
    },
    token: {
      name: 'pComb',
      image: '/pComb.svg',
    },
  },
  rinkeby: {
    honeyfarm: '0x087B269605a4a9e4c2C9dFAEc424A9Ad46e4d986',
    ReferralRewarder: '0xB4252EE3503C39C08DC429B4081Cd0100187a721',
    StreamedAirdropper: '0x4BeA4ba49063061123aC8A51796F277Cfe2457F4',
    xCombToken: '0xe26EF0e1890d83e196191822752749a37d7A199f',
    txUrl: 'https://rinkeby.etherscan.io/tx/',
    nodes: {
      defaultEth: '',
      subgraph: '',
    },
    token: {
      name: 'xComb',
      image: '/xComb.svg',
    },
  },
  local: {
    honeyfarm: '',
    ReferralRewarder: '',
    StreamedAirdropper: '',
    xCombToken: '',
    court: '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb',
    nodes: {
      defaultEth: 'http://localhost:8545',
      subgraph: '',
    },
    token: {
      name: 'xComb',
      image: '/xComb.svg',
    },
  },
}

export function getInternalNetworkName() {
  return isLocalOrUnknownNetwork() ? 'local' : getNetworkType()
}

export function getNetworkConfig() {
  return networkConfigs[getInternalNetworkName()]
}

export const networkAgentAddress = getNetworkConfig().network_agent

export const networkReserveAddress = getNetworkConfig().network_reserve
