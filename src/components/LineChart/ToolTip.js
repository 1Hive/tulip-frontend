import React, { Component } from 'react'
import './ToolTip.css'

class ToolTip extends Component {
  render() {
    const { activePoint, width } = this.props

    const placementStyles = {}
    const placementWidth = 100
    placementStyles.width = placementWidth + 'px'
    placementStyles.left = activePoint.svgX - width / 2
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
