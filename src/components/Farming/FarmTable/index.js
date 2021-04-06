import React, { useState } from 'react'
import { DataView, textStyle, Button } from '@1hive/1hive-ui'
import Loading from '../../Loading'
import { getKnownTokenImg } from '../../../utils/known-tokens'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'
import Fuse from 'fuse.js'
import DepositModal from '../DepositModal'

const FarmTable = props => {
  const [modalAction, setModalAction] = useState(false)
  const [modalData, setModalData] = useState('')
  const pairs = props.pairData || []
  console.log(pairs)
  const fuse = new Fuse(pairs, {
    keys: ['name', 'symbol'],
  })
  const results = fuse.search(props.searchValue)

  const handleModalActions = () => {
    setModalAction(true)
  }
  const handleModalClose = () => {
    setModalAction(false)
  }

  if (pairs.length === 0) {
    return <Loading />
  } else {
    return (
      <div
        css={`
          ${textStyle('body2')};
          font-family: 'Overpass', sans-serif;
          font-weight: 300;
          font-size: 18px;
        `}
      >
        <DataView
          fields={[
            'Asset',
            'Base Yield',
            'Reward Yield',
            'Total Yield',
            'Reward Asset',
            ' ',
          ]}
          css={`
            border-top: none;
          `}
          emptyState={{
            default: {
              displayLoader: false,
              title: 'Getting Pools',
              subtitle: null,
              illustration: <Loading />,
              clearLabel: null,
            },
            loading: {
              displayLoader: true,
              title: 'No data available.',
              subtitle: null,
              illustration: (
                <img
                  src="https://i1.wp.com/www.cssscript.com/wp-content/uploads/2014/10/iOS-OS-X-Style-Pure-CSS-Loading-Spinner.jpg?fit=400%2C300&ssl=1"
                  alt=""
                />
              ),
              clearLabel: null,
            },
          }}
          entries={props.searchValue ? results : pairs}
          header
          renderEntry={({
            name,
            symbol,
            poolToken,
            totalShares,
            lastRewardTimestamp,
            allocPoint,
            accHsfPerShare,
          }) => {
            const customLabel = name
            const baseYield = 23
            const rewardYield = parseInt(baseYield * 2)
            const totalYield = parseInt(baseYield + rewardYield)
            const token0Img = getKnownTokenImg(symbol)
            const token1Img = getKnownTokenImg(null)
            const imgObj = {
              pair1: token0Img,
              pair2: token1Img,
            }
            console.log(imgObj)
            return [
              <PairName
                image={imgObj}
                name={customLabel}
                subheadline="Honeyswap"
              />,
              <p>{baseYield}%</p>,
              <p>{rewardYield}%</p>,
              <p>{totalYield}%</p>,
              <RewardComponent image={getKnownTokenImg('AG')} name="Agave" />,
              <React.Fragment>
                <Button
                  css={`
                    background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
                  `}
                  id={symbol}
                  label="Stake"
                  onClick={e => {
                    handleModalActions()
                    console.log(e.target.id)
                    setModalData(e.target.id)
                  }}
                />
                <DepositModal
                  modalAction={modalAction}
                  handleModalClose={handleModalClose}
                  tokenImg={imgObj}
                  data={modalData}
                />
              </React.Fragment>,
            ]
          }}
        />
      </div>
    )
  }
}
export default FarmTable
