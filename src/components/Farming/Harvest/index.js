import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useHarvest } from '../../../hooks/useHarvest'
import { getNetworkConfig } from '../../../networks'

const Harvest = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const harvest = useHarvest(props.id)
  const network = getNetworkConfig()
  const handleHarvest = () => {
    harvest().then(x => {
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
