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
import { getNetworkConfig } from '../../../networks'
import { buttonGrayCss, buttonGreenCss } from '../styles'

const FarmTable = props => {
  let tokenImage = Icon
  const network = getNetworkConfig()
  if (network) {
    tokenImage = network.token.image
  }
  const [modalAction, setModalAction] = useState(false)
  const [modalData, setModalData] = useState({})
  const { pairData, searchValue, balance, poolInfo } = props
  const pairs = pairData || []
  const fuse = new Fuse(pairs, {
    keys: [
      'pairInfo.token0.name',
      'pairInfo.token0.symbol',
      'pairInfo.token1.symbol',
      'pairInfo.token1.name',
    ],
  })

  const isZeroBalance = pairAddress => {
    return (
      balance === undefined ||
      Number(balance[pairAddress]) === 0 ||
      balance.length === 0
    )
  }

  const buttonCss = pairAddress => {
    if (isZeroBalance(pairAddress)) {
      return buttonGrayCss
    }
    return buttonGreenCss
  }
  const results = fuse.search(searchValue)
  const { account, status } = useWallet()
  const handleModalActions = e => {
    const d = searchValue ? results : pairs
    const filtered = d.filter(data => {
      return data.pair === e.target.id
    })

    // do nothing if balance is zero or data is not loaded
    if (filtered.length === 0 || isZeroBalance(e.target.id)) {
      return
    }

    setModalAction(true)
    setModalData({
      ...filtered[0],
      account,
      balance: balance[filtered[0].pair],
    })
  }

  const handleModalClose = () => {
    setModalAction(false)
  }

  if (pairs.length === 0 && status !== 'disconnected' && account) {
    return <Loader />
  }

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
          'Alloc Point',
          'Rewards 24h',
          'Reward Yield 24h',
          'Reward Yield 1y',
          'Reward Asset',
          ' ',
        ]}
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
            illustration: (
              <img src={tokenImage} height={6 * GU} width={5.5 * GU} />
            ),
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
            <p>{pool.allocPoint}</p>,
            <p>{pool.hsf24h.toFixed(2)}</p>,
            <p>{pool.rewardApy24h.toFixed(2)}%</p>,
            <p>{pool.rewardApy.toFixed(2)}%</p>,
            <RewardComponent image={xComb} name="xComb" />,
            <React.Fragment>
              <Button
                disabled={isZeroBalance(pool.pair)}
                css={buttonCss(pool.pair)}
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
export default FarmTable
