import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../hooks/useCreateDeposit'
import { getNetworkConfig } from '../../../networks'
import { useWallet } from 'use-wallet'

const Deposit = props => {
  const {
    _web3ReactContext: { chainId },
  } = useWallet()
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { token, amount, days, maxDays, referrer } = props
  const network = getNetworkConfig(chainId)

  const opener = useRef()

  const userReferrer = referrer
  const transactionTime = new Date()
  transactionTime.setSeconds(transactionTime.getSeconds() + 8)

  const calculateUnlockTimestamp = days => {
    console.log(days)
    if (days === 0 || !days) {
      return 0
    }

    const date = new Date()
    let unlockTimestamp = Math.floor(date.setDate(date.getDate() + days) / 1000)
    // add or remove 100 seconds on the max/min value to cover for rounding errors
    if (days === 1) {
      unlockTimestamp += 100
    }
    if (days === maxDays) {
      unlockTimestamp -= 100
    }
    console.log(unlockTimestamp)
    return unlockTimestamp
  }
  const unlockTimestamp = calculateUnlockTimestamp(days)
  console.log(unlockTimestamp)
  const deposit = useCreateDeposit(
    token,
    amount.toString(),
    unlockTimestamp,
    userReferrer,
    chainId
  )
  const handleDeposit = () => {
    deposit()
      .then(x => {
        if (x && x.message === undefined) {
          setVisible(true)
          setTxHash(x.hash)
          x.wait()
            .then(() => {
              setVisible(false)
              props.onTransactionComplete()
            })
            .catch(err => {
              props.onError(err)
            })
        }
      })
      .catch(err => {
        props.onError(err)
      })
  }
  return (
    <>
      <TransactionProgress
        transactionHash={txHash}
        transactionHashUrl={network.txUrl + txHash}
        progress={1}
        visible={visible}
        endTime={transactionTime}
        onClose={() => setVisible(false)}
        opener={opener}
        slow={false}
      />
      <Button
        css={`
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
        `}
        label="Deposit"
        onClick={handleDeposit}
        wide
        ref={opener}
      />
    </>
  )
}

export default Deposit
