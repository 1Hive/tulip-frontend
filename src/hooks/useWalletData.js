import { useEffect, useMemo, useState } from 'react'
import { moment } from 'moment'
import { wallet } from 'tulip-data'
import { useWallet } from 'use-wallet'
import { useLocalStorage } from './useLocalStorage'

export function useWalletData() {
  const [walletInfo, setWalletInfo] = useState([])
  const [poolingInfo, setPoolingInfo] = useState([])
  const [isFetchingWallet, setIsFetchingWallet] = useState(false)
  const [isFetchingPool, setIsFetchingPool] = useState(false)
  const { account, status } = useWallet()

  useEffect(() => {
    let cancelled = false

    if (!account || status === 'disconnected') {
      setWalletInfo([])
      setPoolingInfo([])
      return
    }

    const fetchWalletData = async () => {
      try {
        setIsFetchingWallet(true)
        const balances = await wallet.tokenBalances({
          user_address: account,
        })

        if (!cancelled) {
          setWalletInfo(balances)
          return setIsFetchingWallet(false)
        }
      } catch (err) {
        console.error(`Could not fetch wallet data `, err)
      }
    }

    const fetchPoolingData = async () => {
      try {
        setIsFetchingPool(true)

        const poolingData = await wallet.poolBalances({
          user_address: account,
        })

        if (!cancelled) {
          setPoolingInfo(poolingData)
          return setIsFetchingPool(false)
        }
      } catch (err) {
        console.error(`Could not fetch wallet data `, err)
      }
    }

    fetchWalletData()
    fetchPoolingData()
    return () => {
      cancelled = true
    }
  }, [account, status])

  return [walletInfo, poolingInfo, isFetchingWallet || isFetchingPool]
}

export function useNetBalance() {
  const [walletInfo, poolingInfo, isFetching] = useWalletData()
  const [assetsList, setAssetsList] = useState([])

  return useMemo(() => {
    let netBalance = 0
    let walletBalance = 0
    let poolBalance = 0
    setAssetsList([])
    if (!walletInfo || walletInfo.length === 0 || !poolingInfo) {
      return { walletBalance, poolBalance, netBalance, assetsList, isFetching }
    }

    walletInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        walletBalance = walletBalance + parseFloat(value.valueUSD)
        setAssetsList(data => [
          ...data,
          {
            symbol: value.symbol,
            name: value.name,
            balance: value.balance.toFixed(4),
            price: value.priceUSD.toFixed(2),
            value: value.valueUSD.toFixed(2),
            image1: value.logoURI,
            image2: '',
          },
        ])
      }
    })

    poolingInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        poolBalance = Number(poolBalance) + parseFloat(value.valueUSD)
        let symbol = ''
        let image1 = ''
        let image2 = ''

        if (value.tokens && value.tokens.length > 1) {
          value.tokens.map((token, i) => {
            symbol = i === 0 ? token.symbol + '-' : symbol + token.symbol
            if (i === 0) {
              image1 = token.logoURI
            } else {
              image2 = token.logoURI
            }
          })
        }

        setAssetsList(data => [
          ...data,
          {
            symbol,
            image1,
            image2,
            balance: Number(value.balance).toFixed(4),
            value: Number(value.valueUSD).toFixed(2),
            price: Number(value.valueUSD / value.balance).toFixed(2),
            name: 'HoneySwap',
          },
        ])
      }
    })

    let assetsSortedList = assetsList
    assetsSortedList = assetsSortedList.sort(
      (a, b) => Number(b.value) - Number(a.value)
    )
    walletBalance = walletBalance.toFixed(2)
    poolBalance = poolBalance.toFixed(2)
    netBalance = parseFloat(
      Number(walletBalance) + Number(poolBalance) + netBalance
    ).toFixed(2)

    return {
      walletBalance,
      poolBalance,
      netBalance,
      assetsList: assetsSortedList,
      isFetching,
    }
  }, [walletInfo, poolingInfo, isFetching])
}

export function chartData() {
  // const CHART_DATA_KEY = 'chart_data'
  // const [ storedValue, setStoredValue ] = useLocalStorage(CHART_DATA_KEY)

  const currentDate = moment()
  console.log(currentDate)
}
