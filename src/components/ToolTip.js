import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTheme } from '@1hive/1hive-ui'

const Tooltip = React.memo(({ text }) => {
  const theme = useTheme()

  return (
    <Wrapper theme={theme}>
      <div id="tooltip" className="on top">
        <div className="tooltip-arrow" />
        <div className="tooltip-inner">
          ToolTip Component ToolTip Component ToolTip Component ToolTip
          Component{' '}
        </div>
      </div>
    </Wrapper>
  )
})

Tooltip.propTypes = {
  text: PropTypes.string,
}

Tooltip.defaultProps = {
  text: '',
}

const Wrapper = styled.div`
  position: absolute;
  left: 50px;
  top: 50px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;

  display: inline-block;

  right {
    margin-left: 5px;
  }
  left {
    margin-left: 5px;
  }
  top {
    margin-top: 5px;
  }
  bottom {
    margin-top: 5px;
  }

  .tooltip-arrow {
    top: 50%;
    left: 0;
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: #aaf5d4;
  }

  .right .tooltip-arrow {
    top: 50%;
    left: auto;
    margin-left: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: #aaf5d4;
  }

  .top .tooltip-arrow {
    top: auto;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: #aaf5d4;
  }

  .left .tooltip-arrow {
    top: 50%;
    margin-top: -5px;
    border-width: 5px 0 5px 5px;
    border-left-color: #aaf5d4;
    right: -5px;
    left: auto;
  }

  .bottom .tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: -5px;
    border-width: 0 5px 5px;
    border-bottom-color: #aaf5d4;
  }

  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-right-color: transparent;
    border-style: solid;
  }

  .tooltip-inner {
    max-width: 200px;
    padding: 3px 8px;
    color: #000;
    text-align: center;
    background: linear-gradient(90deg, #aaf5d4, #7ce0d6);
    border-radius: 4px;
  }

  .on {
    display: block;
  }

  .off {
    display: none;
  }
`

export default Tooltip
