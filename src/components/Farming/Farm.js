import React, { useState, useEffect } from 'react'
import { GU, textStyle, useViewport } from '@1hive/1hive-ui'
import TabComponent from './Tabs'
import FarmTable from './FarmTable'
import SearchComponent from './Search'
import DepositTable from './DepositTable'
import { useFetchPools } from '../../hooks/useFetchPools'
import { useFetchDeposits } from '../../hooks/useFetchDeposits'

const Farm = React.memo(({ onlyTable }) => {
  // const [pairs, setPairs] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(0)
  const [pools, setPools] = useState(null)
  const [tokenList, setTokenList] = useState(null)
  const { below } = useViewport()

  const p = useFetchPools()
  const deposits = useFetchDeposits()
  useEffect(() => {
    if (p) {
      p.then(data => {
        setPools(data)
        const tList = data.map(d => {
          return d.pair
        })
        setTokenList(tList)
      }).catch(err => console.log(err))
    }
  }, [p])
  const handleSelected = selected => {
    setSelected(selected)
  }
  const small = below('medium')

  const handleSearch = value => {
    setSearch(value)
  }
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
        margin-bottom: ${5 * GU}px;
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
        <SearchComponent
          placeholder="Search by asset"
          passSearch={handleSearch}
          wide={small}
        />
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        {selected === 0 ? (
          <FarmTable
            pairData={pools}
            searchValue={search}
            tokenList={tokenList}
          />
        ) : (
          <DepositTable depositData={deposits} searchValue={search} />
        )}
      </div>
    </div>
  )
})

export default Farm
