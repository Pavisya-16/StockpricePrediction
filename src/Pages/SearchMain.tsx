import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StockSearch from "./StockSearch";
import HomeNavBar from "@/components/HomeNavBar";
import StockDashboard from "./StockDashboard";
import { fetchStockChart, fetchStockInfo } from "@/services/stock.service";
import { Card, CardContent } from "@/components/ui/card";
import FooterBar from "@/components/FooterBar";
import stock1 from '../assets/Bitcoin.png';
import stock2 from '../assets/Finance Analysis.png';
import stock3 from '../assets/Investing 2.png';
import stock4 from '../assets/Bitcoin 2.png';
import stock5 from '../assets/Banker.png';
import stock6 from '../assets/Investing 4.png';
import stock7 from '../assets/Money.png';
import stock8 from '../assets/Finance App 1.png';
import stock9 from '../assets/Money Jar.png';
import { DollarSign } from "lucide-react";
import TradingViewChart from "./Chart/TradingViewChart";
import { AiOutlineCheck } from 'react-icons/ai';
import { FaArrowRight } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

export default function SearchMain() {
  const location = useLocation();
  const [state, setState] = useState({
    stockData: null,
    loading: false,
    error: null
  });
  const [companyname, SetcompanyName] = useState("");

  useEffect(() => {
    if (location.state?.selectedStock) {
      handleStockSelect({ symbol: location.state.selectedStock.symbol + '.NS' });
    }
  }, [location.state]);

  const handleStockSelect = async (company) => {
    if (!company?.symbol) return;

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const cleanSymbol = company.symbol.replace('.NS', '');
      SetcompanyName(cleanSymbol);
      
      const data = await fetchStockInfo(cleanSymbol);
      
      setState({
        stockData: data,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        stockData: null,
        loading: false,
        error: error.message || 'Failed to load stock data'
      });
    }
  };

  const { stockData, loading, error } = state;

  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavBar />

      <div className="flex-grow container mx-auto py-4 px-4 sm:px-6 mt-5 md:px-8 lg:px-12 relative">
        <StockSearch onSelect={handleStockSelect} />

        <div className="mt-6">
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              {/* Coin animation */}
              <div className="relative mt-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-yellow-500 shadow-lg animate-bounce">
                  <div className="flex justify-center items-center h-full text-xl font-bold text-yellow-600">
                    $
                  </div>
                </div>
                <div className="absolute -right-2 top-4 w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-500 animate-bounce [animation-delay:0.1s]" />
                <div className="absolute -left-2 top-4 w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-500 animate-bounce [animation-delay:0.2s]" />
              </div>
              
              <p className="text-gray-600 dark:white">Loading stock data...</p>
            </div>
          </div>
          )}

          {error && (
            <Card className="my-4">
              <CardContent className="p-6">
                <div className="text-red-500">
                  <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
                  <p>{error}</p>
                  <button
                    onClick={() => handleStockSelect({ symbol: state.stockData?.symbol })}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {!loading && !error && !stockData && (
            <div className="py-12 text-gray-600 dark:text-slate-200 opacity-2 shadow-white border-dashed border-4 p-5 border-gray-200 rounded-lg text-center">
              <div className="mb-8">
                <span className="text-4xl font-semibold dark:text-slate-100">
                  Search for a company in the bar above to view stock details.
                  <DollarSign className="h-12 w-12 inline-block ml-2 text-amber-200 rounded-full bg-cyan-500 dark:bg-slate-400 transform rotate-12" />
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl">STOCKS</p>
                    <p className="text-sm">Unlock the potential of the market—invest smartly</p>
                  </div>
                  <div className="flex justify-center">
                    <img src={stock4} alt="Stock 1" className="w-20 h-20 rounded-full" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl">INVEST</p>
                    <p className="text-sm">Grow your wealth, one investment at a time.</p>
                  </div>
                  <div className="flex justify-center">
                    <img src={stock2} alt="Stock 2" className="w-20 h-20 rounded-full" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl">ANALYSIS</p>
                    <p className="text-sm">Find the best stocks with just a click.</p>
                  </div>
                  <div className="flex justify-center">
                    <img src={stock3} alt="Stock 3" className="w-20 h-20 rounded-full" />
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-500 to-red-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                  <div className="flex flex-col">
                    <p className="font-semibold text-xl">GROW</p>
                    <p className="text-sm">Watch your investments grow with patience and strategy.</p>
                  </div>
                  <div className="flex justify-center">
                    <img src={stock1} alt="Stock 4" className="w-20 h-20 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 mt-8 bg-gradient-to-r from-yellow-600 to-red-300 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                <div className="w-full md:w-1/2">
                  <img src={stock5} alt="Stock Image" className="w-full h-auto rounded-lg" />
                </div>

                <div className="w-full md:w-1/2 p-6">
                  <div className="text-start space-y-6">
                    <div className="text-4xl font-bold text-gray-800 dark:text-slate-100">
                      <p>Unlock valuable insights and explore the best stock opportunities!</p>
                    </div>

                    <ul className="list-disc pl-5 space-y-2 text-2xl text-gray-800 dark:text-slate-100">
                      <li className="flex items-center">
                        <AiOutlineCheck className="text-green-300 mr-2" size={37} />
                        <span>Real-time stock data at your fingertips.</span>
                      </li>
                      <li className="flex items-center">
                        <AiOutlineCheck className="text-green-300 mr-2" size={37} />
                        <span>Detailed insights into market trends and predictions.</span>
                      </li>
                      <li className="flex items-center">
                        <AiOutlineCheck className="text-green-300 mr-2" size={37} />
                        <span>Instant analysis on stocks you're interested in.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full text-black dark:text-white rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-700 p-6 bg-gradient-to-br from-green-300 via-indigo-400 to-purple-500 mt-4">
                <div className="flex flex-col md:flex-row items-center justify-center">
                  <div className="flex-1 text-center md:text-center space-y-4">
                    <p className="font-bold text-3xl md:text-4xl">
                      Empowering your journey to smarter trading
                    </p>
                    <div className="space-y-3 text-black dark:text-slate-200">
                      <div className="flex items-center justify-center md:justify-center">
                        <FaCheckCircle className="text-red-500 mr-2" size={36} />
                        <p className="text-2xl">Real-time data and analysis</p>
                      </div>
                      <div className="flex items-center justify-center md:justify-center">
                        <FaCheckCircle className="text-yellow-600 mr-2" size={36} />
                        <p className="text-2xl">Instant trading opportunities</p>
                      </div>
                      <div className="flex items-center justify-center md:justify-center">
                        <FaCheckCircle className="text-green-700 mr-2" size={36} />
                        <p className="text-2xl">Comprehensive market insights</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 mt-4 md:mt-0">
                    <img
                      src={stock9}
                      alt="Explore Trading"
                      className="w-full h-1/2 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && stockData && (
            <div className="mt-6">
              <StockDashboard data={stockData} />
              <TradingViewChart CName={companyname} />
            </div>
          )}
        </div>
      </div>

      <FooterBar />
    </div>
  );
}