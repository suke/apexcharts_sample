import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ApexCharts from 'apexcharts'
import moment from 'moment'
import './styles.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        chart: {
          type: 'line'
        },
        series: [
          {
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
          }
        ],
        xaxis: {
          categories: [
            1533049200,
            1533135600,
            1533222000,
            1533308400,
            1533394800,
            1533481200,
            1533567600,
            1533654000,
            1533740400
          ],
          labels: {
            formatter: value => {
              return moment.unix(value).format('YYYY-MM-DD')
            }
          }
        }
      },
      nextData: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.chart = new ApexCharts(
      document.querySelector('#chart'),
      this.state.options
    )
    this.chart.render()
  }

  componentDidUpdate() {
    const { nextData } = this.state
    this.chart.updateSeries([
      {
        name: 'sales',
        data: nextData
      }
    ])
  }

  componentWillUnmount() {
    this.chart.destroy()
  }

  handleClick() {
    // 長さ9の配列を作成する
    // 各valueは最大130でランダムに作成する
    const newData = [...Array(9).keys()].map(() => {
      return Math.floor(Math.random() * 130)
    })
    this.setState({ nextData: newData })
  }

  render() {
    return (
      <div className="App">
        <h1>apexcharts.js Sample</h1>
        <div id="chart" />
        <button className="button" onClick={this.handleClick}>
          change state!!
        </button>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
