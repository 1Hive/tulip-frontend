import React, { useEffect, useState } from 'react'
import { GU, textStyle } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import DropdownComponent from './Dropdown'
import styled from 'styled-components'
import sushiData from '@sushiswap/sushi-data'
import FarmTable from './FarmTable'
import SearchComponent from './Search'

const Farm = React.memo(({ onlyTable }) => {
  const [farmData, setFarmData] = useState([])
  const [pairs, setPairs] = useState([])
  const [search, setSearch] = useState('')

  const dropdownItems = {
    networkItems: ['Network1', 'Network2', 'Network3'],
    platformItems: ['Platform1', 'Platform2', 'Platform3'],
  }
  const TabWrapper = styled.section`
    > * {
      margin-right: ${1 * GU}px;
    }
  `
  useEffect(() => {
    sushiData.masterchef.apys().then(data => {
      setFarmData(data)
      const pairArray = data.map(pair => {
        return pair.pair
      })
      sushiData.exchange.pairs(pairArray).then(res => {
        const result = res.filter(r => {
          return r.reserveETH > 1 && r.totalSupply > 1
        })
        setPairs(result)
      })
    })
  }, [])
  const handleSearch = value => {
    setSearch(value)
  }
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
      `}
    >
      <TabComponent
        css={`
          border: none;
        `}
      />
      <div
        css={`
          display: flex;
          width: 100%;
          justify-content: space-between;
          flex-direction: row;
        `}
      >
        <TabWrapper>
          <DropdownComponent items={dropdownItems.networkItems} />
          <DropdownComponent items={dropdownItems.platformItems} />
        </TabWrapper>
        <SearchComponent passSearch={handleSearch} />
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        <FarmTable tableData={farmData} pairData={pairs} searchValue={search} />
      </div>
    </div>
  )
})

export default Farm
