import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexCandelstickChart = (props) => {
  const options = {
    chart: {
      type: "candlestick",
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
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "dd/MM HH:mm",
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart type="candlestick" options={options} series={props.data} height={400} />
    </div>
  );
};

export default ApexCandelstickChart;
