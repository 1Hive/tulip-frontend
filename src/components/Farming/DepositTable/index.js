import React from 'react'
import { DataView, GU, textStyle } from '@1hive/1hive-ui'
import { useWallet } from '../../../providers/Wallet'
import Loader from '../../Loader'
import Icon from '../../../assets/tulip/icon.svg'
import { ethers } from 'ethers'
import { getKnownTokenImg } from '../../../utils/known-tokens'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'

const DepositTable = props => {
  const depositArray = []
  const { account } = useWallet()

  for (const {
    amount,
    pool,
    referrer,
    rewardDebt,
    unlockTime,
    rewardShare,
    setRewards,
    symbol,
  } of props.depositData) {
    const depositInfoObj = {
      amount: amount.toString(),
      pool,
      referrer,
      rewardDebt,
      unlockTime: unlockTime.toString(),
      rewardShare: rewardShare.toString(),
      setRewards: setRewards.toString(),
      symbol: symbol[0],
    }
    depositArray.push(depositInfoObj)
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
            title: 'Connect your account to see farm',
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
        entries={account ? depositArray : []}
        renderEntry={({
          amount,
          pool,
          referrer,
          rewardDebt,
          unlockTime,
          rewardShare,
          setRewards,
          symbol,
        }) => {
          console.log(
            amount,
            pool,
            referrer,
            rewardDebt,
            unlockTime,
            rewardShare,
            setRewards,
            symbol
          )
          const imgObj = {
            pair1: getKnownTokenImg(symbol),
            pair2: null,
          }
          const customLabel = symbol
          console.log(rewardDebt)
          return [
            <PairName
              image={imgObj}
              name={customLabel}
              subheadline="Honeyswap"
            />,
            <p>{ethers.utils.formatEther(amount)}</p>,
            <p>{unlockTime}</p>,
            <RewardComponent image={getKnownTokenImg('AG')} name="Agave" />,
            <p>{ethers.utils.formatEther(rewardDebt)}</p>,
          ]
        }}
      />
    </div>
  )
}

export default DepositTable
