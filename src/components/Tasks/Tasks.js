import React from 'react'
import { GU } from '@1hive/1hive-ui'

const Tasks = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      Farming Page
    </div>
  )
})

export default Tasks
