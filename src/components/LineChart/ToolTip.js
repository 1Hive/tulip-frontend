import React, { Component } from 'react'
import './ToolTip.css'

class ToolTip extends Component {
  render() {
    const { activePoint } = this.props

    const placementStyles = {}
    const width = 100
    placementStyles.width = width + 'px'
    placementStyles.left = activePoint.svgX + width
    placementStyles.top = activePoint.svgY

    return (
      <div className="hover" style={placementStyles}>
        <div>{activePoint.d}</div>
        <div>{activePoint.p}</div>
      </div>
    )
  }
}

export default ToolTip
