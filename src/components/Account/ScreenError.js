import React, { useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, GU, textStyle, useTheme } from '@1hive/1hive-ui'
import { ChainUnsupportedError } from 'use-wallet'
import { getNetworkName, getSupportedChains } from '../../lib/web3-utils'
import connectionError from '../../assets/tulip/connection-error.png'

function AccountModuleErrorScreen({ error, onBack }) {
  const theme = useTheme()
  const elementRef = useRef()

  let networkNames = ''
  getSupportedChains().forEach((chain, i, array) => {
    networkNames += getNetworkName(chain)
    if (i !== array.length - 1) {
      networkNames += ', '
    }
  })

  const [title, message, networks] = useMemo(() => {
    if (error instanceof ChainUnsupportedError) {
      return [
        'Wrong network',
        'Please select one of these networks in your wallet and try again:',
        networkNames,
      ]
    }
    return [
      'Failed to enable your account',
      'You can try another Ethereum wallet.',
    ]
  }, [error])

  return (
    <section
      ref={elementRef}
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${2 * GU}px;
        height: 100%;
      `}
    >
      <div
        css={`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        `}
      >
        <div
          css={`
            position: relative;
            width: 176px;
            height: 136px;
            background: 50% 50% / 100% 100% no-repeat url(${connectionError});
          `}
        />
        <h1
          css={`
            padding-top: ${2 * GU}px;
            ${textStyle('body1')};
            font-weight: 700;
            color: ${theme.content};
          `}
        >
          {title}
        </h1>
        <p
          css={`
            width: ${36 * GU}px;
            color: ${theme.surfaceContentSecondary};
          `}
        >
          {message}
        </p>
        <p>{networks}</p>
      </div>
      <div
        css={`
          flex-grow: 0;
        `}
      >
        <Button
          onClick={onBack}
          label="OK, let's try again"
          display="label"
          css={`
            margin-top: ${3 * GU}px;
            background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
            color: ${theme.content};
            ${textStyle('body2')};
            font-weight: 300;
          `}
          wide
        />
      </div>
    </section>
  )
}

AccountModuleErrorScreen.propTypes = {
  error: PropTypes.instanceOf(Error),
  onBack: PropTypes.func.isRequired,
}

export default AccountModuleErrorScreen
