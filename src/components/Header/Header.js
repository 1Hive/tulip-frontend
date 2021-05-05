import React from 'react'
import { ButtonIcon, GU, IconMenu } from '@1hive/1hive-ui'
import AccountModule from '../Account/AccountModule'
import HeaderLogo from './HeaderLogo'

const Header = React.memo(function Header({ compactMode, toggleMenuPanel }) {
  return (
    <header
      css={`
        position: relative;
        z-index: 3;
        height: ${8 * GU}px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          height: 100%;
          padding-left: ${3 * GU}px;
        `}
      >
        {compactMode ? (
          <ButtonIcon label="Open menu" onClick={toggleMenuPanel}>
            <IconMenu />
          </ButtonIcon>
        ) : (
          <HeaderLogo />
        )}
      </div>

      <div
        css={`
          flex-grow: 0;
          display: flex;
          height: 100%;
        `}
      >
        <div
          css={`
            display: flex;
            height: 100%;
            margin-right: ${2 * GU}px;
          `}
        >
          <AccountModule />
        </div>
      </div>
    </header>
  )
})

export default Header
