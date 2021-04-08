import React from 'react'
import { DropDown, GU, textStyle, useLayout } from '@1hive/1hive-ui'
// import sushiData from '@sushiswap/sushi-data'
// import FarmTable from '../Farming/FarmTable'
import SearchComponent from '../Farming/Search'

const AssetList = React.memo(() => {
  // const [farmData, setFarmData] = useState([])
  // const [pairs, setPairs] = useState([])
  // const [search, setSearch] = useState('')
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small' || layoutName === 'medium'

  const dropdownItems = {
    networkItems: ['xDai'],
    platformItems: ['Platform1'],
  }
  // useEffect(() => {
  //   sushiData.masterchef.apys().then(data => {
  //     setFarmData(data)
  //     const pairArray = data.map(pair => {
  //       return pair.pair
  //     })
  //     sushiData.exchange.pairs(pairArray).then(res => {
  //       const result = res.filter(r => {
  //         return r.reserveETH > 1 && r.totalSupply > 1
  //       })
  //       setPairs(result)
  //     })
  //   })
  // }, [])
  // const handleSearch = value => {
  //   setSearch(value)
  // }
  return (
    <div
      css={`
        padding-top: ${3 * GU}px;
        font-family: 'Overpass', sans-serif;
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
          <DropDown items={dropdownItems.networkItems} placeholder="Network" />
          <DropDown
            items={dropdownItems.platformItems}
            placeholder="Platform"
            css={`
              margin-top: ${compactMode ? GU : 0}px;
            `}
          />
        </div>
        <SearchComponent placeholder="Search by asset" />
      </div>
      <div
        css={`
          padding-top: ${3 * GU}px;
          ${textStyle('title1')};
        `}
      >
        {/* <FarmTable tableData={farmData} pairData={pairs} searchValue={search} /> */}
      </div>
    </div>
  )
})

export default AssetList
