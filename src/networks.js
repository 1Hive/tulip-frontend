import { getNetworkType, isLocalOrUnknownNetwork } from './lib/web3-utils'

export const networkConfigs = {
  xdai: {
    honeyfarm: '0xB44825cF0d8D4dD552f2434056c41582415AaAa1',
    ReferralRewarder: '0x82374C59709AAc2f7864191a3c492932379536F4',
    StreamedAirdropper: '0xdD36008685108aFafc11F88bBc66C39A851Df843',
    xCombToken: '0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7',
    txUrl: 'https://blockscout.com/poa/xdai/tx/',
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
    honeyfarm: '0x62d7E2484FCFc6752B9473260efE1B86caBAc34e',
    ReferralRewarder: '0xf72e8827aa4c03e2c49aa95a6550dd4c8a65a969',
    StreamedAirdropper: '0x3Fe30742aD8491402c8aee251ff57e3E9b18Ff87',
    xCombToken: '0x37D1EbC3Af809b8fADB45DCE7077eFc629b2B5BB',
    Claimer: '',
    txUrl: 'https://polygon-explorer-mainnet.chainstacklabs.com/tx/',
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
    Claimer: '0xe1cC3eC02154ebc78f83574C278f536B42213C00',
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
    nodes: {
      defaultEth: '',
      subgraph: '',
    },
    token: {
      name: '',
      image: '',
    },
  },
}

export function getInternalNetworkName(chainId) {
  return isLocalOrUnknownNetwork() ? 'local' : getNetworkType(chainId)
}

export function getNetworkConfig(chainId) {
  return networkConfigs[getInternalNetworkName(chainId)]
}
