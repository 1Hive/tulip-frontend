import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { wallet } from 'tulip-data'
import { useWallet } from 'use-wallet'
import { useLocalStorage } from './useLocalStorage'
import { formatNumber } from '../utils/validate-utils'

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
  const { account } = useWallet()
  const [assetsList, setAssetsList] = useState([])
  const CHART_DATA_KEY = 'chart_data'
  const { storedValue, setStoredValue } = useLocalStorage(CHART_DATA_KEY)

  const {
    walletBalance,
    poolBalance,
    netBalance,
    assetsSortedList,
  } = useMemo(() => {
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
            balance: formatNumber(value.balance.toFixed(2)),
            price: formatNumber(value.priceUSD.toFixed(2)),
            value: formatNumber(value.valueUSD.toFixed(2)),
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
            balance: formatNumber(Number(value.balance).toFixed(2)),
            value: formatNumber(Number(value.valueUSD).toFixed(2)),
            price: formatNumber(
              Number(value.valueUSD / value.balance).toFixed(2)
            ),
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
    walletBalance = formatNumber(walletBalance)
    poolBalance = formatNumber(poolBalance)
    netBalance = formatNumber(netBalance)

    return {
      walletBalance,
      poolBalance,
      netBalance,
      assetsSortedList,
      isFetching,
    }
  }, [walletInfo, poolingInfo, isFetching])

  useMemo(() => {
    if (account && !isFetching) {
      updateLocalBalance(account, netBalance, storedValue, setStoredValue)
    }
  }, [netBalance, isFetching])

  return {
    walletBalance,
    poolBalance,
    netBalance,
    assetsList: assetsSortedList,
    isFetching,
  }
}

export function useChartData(duration) {
  const { account } = useWallet()
  const CHART_DATA_KEY = 'chart_data'
  const { storedValue } = useLocalStorage(CHART_DATA_KEY)

  const getData = useMemo(() => {
    if (!storedValue) {
      return null
    }

    let durationInDays = 7
    switch (duration) {
      case 'M':
        durationInDays = 30
        break
      case 'Y':
        durationInDays = 365
        break
    }

    const chartValues = []
    for (const i in storedValue) {
      if (account === storedValue[i].wallet && storedValue[i].chartData) {
        let dataIndex = storedValue[i].chartData.length - 1
        if (dataIndex > durationInDays) {
          dataIndex = dataIndex - durationInDays
        } else {
          dataIndex = 0
        }

        let x = 0
        for (let j = dataIndex; j < storedValue[i].chartData.length; j++) {
          const data = storedValue[i].chartData[j]
          const date = moment.unix(data.timeStamp).format('MMM D')
          chartValues.push({
            d: date,
            p: '$ ' + data.value,
            x: parseInt(x),
            y: parseInt(data.value),
          })
          x++
        }
      }
    }

    return chartValues
  }, [account, duration, storedValue])

  return getData
}

function updateLocalBalance(account, netBalance, storedValue, setStoredValue) {
  const timeStamp = moment()
  const previousDay = moment()
    .subtract(1, 'days')
    .unix()

  if (!storedValue) {
    setStoredValue([
      {
        wallet: account,
        chartData: [
          {
            timeStamp: previousDay,
            value: 0,
          },
          {
            timeStamp: timeStamp.unix(),
            value: netBalance,
          },
        ],
      },
    ])
  } else {
    let found = false
    for (const i in storedValue) {
      if (storedValue[i] && storedValue[i].wallet === account) {
        found = true
        const svindex = storedValue[i].chartData.length - 1
        if (
          storedValue[i].chartData[svindex] &&
          storedValue[i].chartData[svindex].timeStamp
        ) {
          const svDate = moment.unix(
            storedValue[i].chartData[svindex].timeStamp
          )
          const diff = moment.duration(timeStamp.diff(svDate)).asDays()
          if (diff > 1) {
            storedValue[i].chartData.push({
              timeStamp: timeStamp.unix(),
              value: netBalance,
            })
            setStoredValue(storedValue)
          } else {
            storedValue[i].chartData[svindex].value = netBalance
            setStoredValue(storedValue)
          }
        }
      }
    }
    if (account && !found) {
      const previousDay = timeStamp
      storedValue.push({
        wallet: account,
        chartData: [
          {
            timeStamp: previousDay,
            value: 0,
          },
          {
            timeStamp: timeStamp.unix(),
            value: netBalance,
          },
        ],
      })
      setStoredValue(storedValue)
    }
  }
}
