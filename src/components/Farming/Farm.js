import React, { useEffect, useState } from 'react'
import { GU } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import DropdownComponent from './Dropdown'
import styled from 'styled-components'
import sushiData from '@sushiswap/sushi-data'
import FarmTable from './FarmTable'

const Farm = React.memo(({ onlyTable }) => {
  const [farmData, setFarmData] = useState([])
  const dropdownItems = {
    networkItems: ['Network1', 'Network2', 'Network3'],
    platformItems: ['platform1', 'platform2', 'platform3'],
  }
  const TabWrapper = styled.section`
    max-width: 25%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1440px) {
      max-width: 40%;
    }
    @media (max-width: 768px) {
      max-width: 50%;
    }
  `
  useEffect(() => {
    sushiData.masterchef.apys().then(data => {
      setFarmData(data)
    })
  }, [])
  console.log(farmData)
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
      `}
    >
      <TabComponent />
      <TabWrapper>
        <DropdownComponent items={dropdownItems.networkItems} />
        <DropdownComponent items={dropdownItems.platformItems} />
      </TabWrapper>
      <div
        css={`
          padding-top: ${3 * GU}px;
        `}
      >
        <FarmTable tableData={farmData} />
      </div>
    </div>
  )
})

export default Farm
