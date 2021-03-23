import React, { useState } from 'react'
import { SearchInput } from '@1hive/1hive-ui'

const SearchComponent = prop => {
  const [value, setValue] = useState('')
  prop.passSearch(value)
  return (
    <React.Fragment>
      <SearchInput value={value} onChange={setValue} />
    </React.Fragment>
  )
}
export default SearchComponent
