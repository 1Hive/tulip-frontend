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

          @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
            row-gap: 1rem;
          }
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
          <StatusLabel value="Burned Last week" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;

            @media (max-width: 768px) {
              border: 0;
            }
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Calculating Supply" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Max Supply" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value="1,123,05.22" />
          <StatusLabel value="Holders" />
        </div>
      </div>
    </div>
  )
})

export default BurnStatusComponent
