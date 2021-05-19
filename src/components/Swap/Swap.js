import React from 'react'
import { Button, GU, textStyle } from '@1hive/1hive-ui'
import bee from '../../assets/tulip/bee.svg'

const Swap = React.memo(({ onlyTable }) => {
  return (
    <div
      css={`
        padding-top: ${GU * 13}px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Overpass;
      `}
    >
      <img src={bee} alt="" />
      <span
        css={`
          padding-top: ${GU * 3}px;
          ${textStyle('body2')};
        `}
      >
        Swap your assets at Honeyswap
      </span>
      <Button
        css={`
          margin-top: ${GU * 3}px;
          /* background colors doesn't exist on current theme */
          background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
          width: ${GU * 22}px;
          height: ${GU * 5}px;
        `}
        id="OpenHS"
        label="Open Honeyswap"
        href="https://app.honeyswap.org/#/swap"
      />
    </div>
  )
})

export default Swap
