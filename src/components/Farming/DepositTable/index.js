import React from 'react'
import { DataView, GU, textStyle } from '@1hive/1hive-ui'
import { useWallet } from '../../../providers/Wallet'
import Fuse from 'fuse.js'
import Loader from '../../Loader'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'
import { KNOWN_FORMATS, dateFormat } from '../../../utils/date-utils'
import Withdraw from '../Withdraw'
import Harvest from '../Harvest'
import Icon from '../../../assets/tulip/icon.svg'
import { getNetworkConfig } from '../../../networks'

const DepositTable = props => {
  let tokenImage = Icon
  let tokenName = 'xComb'
  const network = getNetworkConfig()
  if (network) {
    tokenImage = network.token.image
    tokenName = network.token.name
  }
  const depositArray = []
  const { account, status } = useWallet()
  if (typeof props.depositData !== 'string' && props.depositData) {
    for (const {
      id,
      amount,
      pool,
      referrer,
      rewardDebt,
      unlockTime,
      rewardShare,
      setRewards,
      symbol,
      rewardBalance,
      pairInfo,
    } of props.depositData) {
      const depositInfoObj = {
        id,
        amount: amount.toFixed(3),
        pool,
        referrer,
        rewardBalance,
        rewardDebt: rewardDebt.toFixed(3),
        unlockTime: dateFormat(unlockTime, KNOWN_FORMATS.onlyDate),
        rewardShare: rewardShare,
        setRewards: setRewards,
        symbol: symbol[0],
        pairInfo,
      }
      depositArray.push(depositInfoObj)
    }
    depositArray.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    })
  }
  const fuse = new Fuse(depositArray, {
    keys: [
      'pairInfo.token0.name',
      'pairInfo.token0.symbol',
      'pairInfo.token1.symbol',
      'pairInfo.token1.name',
    ],
  })

  const results = fuse.search(props.searchValue)

  if (depositArray.length === 0 && status !== 'disconnected' && account) {
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
          'Deposit Asset',
          'Deposit Balance',
          'Unlock Date',
          'Reward Asset',
          'Reward Balance',
          '',
          '',
        ]}
        emptyState={{
          default: {
            displayLoader: false,
            title: `${
              props.searchValue
                ? 'No results'
                : account
                ? 'No results'
                : 'Connect your account to see your deposits'
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
        entries={account ? (props.searchValue ? results : depositArray) : []}
        renderEntry={({
          id,
          amount,
          pool,
          referrer,
          rewardDebt,
          unlockTime,
          rewardShare,
          setRewards,
          symbol,
          rewardBalance,
          pairInfo,
        }) => {
          const imgObj = {
            pair1: pairInfo ? pairInfo.token0.logoURI : undefined,
            pair2: pairInfo ? pairInfo.token1.logoURI : undefined,
          }
          const customLabel = symbol
          const unlockDate = new Date(unlockTime).getTime() / 1000
          const currentTime = Math.floor(Date.now() / 1000)
          const withdrawEnabled = currentTime > unlockDate
          const pendingReward = (Number(rewardBalance) / 1e18).toFixed(3)
          if (new Date(unlockTime).getTime() === 0) {
            unlockTime = 'Not locked'
          }
          return [
            <PairName
              image={imgObj}
              name={customLabel}
              subheadline="Honeyswap"
            />,
            <p>{amount}</p>,
            <p>{unlockTime}</p>,
            <RewardComponent image={tokenImage} name={tokenName} />,
            <p>{pendingReward}</p>,
            <Withdraw id={id} disabled={!withdrawEnabled} />,
            <Harvest id={id} />,
          ]
        }}
      />
    </div>
  )
}

export default DepositTable
