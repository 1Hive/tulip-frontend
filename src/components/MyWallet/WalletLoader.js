import React, { useState } from 'react'
import MyWallet from './MyWallet'
import Loader from '../Loader'
import { useChartData, useNetBalance } from '../../hooks/useWalletData'

function WalletLoader() {
  const [selectedRange, setSelectedRange] = useState('W')
  const walletData = useNetBalance()
  const chartData = useChartData(selectedRange)

  const handeSelectRange = value => {
    setSelectedRange(value)
  }

  if (walletData.isFetching) {
    return <Loader />
  }
  console.log('wallet information ', walletData)
  return (
    <MyWallet
      walletData={walletData}
      chartData={chartData}
      onSelectRange={handeSelectRange}
    />
  )
}

export default WalletLoader
