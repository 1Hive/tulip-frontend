import React from 'react'
import { GU } from '@1hive/1hive-ui'
import HomeChart from '../LineChart/HomeChart'

const MyWallet = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      MyWallet Page
      <div>
        <HomeChart />
      </div>
    </div>
  )
})

export default MyWallet
