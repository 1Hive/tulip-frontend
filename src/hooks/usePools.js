import { useEffect, useState, useMemo } from 'react'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'
import { providers as Providers } from 'ethers'
import { addressesEqual } from '@1hive/1hive-ui'
import { getNetworkConfig } from '../networks'
import { getContract } from '../web3-contracts'
import honeyFarm from '../abi/honeyfarm.json'

export const usePools = () => {
  const [pools, setPools] = useState(null)
  const [balances, setBalances] = useState(null)

  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  useEffect(() => {
    let tokens = []
    const loadBalances = async tokenList => {
      if (account) {
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
    }

    const loadPool = async () => {
      if (account) {
        const poolsData = await tulipData.farm.apys({ chain_id: chainId })
        setPools(poolsData)
        const list = poolsData.map(d => d.pair)
        tokens = list
        loadBalances(list)
      }
    }
    loadPool()

    const network = getNetworkConfig(chainId)
    const honeyfarmContract = getContract(network.honeyfarm, honeyFarm)
    if (account && honeyfarmContract) {
      honeyfarmContract.on('Transfer', (from, to, value, event) => {
        if (addressesEqual(to, account) || addressesEqual(from, account)) {
          loadBalances(tokens)
        }
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
