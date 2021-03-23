import React, { Component } from 'react'
import './ToolTip.css'

class ToolTip extends Component {
  render() {
    const { hoverLoc, activePoint } = this.props
    const svgLocation = document
      .getElementsByClassName('linechart')[0]
      .getBoundingClientRect()

    const placementStyles = {}
    const width = 100
    placementStyles.width = width + 'px'
    placementStyles.left = hoverLoc + svgLocation.left - width / 2
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
