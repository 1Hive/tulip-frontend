import React from 'react'
import { GU, textStyle, useLayout } from '@1hive/1hive-ui'
import AssetsTable from './AssetsTable'
import SearchComponent from '../Farming/Search'

const AssetList = React.memo(({ assets, handleSearch, searchValue }) => {
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small' || layoutName === 'medium'

  // const dropdownItems = {
  //   networkItems: ['xDai'],
  //   platformItems: ['Platform'],
  // }

  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
      `}
    >
      <div
        css={`
          display: flex;
          width: 100%;
          justify-content: space-between;
          flex-direction: row;
          margin-top: ${1.5 * GU}px;
        `}
      >
        <div
          css={`
            width: 35%;
            display: flex;
            flex-direction: ${!compactMode ? 'row' : 'column'};
            justify-content: space-between;
          `}
        >
          <h1
            css={`
              font-weight: 300;
              padding-left: ${GU}px;
              ${textStyle('title3')};
            `}
          >
            Assets
          </h1>
          {/* 
          // THIS WILL BE SHOWN WHEN MULTIPLATFORM IS WORKING
          <DropDown items={dropdownItems.networkItems} placeholder="Network" />
          <DropDown
            items={dropdownItems.platformItems}
            placeholder="Platform"
            css={`
              margin-top: ${compactMode ? GU : 0}px;
            `}
          /> */}
        </div>
        <SearchComponent
          placeholder="Search by asset"
          passSearch={handleSearch}
        />
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        <AssetsTable assets={assets} searchValue={searchValue} />
      </div>
    </div>
  )
})

export default AssetList
