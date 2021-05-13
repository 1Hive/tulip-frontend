import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useHarvest } from '../../../hooks/useHarvest'

const Harvest = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const harvest = useHarvest(props.id)
  const handleHarvest = () => {
    harvest()
    setTxHash('')
    // harvest()
    //   .then(x => {
    //     setTxHash(x)
    //     setVisible(true)
    //   })
    //   .catch(err => console.log(err))
  }

  return (
    <>
      <TransactionProgress
        transactionHashUrl={`https://etherscan.io/tx/${txHash}`}
        progress={0.3}
        visible={visible}
        endTime={new Date(Date.now() + 100000)}
        onClose={() => setVisible(false)}
        opener={opener}
        slow
      />
      <Button
        css={`
          background: linear-gradient(90deg, #f1f3f7, #f1f3f3);
        `}
        onClick={handleHarvest}
        label="Harvest"
        wide
        ref={opener}
      />
    </>
  )
}

export default Harvest
