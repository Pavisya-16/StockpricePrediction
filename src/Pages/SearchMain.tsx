import React, { useState } from "react";
import StockSearch from "./StockSearch";
import HomeNavBar from "@/components/HomeNavBar";
import StockDashboard from "./StockDashboard";
import { fetchStockInfo } from "@/services/stock.service";
import { Card, CardContent } from "@/components/ui/card";

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
    <div>
      <HomeNavBar />
      <div className="container mx-auto py-4 px-4 sm:px-6 mt-5 md:px-8 lg:px-12">
        <StockSearch onSelect={handleStockSelect} />
      </div>

      <div className="container mx-auto px-4">
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
          <div className="text-center py-12 text-gray-600">
            Search for a stock above to view its details
          </div>
        )}

        {!loading && !error && stockData && (
          <div className="mt-6">
            <StockDashboard data={stockData} />
          </div>
        )}
      </div>
    </div>
  );
}