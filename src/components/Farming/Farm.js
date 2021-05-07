import React, { useState } from 'react'
import { GU, textStyle } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import FarmTable from './FarmTable'
import SearchComponent from './Search'
import { usePoolProvider } from '../../providers/Poolprovider'
import DepositTable from './DepositTable'

const Farm = React.memo(({ onlyTable }) => {
  // const [pairs, setPairs] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)

  const handleSelected = selected => {
    setSelected(selected)
  }

  const { data, balance, deposits } = usePoolProvider()

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
        onSelect={handleSelected}
        selected={selected}
        css={`
          border: none;
        `}
      />
      <div
        css={`
          display: flex;
          width: 100%;
          justify-content: flex-end;
          flex-direction: row;
        `}
      >
        <SearchComponent passSearch={handleSearch} />
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        {selected === 0 ? (
          <FarmTable pairData={data} balance={balance} searchValue={search} />
        ) : (
          <DepositTable depositData={deposits} searchValue={search} />
        )}
      </div>
    </div>
  )
})

export default Farm
