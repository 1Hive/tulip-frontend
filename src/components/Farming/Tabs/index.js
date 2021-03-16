import React, { useState } from 'react'
import { Tabs } from '@1hive/1hive-ui'
const TabComponent = () => {
  const [selected, setSelected] = useState(0)
  return (
    <Tabs
      items={['Opportunities', 'My Deposits']}
      selected={selected}
      onChange={setSelected}
    />
  )
}
export default TabComponent
