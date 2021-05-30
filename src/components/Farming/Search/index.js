import React, { useState } from 'react'
import { SearchInput } from '@1hive/1hive-ui'

const SearchComponent = prop => {
  const [value, setValue] = useState('')
  prop.passSearch(value)
  return (
    <React.Fragment>
      <SearchInput
        wide={prop.wide}
        value={value}
        onChange={setValue}
        placeholder={prop.placeholder}
      />
    </React.Fragment>
  )
}
export default SearchComponent
