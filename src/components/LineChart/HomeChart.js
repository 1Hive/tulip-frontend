import React, { Component } from 'react'
import moment from 'moment'
import data from './ExampleData.json'
import LineChart from './LineChart'
import ToolTip from './ToolTip'
import './HomeChart.css'

class HomeChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverLoc: null,
      activePoint: null,
    }
  }

  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint,
    })
  }

  componentDidMount() {
    const loadExampleData = () => {
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
      console.log(sortedData)
      this.setState({
        data: sortedData,
      })
    }

    loadExampleData()
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="popup">
            {this.state.hoverLoc ? (
              <ToolTip
                hoverLoc={this.state.hoverLoc}
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
            />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeChart
