"use client";

import ReactChart from "react-apexcharts";

export default function Chart({
  heigth,
  options,
  series,
  width,
  className = '',
  type
}: MainChartPros) {
  return (
    <div className={className}>
    <ReactChart
      options={options}
      series={series}
      height={heigth}
      type={type}
      width={width}
    />
    </div>
  );
}
