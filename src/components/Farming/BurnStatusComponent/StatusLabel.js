import React from 'react'

const StatusLabel = React.memo(({ value }) => {
  return (
    <div
      css={`
        color: #2c3437;
        font-family: 'Overpass', sans-serif;
        font-weight: normal;
        font-size: 14px;
      `}
    >
      {value}
    </div>
  )
})

export default StatusLabel
