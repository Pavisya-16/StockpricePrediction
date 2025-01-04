import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart2, BookOpen, Activity } from 'lucide-react';

const stockData = {
  basic_information: {
    company_name: "Central Depository Services (India) Limited",
    symbol: "cdsl.NS",
    sector: "Financial Services",
    industry: "Capital Markets",
    website: "https://www.cdslindia.com"
  },
  trading_information: {
    current_price: 1805.35,
    previous_close: 1804.85,
    open_price: 1810,
    day_low: 1800.05,
    day_high: 1828.5,
    fifty_two_week_low: 811,
    fifty_two_week_high: 1989.8,
    volume: 1931395,
    market_cap: 377318146048
  },
  key_metrics: {
    pe_ratio: 70.90927,
    forward_pe: 58.30292,
    peg_ratio: 2.945106,
    price_to_book: 24.677412,
    trailing_eps: 25.46,
    forward_eps: 31.59,
    book_value: 73.158,
    dividend_rate: 9.5,
    dividend_yield: 0.0053
  },
  financial_metrics: {
    revenue: 11428728832,
    revenue_per_share: 54.671,
    profit_margin: 0.46629003,
    operating_margin: 0.62514,
    roe: 0.37493,
    roa: 0.2394,
    total_cash: 8391724032,
    total_debt: 10415000,
    current_ratio: 2.416,
    quick_ratio: 2.237
  }
};

const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

const formatPercent = (num) => {
  return (num * 100).toFixed(2) + '%';
};

const PriceRangeIndicator = ({ low, high, current }) => {
  const range = high - low;
  const position = ((current - low) / range) * 100;
  
  return (
    <div className="mt-4">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute h-4 w-4 -mt-1 rounded-full bg-blue-600"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>₹{low}</span>
        <span>₹{high}</span>
      </div>
    </div>
  );
};

const DonutChart = ({ value, maxValue, label, color }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
};

const MainStock = () => {
  const priceChange = stockData.trading_information.current_price - stockData.trading_information.previous_close;
  const priceChangePercent = (priceChange / stockData.trading_information.previous_close) * 100;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{stockData.basic_information.company_name}</h1>
            <p className="text-gray-600">{stockData.basic_information.symbol} · {stockData.basic_information.sector}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">₹{stockData.trading_information.current_price.toFixed(2)}</p>
            <p className={`text-lg ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
              {isPriceUp ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      {/* 52 Week Range */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>52 Week Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceRangeIndicator 
            low={stockData.trading_information.fifty_two_week_low}
            high={stockData.trading_information.fifty_two_week_high}
            current={stockData.trading_information.current_price}
          />
        </CardContent>
      </Card>

      {/* Donut Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.profit_margin}
              maxValue={1}
              label="Profit Margin"
              color="text-green-500"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.operating_margin}
              maxValue={1}
              label="Operating Margin"
              color="text-blue-500"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.roe}
              maxValue={1}
              label="Return on Equity"
              color="text-purple-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Cap</p>
                <p className="text-2xl font-bold">₹{formatNumber(stockData.trading_information.market_cap)}</p>
              </div>
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">P/E Ratio</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.pe_ratio.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forward P/E</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.forward_pe.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PEG Ratio</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.peg_ratio.toFixed(2)}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Valuation Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Valuation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Price to Book</td>
                  <td className="py-2 text-right">{stockData.key_metrics.price_to_book.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Book Value</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.book_value.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Trailing EPS</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.trailing_eps.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Forward EPS</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.forward_eps.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Financial Health */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Health</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Total Cash</td>
                  <td className="py-2 text-right">₹{formatNumber(stockData.financial_metrics.total_cash)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Total Debt</td>
                  <td className="py-2 text-right">₹{formatNumber(stockData.financial_metrics.total_debt)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Current Ratio</td>
                  <td className="py-2 text-right">{stockData.financial_metrics.current_ratio.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Quick Ratio</td>
                  <td className="py-2 text-right">{stockData.financial_metrics.quick_ratio.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Dividend Information */}
        <Card>
          <CardHeader>
            <CardTitle>Dividend Information</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Dividend Rate</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.dividend_rate.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Dividend Yield</td>
                  <td className="py-2 text-right">{formatPercent(stockData.key_metrics.dividend_yield)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Revenue Per Share</td>
                  <td className="py-2 text-right">₹{stockData.financial_metrics.revenue_per_share.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Percent, BarChart2, BookOpen, Activity } from 'lucide-react';

const stockData = {
  basic_information: {
    company_name: "Central Depository Services (India) Limited",
    symbol: "cdsl.NS",
    sector: "Financial Services",
    industry: "Capital Markets",
    website: "https://www.cdslindia.com"
  },
  trading_information: {
    current_price: 1805.35,
    previous_close: 1804.85,
    open_price: 1810,
    day_low: 1800.05,
    day_high: 1828.5,
    fifty_two_week_low: 811,
    fifty_two_week_high: 1989.8,
    volume: 1931395,
    market_cap: 377318146048
  },
  key_metrics: {
    pe_ratio: 70.90927,
    forward_pe: 58.30292,
    peg_ratio: 2.945106,
    price_to_book: 24.677412,
    trailing_eps: 25.46,
    forward_eps: 31.59,
    book_value: 73.158,
    dividend_rate: 9.5,
    dividend_yield: 0.0053
  },
  financial_metrics: {
    revenue: 11428728832,
    revenue_per_share: 54.671,
    profit_margin: 0.46629003,
    operating_margin: 0.62514,
    roe: 0.37493,
    roa: 0.2394,
    total_cash: 8391724032,
    total_debt: 10415000,
    current_ratio: 2.416,
    quick_ratio: 2.237
  }
};

const formatNumber = (num) => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

const formatPercent = (num) => {
  return (num * 100).toFixed(2) + '%';
};

const PriceRangeIndicator = ({ low, high, current }) => {
  const range = high - low;
  const position = ((current - low) / range) * 100;
  
  return (
    <div className="mt-4">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute h-4 w-4 -mt-1 rounded-full bg-blue-600"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>₹{low}</span>
        <span>₹{high}</span>
      </div>
    </div>
  );
};

const DonutChart = ({ value, maxValue, label, color }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
};

const MainStock = () => {
  const priceChange = stockData.trading_information.current_price - stockData.trading_information.previous_close;
  const priceChangePercent = (priceChange / stockData.trading_information.previous_close) * 100;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{stockData.basic_information.company_name}</h1>
            <p className="text-gray-600">{stockData.basic_information.symbol} · {stockData.basic_information.sector}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900">₹{stockData.trading_information.current_price.toFixed(2)}</p>
            <p className={`text-lg ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
              {isPriceUp ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      {/* 52 Week Range */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>52 Week Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceRangeIndicator 
            low={stockData.trading_information.fifty_two_week_low}
            high={stockData.trading_information.fifty_two_week_high}
            current={stockData.trading_information.current_price}
          />
        </CardContent>
      </Card>

      {/* Donut Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.profit_margin}
              maxValue={1}
              label="Profit Margin"
              color="text-green-500"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.operating_margin}
              maxValue={1}
              label="Operating Margin"
              color="text-blue-500"
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <DonutChart 
              value={stockData.financial_metrics.roe}
              maxValue={1}
              label="Return on Equity"
              color="text-purple-500"
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Market Cap</p>
                <p className="text-2xl font-bold">₹{formatNumber(stockData.trading_information.market_cap)}</p>
              </div>
              <BarChart2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">P/E Ratio</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.pe_ratio.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Forward P/E</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.forward_pe.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PEG Ratio</p>
                <p className="text-2xl font-bold">{stockData.key_metrics.peg_ratio.toFixed(2)}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Valuation Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Valuation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Price to Book</td>
                  <td className="py-2 text-right">{stockData.key_metrics.price_to_book.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Book Value</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.book_value.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Trailing EPS</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.trailing_eps.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Forward EPS</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.forward_eps.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Financial Health */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Health</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Total Cash</td>
                  <td className="py-2 text-right">₹{formatNumber(stockData.financial_metrics.total_cash)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Total Debt</td>
                  <td className="py-2 text-right">₹{formatNumber(stockData.financial_metrics.total_debt)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Current Ratio</td>
                  <td className="py-2 text-right">{stockData.financial_metrics.current_ratio.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Quick Ratio</td>
                  <td className="py-2 text-right">{stockData.financial_metrics.quick_ratio.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Dividend Information */}
        <Card>
          <CardHeader>
            <CardTitle>Dividend Information</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Dividend Rate</td>
                  <td className="py-2 text-right">₹{stockData.key_metrics.dividend_rate.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Dividend Yield</td>
                  <td className="py-2 text-right">{formatPercent(stockData.key_metrics.dividend_yield)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Revenue Per Share</td>
                  <td className="py-2 text-right">₹{stockData.financial_metrics.revenue_per_share.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainStock;;