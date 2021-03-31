import React from 'react'
import { GU, textStyle, useTheme, useViewport } from '@1hive/1hive-ui'

function WalletCard({ icon, title, value, isBorrow }) {
  const theme = useTheme()
  const { below } = useViewport()
  const small = below('medium')

  return (
    <div
      css={`
        border: ${0.25 * GU}px solid #b0ece6;
        box-sizing: border-box;
        border-radius: ${2 * GU}px;
        width: ${small ? '100%' : '30%'};
        height: ${9 * GU}px;
        display: flex;
        align-items: center;
        padding: ${2.8 * GU}px;
        margin: ${GU}px;
        min-width: fit-content;
      `}
    >
      <div
        css={`
          height: ${5 * GU}px;
          width: ${5 * GU}px;
          background: linear-gradient(268.53deg, #aaf5d4, #7ce0d6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <img src={icon} />
      </div>
      <div
        css={`
          display: flex;
          flex-grow: 2;
          justify-content: space-between;
          min-width: ${20 * GU}px;
        `}
      >
        <span
          css={`
            align-self: center;
            margin-left: ${2 * GU}px;
            ${textStyle('body2')};
            font-weight: 300;
            color: ${theme.contentSecondary};
          `}
        >
          {title}
        </span>
        <span
          css={`
            align-self: center;
            ${textStyle('body2')};
            font-weight: 700;
            color: ${isBorrow ? 'red' : theme.content};
          `}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

export default WalletCard
