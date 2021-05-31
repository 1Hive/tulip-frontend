import React from 'react'
import { GU } from '@1hive/1hive-ui'

const Image = props => {
  if (!props.image) return ''

  return (
    <div
      css={`
        width: 60px;
        display: flex;
        align-items: center;
      `}
    >
      <img
        height={4 * GU}
        css={`
          transform: translateX(${props.image.pair2 ? '-25' : '0'}%);
        `}
        src={props.image.pair1}
      />
      <img
        height={4 * GU}
        css={`
          transform: translateX(${props.image.pair1 ? '-70' : '0'}%);
        `}
        src={props.image.pair2}
      />
    </div>
  )
}

const PairName = props => {
  return (
    <React.Fragment>
      <Image image={props.image} />
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
