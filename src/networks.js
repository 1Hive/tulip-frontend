import { getNetworkType, isLocalOrUnknownNetwork } from './lib/web3-utils'

export const networkConfigs = {
  xdai: {
    honeyfarm: '',
    ReferralRewarder: '',
    StreamedAirdropper: '0x9e45e73c1AC4692246a910783Ce05c0389E87197',
    xCombToken: '0x9619006520C59d497586Cb1A30620cfa813DDa35',
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

export function getInternalNetworkName(chainId) {
  return isLocalOrUnknownNetwork() ? 'local' : getNetworkType(chainId)
}

export function getNetworkConfig(chainId) {
  return networkConfigs[getInternalNetworkName(chainId)]
}
