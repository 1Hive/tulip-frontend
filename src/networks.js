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
  },
  rinkeby: {
    honeyfarm: '0xd6099161AcB5d01097f7f89FF64AbB835c42b80c',
    ReferralRewarder: '0x8A536488674ec4C3bDa25FEEBd0Bd202a8559d2F',
    StreamedAirdropper: '0x4BeA4ba49063061123aC8A51796F277Cfe2457F4',
    xCombToken: '0x3522331574F7850bA2f604a6786b784230C7f28C',
    txUrl: 'https://rinkeby.etherscan.io/tx/',
    nodes: {
      defaultEth: '',
      subgraph: '',
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
