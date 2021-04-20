import { useEffect, useMemo, useState } from 'react'
import { wallet } from 'tulip-data'
import { useWallet } from 'use-wallet'

const ASSET_DEFAULT = {
  symbol: '',
  name: '',
  balance: '',
  price: '',
  value: '',
  image1: '',
  image2: '',
}

export function useWalletData() {
  const [walletInfo, setWalletInfo] = useState([])
  const [poolingInfo, setPoolingInfo] = useState([])
  const [isFetchingWallet, setIsFetchingWallet] = useState(false)
  const [isFetchingPool, setIsFetchingPool] = useState(false)
  const { account, status } = useWallet()

  useEffect(() => {
    let cancelled = false
    if (!account || status === 'disconnected') {
      return setWalletInfo([])
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

  return useMemo(() => {
    let netBalance = 0
    let walletBalance = 0
    let poolBalance = 0
    const assetsList = []
    if (!walletInfo || walletInfo.length === 0 || !poolingInfo) {
      return { walletBalance, poolBalance, netBalance, assetsList, isFetching }
    }

    walletInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        walletBalance = walletBalance + parseFloat(value.valueUSD)
        assetsList.push({
          symbol: value.symbol,
          name: value.name,
          balance: value.balance.toFixed(4),
          price: value.priceUSD.toFixed(2),
          value: value.valueUSD.toFixed(2),
          image1: value.logoURI,
          image2: '',
        })
      }
    })

    poolingInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        poolBalance = Number(poolBalance) + parseFloat(value.valueUSD)
        const asset = ASSET_DEFAULT
        if (value.tokens && value.tokens.length > 1) {
          value.tokens.map((token, i) => {
            asset.symbol =
              i === 0 ? token.symbol + '-' : asset.symbol + token.symbol
            if (i === 0) {
              asset.image1 = token.logoURI
            } else {
              asset.image2 = token.logoURI
            }
          })
        }
        asset.balance = Number(value.balance).toFixed(4)
        asset.value = Number(value.valueUSD).toFixed(2)
        asset.price = Number(value.valueUSD / value.balance).toFixed(2)
        asset.name = 'HoneySwap'
        assetsList.push(asset)
      }
    })

    walletBalance = walletBalance.toFixed(2)
    poolBalance = poolBalance.toFixed(2)
    netBalance = parseFloat(
      Number(walletBalance) + Number(poolBalance) + netBalance
    ).toFixed(2)

    return { walletBalance, poolBalance, netBalance, assetsList, isFetching }
  }, [walletInfo, poolingInfo, isFetching])
}
