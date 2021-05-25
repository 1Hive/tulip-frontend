import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useWithdraw } from '../../../hooks/useWithdraw'
import { getNetworkConfig } from '../../../networks'

const Withdraw = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const withdraw = useWithdraw(props.id)
  const network = getNetworkConfig()
  const handleWithdraw = () => {
    withdraw()
      .then(x => {
        if (x) {
          setTxHash(x.hash)
          setVisible(true)
          x.wait()
            .then(() => {
              setVisible(false)
            })
            .catch(err => console.log(err))
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
        progress={0.3}
        visible={visible}
        endTime={new Date(Date.now() + 100000)}
        onClose={() => setVisible(false)}
        opener={opener.current}
        slow
      />
      <Button
        disabled={!props.disabled}
        css={`
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
        `}
        onClick={() => {
          handleWithdraw()
        }}
        label="Withdraw"
        wide
        ref={opener}
      />
    </>
  )
}

export default Withdraw
