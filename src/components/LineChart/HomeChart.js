import React, { Component } from 'react'
import { Link } from '@1hive/1hive-ui'
import moment from 'moment'
import data from './ExampleData.json'
import LineChart from './LineChart'
import ToolTip from './ToolTip'
import './HomeChart.css'
import { DEFAULT_CHART_DATA } from '../../constants/constants'

class HomeChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverLoc: null,
      activePoint: null,
      selectedRange: 'W',
    }
  }

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    })
  }

  componentWillReceiveProps(props) {
    if (props.data) {
      console.log(props)
      if (props.data !== null && props.data.length > 1) {
        this.setState({ data: props.data })
      }
    }
  }

  componentDidMount() {
    const loadExampleData = () => {
      if (this.props.data !== null && this.props.data.length > 1) {
        this.setState({ data: this.props.data })
        return
      }

      const sortedData = []
      let count = 0
      for (const date in data.bpi) {
        sortedData.push({
          d: moment(date).format('MMM DD'),
          p: data.bpi[date].toLocaleString('us-EN', {
            style: 'currency',
            currency: 'USD',
          }),
          x: count,
          y: data.bpi[date],
        })
        count++
      }

      this.setState({
        data: DEFAULT_CHART_DATA,
      })
    }

    loadExampleData()
  }

  handleSelectDateRange(range) {
    this.setState(
      {
        selectedRange: range,
      },
      this.props.onSelectRange(range)
    )
  }

  render() {
    return (
      <div
        css={`
          width: ${this.props.width}px;
        `}
      >
        <div className="controls">
          <div
            css={`
              display: flex;
              justify-content: space-between;
              width: ${12.5 * 8}px;
            `}
          >
            <Link
              external={false}
              css={`
                ${this.state.selectedRange === 'W'
                  ? 'color: #2C3437;'
                  : 'color: #818181; font-weight: 300;'}
              `}
            >
              <span
                onClick={() => {
                  this.handleSelectDateRange('W')
                }}
              >
                1W
              </span>
            </Link>
            <Link
              external={false}
              css={`
                ${this.state.selectedRange === 'M'
                  ? 'color: #2C3437;'
                  : 'color: #818181; font-weight: 300;'}
              `}
            >
              <span
                onClick={() => {
                  this.handleSelectDateRange('M')
                }}
              >
                1M
              </span>
            </Link>
            <Link
              external={false}
              css={`
                ${this.state.selectedRange === 'Y'
                  ? 'color: #2C3437;'
                  : 'color: #818181; font-weight: 300;'}
              `}
            >
              <span
                onClick={() => {
                  this.handleSelectDateRange('Y')
                }}
              >
                1Y
              </span>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="popup">
            {this.state.hoverLoc ? (
              <ToolTip
                width={this.props.width}
                activePoint={this.state.activePoint}
              />
            ) : null}
          </div>
        </div>
        <div className="row">
          <div className="chart">
            <LineChart
              data={this.state.data}
              onChartHover={(a, b) => this.handleChartHover(a, b)}
              height={this.props.height}
              width={this.props.width}
              yLabelSize={5}
            />
          </div>
        </div>
      </div>
    )
  }
}

HomeChart.defaultProps = {
  data: [],
  color: '#7CE0D6',
  height: 300,
  width: 900,
}

export default HomeChart
