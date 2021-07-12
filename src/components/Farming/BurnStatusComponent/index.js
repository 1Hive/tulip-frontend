import React, { useEffect, useState } from 'react'
import { GU } from '@1hive/1hive-ui'
import tulipData from 'tulip-backend'
import xComb from '../../../assets/coins/xcomb.svg'
import RewardComponent from '../RewardComponent'
import StatusValue from './StatusValue'
import StatusLabel from './StatusLabel'
import { truncateDecimals } from '../../../lib/math-utils'

const BurnStatusComponent = React.memo(() => {
  const [info, setInfo] = useState({})
  const [burnedLastWeek, setBurnedLastWeek] = useState(0)

  useEffect(() => {
    const fetchHsfTokens = async () => {
      const hsfToken = await tulipData.farm.hsfTokens()
      const burnedLW = await tulipData.farm.hsfTokenBurns()
      setInfo(hsfToken)
      setBurnedLastWeek(burnedLW)
    }

    fetchHsfTokens()
  }, [])

  const getCirculatingSupply = () => {
    const claimed = Number(info.totalHsfClaimed) || 0
    const harvested = Number(info.totalHarvested) || 0
    const burned = Number(info.totalBurned) || 0
    return claimed + harvested - burned
  }

  return (
    <div
      css={`
        border-radius: 12px;
        padding: ${3 * GU}px;
        margin-bottom: ${5 * GU}px;
        width: 100%;
        background: linear-gradient(90.78deg, #fff1a0 -22.94%, #ffdecf 93.86%);
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(6, 1fr);

          @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
            row-gap: 1rem;
          }
        `}
      >
        <div
          css={`
            align-self: center;
            margin: auto;
          `}
        >
          <RewardComponent image={xComb} name="xComb" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue
            value={truncateDecimals(Number(info.totalHsfBurned || 0) / 1e18)}
          />
          <StatusLabel value="Total burned" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue
            value={truncateDecimals(Number(burnedLastWeek) / 1e18)}
          />
          <StatusLabel value="Burned Last week" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;

            @media (max-width: 768px) {
              border: 0;
            }
          `}
        >
          <StatusValue
            value={truncateDecimals(getCirculatingSupply() / 1e18)}
          />
          <StatusLabel value="Circulating Supply" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value={Number(info.totalSupply || 0) / 1e18} />
          <StatusLabel value="Max Supply" />
        </div>
        <div
          css={`
            border-left: 1px solid #ff9372;
            text-align: center;
          `}
        >
          <StatusValue value={Number(info.holders || 0)} />
          <StatusLabel value="Holders" />
        </div>
      </div>
    </div>
  )
})

export default BurnStatusComponent
