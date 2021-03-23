import React from 'react'
import { GU } from '@1hive/1hive-ui'

const MyWallet = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      MyWallet Page
    </div>
  )
})

export default MyWallet
