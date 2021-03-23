import React from 'react'
import { Modal, GU, Button } from '@1hive/1hive-ui'
import SliderComponent from '../SliderComponent'

const DepositModal = props => {
  console.log(props)

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
        for up to 1 year to increase the reward yield multiplier on your
        deposit.
      </span>
      <div>
        <SliderComponent imgObj={props.tokenImg} pairTitle={props.pairName} />
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
        Currently your deposit is projected to have a yield of 120% per year.
        This yield is variable and depends on the price of the reward asset,
        underlying asset yields, and the amount of capital participating in the
        Farm. Find out more about how we calculate projected yields here.
      </div>
      <Button
        css={`
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
        `}
        label="Confirm Deposit"
        wide
      />
    </Modal>
  )
}
export default DepositModal
