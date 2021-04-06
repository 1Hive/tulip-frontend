import React from 'react'
import { GU } from '@1hive/1hive-ui'

const PairName = props => {
  console.log(props)
  return (
    <React.Fragment>
      <div
        css={`
          width: 60px;
          display: flex;
          align-items: center;
        `}
      >
        <img
          css={`
            height: ${4 * GU}px;
            transform: translateX(${props.image.pair2 ? '50' : '0'}%);
          `}
          src={props.image.pair1}
        />
        <img
          css={`
            height: ${4 * GU}px;
            transform: translateX(${props.image.pair1 ? 1 * GU : -0.75 * GU}px);
          `}
          src={props.image.pair2}
        />
      </div>
      <div
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        <span
          css={`
            position: relative;
            font-size: 18px;
            line-height: 28px;
          `}
        >
          {props.name}
        </span>
        <span
          css={`
            font-size: 12px;
            line-height: 18px;
          `}
        >
          {props.subheadline}
        </span>
      </div>
    </React.Fragment>
  )
}
export default PairName
