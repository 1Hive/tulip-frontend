import React, { useState } from 'react'
import { GU, textStyle, useViewport } from '@1hive/1hive-ui'
// import { useHistory } from 'react-router-dom'
import { MENU_PANEL_WIDTH } from '../MenuPanel'
// import HeroBanner from './HeroBanner'
// import HomeChart from '../LineChart/HomeChart'
import AssetCardList from './AssetCardsList'
import AssetList from './AssetList'

const MyWallet = React.memo(({ chartData, onSelectRange, walletData }) => {
  const { width: vw, below } = useViewport()
  const [search, setSearch] = useState('')
  // const history = useHistory()

  const small = below('medium')
  const padding = 20

  const handleSearch = value => {
    setSearch(value)
  }
  /*
  const handleOnLearnMore = () => {
    history.push('/farm')
  } */

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          display: flex;
          flex-direction: ${small ? 'column' : 'row'};
          padding-top: ${3 * GU}px;
          padding: 0 ${padding}px 0 ${padding}px;
          width: ${small ? '100' : vw - MENU_PANEL_WIDTH - padding}px;
        `}
      >
        <div
          css={`
            display: flex;
            flex-direction: ${small ? 'row' : 'column'};
            justify-content: ${small ? 'space-between' : 'center'};
            width: ${small ? vw - padding : vw * 0.35}px;
            padding-right: ${small ? 2 * GU : '0'}px;
          `}
        >
          <span
            css={`
              ${textStyle('title1')};
              font-weight: 400;
            `}
          >
            Net Value
          </span>
          <span
            css={`
              ${textStyle('title1')};
              font-weight: 400;
              color: #30DB9E;'
            `}
          >
            $ {walletData.netBalance}
          </span>
        </div>
        {/* <HomeChart
          height={GU * 15.75}
          width={small ? vw - padding : vw * 0.65 - padding}
          data={chartData}
          onSelectRange={onSelectRange}
        /> */}
      </div>
      <AssetCardList walletData={walletData} />
      <div
        css={`
          display: flex;
          flex-direction: ${small ? 'column' : 'row'};
          margin-bottom: ${2 * GU}px;
          max-height: ${82.5 * GU}px;
        `}
      >
        <div
          css={`
            padding: ${2 * GU}px;
            width: ${small ? '100%' : ''};
            ${!small &&
              `
              flex-grow: 100;
            `}
          `}
        >
          <AssetList
            assets={walletData.assetsList}
            handleSearch={handleSearch}
            searchValue={search}
          />
        </div>
        {/* <HeroBanner onLearnMore={handleOnLearnMore} /> */}
      </div>
    </div>
  )
})

export default MyWallet
