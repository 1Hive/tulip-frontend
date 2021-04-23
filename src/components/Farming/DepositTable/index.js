import React from 'react'
import { DataView, GU, textStyle } from '@1hive/1hive-ui'
import { useWallet } from '../../../providers/Wallet'
import Fuse from 'fuse.js'
import Loader from '../../Loader'
import Icon from '../../../assets/tulip/icon.svg'
import { getKnownTokenImg } from '../../../utils/known-tokens'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'
import { KNOWN_FORMATS, dateFormat } from '../../../utils/date-utils'
import Withdraw from '../Withdraw'
import Harvest from '../Harvest'
import xComb from '../../../assets/coins/xcomb.svg'

const DepositTable = props => {
  const depositArray = []
  const { account } = useWallet()
  if (typeof props.depositData !== 'string') {
    for (const {
      id,
      amount,
      pool,
      referrer,
      rewardDept,
      unlockTime,
      rewardShare,
      setRewards,
      symbol,
    } of props.depositData) {
      const depositInfoObj = {
        id,
        amount: amount.toFixed(3),
        pool,
        referrer,
        rewardDept: rewardDept.toFixed(3),
        unlockTime: dateFormat(unlockTime, KNOWN_FORMATS.onlyDate),
        rewardShare: rewardShare,
        setRewards: setRewards,
        symbol: symbol[0],
      }
      depositArray.push(depositInfoObj)
    }
    depositArray.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    })
  }
  const fuse = new Fuse(depositArray, {
    keys: ['symbol'],
  })
  const results = fuse.search(props.searchValue)
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
        entries={account ? (props.searchValue ? results : depositArray) : []}
        renderEntry={({
          id,
          amount,
          pool,
          referrer,
          rewardDept,
          unlockTime,
          rewardShare,
          setRewards,
          symbol,
        }) => {
          const imgObj = {
            pair1: getKnownTokenImg(symbol),
            pair2: null,
          }
          const customLabel = symbol
          return [
            <PairName
              image={imgObj}
              name={customLabel}
              subheadline="Honeyswap"
            />,
            <p>{amount}</p>,
            <p>{unlockTime}</p>,
            <RewardComponent image={xComb} name="xComb" />,
            <p>{rewardDept}</p>,
            <Withdraw id={id} />,
            <Harvest id={id} />,
          ]
        }}
      />
    </div>
  )
}

export default DepositTable
