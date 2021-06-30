import React from 'react'

const StatusValue = React.memo(({ value }) => {
  return (
    <div
      css={`
        color: #2c3437;
        font-family: 'Overpass', sans-serif;
        font-weight: bold;
        font-size: 18px;
      `}
    >
      {value}
    </div>
  )
})

export default StatusValue
