import React from 'react'
import { Tabs } from '@1hive/1hive-ui'
const TabComponent = props => {
  return (
    <Tabs
      items={['Opportunities', 'My Deposits']}
      selected={props.selected}
      onChange={props.onSelect}
      placeholder="Select One" // Todo: Change this
    />
  )
}
export default TabComponent
