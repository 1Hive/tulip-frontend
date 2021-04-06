import { getInternalNetworkName } from '../networks'
import honeyImg from '../assets/coins/honey.png'
import daiImg from '../assets/coins/dai.svg'
import agaveImg from '../assets/coins/agave.png'
import wethImg from '../assets/coins/eth.svg'
import uniImg from '../assets/coins/uni.svg'
import usdcImg from '../assets/coins/usdc.svg'
import usdtImg from '../assets/coins/usdt.svg'

export const KNOWN_TOKEN_BY_ENV = {
  HNY: {
    rinkeby: {
      address: '0x658bd9ee8788014b3dbf2bf0d66af344d84a5aa1',
      decimals: 18,
      symbol: 'HNY',
    },
    local: {
      address: '0xcD62b1C403fa761BAadFC74C525ce2B51780b184',
      decimals: 18,
      symbol: 'HNY',
    },
    img: honeyImg,
  },
  ANT: {
    main: {
      address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      decimals: 18,
      symbol: 'ANT',
    },
    rinkeby: {
      address: '0x8cf8196c14A654dc8Aceb3cbb3dDdfd16C2b652D',
      decimals: 18,
      symbol: 'ANT',
    },
    ropsten: {
      address: '0x0cb95D9537c8Fb0C947eD48FDafc66A7b72EfC86',
      decimals: 18,
      symbol: 'ANT',
    },
  },
  DAI: {
    main: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'DAI',
    },
    rinkeby: {
      address: '0xe9A083D88Eed757B1d633321Ce0519F432c6284d',
      decimals: 18,
      symbol: 'DAI',
    },
    ropsten: {
      address: '0x4E1F48Db14D7E1ada090c42ffE15FF3024EEc8Bf',
      decimals: 18,
      symbol: 'DAI',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'DAI',
    },
    img: daiImg,
  },
  AG: {
    main: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'AG',
    },
    rinkeby: {
      address: '0x6d2a20a14f15ab4d0eb0ce932c10d7cecc8d730f',
      decimals: 18,
      symbol: 'AG',
    },
    ropsten: {
      address: '0x4E1F48Db14D7E1ada090c42ffE15FF3024EEc8Bf',
      decimals: 18,
      symbol: 'AG',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'AG',
    },
    img: agaveImg,
  },
  WETH: {
    main: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
      symbol: 'WETH',
    },
    rinkeby: {
      address: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
      decimals: 18,
      symbol: 'WETH',
    },
    ropsten: {
      address: '0xb603cea165119701b58d56d10d2060fbfb3efad8f',
      decimals: 18,
      symbol: 'WETH',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'WETH',
    },
    img: wethImg,
  },
  UNI: {
    main: {
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      decimals: 18,
      symbol: 'UNI',
    },
    rinkeby: {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      decimals: 18,
      symbol: 'UNI',
    },
    ropsten: {
      address: '0xb603cea165119701b58d56d10d2060fbfb3efad8f',
      decimals: 18,
      symbol: 'UNI',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'UNI',
    },
    img: uniImg,
  },
  USDC: {
    main: {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 18,
      symbol: 'USDC',
    },
    rinkeby: {
      address: '0x7ee95167e8d68d0b2e97dae372650ce029e12eac',
      decimals: 18,
      symbol: 'USDC',
    },
    ropsten: {
      address: '0x20b846a43832af5f3cd5a96b2fedfab1fcffeecf',
      decimals: 18,
      symbol: 'USDC',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'USDC',
    },
    img: usdcImg,
  },
  USDT: {
    main: {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 18,
      symbol: 'USDT',
    },
    rinkeby: {
      address: '0x01547ef97f9140dbdf5ae50f06b77337b95cf4bb',
      decimals: 18,
      symbol: 'USDT',
    },
    ropsten: {
      address: '0x20b846a43832af5f3cd5a96b2fedfab1fcffeecf',
      decimals: 18,
      symbol: 'USDT',
    },
    local: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'USDT',
    },
    img: usdtImg,
  },
}

export function getKnownToken(symbol) {
  return KNOWN_TOKEN_BY_ENV[symbol][getInternalNetworkName()]
}
export function getKnownTokenImg(symbol) {
  if (KNOWN_TOKEN_BY_ENV[symbol] !== undefined) {
    return KNOWN_TOKEN_BY_ENV[symbol].img
  }
}
