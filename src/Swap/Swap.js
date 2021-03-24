import React from 'react'
import { Button, GU, textStyle } from '@1hive/1hive-ui'
import agve from '../../assets/tulip/agve.svg'

const Swap = React.memo(({ onlyTable }) => {
  const handleClick = () => {
    window.location.assign('https://app.honeyswap.org')
  }

  return (
    <div
      css={`
        padding-top: ${13 * GU}px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <img src={agve} height={160} width={160} alt="" />
      <span
        css={`
          padding-top: ${GU * 3}px;
          ${textStyle('body2')};
        `}
      >
        Agave lending protocol - coming soon
      </span>
      <Button
        css={`
          margin-top: ${GU * 3}px;
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
          width: 178px;
          height: 40px;
        `}
        id="LearnMore"
        label="Learn More"
        onClick={() => {
          handleClick()
        }}
      />
    </div>
  )
})

export default Swap
