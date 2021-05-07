import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useCreateDeposit } from '../../../providers/Poolprovider'
import Styled from './deposit.style'

const Deposit = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const { token, amount, timeLock } = props
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
            })
            .catch(err => console.log(err))
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
      <Styled.TransactionProgress>
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
      </Styled.TransactionProgress>
    </>
  )
}

export default Deposit
