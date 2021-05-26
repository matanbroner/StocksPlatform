import React, { Component } from "react";
import { format, parseISO, subDays } from "date-fns";
import ReactApexChart from 'react-apexcharts';
import styles from "./styles.module.css";

class ApexChart extends Component {
    constructor(props) {
      super(props);

      this.state = {
        series1: [{
          name: '[Stock or Project Name]',
          data: [31, 40, 28, 51, 42, 109, 100],
        }],
        options: {
          chart: {
            type: 'area',
            stacked: false,
            height: 400,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: false,
            style: {
                color: ['#39FF14']
            }
          },
          theme: {
            palette: 'palette3' // upto palette10
          },
          markers: {
            size: 0,
          },
          title: {
            text: 'Project Activity',
            align: 'left'
          },
          yaxis: {
            title: {
              text: 'Price'
            },
          },
          xaxis: {
            type: 'datetime',
            categories: ["2020/03/06", "2020/03/07", "2020/03/08", "2020/03/09", "2020/03/10", "2020/03/11", "2020/03/12",]
          },
          tooltip: {
            x: {
                format: "yyyy/MM/dd"
            },
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
          }
        },
      
      
      };
    }

  

    render() {
        return (
            <div id="chart">
                <ReactApexChart 
                    options={this.state.options} 
                    series={this.state.series1} 
                    type="area" 
                    height={400} 
                />
            </div>
        );
    }
}

export default ApexChart;