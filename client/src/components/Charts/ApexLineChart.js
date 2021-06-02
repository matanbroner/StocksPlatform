import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = (props) => {
  const options = {
    chart: {
      type: "line",
      stacked: false,
      height: 400,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        color: ["#39FF14"],
      },
    },
    theme: {
      palette: "palette3", // upto palette10
    },
    markers: {
      size: 0,
    },
    title: {
      text: props.title,
      align: "left",
    },
    yaxis: {
      title: {
        text: props.yLabel,
      },
    },
    xaxis: {
      type: "datetime"
    },
    tooltip: {
      x: {
        format: "dd/MM HH:mm",
      }
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={props.series}
        height={400}
      />
    </div>
  );
};

export default ApexLineChart;
