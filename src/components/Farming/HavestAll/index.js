import React, { useState, useRef } from 'react'
import { Button, TransactionProgress } from '@1hive/1hive-ui'
import { getNetworkConfig } from '../../../networks'
import { buttonGreenCss } from '../styles'
import { useWallet } from 'use-wallet'
import { useHarvestAll } from '../../../hooks/useHavestAll'

const HarvestAll = props => {
  const {
    _web3ReactContext: { chainId },
  } = useWallet()
  const [visible, setVisible] = useState(false)
  const [txHash, setTxHash] = useState('')
  const opener = useRef()
  const harvestAll = useHarvestAll(props.ids, chainId)
  const network = getNetworkConfig(chainId)

  const transactionTime = new Date()
  transactionTime.setSeconds(transactionTime.getSeconds() + 8)

  const handleHarvestAll = () => {
    harvestAll()
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
      <Button
        css={`
          ${buttonGreenCss}
          width: 100%;
        `}
        onClick={handleHarvestAll}
        label="Harvest All Rewards"
        wide
        ref={opener}
      />
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
    </>
  )
}

export default HarvestAll
