
import dynamic from "next/dynamic";
const ReactChart = dynamic(() => import('react-apexcharts'),{
  ssr: false
})

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
