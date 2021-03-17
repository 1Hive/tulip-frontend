import React from 'react'
import { GU } from '@1hive/1hive-ui'
const RewardComponent = props => {
  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <img
        css={`
          max-height: ${4 * GU}px;
          padding-right: ${1 * GU}px;
        `}
        src={props.image}
      />
      <span>{props.name}</span>
    </div>
  )
}
export default RewardComponent
