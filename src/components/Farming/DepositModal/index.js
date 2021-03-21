import React from 'react'
import { Modal } from '@1hive/1hive-ui'
import SliderComponent from '../SliderComponent'
const DepositModal = props => {
  return (
    <Modal
      visible={props.modalAction}
      closeButton={false}
      css={`
        font-family: 'Overpass', sans-serif;
        display: flex;
      `}
    >
      <button
        css={`
          background: none;
          border-style: none;
          justify-self: flex-end;
        `}
      >
        X
      </button>
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
        <SliderComponent />
      </div>
    </Modal>
  )
}
export default DepositModal
