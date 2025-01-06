// src/components/StockDashboard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart2, Activity, Globe, Factory } from 'lucide-react';
import MetricTable from './Chart/MetricTable';
import MetricCard from './Chart/MetricCard';
import PriceRangeIndicator from './Chart/PriceRangeIndicator';
import DonutChart from './Chart/DonutChart';
import TruncatedText from './Chart/TruncatedText';
import { ChartBar, Users } from 'lucide-react';
import FooterBar from '@/components/FooterBar';


const formatNumber = (num) => {
  if (!num && num !== 0) return 'N/A';
  
  try {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  } catch (error) {
    return 'N/A';
  }
};

const formatPercent = (num) => {
  if (!num && num !== 0) return 'N/A';
  try {
    return (num * 100).toFixed(2) + '%';
  } catch (error) {
    return 'N/A';
  }
};

const SafeNumber = ({ value, format = 'number', prefix = '', fallback = 'N/A' }) => {
  if (!value && value !== 0) return fallback;
  
  try {
    if (format === 'percent') return `${prefix}${formatPercent(value)}`;
    if (format === 'price') return `${prefix}${Number(value).toFixed(2)}`;
    return `${prefix}${formatNumber(value)}`;
  } catch (error) {
    return fallback;
  }
};

const StockDashboard = ({ data }) => {
  if (!data) return null;

  const trading = data.trading_information || {};
  const metrics = data.key_metrics || {};
  const financial = data.financial_metrics || {};
  const basic = data.basic_information || {};

  const priceChange = trading.current_price && trading.previous_close
    ? trading.current_price - trading.previous_close
    : null;
    
  const priceChangePercent = priceChange && trading.previous_close
    ? (priceChange / trading.previous_close) * 100
    : null;
    
  const isPriceUp = priceChange >= 0;

  const quickMetrics = [
    {
      label: "Market Cap",
      value: <SafeNumber value={trading.market_cap} prefix="₹" />,
      icon: BarChart2
    },
    {
      label: "P/E Ratio",
      value: <SafeNumber value={metrics.pe_ratio} />,
      icon: DollarSign
    },
    {
      label: "Forward P/E",
      value: <SafeNumber value={metrics.forward_pe} />,
      icon: TrendingUp
    },
    {
      label: "PEG Ratio",
      value: <SafeNumber value={metrics.peg_ratio} />,
      icon: Activity
    }
  ];

  const valuationMetrics = [
    { label: "Price to Book", value: <SafeNumber value={metrics.price_to_book} /> },
    { label: "Book Value", value: <SafeNumber value={metrics.book_value} prefix="₹" /> },
    { label: "Trailing EPS", value: <SafeNumber value={metrics.trailing_eps} prefix="₹" /> },
    { label: "Forward EPS", value: <SafeNumber value={metrics.forward_eps} prefix="₹" /> }
  ];

  const financialHealthMetrics = [
    { label: "Total Cash", value: <SafeNumber value={financial.total_cash} prefix="₹" /> },
    { label: "Total Debt", value: <SafeNumber value={financial.total_debt} prefix="₹" /> },
    { label: "Current Ratio", value: <SafeNumber value={financial.current_ratio} /> },
    { label: "Quick Ratio", value: <SafeNumber value={financial.quick_ratio} /> }
  ];

  const dividendMetrics = [
    { label: "Dividend Rate", value: <SafeNumber value={metrics.dividend_rate} prefix="₹" /> },
    { label: "Dividend Yield", value: <SafeNumber value={metrics.dividend_yield} format="percent" /> },
    { label: "Revenue Per Share", value: <SafeNumber value={financial.revenue_per_share} prefix="₹" /> }
  ];

  return (
    <>
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-t-4 border-indigo-600 dark:border-blue-700">
        <div className="flex flex-col lg:flex-row justify-between ">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {basic.company_name || 'Company Name Not Available'}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-2">
              <span>{basic.symbol || 'N/A'}</span>
              <span>·</span>
              <span>{basic.sector || 'Sector Not Available'}</span>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Factory size={16} className="text-gray-600 dark:text-gray-400" />
                <span>{basic.industry || 'Industry Not Available'}</span>
              </div>
              {basic.website && (
                <>
                  <span>·</span>
                  <a
                    href={basic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-none text-left lg:text-right mt-4 lg:mt-0">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              <SafeNumber value={trading.current_price} prefix="₹" />
            </p>
            {priceChange !== null && priceChangePercent !== null && (
              <p
                className={`text-sm lg:text-lg ${
                  isPriceUp
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {isPriceUp ? '+' : ''}
                {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 52 Week Range - Moved inside header section */}
      {trading.fifty_two_week_low && trading.fifty_two_week_high && trading.current_price && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm ">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">52 Week Range</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Low: ₹{trading.fifty_two_week_low.toFixed(2)} · High: ₹{trading.fifty_two_week_high.toFixed(2)}
            </span>
          </div>
          <PriceRangeIndicator 
            low={trading.fifty_two_week_low}
            high={trading.fifty_two_week_high}
            current={trading.current_price}
          />
        </div>
      )}

      {/* Profitability Metrics Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white  border-gray-600 dark:border-gray-300 pt-4 mb-6">
          Profitability Metrics
        </h3>

        {/* Donut Charts Grid */}
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

      {/* Valuation Metrics Title and Quick Stats Grid */}
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border-t-4 border-amber-400 dark:border-teal-600">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Valuation Metrics</h2>
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

       {/* Detailed Metrics */}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Valuation Metrics */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-green-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <ChartBar size={20} className="text-green-500" />
            <h3 className="font-semibold ">Valuation Metrics</h3>
          </div>
          <MetricTable  metrics={valuationMetrics} />
        </div>

        {/* Financial Health */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-blue-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <DollarSign size={20} className="text-blue-500" />
            <h3 className="font-semibold">Financial Health</h3>
          </div>
          <MetricTable metrics={financialHealthMetrics} />
        </div>

        {/* Dividend Information */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-t-4 border-t-purple-500">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-200 mb-4">
            <Users size={20} className="text-purple-500" />
            <h3 className="font-semibold">Dividend Information</h3>
          </div>
          <MetricTable metrics={dividendMetrics} />
        </div>
      </div>
      
      {/* Business Summary with Read More */}
      {basic.business_summary && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm ">
          <h3 className="text-sm font-medium text-gray-600 dark:text-slate-300 mb-2">
            About {basic.company_name || "Company"}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-300">
          <TruncatedText text={basic.business_summary}  />
          </span>
        </div>
      )}

      {/* Other Content Sections */}
      {/* Add your content for 52 Week Range, Donut Charts, Quick Stats, and Detailed Metrics */}
    </div>
    
    </>
  );
};

export default StockDashboard;
