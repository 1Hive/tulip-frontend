import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { wallet } from 'tulip-backend'
import { useWallet } from 'use-wallet'
import { useLocalStorage } from './useLocalStorage'
import { formatNumber } from '../utils/validate-utils'
import { truncateDecimals } from '../lib/math-utils'

export function useWalletData() {
  const [walletInfo, setWalletInfo] = useState([])
  const [poolingInfo, setPoolingInfo] = useState([])
  const [farmingInfo, setFarmingInfo] = useState([])
  const [isFetchingWallet, setIsFetchingWallet] = useState(false)
  const [isFetchingPool, setIsFetchingPool] = useState(false)
  const [isFetchingFarm, setIsFetchingFarm] = useState(false)
  const {
    account,
    status,
    _web3ReactContext: { chainId },
  } = useWallet()

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
          chain_id: chainId,
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
          chain_id: chainId,
        })

        if (!cancelled) {
          setPoolingInfo(poolingData)
          return setIsFetchingPool(false)
        }
      } catch (err) {
        console.error(`Could not fetch wallet data `, err)
      }
    }

    const fetchFarmingBalances = async () => {
      try {
        setIsFetchingPool(true)

        const stakedData = await wallet.stakedBalances({
          user_address: account,
          chain_id: chainId,
        })

        if (!cancelled) {
          setFarmingInfo(stakedData)
          return setIsFetchingFarm(false)
        }
      } catch (err) {
        console.error(`Could not fetch wallet data `, err)
      }
    }

    fetchWalletData()
    fetchPoolingData()
    fetchFarmingBalances()
    return () => {
      cancelled = true
    }
  }, [account, status, chainId])

  return [
    walletInfo,
    poolingInfo,
    farmingInfo,
    isFetchingWallet || isFetchingPool || isFetchingFarm,
  ]
}

export function useNetBalance() {
  const [walletInfo, poolingInfo, farmingInfo, isFetching] = useWalletData()
  const { account } = useWallet()
  const [assetsList, setAssetsList] = useState([])
  const farmingList = []
  const CHART_DATA_KEY = 'chart_data'
  const { storedValue, setStoredValue } = useLocalStorage(CHART_DATA_KEY)

  const {
    walletBalance,
    poolBalance,
    farmBalance,
    netBalance,
    assetsSortedList,
  } = useMemo(() => {
    let netBalance = 0
    let walletBalance = 0
    let farmBalance = 0
    let poolBalance = 0
    setAssetsList([])

    if (walletInfo) {
      walletInfo.map(value => {
        if (value && parseFloat(value.valueUSD)) {
          walletBalance = walletBalance + parseFloat(value.valueUSD)
          setAssetsList(data => [
            ...data,
            {
              symbol: value.symbol,
              name: value.name,
              balance: truncateDecimals(value.balance),
              price: formatNumber(value.priceUSD.toFixed(2)),
              value: formatNumber(value.valueUSD.toFixed(2)),
              image1: value.logoURI,
              image2: '',
            },
          ])
        }
      })
    }

    if (poolingInfo) {
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
              balance: truncateDecimals(value.balance),
              value: formatNumber(Number(value.valueUSD).toFixed(2)),
              price: formatNumber(
                Number(value.valueUSD / value.balance).toFixed(2)
              ),
              name: 'Honeyswap',
            },
          ])
        }
      })
    }

    if (farmingInfo && farmingInfo.length > 0) {
      const farmSet = new Set()
      farmingInfo.map(value => {
        farmBalance = Number(farmBalance) + parseFloat(value.valueUSD)
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

        if (!farmSet.has(value.address)) {
          farmSet.add(value.address)
          farmingList.push({
            address: value.address,
            symbol,
            image1,
            image2,
            balance: truncateDecimals(value.balance),
            value: formatNumber(Number(value.valueUSD).toFixed(2)),
            price: formatNumber(
              Number(value.valueUSD / value.balance).toFixed(2)
            ),
            name: 'Honeycomb Farm',
          })
        } else {
          for (let i = 0; i < farmingList.length; i++) {
            if (farmingList[i].address === value.address) {
              const balance =
                Number(farmingList[i].balance) + Number(value.balance)
              farmingList[i].balance = truncateDecimals(Number(balance))

              const val =
                Number(farmingList[i].value.replace(/,/g, '')) +
                Number(value.valueUSD)
              farmingList[i].value = formatNumber(Number(val).toFixed(2))
              break
            }
          }
        }
      })
    }
    // Todo: fix this ..maybe
    let assetsSortedList = []
    assetsSortedList = assetsList
    farmingList.map(item => {
      assetsSortedList.push(item)
    })

    assetsSortedList = assetsSortedList.sort(
      (a, b) =>
        parseFloat(b.value.replace(/,/g, '')) -
        parseFloat(a.value.replace(/,/g, ''))
    )

    walletBalance = walletBalance.toFixed(2)
    poolBalance = poolBalance.toFixed(2)
    farmBalance = farmBalance.toFixed(2)
    netBalance = parseFloat(
      Number(walletBalance) +
        Number(poolBalance) +
        Number(farmBalance) +
        netBalance
    ).toFixed(2)
    walletBalance = formatNumber(walletBalance)
    poolBalance = formatNumber(poolBalance)
    farmBalance = formatNumber(farmBalance)
    netBalance = formatNumber(netBalance)

    return {
      walletBalance,
      poolBalance,
      netBalance,
      farmBalance,
      assetsSortedList,
      isFetching,
    }
  }, [walletInfo, poolingInfo, farmingInfo, isFetching])

  useMemo(() => {
    if (account && !isFetching) {
      updateLocalBalance(account, netBalance, storedValue, setStoredValue)
    }
  }, [netBalance, isFetching])

  return {
    walletBalance,
    poolBalance,
    netBalance,
    farmBalance,
    assetsList: assetsSortedList,
    status: !!account,
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
