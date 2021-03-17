import React, { useEffect, useState } from 'react'
import { GU, textStyle } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import DropdownComponent from './Dropdown'
import styled from 'styled-components'
import sushiData from '@sushiswap/sushi-data'
import FarmTable from './FarmTable'

const Farm = React.memo(({ onlyTable }) => {
  const [farmData, setFarmData] = useState([])
  const [pairs, setPairs] = useState([])

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
      <TabWrapper>
        <DropdownComponent items={dropdownItems.networkItems} />
        <DropdownComponent items={dropdownItems.platformItems} />
      </TabWrapper>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        <FarmTable tableData={farmData} pairData={pairs} />
      </div>
    </div>
  )
})

export default Farm
