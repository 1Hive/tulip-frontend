import React from 'react'
import { GU } from '@1hive/1hive-ui'
import xComb from '../../../assets/coins/xcomb.svg'
import RewardComponent from '../RewardComponent'
import StatusValue from './StatusValue'
import StatusLabel from './StatusLabel'

const BurnStatusComponent = React.memo(() => {
  return (
    <div
      css={`
        border-radius: 12px;
        padding: ${3 * GU}px;
        margin-bottom: ${5 * GU}px;
        width: 100%;
        background: linear-gradient(90.78deg, #fff1a0 -22.94%, #ffdecf 93.86%);
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(6, 1fr);
        `}
      >
        <div
          css={`
            align-self: center;
            margin: auto;
          `}
        >
          <RewardComponent image={xComb} name="xComb" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Total burned" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Total burned" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Total burned" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Total burned" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Total burned" />
        </div>
      </div>
    </div>
  )
})

export default BurnStatusComponent
