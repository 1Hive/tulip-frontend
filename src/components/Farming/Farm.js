import React, { useEffect, useState } from 'react'
import { GU, textStyle } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import DropdownComponent from './Dropdown'
import styled from 'styled-components'
import sushiData from '@sushiswap/sushi-data'
import FarmTable from './FarmTable'
import SearchComponent from './Search'
import { usePoolProvider } from '../../providers/Poolprovider'
import DepositTable from './DepositTable'

const Farm = React.memo(({ onlyTable }) => {
  // const [pairs, setPairs] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)

  const dropdownItems = {
    networkItems: ['Network1', 'Network2', 'Network3'],
    platformItems: ['Platform1', 'Platform2', 'Platform3'],
  }

  const handleSelected = selected => {
    setSelected(selected)
  }
  const TabWrapper = styled.section`
    > * {
      margin-right: ${1 * GU}px;
    }
  `
  const { data, balance, deposits } = usePoolProvider()
  const handleSearch = value => {
    setSearch(value)
  }
  console.log(selected)
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
      `}
    >
      <TabComponent
        onSelect={handleSelected}
        selected={selected}
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
        {selected === 0 ? (
          <FarmTable pairData={data} balance={balance} searchValue={search} />
        ) : (
          <DepositTable depositData={deposits} />
        )}
      </div>
    </div>
  )
})

export default Farm
