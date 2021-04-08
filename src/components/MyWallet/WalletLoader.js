import React from 'react'
import MyWallet from './MyWallet'
import Loader from '../Loader'
import { useNetBalance } from '../../hooks/useWalletData'

function WalletLoader() {
  const [walletData, isFetching] = useNetBalance()

  if (isFetching) {
    return <Loader />
  }

  return <MyWallet useNetBalance={walletData} />
}

export default WalletLoader
