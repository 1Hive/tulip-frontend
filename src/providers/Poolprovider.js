import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import tulipData from 'tulip-data'
import { getContract, useContract } from '../web3-contracts'
import { addresses } from '../constants/addresses'
import honeyFarm from '../abi/honeyfarm.json'
import erc20 from '../abi/ERC20.json'
// import erc721 from '../abi/ERC721.json'

import { useWallet } from './Wallet'
import { providers as Providers, ethers } from 'ethers'

const PoolContext = React.createContext()
const contract = getContract(addresses.honeyfarm, honeyFarm)
// const contractAsNFT = getContract(addresses.honeyfarm, erc721)

const loadPoolData = async () => {
  const scale = await contract.functions.SCALE()
  const poolLength = await contract.functions.poolLength()
  const poolLengthToNumber = poolLength[0].toNumber()
  const poolData = []
  const tokenList = []
  const tulipApy = await tulipData.farm.apys()
  for (let i = 0; i < poolLengthToNumber; i++) {
    const data = await contract.functions.getPoolByIndex(i)
    const c = getContract(data.poolToken, erc20)
    poolData.push({
      ...data,
      name: await c.name(),
      symbol: await c.symbol(),
      scale,
    })
    tokenList.push(data.poolToken)
  }
  const poolPlusApy = poolData.map(p => {
    for (const x of tulipApy) {
      if (x.pair.toLowerCase() === p.poolToken.toLowerCase()) {
        return {
          ...p,
          ...x,
        }
      }
    }
  })
  return poolPlusApy
}

export async function useCheckApprovedToken(tokenAddress, account, balance) {
  if (tokenAddress !== undefined && account !== undefined) {
    const contract = getContract(tokenAddress, erc20)
    const allowance = await contract.allowance(account, addresses.honeyfarm)
    if (allowance.lt(balance)) {
      return false
    }
    return true
  }
}

export function useApprove(tokenAddress, amount) {
  const contract = useContract(tokenAddress, erc20)
  return () => {
    return contract
      .approve(addresses.honeyfarm, amount)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}

export function useCreateDeposit(
  tokenAddress,
  amount,
  unlockTime = 0,
  referrer = '0x0000000000000000000000000000000000000000'
) {
  amount = amount !== '' ? ethers.utils.parseEther(amount) : amount
  const contract = useContract(addresses.honeyfarm, honeyFarm)
  return () => {
    return contract
      .createDeposit(tokenAddress, amount, unlockTime, referrer)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}

export function useWithdraw(id) {
  const contract = useContract(addresses.honeyfarm, honeyFarm)
  return () => {
    return contract
      .closeDeposit(id)
      .then(x => {
        return x
      })
      .catch(err => console.log(err))
  }
}
export function useHarvest(id) {
  return () => {
    // TODO: Add harvest function here
  }
}

export function PoolProvider({ children }) {
  const tokens = []
  const [balance, setBalance] = useState('')
  const [deposits, setDeposits] = useState('')

  const { account } = useWallet()
  const { data, status } = useQuery('loadPoolData', loadPoolData)
  if (status === 'success') {
    for (const x of data) {
      tokens.push(x.poolToken)
    }
  }
  useEffect(() => {
    const loadBalanceData = async () => {
      const tulipD = await tulipData.wallet.simplyTokenBalances({
        user_address: account,
        network: 'rinkeby',
        tokens,
        web3: {
          eth: new Providers.Web3Provider(window.ethereum),
        },
      })
      setBalance(tulipD)
    }
    const loadDepositData = async () => {
      console.log(tulipData.farm)
      const deposits = []
      const tulipF = await tulipData.farm.deposits({
        user_address: account,
      })
      for (const d of tulipF) {
        const contract = getContract(d.pool, erc20)
        const symbol = await contract.functions.symbol()
        deposits.push({
          ...d,
          symbol,
        })
      }
      setDeposits(deposits)
    }
    if (account) {
      loadBalanceData()
      loadDepositData()
    }
  }, [account])

  const r = {
    data,
    status,
    balance,
    deposits,
  }
  return <PoolContext.Provider value={r}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
