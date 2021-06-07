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
      const loadBalances = async tokenList => {
        const b = await tulipData.wallet.simplyTokenBalances({
          user_address: account,
          chain_id: chainId,
          tokens: tokenList,
          web3: {
            eth: new Providers.Web3Provider(window.ethereum),
          },
        })
        setBalances(b)
      }

      const loadPool = async () => {
        const poolsData = await tulipData.farm.apys({ chain_id: chainId })
        setPools(poolsData)
        const tokenList = poolsData.map(d => d.pair)
        loadBalances(tokenList)
      }
      loadPool()
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
