import { useEffect, useState } from 'react'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'
import { providers as Providers } from 'ethers'

export const useFetchBalances = tokenList => {
  const [balances, setBalances] = useState(null)
  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  useEffect(() => {
    if (tokenList) {
      const loadBalances = async () => {
        return await tulipData.wallet.simplyTokenBalances({
          user_address: account,
          chain_id: chainId,
          tokens: tokenList,
          web3: {
            eth: new Providers.Web3Provider(window.ethereum),
          },
        })
      }
      setBalances(loadBalances())
    }
  }, [account, chainId, tokenList])
  console.log(balances)
  return balances
}
