import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  DollarSign,
  BarChart2,
  Activity,
  Globe,
  Factory,
  ChartBar,
  Users,
} from "lucide-react";
import MetricTable from "./Chart/MetricTable";
import MetricCard from "./Chart/MetricCard";
import PriceRangeIndicator from "./Chart/PriceRangeIndicator";
import DonutChart from "./Chart/DonutChart";
import TruncatedText from "./Chart/TruncatedText";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import StockNews from "./StockNews ";

const formatNumber = (num) => {
  if (!num && num !== 0) return "N/A";

  try {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  } catch (error) {
    return "N/A";
  }
};

const formatPercent = (num) => {
  if (!num && num !== 0) return "N/A";
  try {
    return (num * 100).toFixed(2) + "%";
  } catch (error) {
    return "N/A";
  }
};

const SafeNumber = ({
  value,
  format = "number",
  prefix = "",
  fallback = "N/A",
}) => {
  if (!value && value !== 0) return fallback;

  try {
    if (format === "percent") return `${prefix}${formatPercent(value)}`;
    if (format === "price") return `${prefix}${Number(value).toFixed(2)}`;
    return `${prefix}${formatNumber(value)}`;
  } catch (error) {
    return fallback;
  }
};

const MetricTooltip = ({ label, description, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-xs p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {label}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MetricCardWithTooltip = ({ label, value, icon: Icon, description }) => (
  <MetricTooltip label={label} description={description}>
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg cursor-help transition-all duration-300 hover:shadow-md">
      <div className="flex-shrink-0 mr-4 bg-gray-400 rounded-full p-2">
        {/* Wrapper for Icon to apply padding */}
        <Icon className="h-8 w-8 dark:text-gray-500 hover:text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  </MetricTooltip>
);

const StockDashboard = ({ data }) => {
  // console.log("quickMetrics",quickMetrics);
  
  if (!data) return null;

  const trading = data.trading_information || {};
  const metrics = data.key_metrics || {};
  const financial = data.financial_metrics || {};
  const basic = data.basic_information || {};
  const intrinsic_value = data.intrinsic_value || {}

  const priceChange =
    trading.current_price && trading.previous_close
      ? trading.current_price - trading.previous_close
      : null;

  const priceChangePercent =
    priceChange && trading.previous_close
      ? (priceChange / trading.previous_close) * 100
      : null;

  const isPriceUp = priceChange >= 0;

  const quickMetrics = [
    {
      label: "Market Cap",
      value: <SafeNumber value={trading.market_cap} prefix="₹" />,
      icon: BarChart2,
      description:
        "Total market value of a company's outstanding shares. Higher market cap typically indicates a more established company.",
    },
    {
      label: "P/E Ratio",
      value: <SafeNumber value={metrics.pe_ratio} />,
      icon: DollarSign,
      description:
        "Price-to-Earnings ratio shows how much investors are willing to pay per rupee of earnings. Lower P/E might indicate better value.",
    },
    {
      label: "Forward P/E",
      value: <SafeNumber value={metrics.forward_pe} />,
      icon: TrendingUp,
      description:
        "Forward Price-to-Earnings ratio based on predicted earnings. Helps evaluate future company valuation expectations.",
    },
    {
      label: "PEG Ratio",
      value: <SafeNumber value={metrics.peg_ratio} />,
      icon: Activity,
      description:
        "Price/Earnings to Growth ratio. A PEG ratio < 1 might indicate an undervalued stock relative to its growth prospects.",
    },
  ];

  const valuationMetrics = [
    {
      label: "Price to Book",
      value: <SafeNumber value={metrics.price_to_book} />,
      description:
        "Compares company's market value to its book value. A lower ratio might indicate an undervalued stock.",
    },
    {
      label: "Book Value",
      value: <SafeNumber value={metrics.book_value} prefix="₹" />,
      description:
        "Net worth of a company calculated by subtracting total liabilities from total assets.",
    },
    {
      label: "Trailing EPS",
      value: <SafeNumber value={metrics.trailing_eps} prefix="₹" />,
      description:
        "Earnings Per Share based on the past 12 months of actual reported earnings.",
    },
    {
      label: "Forward EPS",
      value: <SafeNumber value={metrics.forward_eps} prefix="₹" />,
      description:
        "Projected Earnings Per Share based on analysts' estimates for future earnings.",
    },
  ];

  const financialHealthMetrics = [
    {
      label: "Total Cash",
      value: <SafeNumber value={financial.total_cash} prefix="₹" />,
      description:
        "Total cash and cash equivalents available to the company. Indicates liquidity strength.",
    },
    {
      label: "Total Debt",
      value: <SafeNumber value={financial.total_debt} prefix="₹" />,
      description:
        "Total of all short-term and long-term debt obligations. Higher debt may indicate higher financial risk.",
    },
    {
      label: "Current Ratio",
      value: <SafeNumber value={financial.current_ratio} />,
      description:
        "Measures ability to pay short-term obligations. A ratio > 1 indicates good short-term liquidity.",
    },
    {
      label: "Quick Ratio",
      value: <SafeNumber value={financial.quick_ratio} />,
      description:
        "A more conservative measure of liquidity that excludes inventory from current assets.",
    },
  ];

  const dividendMetrics = [
    {
      label: "Dividend Rate",
      value: <SafeNumber value={metrics.dividend_rate} prefix="₹" />,
      description:
        "Annual dividend payment per share. Higher rates may indicate better income potential.",
    },
    {
      label: "Dividend Yield",
      value: <SafeNumber value={metrics.dividend_yield} format="percent" />,
      description:
        "Annual dividend payment as a percentage of stock price. Higher yields might offer better income returns.",
    },
    {
      label: "Revenue Per Share",
      value: <SafeNumber value={financial.revenue_per_share} prefix="₹" />,
      description:
        "Total revenue divided by the number of shares outstanding. Indicates revenue generation efficiency.",
    },
  ];

  const renderMetricsTable = (metrics) => (
    <div className="space-y-2">
      {metrics.map((metric, index) => (
        <MetricTooltip
          key={index}
          label={metric.label}
          description={metric.description}
        >
          <div className="flex justify-between items-center cursor-help p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {metric.label}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {metric.value}
            </span>
          </div>
        </MetricTooltip>
      ))}
    </div>
  );

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      {/* Header Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-t-4 border-indigo-600 dark:border-blue-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Company Info */}
          <div className="flex flex-col items-center">
            {/* Logo Section */}
            <div className="mb-6 flex flex-col items-center">
              {basic.company_logo && (
                <div className="relative w-32 h-32 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 mb-4">
                  <img
                    src={basic.company_logo}
                    alt={`${basic.company_name} logo`}
                    className="w-full h-full object-contain p-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/128/128";
                    }}
                  />
                </div>
              )}

              {/* Company Name as Link */}
              <a
                href={basic.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300"
              >
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {basic.company_name || "Company Name Not Available"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {basic.symbol}
                </p>
              </a>
            </div>

            {/* Sector and Industry Info */}
            <div className="w-full space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Factory
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sector
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {basic.sector || "Not Available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <BarChart2
                      size={20}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Industry
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {basic.industry || "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Business Summary */}
          <div className="flex flex-col">
            {/* Price Information */}
            <div className="my-6 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <div
                  className={`flex items-center gap-2 ${
                    isPriceUp
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPriceUp ? (
                    <FaAngleDoubleUp size={24} />
                  ) : (
                    <FaAngleDoubleDown size={24} />
                  )}
                  <div>
                    <p className="text-2xl font-semibold">
                      ₹{trading.current_price?.toFixed(2) || "N/A"}
                    </p>
                    {priceChange !== null && priceChangePercent !== null && (
                      <p className="text-sm">
                        {isPriceUp ? "+" : ""}
                        {priceChange.toFixed(2)} (
                        {priceChangePercent.toFixed(2)}%)
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-end">
                    <p>Day Range</p>
                    <p>
                      ₹{trading.day_low?.toFixed(2) || "N/A"} - ₹
                      {trading.day_high?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Users
                      size={20}
                      className="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    About {basic.company_name || "Company"}
                  </h3>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <TruncatedText
                      text={basic.business_summary}
                      maxLength={500}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="mt-5 mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-t-4 border-blue-400">
        <StockNews symbol={basic.symbol?.split('.')[0]} />
      </div>
      </div>
      

      {/* Profitability Metrics */}
      <div className="mb-6">
        <h3 className="text-2xl font-sans text-gray-900 dark:text-white border-gray-600 dark:border-gray-300 pt-4 mb-6">
          Profitability Metrics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="border-t-4 border-indigo-300 dark:border-gray-400">
            <CardContent className="flex flex-col items-center p-6">
              <DonutChart
                value={financial.profit_margin || 0}
                maxValue={1}
                label="Profit Margin"
                color="text-green-500"
              />
            </CardContent>
          </Card>

          <Card className="border-t-4 border-indigo-300 dark:border-gray-400">
            <CardContent className="flex flex-col items-center p-6">
              <DonutChart
                value={financial.operating_margin || 0}
                maxValue={1}
                label="Operating Margin"
                color="text-blue-500"
              />
            </CardContent>
          </Card>

          <Card className="border-t-4 border-indigo-300 dark:border-gray-400">
            <CardContent className="flex flex-col items-center p-6">
              <DonutChart
                value={financial.roe || 0}
                maxValue={1}
                label="Return on Equity"
                color="text-purple-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/*/* Valuation Metrics Title and Quick Stats Grid */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-t-4 border-amber-400 dark:border-teal-600">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Valuation Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {quickMetrics.map((metric) => (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-t-4 border-transparent hover:border-blue-500 transition-all duration-300">
                    <MetricCard
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      icon={metric.icon}
                    />
                  </div>
                ))}
              </div>
            </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Valuation Metrics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-t-4 border-green-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <ChartBar size={20} className="text-green-500" />
            <h3 className="font-semibold">Valuation Metrics</h3>
          </div>
          {renderMetricsTable(valuationMetrics)}
        </div>

        {/* Financial Health */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-t-4 border-blue-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <DollarSign size={20} className="text-blue-500" />
            <h3 className="font-semibold">Financial Health</h3>
          </div>
          {renderMetricsTable(financialHealthMetrics)}
        </div>

        {/* Dividend Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <Users size={20} className="text-purple-500" />
            <h3 className="font-semibold">Dividend Information</h3>
          </div>
          {renderMetricsTable(dividendMetrics)}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(155, 155, 155, 0.7);
        }
      `}</style>
    </div>
  );
};

export default StockDashboard;
