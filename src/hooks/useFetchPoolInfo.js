import { useEffect, useState, useMemo } from 'react'
import tulipData from 'tulip-backend'
import { useWallet } from '../providers/Wallet'

export const useFetchPoolInfo = () => {
  const [poolInfo, setPoolInfo] = useState(null)
  const {
    _web3ReactContext: { chainId },
  } = useWallet()

  useEffect(() => {
    const loadPoolInfo = async () => {
      const pInfo = await tulipData.farm.info({ chain_id: chainId })
      setPoolInfo(pInfo)
    }
    loadPoolInfo()
  }, [chainId])
  const info = useMemo(() => poolInfo, [poolInfo])
  return info
}
