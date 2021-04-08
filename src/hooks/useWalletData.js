import { useEffect, useMemo, useState } from 'react'
import { wallet } from 'tulip-data'
import { useWallet } from 'use-wallet'

export function useWalletData() {
  const [walletInfo, setWalletInfo] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const { account } = useWallet()

  useEffect(() => {
    let cancelled = false
    if (!account) {
      return setWalletInfo([])
    }

    const fetchWalletData = async () => {
      try {
        setIsFetching(true)
        const balances = await wallet.tokenBalances({
          user_address: account,
        })
        console.log(balances)
        if (!cancelled) {
          setIsFetching(false)
          return setWalletInfo(balances)
        }
      } catch (err) {
        console.error(`Could not fetch wallet data `, err)
      }
    }

    fetchWalletData()
    return () => {
      setIsFetching(false)
      cancelled = true
    }
  }, [account])

  return [walletInfo, isFetching]
}

export function useNetBalance() {
  const [walletInfo, isFetching] = useWalletData()
  console.log(walletInfo, isFetching)
  return useMemo(() => {
    if (!walletInfo || walletInfo.length === 0) {
      return [0, isFetching]
    }

    console.log(walletInfo)
    let netBalance = 0
    walletInfo.map(value => {
      console.log(value)
      if (value && parseFloat(value.valueUSD)) {
        netBalance = netBalance + parseFloat(value.valueUSD)
      }
    })

    return [netBalance.toFixed(2), isFetching]
  }, [walletInfo, isFetching])
}
