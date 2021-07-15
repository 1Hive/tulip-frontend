import React, { useState } from 'react'
import { DataView, GU, textStyle } from '@1hive/1hive-ui'
import { useWallet } from '../../../providers/Wallet'
import ReactTooltip from 'react-tooltip'
import Fuse from 'fuse.js'
import Loader from '../../Loader'
import PairName from '../PairName'
import RewardComponent from '../RewardComponent'
import { KNOWN_FORMATS, dateFormat } from '../../../utils/date-utils'
import Withdraw from '../Withdraw'
import Harvest from '../Harvest'
import Icon from '../../../assets/tulip/icon.svg'
import { getNetworkConfig } from '../../../networks'
import UserErrorScreen from '../../Errors/UserErrorScreen'
import { truncateDecimals } from '../../../lib/math-utils'
import styled from 'styled-components'
import HavestAll from '../HavestAll'

const DepositTable = props => {
  const {
    account,
    _web3ReactContext: { chainId },
  } = useWallet()

  let tokenImage = Icon
  let tokenName = 'xComb'
  const network = getNetworkConfig(chainId)

  if (network) {
    tokenImage = network.token.image
    tokenName = network.token.name
  }

  const calculateDollar = (amount, pairInfo) => {
    const pricePerToken = pairInfo.reserveUSD / pairInfo.totalSupply

    return amount * pricePerToken
  }

  const StyledTooltip = styled(ReactTooltip)`
    border-radius: 10px !important;
  `

  const depositArray = []
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const opener = React.createRef()
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
      rewardBalance,
      pairInfo,
    } of props.depositData) {
      const depositInfoObj = {
        id,
        amount: amount,
        pool,
        referrer,
        rewardBalance,
        rewardDebt: rewardDebt.toFixed(3),
        unlockTime: unlockTime.getTime(),
        rewardShare: rewardShare,
        setRewards: setRewards,
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

  const handleError = err => {
    if (err && err.data && err.data.message) {
      setErrorVisible(true)
      setErrorMessage(`${err.data.data}: ${err.data.message}`)
    } else if (err && err.message) {
      setErrorVisible(true)
      setErrorMessage(err.message)
    }
  }
  const closeError = () => {
    setErrorVisible(false)
  }

  const wrapBatchAction = items => {
    const dollarSum = items.reduce((acc, cur) => {
      return acc + calculateDollar(cur.amount, cur.pairInfo)
    }, 0)
    const amountSum = items.reduce((acc, cur) => acc + Number(cur.amount), 0)
    const rewardBalanceSum = items.reduce(
      (acc, cur) => Number(acc + Number(cur.rewardBalance) / 1e18),
      0
    )

    return [
      {
        amount: {
          amountSum,
          dollarSum,
        },
        rewardBalance: rewardBalanceSum,
        unlockTime: '-',
      },
      ...items,
    ]
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
      <UserErrorScreen
        isVisible={errorVisible}
        opener={opener}
        onClose={closeError}
      >
        <p>
          <b>Error</b>
        </p>
        <p>{errorMessage}</p>
      </UserErrorScreen>
      <DataView
        fields={[
          'Deposit Asset',
          'Deposit Balance',
          'Unlock Date',
          'Reward Asset',
          'Reward Balance',
          '',
        ]}
        css={`
          border-top: none;
          margin-bottom: 20px;
        `}
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
        entries={
          account
            ? props.searchValue
              ? wrapBatchAction(results)
              : wrapBatchAction(depositArray)
            : []
        }
        renderEntry={({
          id,
          amount,
          pool,
          referrer,
          rewardDebt,
          unlockTime,
          rewardShare,
          setRewards,
          rewardBalance,
          pairInfo,
        }) => {
          if (unlockTime === '-') {
            const entries = props.searchValue ? results : depositArray
            return [
              <div
                css={`
                  margin-left: 60px;
                  @media (max-width: 576px) {
                    margin: 0;
                  }
                `}
              >
                <PairName name="All Deposits" subheadline="Honeyswap" />
              </div>,
              <PairName
                name={'$' + truncateDecimals(amount.dollarSum)}
                subheadline={truncateDecimals(amount.amountSum)}
              />,
              <p>{unlockTime}</p>,
              <RewardComponent image={tokenImage} name={tokenName} />,
              <p>{truncateDecimals(rewardBalance)}</p>,
              <HavestAll
                ids={entries.map(entry => entry.id)}
                onError={handleError}
              />,
            ]
          }

          const imgObj = {
            pair1: pairInfo ? pairInfo.token0.logoURI : undefined,
            pair2: pairInfo ? pairInfo.token1.logoURI : undefined,
          }
          const customLabel = () => {
            if (!pairInfo) return ''

            return (
              pairInfo.token0.symbol + ' - ' + pairInfo.token1.symbol + ' LP'
            )
          }
          const unlockDate = new Date(unlockTime).getTime() / 1000 + 100 // add 100 seconds to be sure the time is reached
          const currentTime = Math.ceil(Date.now() / 1000)

          let unlockTimeFormatted = 'Not locked'

          if (unlockTime > 0) {
            unlockTimeFormatted = dateFormat(unlockTime, KNOWN_FORMATS.standard)
          }

          const withdrawDisabled = unlockDate > currentTime && unlockTime !== 0
          const pendingReward = truncateDecimals(Number(rewardBalance) / 1e18)

          return [
            <PairName
              image={imgObj}
              name={customLabel()}
              subheadline="Honeyswap"
            />,
            <PairName
              name={'$' + truncateDecimals(calculateDollar(amount, pairInfo))}
              subheadline={truncateDecimals(amount)}
            />,
            <p>{unlockTimeFormatted}</p>,
            <RewardComponent image={tokenImage} name={tokenName} />,
            <p>{truncateDecimals(pendingReward)}</p>,
            <>
              <div
                css={`
                  margin-right: 1rem;
                  @media (max-width: 768px) {
                    margin-right: 0;
                    margin-bottom: 1rem;
                  }
                `}
              >
                <StyledTooltip
                  place="top"
                  type="light"
                  effect="solid"
                  backgroundColor="#aaf5d4"
                />
                {withdrawDisabled ? (
                  <div data-tip="Withdraw will be disabled until the unlock date is reached">
                    <Withdraw
                      id={id}
                      disabled={withdrawDisabled}
                      onError={handleError}
                      opener={opener}
                    />
                  </div>
                ) : (
                  <Withdraw
                    id={id}
                    disabled={withdrawDisabled}
                    onError={handleError}
                    opener={opener}
                  />
                )}
              </div>
              <Harvest id={id} onError={handleError} />
            </>,
          ]
        }}
      />
    </div>
  )
}

export default DepositTable
