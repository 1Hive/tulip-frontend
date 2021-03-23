import React from 'react'
import { GU } from '@1hive/1hive-ui'

const Lend = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      Lend/Borrow Page
    </div>
  )
})

export default Lend
