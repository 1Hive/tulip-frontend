import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import {
  ButtonBase,
  GU,
  Link,
  springs,
  textStyle,
  useTheme,
  useViewport,
} from '@1hive/1hive-ui'

import { Spring, animated } from 'react-spring/renderprops'
import HeaderLogo from './Header/HeaderLogo'

import airdrop from '../assets/tulip/airdrop.svg'
import airdropActive from '../assets/tulip/airdrop-active.svg'
import discord from '../assets/tulip/discord.svg'
import farmIcon from '../assets/tulip/farm.svg'
import farmIconActive from '../assets/tulip/farm-active.svg'
import lendBorrowIcon from '../assets/tulip/lend.svg'
import lendBorrowIconActive from '../assets/tulip/lend-active.svg'
import myWalletIcon from '../assets/tulip/my-wallet.svg'
import myWalletIconActive from '../assets/tulip/wallet-active.svg'
import poolIcon from '../assets/tulip/pool.svg'
import poolIconActive from '../assets/tulip/pool-active.svg'
import swapIcon from '../assets/tulip/swap.svg'
import swapIconActive from '../assets/tulip/swap-active.svg'
import twitter from '../assets/tulip/twitter.svg'
import telegram from '../assets/tulip/telegram.svg'

import { lerp } from '../lib/math-utils'

export const MENU_PANEL_SHADOW_WIDTH = 3
export const MENU_PANEL_WIDTH = 28 * GU

const { div: AnimDiv } = animated

function MenuPanel({ showHeaderLogo, onOpenPage }) {
  const theme = useTheme()

  return (
    <nav
      css={`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: ${theme.surface};
      `}
    >
      {showHeaderLogo && (
        <div
          css={`
            padding: ${2 * GU}px ${3 * GU}px;
          `}
        >
          <HeaderLogo />
        </div>
      )}
      <div
        css={`
          padding: ${2 * GU}px 0;
        `}
      >
        <MenuItem
          to="/wallet"
          icon={myWalletIcon}
          iconActive={myWalletIconActive}
          label="My Wallet"
          onActivate={onOpenPage}
        />
        <MenuItem
          to="/farm"
          icon={farmIcon}
          iconActive={farmIconActive}
          label="Farm"
          onActivate={onOpenPage}
        />
        <MenuItem
          to="/swap"
          icon={swapIcon}
          iconActive={swapIconActive}
          label="Swap"
          onActivate={onOpenPage}
        />
        <MenuItem
          to="/pool"
          icon={poolIcon}
          iconActive={poolIconActive}
          label="Pool"
          onActivate={onOpenPage}
        />
        <MenuItem
          to="/lend"
          icon={lendBorrowIcon}
          iconActive={lendBorrowIconActive}
          label="Lend / Borrow"
          onActivate={onOpenPage}
        />
        <MenuItem
          to="/airdrop"
          icon={airdrop}
          iconActive={airdropActive}
          label="Airdrop"
          onActivate={onOpenPage}
        />
      </div>

      <MenuFooter />
    </nav>
  )
}

function MenuItem({
  to,
  externalLink = false,
  icon,
  iconActive,
  label,
  onActivate,
}) {
  const history = useHistory()
  const active = useRouteMatch(to) !== null
  const theme = useTheme()

  const handlePageRequest = useCallback(() => {
    onActivate()
    !externalLink ? history.push(to) : window.location.assign(to)
  }, [history, onActivate, to, externalLink])

  return (
    <ButtonBase
      onClick={handlePageRequest}
      css={`
        display: flex;
        align-items: center;
        margin-top: ${GU * 2}px;
        width: 100%;
        height: ${5 * GU}px;
        padding: 0 ${2 * GU}px 0 ${3 * GU}px;
        border-radius: 0;
        text-align: left;
        background: 'transparent';
      `}
    >
      <div
        css={`
          position: absolute;
          left: 0;
          width: 3px;
          height: 100%;
          opacity: ${Number(active)};
          transform: translate3d(${active ? '0%' : '-100%'}, 0, 0);
          transform-position: 0 0;
          transition-property: transform, opacity;
          transition-duration: 150ms;
          transition-timing-function: ease-in-out;
        `}
      />

      <img src={active ? iconActive : icon} alt="" />
      <span
        css={`
          margin-left: ${2 * GU}px;
          overflow: hidden;
          text-overflow: ellipsis;
          ${textStyle('body2')};
          color: ${active ? '#2C3437' : theme.contentSecondary};
          font-weight: ${active ? '700' : '300'};
        `}
      >
        {label}
      </span>
    </ButtonBase>
  )
}

function MenuFooter({ to, icon, iconActive, label, onActivate }) {
  const { below } = useViewport()
  const layoutSmall = below('medium')
  const theme = useTheme()

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: ${GU}px;
        width: 100%;
      `}
    >
      <div
        css={`
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: start;
          margin-left: ${GU * 3}px;
          margin-bottom: ${GU * 2}px;
        `}
      >
        <Link
          css={`
            ${textStyle('body2')};
            color: ${theme.contentSecondary};
            font-weight: 300;
            padding: ${GU}px;
          `}
          href="https://forum.1hive.org/"
          external
        >
          Forum
        </Link>
        <Link
          css={`
            ${textStyle('body2')};
            color: ${theme.contentSecondary};
            font-weight: 300;
            padding: ${GU}px;
          `}
          href="http://wiki.1hive.org/"
          external
        >
          1Hive Wiki
        </Link>
        <Link
          css={`
            ${textStyle('body2')};
            color: ${theme.contentSecondary};
            font-weight: 300;
            padding: ${GU}px;
          `}
          href="https://github.com/1Hive"
          external
        >
          Github
        </Link>
      </div>
      <div
        css={`
          display: -webkit-flex;
          -webkit-justify-content: center;
          display: flex;
          justify-content: center;
        `}
      >
        <Link
          css={`
            -webkit-flex: 1;
            flex: 1;
            margin-left: ${GU}px;
          `}
          href="https://twitter.com/1hiveorg"
          external
        >
          <img src={twitter} height={layoutSmall ? 20 : 30} alt="" />
        </Link>

        <Link
          css={`
            -webkit-flex: 1;
            flex: 1;
          `}
          href="https://discord.com/invite/4fm7pgB"
          external
        >
          <img src={discord} height={layoutSmall ? 20 : 30} alt="" />
        </Link>
        <Link
          css={`
            -webkit-flex: 1;
            flex: 1;
            margin-right: ${GU * 2}px;
          `}
          href="https://t.me/honeyswapdex"
          external
        >
          <img src={telegram} height={layoutSmall ? 20 : 30} alt="" />
        </Link>
      </div>
    </div>
  )
}

function AnimatedMenuPanel({
  autoClosing,
  opened,
  onMenuPanelClose,
  ...props
}) {
  const theme = useTheme()
  const [animate, setAnimate] = useState(autoClosing)

  useEffect(() => {
    // If autoClosing has changed, it means we are switching from autoClosing
    // to fixed or the opposite, and we should stop animating the panel for a
    // short period of time.
    setAnimate(false)
    const animateTimer = setTimeout(() => setAnimate(true), 0)
    return () => clearTimeout(animateTimer)
  }, [autoClosing])

  return (
    <Spring
      from={{ menuPanelProgress: 0 }}
      to={{ menuPanelProgress: Number(opened) }}
      config={springs.lazy}
      immediate={!animate}
      native
    >
      {({ menuPanelProgress }) => (
        <div
          css={`
            height: 100%;
            /* When the panel is autoclosing, we want it over the top bar as well */
            ${autoClosing
              ? `
              position: absolute;
              width: 100%;
              top: 0;
              ${!opened ? 'pointer-events: none' : ''}
            `
              : ''}
          `}
        >
          {autoClosing && (
            <AnimDiv
              onClick={onMenuPanelClose}
              css={`
                position: absolute;
                height: 100%;
                width: 100%;
                background: ${theme.overlay.alpha(0.9)};
                ${!opened ? 'pointer-events: none' : ''}
              `}
              style={{
                opacity: menuPanelProgress,
              }}
            />
          )}
          <AnimDiv
            css={`
              width: ${MENU_PANEL_WIDTH}px;
              height: 100%;
              flex: none;
            `}
            style={{
              position: autoClosing ? 'absolute' : 'relative',
              transform: menuPanelProgress.interpolate(
                v =>
                  `translate3d(
                  ${lerp(
                    v,
                    -(MENU_PANEL_WIDTH + MENU_PANEL_SHADOW_WIDTH),
                    0
                  )}px, 0, 0)`
              ),
            }}
          >
            <MenuPanel showHeaderLogo={autoClosing} {...props} />
          </AnimDiv>
        </div>
      )}
    </Spring>
  )
}

export default AnimatedMenuPanel
