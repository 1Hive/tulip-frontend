import { useEffect, useState } from 'react'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'

export const useFetchPools = () => {
  const [pool, setPool] = useState(null)
  const {
    _web3ReactContext: { chainId },
  } = useWallet()

  useEffect(() => {
    const loadPool = async () => {
      return await tulipData.farm.apys({ chain_id: chainId })
    }
    setPool(loadPool())
  }, [chainId])
  return pool
}
