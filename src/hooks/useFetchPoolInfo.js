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
      return await tulipData.farm.info({ chain_id: chainId })
    }
    const poolInfo = loadPoolInfo()
    poolInfo.then(pInfo => {
      setPoolInfo(pInfo)
    })
  }, [chainId])
  const pInfo = useMemo(() => poolInfo, [poolInfo])
  return pInfo
}
