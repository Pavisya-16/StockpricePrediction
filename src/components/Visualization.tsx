import React from "react";
import { VscSearch } from "react-icons/vsc";
import { FaLink } from "react-icons/fa6";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const DonutChart = ({ value }: { value: number }) => {
//   const data = {
//     labels: ["Used", "Remaining"],
//     datasets: [
//       {
//         data: [value, 100 - value],
//         backgroundColor: ["#4ade80", "#d1d5db"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         enabled: false,
//       },
//     },
//     cutout: "70%", // creates the donut effect
//   };

//   return <Doughnut data={data} options={options} />;
// };
// "use client"
// import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "MarketCap", visitors:311511 , fill: "var(--color-chrome)" },
  { browser: "CurrentPrice", visitors: 3509, fill: "var(--color-safari)" },
  { browser: "High_Low", visitors: 3887, fill: "var(--color-firefox)" },
  { browser: "StockP_E", visitors: 96.1, fill: "var(--color-edge)" },
  { browser: "BookValue", visitors: 110, fill: "var(--color-other)" },
  { browser: "DividendYield(%) ", visitors: 0.31, fill: "var(--color-other)" },
  { browser: "ROCE(%) ", visitors: 22.7, fill: "var(--color-other)" },
  { browser: "ROE(%) ", visitors: 32.9, fill: "var(--color-other)" },
  { browser: "FaceValue", visitors: 1, fill: "var(--color-other)" }
]

const chartConfig = {
  MarketCap: {
    label: "MarketCap(₹):",
    color: "hsl(var(--chart-1))", 
  },
  CurrentPrice: {
    label: "CurrentPrice(₹):",
    color: "hsl(var(--chart-2))",
  },
  High_Low: {
    label: "High/Low(₹)",
    color: "hsl(var(--chart-3))",
  },
  StockP_E: {
    label: "StockP/E",
    color: "hsl(var(--chart-4))",
  },
  BookValue: {
    label: "BookValue(₹)",
    color: "hsl(var(--chart-5))",
  },
  DividendYield: {
    label: "DividendYield(%) ",
    color: "hsl(var(--chart-5))",
  },
  ROCE: {
    label: "ROCE(%)",
    color: "hsl(var(--chart-5))",
  },
  ROE: {
    label: "ROE(%)",
    color: "hsl(var(--chart-5))",
  },
  FaceValue: {
    label: "FaceValue",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const Visualization = () => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <>
      {/* Search Input Section */}
      <div className="container mx-auto py-4 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative flex flex-row items-center space-x-2">
          {/* Input Field with Search Icon */}
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-2/3 md:w-1/2 lg:w-2/3 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg pl-10"
          />
          {/* Search Icon */}
          <VscSearch
            size={26}
            className="absolute right-18 text-gray-500"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-1 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        {/* Card Wrapper */}
        <div className="max-w-screen-lg w-full mx-1 border-t-4 border-indigo-700 rounded-lg shadow-lg bg-white text-gray-800 p-6 md:p-8 space-y-6">
          {/* Title */}
          <div className="text-left">
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
              Titan Company Ltd
            </span>

            {/* Website Link */}
            <div className="flex items-center text-gray-700 space-x-3 mt-2 text-sm sm:text-base">
              <span>Website link</span>
              <FaLink  className="text-indigo-700 hover:text-indigo-500 transition duration-300 ease-in-out" size={24} />
              <div className="flex space-x-3">
                <b>BSE</b>: 500114
                <b>NSE</b>: TITAN
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="px-4 py-3 font-medium text-gray-600">Market Cap</td>
                  <td className="px-4 py-3 font-semibold text-black">₹ 3,11,511 Cr.</td>
                  <td className="px-4 py-3 font-medium text-gray-600">Current Price</td>
                  <td className="px-4 py-3 font-semibold text-black">₹ 3,509</td>
                  <td className="px-4 py-3 font-medium text-gray-600">High / Low</td>
                  <td className="px-4 py-3 font-semibold text-black">₹ 3,887 / 3,056</td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-300">
                  <td className="px-4 py-3 font-medium text-gray-600">Stock P/E</td>
                  <td className="px-4 py-3 font-semibold text-black">96.1</td>
                  <td className="px-4 py-3 font-medium text-gray-600">Book Value</td>
                  <td className="px-4 py-3 font-semibold text-black">₹ 110</td>
                  <td className="px-4 py-3 font-medium text-gray-600">Dividend Yield</td>
                  <td className="px-4 py-3 font-semibold text-black">0.31%</td>
                </tr>

                {/* Row 3 */}
                <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-200 transition duration-300">
                  <td className="px-4 py-3 font-medium text-gray-600">ROCE</td>
                  <td className="px-4 py-3 font-semibold text-black">22.7%</td>
                  <td className="px-4 py-3 font-medium text-gray-600">ROE</td>
                  <td className="px-4 py-3 font-semibold text-black">32.9%</td>
                  <td className="px-4 py-3 font-medium text-gray-600">Face Value</td>
                  <td className="px-4 py-3 font-semibold text-black">₹ 1.00</td>
                </tr>
                <tr>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      {/* <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      </Card> */}
    </>
  );
};

export default Visualization;
