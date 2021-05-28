import React from 'react'
import { Card, GU, textStyle, useViewport } from '@1hive/1hive-ui'
import { getNetworkConfig } from '../../networks'
import xCombImage from '../../assets/tulip/xComb.svg'
import { useWallet } from 'use-wallet'

const PlaceHolder = React.memo(() => {
  const {
    _web3ReactContext: { chainId },
  } = useWallet()

  const { width: vw, below } = useViewport()
  const small = below('medium')

  let tokenImage = xCombImage
  let tokenName = 'xComb'
  const networks = getNetworkConfig(chainId)

  if (networks.token) {
    tokenImage = networks.token.image
    tokenName = networks.token.name
  }

  return (
    <>
      <div
        css={`
          padding-top: ${small ? 3 * GU : 8 * GU}px;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <Card width={small ? vw - 3 * GU : 55.2 * GU} height={47.5 * GU}>
          <img
            css={`
              width: ${9.125 * GU}px;
              height: ${10 * GU}px;
            `}
            src={tokenImage}
          />
          <span
            css={`
              ${textStyle('title3')};
              font-family: Overpass;
              font-weight: 700;
              margin-top: ${4 * GU}px;
            `}
          >
            {tokenName} Airdrop
          </span>
          <span
            css={`
              ${textStyle('body2')};
              font-weight: 300;
              margin-left: ${2 * GU}px;
              margin-right: ${2 * GU}px;
              margin-top: ${2 * GU}px;
              text-align: center;
            `}
          >
            In order to check your eligibility for the airdrop, please connect
            your account to xDai or Polygon network
          </span>
        </Card>
      </div>
    </>
  )
})

export default PlaceHolder
