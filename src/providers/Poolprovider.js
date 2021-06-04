import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import tulipData from 'tulip-backend'
import { getContract, useContractReadOnly } from '../web3-contracts'
import { getNetworkConfig } from '../networks'
import honeyFarm from '../abi/honeyfarm.json'
import erc20 from '../abi/ERC20.json'
import { useWallet } from './Wallet'
import { providers as Providers } from 'ethers'

const PoolContext = React.createContext()

export function PoolProvider({ children }) {
  const [balance, setBalance] = useState()
  const [depositData, setDepositData] = useState([])
  const [poolData, setPoolData] = useState([])
  const [poolInfo, setPoolInfo] = useState()

  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()
  const network = getNetworkConfig(chainId)

  const contract = useContractReadOnly(network.honeyfarm, honeyFarm)

  const loadPoolData = useCallback(async () => {
    const tokens = []
    let tulipApy = []
    if (chainId !== undefined && account) {
      tulipApy = await tulipData.farm.apys({ chain_id: chainId })
      tulipApy.forEach(pool => {
        tokens.push(pool.pair)
      })

      let tulipD = []
      if (tokens.length > 0) {
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
    }

    setPoolData(tulipApy)
  }, [account, chainId])

  const loadPoolInfo = useCallback(async () => {
    try {
      const poolInfo = await tulipData.farm.info({ chain_id: chainId })
      setPoolInfo(poolInfo)
    } catch (err) {
      console.error(`Error fetching pool info : ${err}`)
    }
  }, [chainId])

  const loadDepositData = useCallback(async () => {
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
      }
    }
    setDepositData(deposits)
  }, [account, chainId, contract])

  const fetchData = useCallback(() => {
    loadDepositData()
    loadPoolData()
    loadPoolInfo()
  }, [loadDepositData, loadPoolData, loadPoolInfo])

  useEffect(() => {
    if (account) {
      fetchData()
    }
  }, [account, fetchData])

  useEffect(() => {
    if (account && contract) {
      contract.on('Transfer', (to, amount, from) => {
        fetchData()
      })
    }

    return () => {
      if (contract) {
        contract.off('Transfer')
      }
    }
  }, [account, contract, fetchData])

  const r = useMemo(
    () => ({
      balance,
      data: poolData,
      deposits: depositData,
      poolInfo: poolInfo,
    }),
    [balance, depositData, poolData, poolInfo]
  )

  return <PoolContext.Provider value={r}>{children}</PoolContext.Provider>
}

export function usePoolProvider() {
  return useContext(PoolContext)
}
