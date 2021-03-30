import React from 'react'
import { Button, GU, textStyle, useLayout, useTheme } from '@1hive/1hive-ui'
import desktopBanner from '../../assets/tulip/banner.png'
import mobileBanner from '../../assets/tulip/banner-mobile.png'

const BANNERS = {
  small: { image: mobileBanner, aspectRatio: '54%' },
  medium: { image: desktopBanner, aspectRatio: '36%' },
  large: { image: desktopBanner, aspectRatio: '159%' },
  max: { image: desktopBanner, aspectRatio: '159%' },
}

function HeroBanner({ onLearnMore }) {
  const { layoutName } = useLayout()
  const theme = useTheme()

  const banner = BANNERS[layoutName]
  const compactMode = layoutName === 'small' || layoutName === 'medium'

  return (
    <div
      css={`
        height: fit-content;

        ${!compactMode &&
          `
          top: ${3 * GU}px;
          position: sticky;
          margin-top: ${3 * GU}px;
        `}

        ${compactMode &&
          `
          width: 100%;
        `}
      `}
    >
      <div
        css={`
          background: url(${banner.image}) no-repeat;
          background-size: cover;
          width: ${compactMode ? '100%' : '327px'};
          height: 0;
          padding-top: ${banner.aspectRatio};
          position: relative;
        `}
      >
        <div
          css={`
            padding: ${8 * GU}px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: ${compactMode ? 'center' : 'flex-start'};
          `}
        >
          <div
            css={`
              text-align: center;
              width: 100%;
            `}
          >
            <h2
              css={`
                ${compactMode ? textStyle('title4') : textStyle('title3')};
                color: ${theme.contentSecondary};
                margin-top: ${2 * GU}px;
                max-width: 300px;
                font-weight: 300;
              `}
            >
              Boost your returns by participating in promotional yield farming
              opportunities
            </h2>
            <Button
              onClick={onLearnMore}
              label="Learn More"
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
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
