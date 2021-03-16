import React from 'react'
import { GU } from '@1hive/1hive-ui'

const Swap = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      Swap Page
    </div>
  )
})

export default Swap
