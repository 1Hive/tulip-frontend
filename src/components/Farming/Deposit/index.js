import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../hooks/useCreateDeposit'
import { getNetworkConfig } from '../../../networks'

const Deposit = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { token, amount, timeLock } = props
  const network = getNetworkConfig()
  const opener = useRef()
  let tl = timeLock || 0
  const date = new Date()
  if (typeof tl !== 'string' && tl > 0) {
    date.setDate(date.getDate() + tl)
    tl = Math.round(date.getTime() / 1000)
  } else if (tl === 0) {
    tl = 0
  } else {
    date.setDate(date.getDate() + 59)
    tl = Math.round(date.getTime() / 1000)
  }

  const deposit = useCreateDeposit(token, amount.toString(), tl)
  const handleDeposit = () => {
    deposit()
      .then(x => {
        if (x) {
          setVisible(true)
          setTxHash(x.hash)
          x.wait()
            .then(() => {
              setVisible(false)
              props.onTransactionComplete()
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <TransactionProgress
        transactionHash={txHash}
        transactionHashUrl={network.txUrl + txHash}
        progress={0.3}
        visible={visible}
        endTime={new Date(Date.now() + 100000)}
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
