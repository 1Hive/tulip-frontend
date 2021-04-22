import React from 'react'
import { Tabs } from '@1hive/1hive-ui'
import Styled from './tabs.style'
const TabComponent = props => {
  return (
    <Styled.Tabs>
      <Tabs
        items={['Opportunities', 'My Deposits']}
        selected={props.selected}
        onChange={props.onSelect}
        placeholder="Select One" // Todo: Change this
      />
    </Styled.Tabs>
  )
}
export default TabComponent
