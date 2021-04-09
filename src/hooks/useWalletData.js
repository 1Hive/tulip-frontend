import { useEffect, useMemo, useState } from 'react'
import { wallet } from 'tulip-data'
import { useWallet } from 'use-wallet'

// const WALLET_DATA_DEFAULT = {
//   netBalance: 0,
//   poolBalance: 0,
//   walletBalance: 0,
//   assetsList: [],
//   isFetching: false,
// }

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
  const { account } = useWallet()

  useEffect(() => {
    let cancelled = false
    if (!account) {
      return setWalletInfo([])
    }

    const fetchWalletData = async () => {
      try {
        setIsFetchingWallet(true)
        const balances = await wallet.tokenBalances({
          user_address: account,
        })

        // console.log(balances)
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

        // console.log(balances)
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
  }, [account])

  console.log('ifpool ', isFetchingPool)
  console.log('ifwallet ', isFetchingWallet)
  return [walletInfo, poolingInfo, isFetchingWallet || isFetchingPool]
}

export function useNetBalance() {
  const [walletInfo, poolingInfo, isFetching] = useWalletData()

  console.log('isFetching: ', isFetching)
  return useMemo(() => {
    console.log('isFetchingMEMO: ', isFetching)
    if (!walletInfo || walletInfo.length === 0 || !poolingInfo) {
      return { isFetching: false }
    }

    let netBalance = 0
    let walletBalance = 0
    let poolBalance = 0
    const assetsList = []
    walletInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        walletBalance = walletBalance + parseFloat(value.valueUSD)
        assetsList.push({
          symbol: value.symbol,
          name: value.name,
          balance: value.balance.toFixed(4),
          price: value.priceUSD,
          value: value.valueUSD,
          image1: value.logoURI,
        })
      }
    })

    poolingInfo.map(value => {
      if (value && parseFloat(value.valueUSD)) {
        poolBalance = poolBalance + parseFloat(value.valueUSD)
        const asset = ASSET_DEFAULT
        if (value.tokens && value.tokens.length > 1) {
          value.tokens.map((token, i) => {
            asset.symbol = i === 0 ? token.name + ' - ' : token.name
            if (i === 0) {
              asset.image1 = token.logoURI
            } else {
              asset.image2 = token.logoURI
            }
          })
        }
        asset.balance = value.balance
        asset.value = value.valueUSD
        assetsList.push(asset)
      }
    })
    walletBalance = walletBalance.toFixed(2)
    poolBalance = poolBalance.toFixed(2)
    netBalance = walletBalance + poolBalance + netBalance.toFixed(2)

    console.log('Is Fetching before set', isFetching)

    return { walletBalance, poolBalance, netBalance, assetsList, isFetching }
  }, [walletInfo, poolingInfo, isFetching])
}
