import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../providers/Poolprovider'

const Deposit = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { token } = props
  const { tokenAmount } = props.depositInfo
  const opener = useRef()
  const deposit = useCreateDeposit(token, tokenAmount.toString())
  const handleDeposit = () => {
    deposit()
      .then(x => {
        setTxHash(x)
        setVisible(true)
      })
      .catch(err => console.log(err))
  }
  console.log(visible, txHash)
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
        transactionHashUrl={`https://etherscan.io/tx/${txHash}`}
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
