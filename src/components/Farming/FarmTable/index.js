import React from 'react'
import { DataView, IdentityBadge, textStyle } from '@1hive/1hive-ui'
import Loading from '../../Loading'

// import { getContract } from '../../../web3-contracts'

const FarmTable = props => {
  console.log(props)
  if (props.tableData.length === 0) {
    return <Loading />
  } else {
    return (
      <div
        css={`
          ${textStyle('body2')};
        `}
      >
        <DataView
          fields={[
            'Asset',
            'Base Yield',
            'Reward Yield',
            'Total Yield',
            'Reward Asset',
            ' ',
          ]}
          entries={props.tableData}
          renderEntry={({ pair, apy }) => {
            return [
              <IdentityBadge
                customLabel="Custom Label User"
                entity={pair}
                connectedAccount
              />,
              <p>{apy.toFixed(2)}%</p>,
            ]
          }}
        />
      </div>
    )
  }
}
export default FarmTable
