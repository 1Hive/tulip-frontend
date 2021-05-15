import React, { useState } from 'react'
import { Modal, GU } from '@1hive/1hive-ui'
import { ethers } from 'ethers'
import SliderComponent from '../SliderComponent'
import { useCheckApprovedToken } from '../../../hooks/useCheckApproved'
import Approved from '../Approve'
import Deposit from '../Deposit'

const DepositModal = props => {
  const [approved, setApproved] = useState('')
  const [amount, setAmount] = useState('')
  const [timeLock, setTimeLock] = useState('')
  const [timeLockMultiplier, setTimelockMultiplier] = useState(1)
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
  useCheckApprovedToken(
    props.data.pair,
    props.data.account,
    props.data.balance
  ).then(x => {
    setApproved(x)
  })
  const handleSliderUpdate = sliderObj => {
    if (sliderObj.type === 'tokenAmount') {
      setAmount(sliderObj.amount)
    } else {
      setTimeLock(sliderObj.amount)
      setTimelockMultiplier(sliderObj.multiplier)
    }
  }

  return (
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
        for up to {Math.floor(props.poolInfo.maxTimeLock / 3600 / 24)} days to
        increase the reward yield multiplier on your deposit.
      </span>
      <div
        css={`
          display: flex;
          flex-direction: column;
          padding-top: 10px;
        `}
      >
        <SliderComponent
          imgObj={imgObj}
          tokenAmount={
            props.data.balance
              ? ethers.utils.formatEther(props.data.balance.toString())
              : 0
          }
          pairTitle={
            props.data
              ? `How many ${props.data.name} tokens do you want to deposit?`
              : 'loading'
          }
          type="tokenAmount"
          onUpdate={handleSliderUpdate}
        />
        <SliderComponent
          timeLock={props.poolInfo.maxTimeLock}
          pairTitle="How long do you want to lock your deposit?"
          type="timeLock"
          onUpdate={handleSliderUpdate}
          timeLockMultiplier={props.poolInfo.timeLockMultiplier}
          timeLockConstant={props.poolInfo.timeLockConstant}
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
        {(timeLockMultiplier * props.data.rewardApy).toFixed(2)} per year. This
        yield is variable and depends on the price of the reward asset,
        underlying asset yields, and the amount of capital participating in the
        Farm. Find out more about how we calculate projected yields here.
      </div>
      {approved ? (
        <Deposit token={props.data.pair} amount={amount} timeLock={timeLock} />
      ) : (
        <Approved
          token={props.data.pair}
          amount={{
            balance: props.data.balance,
          }}
        />
      )}
    </Modal>
  )
}
export default DepositModal
