import React from 'react'
import { Button, GU, textStyle } from '@1hive/1hive-ui'
import agve from '../../assets/tulip/agve.svg'

const Lend = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${GU * 13}px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <img src={agve} height={GU * 20} width={GU * 20} alt="" />
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
          /* background colors doesn't exist on current theme */
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
          width: ${GU * 22}px;
          height: ${GU * 5}px;
        `}
        id="LearnMore"
        label="Learn More"
        href="https://agave.finance/"
      />
    </div>
  )
})

export default Lend
