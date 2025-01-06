import React, { useState } from "react";
import StockSearch from "./StockSearch";
import HomeNavBar from "@/components/HomeNavBar";
import StockDashboard from "./StockDashboard";
import { fetchStockInfo } from "@/services/stock.service";
import { Card, CardContent } from "@/components/ui/card";
import FooterBar from "@/components/FooterBar";
import stock1 from '../assets/Bitcoin.png';
import stock2 from '../assets/Finance Analysis.png';
import stock3 from '../assets/Investing 2.png';
import stock4 from '../assets/Bitcoin 2.png';
import { DollarSign } from "lucide-react";

export default function SearchMain() {
  const [state, setState] = useState({
    stockData: null,
    loading: false,
    error: null
  });

  const handleStockSelect = async (company) => {
    if (!company?.symbol) return;

    setState(prev => ({
      ...prev,
      loading: true,
      error: null
    }));

    try {
      const cleanSymbol = company.symbol.replace('.NS', '');
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
     {/* <div
      className="absolute inset-0 bg-gradient-to-br from-blue-200 via-white to-blue-500 dark:from-black dark:via-gray-400 dark:to-gray-800 z-[-1]"
    ></div> */}

      {/* Navbar */}
      <HomeNavBar />

      {/* Main Content */}
      <div className="flex-grow container mx-auto py-4 px-4 sm:px-6 mt-5 md:px-8 lg:px-12 relative">
        <StockSearch onSelect={handleStockSelect} />

        <div className="mt-6">
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-600">Loading stock data...</p>
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
            {/* Text Section */}
            <div className="mb-8">
              <span className="text-lg font-semibold dark:text-slate-100">
                Search for a company in the bar above to view - stock details.
                <DollarSign className="h-12 w-12 inline-block ml-2 text-amber-200 rounded-full bg-cyan-500 dark:bg-slate-400 transform rotate-12" />
                </span>
            </div>
          
            {/* Images and Text Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">STOCKS</p>
                  <p className="text-sm">Unlock the potential of the market—invest smartly</p>
                </div>
                <div className="flex justify-center">
                  <img src={stock4} alt="Stock 1" className="w-20 h-20 rounded-full" />
                </div>
              </div>
          
              {/* Card 2 */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">INVEST</p>
                  <p className="text-sm">Grow your wealth, one investment at a time.</p>
                </div>
                <div className="flex justify-center">
                  <img src={stock2} alt="Stock 2" className="w-20 h-20 rounded-full" />
                </div>
              </div>
          
              {/* Card 3 */}
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg dark:border-gray-300 shadow-white">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">ANALYSIS</p>
                  <p className="text-sm">Find the best stocks with just a click.</p>
                </div>
                <div className="flex justify-center">
                  <img src={stock3} alt="Stock 3" className="w-20 h-20 rounded-full" />
                </div>
              </div>
          
              {/* Card 4 */}
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
          </div>
          
          
          )}

          {!loading && !error && stockData && (
            <div className="mt-6">
              <StockDashboard data={stockData} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <FooterBar />
    </div>
  );
}