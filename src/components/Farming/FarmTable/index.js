import React, { useState } from 'react'
import { DataView, textStyle, Button, GU } from '@1hive/1hive-ui'
import { getKnownTokenImg } from '../../../utils/known-tokens'
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
  const pairs = props.pairData || []
  const fuse = new Fuse(pairs, {
    keys: ['name', 'symbol'],
  })
  const results = fuse.search(props.searchValue)
  const { account, status } = useWallet()
  const handleModalActions = e => {
    setModalAction(true)
    const d = props.searchValue ? results : pairs
    const filtered = d.filter(data => {
      return data.symbol === e.target.id
    })
    setModalData({
      ...filtered[0],
      account,
      balance: props.balance[filtered[0].poolToken],
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
                props.searchValue
                  ? 'No Pairs Found'
                  : 'Connect your account to see farm'
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
          entries={account ? (props.searchValue ? results : pairs) : []}
          header
          renderEntry={({ name, symbol, rewardApy }) => {
            const customLabel = name
            const token0Img = getKnownTokenImg(symbol)
            const token1Img = getKnownTokenImg(null)
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
              <p>{rewardApy.toFixed(2)}%</p>,
              <RewardComponent image={xComb} name="xComb" />,
              <React.Fragment>
                <Button
                  css={`
                    background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
                  `}
                  id={symbol}
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
