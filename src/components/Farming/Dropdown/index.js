import React, { useState } from 'react'
import { DropDown } from '@1hive/1hive-ui'
const DropdownComponent = props => {
  const [selected, setSelected] = useState(0)
  console.log(props)
  return (
    <DropDown items={props.items} selected={selected} onChange={setSelected} />
  )
}
export default DropdownComponent
