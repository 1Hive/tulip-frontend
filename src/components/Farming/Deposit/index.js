import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../providers/Poolprovider'

const Deposit = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { token, amount, timeLock } = props
  const opener = useRef()
  let tl = timeLock || 0
  const date = new Date()
  if (tl > 0) {
    date.setDate(date.getDate() + tl)
    tl = Math.round(date.getTime() / 1000)
  } else {
    date.setDate(date.getDate() + 59)
    tl = Math.round(date.getTime() / 1000)
  }

  const deposit = useCreateDeposit(token, amount.toString(), tl)
  const handleDeposit = () => {
    deposit()
      .then(x => {
        if (x) {
          setTxHash(x.hash)
          setVisible(true)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <Button
        css={`
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
        `}
        label="Deposit"
        onClick={handleDeposit}
        wide
      />
      <TransactionProgress
        transactionHashUrl={`https://rinkeby.etherscan.io/tx/${txHash}`}
        progress={0.3}
        visible={visible}
        endTime={new Date(Date.now() + 100000)}
        onClose={() => setVisible(false)}
        opener={opener}
        slow
      />
    </>
  )
}

export default Deposit
