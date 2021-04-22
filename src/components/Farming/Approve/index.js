import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useApprove } from '../../../providers/Poolprovider'
const Approve = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const balanceToEth = props.amount.balance
  const approve = useApprove(props.token, balanceToEth)

  const handleApprove = () => {
    approve()
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
        label="Approve"
        wide
        onClick={handleApprove}
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

export default Approve
