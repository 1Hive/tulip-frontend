import React from 'react'
import { GU } from '@1hive/1hive-ui'

const Pool = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      Pool Page
    </div>
  )
})

export default Pool
