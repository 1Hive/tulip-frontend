import React from 'react'
import styled from 'styled-components'
import { textStyle } from '@1hive/1hive-ui'

const Wrapper = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 100%;
`

function ComingSoon() {
  return (
    <Wrapper>
      <h1
        css={`
          ${textStyle('title3')};
        `}
      >
        Coming Soon
      </h1>
    </Wrapper>
  )
}

export default ComingSoon
