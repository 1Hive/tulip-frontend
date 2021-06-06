import React, { useState } from 'react'
import { GU, textStyle, useViewport } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import FarmTable from './FarmTable'
import SearchComponent from './Search'
import { usePoolProvider } from '../../providers/Poolprovider'
import DepositTable from './DepositTable'
import { useWallet } from '../../providers/Wallet'

const Farm = React.memo(({ onlyTable }) => {
  // const [pairs, setPairs] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)
  const { below, width: vw } = useViewport()

  const handleSelected = selected => {
    setSelected(selected)
  }
  const small = below('medium')

  const { data, balance, deposits, poolInfo } = usePoolProvider()
  const { account } = useWallet()
  const handleSearch = value => {
    setSearch(value)
  }

  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
        margin-bottom: ${5 * GU}px;
        width: ${small ? `${vw}px` : 'auto'};
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
        {!!account && (
          <SearchComponent
            placeholder="Search by asset"
            passSearch={handleSearch}
            wide={small}
          />
        )}
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        {selected === 0 ? (
          <FarmTable
            pairData={data}
            balance={balance}
            searchValue={search}
            poolInfo={poolInfo}
          />
        ) : (
          <DepositTable depositData={deposits} searchValue={search} />
        )}
      </div>
    </div>
  )
})

export default Farm
