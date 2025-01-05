// src/components/StockDashboard.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, BarChart2, Activity, Globe, Factory } from 'lucide-react';
import MetricTable from './Chart/MetricTable';
import MetricCard from './Chart/MetricCard';
import PriceRangeIndicator from './Chart/PriceRangeIndicator';
import DonutChart from './Chart/DonutChart';
import TruncatedText from './Chart/TruncatedText';


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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{basic.company_name || 'Company Name Not Available'}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span>{basic.symbol || 'N/A'}</span>
              <span>·</span>
              <span>{basic.sector || 'Sector Not Available'}</span>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Factory size={16} />
                <span>{basic.industry || 'Industry Not Available'}</span>
              </div>
              {basic.website && (
                <>
                  <span>·</span>
                  <a 
                    href={basic.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Globe size={16} />
                    <span>Website</span>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">
              <SafeNumber value={trading.current_price} prefix="₹" format="price" />
            </p>
            {priceChange !== null && priceChangePercent !== null && (
              <p className={`text-lg ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                {isPriceUp ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </p>
            )}
          </div>
        </div>

        {/* 52 Week Range - Moved inside header section */}
        {trading.fifty_two_week_low && trading.fifty_two_week_high && trading.current_price && (
          <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">52 Week Range</span>
              <span className="text-sm text-gray-500">
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

        {/* Business Summary with Read More */}
        {basic.business_summary && (
          <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">About {basic.company_name}</h3>
            <TruncatedText text={basic.business_summary} />
          </div>
        )}
      </div>

      {/* Donut Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={financial.profit_margin || 0}
              maxValue={1}
              label="Profit Margin"
              color="text-green-500"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={financial.operating_margin || 0}
              maxValue={1}
              label="Operating Margin"
              color="text-blue-500"
            />
          </CardContent>
        </Card>
        <Card>
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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {quickMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricTable title="Valuation Metrics" metrics={valuationMetrics} />
        <MetricTable title="Financial Health" metrics={financialHealthMetrics} />
        <MetricTable title="Dividend Information" metrics={dividendMetrics} />
      </div>
    </div>
  );
};

export default StockDashboard;