import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { useHarvest } from '../../../hooks/useHarvest'
import { getNetworkConfig } from '../../../networks'
import { buttonGreenCss } from '../styles'

const Harvest = props => {
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const harvest = useHarvest(props.id)
  const network = getNetworkConfig()
  const transactionTime = new Date()
  transactionTime.setSeconds(transactionTime.getSeconds() + 8)

  const handleHarvest = () => {
    harvest()
      .then(x => {
        if (x) {
          setTxHash(x.hash)
          setVisible(true)
          x.wait()
            .then(() => {
              setVisible(false)
            })
            .catch(err => {
              props.onError(err)
            })
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
        progress={1}
        visible={visible}
        endTime={transactionTime}
        onClose={() => setVisible(false)}
        opener={opener}
        slow={false}
      />
      <Button
        css={buttonGreenCss}
        onClick={handleHarvest}
        label="Harvest"
        wide
        ref={opener}
      />
    </>
  )
}

export default Harvest
