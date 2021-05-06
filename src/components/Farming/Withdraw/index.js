import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useWithdraw } from '../../../providers/Poolprovider'

const Withdraw = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const withdraw = useWithdraw(props.id)
  const handleWithdraw = () => {
    withdraw()
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
        onClick={handleWithdraw}
        label="Withdraw"
        wide
      />
      <TransactionProgress
        transactionHash={txHash}
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

export default Withdraw
