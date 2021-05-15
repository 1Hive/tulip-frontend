import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import tulipData from 'tulip-data'
import { getContract } from '../web3-contracts'
import { networkConfigs } from '../networks'
import honeyFarm from '../abi/honeyfarm.json'
import erc20 from '../abi/ERC20.json'
import { useWallet } from './Wallet'
import { providers as Providers } from 'ethers'

const PoolContext = React.createContext()
const contract = getContract(networkConfigs.rinkeby.honeyfarm, honeyFarm)

export function PoolProvider({ children }) {
  const tokens = []
  const [balance, setBalance] = useState()
  // const [balance, setBalance] = useState('')
  // const [deposits, setDeposits] = useState('')
  const { account, networkName } = useWallet()
  const network = networkName.toLowerCase()

  const loadPoolData = async () => {
    const tulipApy = await tulipData.farm.apys()
    tulipApy.forEach(pool => {
      tokens.push(pool.pair)
    })
    if (account && tokens.length > 0) {
      const tulipD = await tulipData.wallet.simplyTokenBalances({
        user_address: account,
        network: network,
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
    const poolInfo = await tulipData.farm.info()
    return poolInfo
  }
  const loadDepositData = async () => {
    const deposits = []
    if (account) {
      const tulipF = await tulipData.farm.deposits({
        user_address: account,
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
