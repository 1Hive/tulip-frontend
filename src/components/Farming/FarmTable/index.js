import React, { useState } from 'react'
import { DataView, textStyle, Button, GU } from '@1hive/1hive-ui'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'
import Fuse from 'fuse.js'
import DepositModal from '../DepositModal'
import Loader from '../../Loader'
import Icon from '../../../assets/tulip/icon.svg'
import { useWallet } from '../../../providers/Wallet'
import xComb from '../../../assets/coins/xcomb.svg'

const FarmTable = props => {
  const [modalAction, setModalAction] = useState(false)
  const [modalData, setModalData] = useState({})
  const { pairData, searchValue, balance, poolInfo } = props
  const pairs = pairData || []
  const fuse = new Fuse(pairs, {
    keys: ['name', 'symbol'],
  })
  const results = fuse.search(searchValue)
  const { account, status } = useWallet()
  const handleModalActions = e => {
    setModalAction(true)
    const d = searchValue ? results : pairs
    const filtered = d.filter(data => {
      return data.pair === e.target.id
    })
    setModalData({
      ...filtered[0],
      account,
      balance: balance[filtered[0].pair],
    })
  }
  const handleModalClose = () => {
    setModalAction(false)
  }
  if (pairs.length === 0 && status !== 'disconnected') {
    return <Loader />
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
          fields={['Asset', 'Reward Yield', 'Reward Asset', ' ']}
          css={`
            border-top: none;
          `}
          emptyState={{
            default: {
              displayLoader: false,
              title: `${
                searchValue
                  ? 'No results'
                  : 'Connect your account to see the farms'
              }`,
              subtitle: null,
              illustration: <img src={Icon} height={6 * GU} width={5.5 * GU} />,
              clearLabel: null,
            },
            loading: {
              displayLoader: true,
              title: 'No data available.',
              subtitle: null,
              illustration: <Loader />,
              clearLabel: null,
            },
          }}
          entries={account ? (searchValue ? results : pairs) : []}
          header
          renderEntry={pool => {
            const customLabel = `${pool.pairInfo.token0.name} - ${pool.pairInfo.token1.name}`
            const token0Img = pool.pairInfo.token0.logoURI
            const token1Img = pool.pairInfo.token1.logoURI
            const imgObj = {
              pair1: token0Img,
              pair2: token1Img,
            }
            return [
              <PairName
                image={imgObj}
                name={customLabel}
                subheadline="Honeyswap"
              />,
              <p>{pool.rewardApy.toFixed(2)}%</p>,
              <RewardComponent image={xComb} name="xComb" />,
              <React.Fragment>
                <Button
                  css={`
                    background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
                  `}
                  id={pool.pair}
                  label="Stake"
                  onClick={e => {
                    handleModalActions(e)
                  }}
                />
                <DepositModal
                  modalAction={modalAction}
                  handleModalClose={handleModalClose}
                  tokenImg={imgObj}
                  data={modalData}
                  poolInfo={poolInfo}
                  rewardApy={pool.rewardApy}
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
