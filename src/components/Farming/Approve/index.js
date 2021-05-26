import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useApprove } from '../../../hooks/useApprove'
import { getNetworkConfig } from '../../../networks'

const Approve = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const balanceToEth = props.amount.balance
  const approve = useApprove(props.token, balanceToEth)
  const network = getNetworkConfig()

  const handleApprove = () => {
    approve()
      .then(x => {
        if (x) {
          setVisible(true)
          setTxHash(x.hash)
          x.wait()
            .then(() => {
              setVisible(false)
            })
            .catch(err => {
              console.log(err)
              props.onError(err)
            })
        }
      })
      .catch(err => {
        console.log(err)
        props.onError(err)
      })
  }

  return (
    <>
      <TransactionProgress
        transactionHashUrl={network.txUrl + txHash}
        progress={0.3}
        visible={visible}
        endTime={new Date(Date.now() + 100000)}
        onClose={() => setVisible(false)}
        opener={opener}
        slow
      />
      <Button
        css={`
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
        `}
        label="Approve"
        wide
        onClick={handleApprove}
        ref={opener}
      />
    </>
  )
}

export default Approve
