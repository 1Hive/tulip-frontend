import { useEffect, useState, useMemo } from 'react'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'
import { providers as Providers } from 'ethers'

export const usePools = () => {
  const [pools, setPools] = useState(null)
  const [balances, setBalances] = useState(null)
  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  useEffect(() => {
    if (account) {
      const loadPool = async () => {
        return await tulipData.farm.apys({ chain_id: chainId })
      }
      const loadBalances = async tokenList => {
        return await tulipData.wallet.simplyTokenBalances({
          user_address: account,
          chain_id: chainId,
          tokens: tokenList,
          web3: {
            eth: new Providers.Web3Provider(window.ethereum),
          },
        })
      }
      const pool = loadPool()
      pool.then(data => {
        setPools(data)
        const tokenList = data.map(d => {
          return d.pair
        })
        const balances = loadBalances(tokenList)
        balances.then(b => {
          setBalances(b)
        })
      })
    }
  }, [chainId, account])
  const data = useMemo(
    () => ({
      pools,
      balances,
    }),
    [pools, balances]
  )

  return data
}
