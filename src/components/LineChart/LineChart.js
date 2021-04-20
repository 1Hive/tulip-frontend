import React, { Component } from 'react'
import './LineChart.css'

class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverLoc: null,
      activePoint: null,
    }
  }

  // GET X & Y || MAX & MIN
  getX() {
    const { data } = this.props
    return {
      min: data[0] ? data[0].x : 0,
      max: data[data.length - 1] ? data[data.length - 1].x : 0,
    }
  }

  getY() {
    const { data } = this.props
    if (data.length > 0) {
      return {
        min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
        max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
      }
    } else {
      return {
        min: 0,
        max: 0,
      }
    }
  }

  // GET SVG COORDINATES
  getSvgX(x) {
    const { width, yLabelSize } = this.props
    return yLabelSize + (x / this.getX().max) * (width - yLabelSize)
  }

  getSvgY(y) {
    const { height, xLabelSize } = this.props
    const gY = this.getY()
    const gYdiff = gY.max - gY.min > 1 ? gY.max - gY.min : 1
    return ((height - xLabelSize) * gY.max - (height - xLabelSize) * y) / gYdiff
  }

  // BUILD SVG PATH
  makePath() {
    const { data, color } = this.props
    if (data === undefined || data.length === 0) {
      return <div />
    }
    let pathD =
      'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + '10 '

    if (data.every((val, i, arr) => val.y === arr[0].y)) {
      // If all the values are equal we check if they are 0 or not because 0 is not recognized by the svg path.
      const value = data[0].y > 0 ? 50 : 100
      pathD += data.map((point, i) => {
        return 'L ' + this.getSvgX(point.x) + ' ' + value + ' '
      })
    } else {
      pathD += data.map((point, i) => {
        return 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' '
      })
    }

    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    )
  }

  // BUILD SHADED AREA
  makeArea() {
    const { data } = this.props
    if (data === undefined || data.length === 0) {
      return <div />
    }

    let pathD =
      'M ' + this.getSvgX(data[0].x) + ' ' + this.getSvgY(data[0].y) + ' '

    pathD += data.map((point, i) => {
      return 'L ' + this.getSvgX(point.x) + ' ' + this.getSvgY(point.y) + ' '
    })

    const x = this.getX()
    const y = this.getY()
    pathD +=
      'L ' +
      this.getSvgX(x.max) +
      ' ' +
      this.getSvgY(y.min) +
      ' ' +
      'L ' +
      this.getSvgX(x.min) +
      ' ' +
      this.getSvgY(y.min) +
      ' '

    return (
      <svg>
        <defs>
          <linearGradient id="MyGradient" gradientTransform="rotate(80)">
            <stop offset="35%" stopColor="#7ce0d680" />
            <stop offset="95%" stopColor="#7ce0d600" />
          </linearGradient>
        </defs>
        <path className="linechart_area" d={pathD} />
      </svg>
    )
  }

  // BUILD GRID AXIS
  makeAxis() {
    const { yLabelSize } = this.props
    const x = this.getX()
    const y = this.getY()

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(x.min) - yLabelSize}
          y1={this.getSvgY(y.min)}
          x2={this.getSvgX(x.max)}
          y2={this.getSvgY(y.min)}
          strokeDasharray="5"
        />
        <line
          x1={this.getSvgX(x.min) - yLabelSize}
          y1={this.getSvgY(y.max)}
          x2={this.getSvgX(x.max)}
          y2={this.getSvgY(y.max)}
          strokeDasharray="5"
        />
      </g>
    )
  }

  makeLabels() {
    const { height, width, xLabelSize, yLabelSize } = this.props
    const padding = 5
    return (
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize / 2}, 20)`}
          textAnchor="middle"
        >
          {this.getY().max.toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD',
          })}
        </text>
        <text
          transform={`translate(${yLabelSize / 2}, ${height -
            xLabelSize -
            padding})`}
          textAnchor="middle"
        >
          {this.getY().min.toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD',
          })}
        </text>
        {/* X AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize}, ${height})`}
          textAnchor="start"
        >
          {this.props.data[0].d}
        </text>
        <text transform={`translate(${width}, ${height})`} textAnchor="end">
          {this.props.data[this.props.data.length - 1].d}
        </text>
      </g>
    )
  }

  // FIND CLOSEST POINT TO MOUSE
  getCoords(e) {
    const { width, data, yLabelSize } = this.props
    const svgLocation = document
      .getElementsByClassName('linechart')[0]
      .getBoundingClientRect()
    const adjustment = (svgLocation.width - width) / 2 // takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment

    let valueY = 0
    if (data.every((val, i, arr) => val.y === arr[0].y)) {
      // If all the values are equal we check if they are 0 or not because 0 is not recognized by the svg path.
      valueY = data[0].y > 0 ? 50 : 100
    }

    const svgData = []
    data.map((point, i) => {
      svgData.push({
        svgX: this.getSvgX(point.x),
        svgY: valueY > 0 ? valueY : this.getSvgY(point.y),
        d: point.d,
        p: point.p,
      })
    })

    let closestPoint = {}

    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc)
        closestPoint = svgData[i]
      }
    }

    if (relativeLoc - yLabelSize < 0) {
      this.stopHover()
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint,
      })
      this.props.onChartHover(relativeLoc, closestPoint)
    }
  }

  // STOP HOVER
  stopHover() {
    this.setState({ hoverLoc: null, activePoint: null })
    this.props.onChartHover(null, null)
  }

  // MAKE ACTIVE POINT
  makeActivePoint() {
    const { color, pointRadius } = this.props
    return (
      <circle
        className="linechart_point"
        style={{ stroke: color }}
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    )
  }

  // MAKE HOVER LINE
  createLine() {
    const { height, xLabelSize } = this.props
    return (
      <line
        className="hoverLine"
        x1={this.state.hoverLoc}
        y1={-8}
        x2={this.state.hoverLoc}
        y2={height - xLabelSize}
      />
    )
  }

  render() {
    const { height, width } = this.props
    return (
      <svg
        width={width}
        height={height}
        viewBox={`10 -10 ${width} ${height}`}
        className="linechart"
        onMouseLeave={() => this.stopHover()}
        onMouseMove={e => this.getCoords(e)}
      >
        <g>
          {this.props.makeAxis && this.makeAxis()}
          {this.makePath()}
          {this.makeArea()}
          {this.props.showLabels && this.makeLabels()}
          {this.props.showHoverLoc && this.state.hoverLoc
            ? this.createLine()
            : null}
          {this.state.hoverLoc ? this.makeActivePoint() : null}
        </g>
      </svg>
    )
  }
}

// DEFAULT PROPS
LineChart.defaultProps = {
  data: [],
  color: '#7CE0D6',
  pointRadius: 6,
  height: 300,
  width: 900,
  xLabelSize: 20,
  yLabelSize: 80,
  showLabels: false,
  showHoverLoc: false,
  showAxis: false,
}

export default LineChart
