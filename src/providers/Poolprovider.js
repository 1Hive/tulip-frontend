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
const loadPoolInfo = async () => {
  return await tulipData.farm.info()
}
export function PoolProvider({ children }) {
  const tokens = []
  const [balance, setBalance] = useState('')
  const [deposits, setDeposits] = useState('')
  const { account, networkName } = useWallet()
  const network = networkName.toLowerCase()
  const { data, status } = useQuery('loadPoolData', loadPoolData)
  const poolInfo = useQuery('loadPoolInfo', loadPoolInfo)
  if (status === 'success') {
    for (const x of data) {
      tokens.push(x.poolToken)
    }
  }
  const loadBalanceData = async () => {
    const tulipD = await tulipData.wallet.simplyTokenBalances({
      user_address: account,
      network: network,
      tokens,
      web3: {
        eth: new Providers.Web3Provider(window.ethereum),
      },
    })
    setBalance(tulipD)
  }
  const loadDepositData = async () => {
    const deposits = []
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
      setDeposits(deposits)
    } else {
      setDeposits([])
    }
  }
  useEffect(() => {
    if (account) {
      loadBalanceData()
      loadDepositData(account)
    }
  }, [account])
  contract.on('Transfer', (to, amount, from) => {
    if (account) {
      loadDepositData()
    }
  })
  const r = {
    data,
    status,
    balance,
    deposits,
    poolInfo: poolInfo.data,
  }
  return <PoolContext.Provider value={r}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
