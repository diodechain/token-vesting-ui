import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import { displayAmount } from '../utils'

class VestingChart extends Component {
  render() {
    return <Line data={ this.chartData() } options={ this.chartOptions() } />
  }

  chartData() {
    return {
      datasets: [
        this.fromBaseDataset({
          data: this.getPoints()
        }),
      ],
    }
  }

  getPoints() {
    const { start, cliff, end } = this.props.details
    const now = new Date() / 1000 // normalize to seconds

    const points = [ this.getDataPointAt(start) ]

    // Add significant datapoints. Order matters.
    if (cliff < now) {
      points.push(this.getDataPointAt(cliff))
    }

    if (start < now && now < end) {
      let style = {
        pointBorderColor: 'rgba(92,92,241,1)',
        pointBackgroundColor: 'rgba(92,92,241,1)',
        pointHoverBackgroundColor: 'rgba(92,92,241,1)',
        pointStyle: 'rect',
      }
      points.push(this.getDataPointAt(now, style))
    }

    if (cliff > now) {
      points.push(this.getDataPointAt(cliff))
    }

    points.push(this.getDataPointAt(end))

    return points
  }

  getDataPointAt(date, opts) {
    return {
      x: this.formatDate(date),
      y: this.getAmountAt(date),
      ...opts
    }
  }

  formatDate(date) {
    return moment(date * 1000).format('MM/DD/YYYY HH:mm')
  }

  getAmountAt(date) {
    const { total, start, end, decimals } = this.props.details
    const slope = (date - start) / (end - start)

    return displayAmount(total, decimals) * slope
  }

  chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [ {
          type: "time",
          time: {
            format: 'MM/DD/YYYY HH:mm',
            tooltipFormat: 'll HH:mm'
          },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          }
        }, ],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.props.details.symbol || ''
          }
        }]
      },
    }
  }

  fromBaseDataset({data}) {
    let defaults = {
      pointBorderColor: 'rgba(241,92,46,1)',
      pointBackgroundColor: 'rgba(241,92,46,1)',
      pointStyle: 'circle',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(241,92,46,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
    }

    let dataset = {
      data: data,
      lineTension: 0.1,
      backgroundColor: 'rgba(241,92,46,0.4)',
      borderColor: 'rgba(241,92,46,1)',
      borderJoinStyle: 'miter',
    }

    for (let key in defaults) {
      dataset[key] = []
    }
    for (let i in data) {
      for (let key in defaults) {
        if (data[i][key] !== undefined) {
          dataset[key].push(data[i][key])
        } else {
          dataset[key].push(defaults[key])
        }
      }
    }

    return dataset
  }
}

export default VestingChart