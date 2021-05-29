import React, { useState } from 'react'
import { Modal, GU } from '@1hive/1hive-ui'
import { ethers } from 'ethers'
import { TimeLockSlider, AmountSlider } from '../SliderComponent'
import UserErrorScreen from '../../Errors/UserErrorScreen'

import { useCheckApprovedToken } from '../../../hooks/useCheckApproved'
import Approved from '../Approve'
import Deposit from '../Deposit'
import { useWallet } from 'use-wallet'

const DepositModal = props => {
  const [approved, setApproved] = useState(false)
  const [amount, setAmount] = useState(0)
  const [days, setDays] = useState(0)
  const [multiplier, setMultiplier] = useState('')
  const [errorVisible, setErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const maxDays = Math.floor(props.poolInfo.maxTimeLock / 3600 / 24)

  const imgObj = {
    pair1:
      props.data.pairInfo !== undefined
        ? props.data.pairInfo.token0.logoURI
        : undefined,
    pair2:
      props.data.pairInfo !== undefined
        ? props.data.pairInfo.token1.logoURI
        : undefined,
  }

  const tokenName = props.data.pairInfo
    ? `${props.data.pairInfo.token0.symbol} - ${props.data.pairInfo.token1.symbol}`
    : ''

  const {
    _web3ReactContext: { chainId },
  } = useWallet()

  useCheckApprovedToken(
    props.data.pair,
    props.data.account,
    props.data.balance,
    chainId
  ).then(isApproved => {
    setApproved(isApproved)
  })

  const handleTimeLockSliderUpdate = values => {
    setDays(values.days)
    setMultiplier(values.multiplier)
  }

  const handleAmountSliderUpdate = values => {
    setAmount(values.amount)
  }

  const handleTransactionComplete = () => {
    props.handleModalClose()
  }
  const handleError = err => {
    console.log(err)
    if (err && err.message) {
      setErrorVisible(true)
      setErrorMessage(err.message)
    }
  }
  const onModalClose = () => {
    setErrorVisible(false)
  }
  return (
    <>
      <UserErrorScreen isVisible={errorVisible} onClose={onModalClose}>
        {errorMessage}
      </UserErrorScreen>
      <Modal
        visible={props.modalAction}
        closeButton={false}
        css={`
          font-family: 'Overpass', sans-serif;
          display: flex;
        `}
      >
        <span
          css={`
            background: none;
            border-style: none;
            position: absolute;
            top: 10px;
            right: 25px;
            :hover {
              cursor: pointer;
              color: #d3d3d3;
            }
          `}
          onClick={props.handleModalClose}
        >
          &times;
        </span>
        <h2
          css={`
            font-weight: 700;
            font-size: 18px;
            line-height: 28px;
          `}
        >
          Deposit Options
        </h2>
        <span>
          This farm allows you to <strong>optionally</strong> lock your deposit
          for up to {maxDays} days to increase the reward yield multiplier on
          your deposit.
        </span>
        <div
          css={`
            display: flex;
            flex-direction: column;
            padding-top: 10px;
          `}
        >
          <AmountSlider
            imgObj={imgObj}
            tokenAmount={
              props.data.balance
                ? ethers.utils.formatEther(props.data.balance.toString())
                : 0
            }
            pairTitle={
              props.data
                ? `How many ${tokenName} tokens do you want to deposit?`
                : 'loading'
            }
            onUpdate={handleAmountSliderUpdate}
          />
          <TimeLockSlider
            pairTitle="How long do you want to lock your deposit?"
            onUpdate={handleTimeLockSliderUpdate}
            timeLockMultiplier={props.poolInfo.timeLockMultiplier}
            timeLockConstant={props.poolInfo.timeLockConstant}
            maxDays={maxDays}
            scale={props.poolInfo.scale}
          />
        </div>
        <div
          css={`
            width: 489px;
            height: 82.87px;
            background: #ebfafd;
            border: 1px solid #08bee5;
            box-sizing: border-box;
            border-radius: 12px;
            padding: ${2 * GU}px;
            margin: ${3 * GU}px auto;
            font-size: 11px;
            font-family: 'Overpass', sans-serif;
          `}
        >
          Currently your deposit is projected to have a yield of{' '}
          {(multiplier * props.data.rewardApy).toFixed(2)}% per year. This yield
          is variable and depends on the price of the reward asset, underlying
          asset yields, and the amount of capital participating in the Farm. It
          is calculated from the 24h reward yield annualized.
        </div>
        {approved ? (
          <Deposit
            token={props.data.pair}
            amount={amount}
            days={days}
            maxDays={maxDays}
            onTransactionComplete={handleTransactionComplete}
            onError={handleError}
          />
        ) : (
          <Approved
            token={props.data.pair}
            amount={{
              balance: props.data.balance,
            }}
            onError={handleError}
          />
        )}
      </Modal>
    </>
  )
}
export default DepositModal
