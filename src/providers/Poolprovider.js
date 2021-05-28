import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import tulipData from 'tulip-backend'
import { getContract } from '../web3-contracts'
import { networkConfigs } from '../networks'
import honeyFarm from '../abi/honeyfarm.json'
import erc20 from '../abi/ERC20.json'
import { useWallet } from './Wallet'
import { providers as Providers } from 'ethers'

const PoolContext = React.createContext()

export function PoolProvider({ children }) {
  const tokens = []
  const [balance, setBalance] = useState()
  // const [balance, setBalance] = useState('')
  // const [deposits, setDeposits] = useState('')

  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  const contract = getContract(networkConfigs[chainId].honeyfarm, honeyFarm)

  const loadPoolData = async () => {
    let tulipApy = []
    if (chainId !== undefined && account) {
      tulipApy = await tulipData.farm.apys({ chain_id: chainId })
      tulipApy.forEach(pool => {
        tokens.push(pool.pair)
      })
    }
    let tulipD = []
    if (chainId !== undefined && account && tokens.length > 0) {
      tulipD = await tulipData.wallet.simplyTokenBalances({
        user_address: account,
        chain_id: chainId,
        tokens: tokens,
        web3: {
          eth: new Providers.Web3Provider(window.ethereum),
        },
      })
      setBalance(tulipD)
    }
    return tulipApy
  }
  const loadPoolInfo = async () => {
    const poolInfo = await tulipData.farm.info({ chain_id: chainId })
    return poolInfo
  }
  const loadDepositData = async () => {
    const deposits = []
    if (account) {
      const tulipF = await tulipData.farm.deposits({
        user_address: account,
        chain_id: chainId,
      })
      if (tulipF.length > 0) {
        for (const d of tulipF) {
          const c = getContract(d.pool, erc20)
          const symbol = await c.functions.symbol()
          const rewardBalance = await contract.functions.pendingHsf(d.id)
          deposits.push({
            ...d,
            symbol,
            rewardBalance,
          })
        }
        return deposits
      } else {
        return []
      }
    }
  }
  const poolData = useQuery('loadPoolData', loadPoolData)
  const poolInfo = useQuery('loadPoolInfo', loadPoolInfo)
  const deposits = useQuery('loadDepositData', loadDepositData)

  useEffect(() => {
    poolData.refetch()
    poolInfo.refetch()
    deposits.refetch()
  }, [account])

  contract.on('Transfer', (to, amount, from) => {
    if (account) {
      poolData.refetch()
      poolInfo.refetch()
      deposits.refetch()
    }
  })
  const r = {
    data: poolData.data,
    status,
    balance,
    deposits: deposits.data,
    poolInfo: poolInfo.data,
  }
  return <PoolContext.Provider value={r}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
