import React, { useState, useEffect } from 'react';
import { Bookmark, BookMarked, BookX, TrendingUp } from 'lucide-react';
import { useToast } from '@/utility-components/CustomToast';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

const StockWebSocket = () => {
    // const toast = useToast();
  const [indexData, setIndexData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteStocks');
    return saved ? JSON.parse(saved) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket(`${import.meta.env.VITE_Socket}/stocks/ws/all_indices`);
  
    ws.onopen = () => {
      setIsConnected(true);
      toast({
        title: "WebSocket Connected",
        description: "Successfully connected to the stock data feed.",
        status: "success",
      });
    };
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setIndexData(data.indices);
    };
  
    ws.onclose = () => {
      setIsConnected(false);
      toast({
        title: "WebSocket Disconnected",
        description: "The connection to the stock data feed was closed.",
        status: "warning",
      });
    };
  
    ws.onerror = (error) => {
      toast({
        title: "WebSocket Error",
        description: "Failed to connect to the stock data feed.",
        status: "error",
      });
    };
  
    return () => {
      ws.close();
    };
  }, []);
  

  useEffect(() => {
    localStorage.setItem('favoriteStocks', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (symbol) => {
    setFavorites(prev => ({
      ...prev,
      [symbol]: !prev[symbol]
    }));
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeDisplay = (change, changePercent) => {
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${changePercent.toFixed(2)}%`;
  };

  const StockList = ({ stocks, title, summary }) => {
    if (!stocks) return null;

    return (
      <div className="flex-1 min-w-0 p-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          
          {/* Market Summary */}
          {/* {summary && (
            <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
              <div className="bg-green-50 p-2 rounded">
                <div className="text-green-600 font-bold">{summary.advancing}</div>
                <div>Advancing</div>
              </div>
              <div className="bg-red-50 p-2 rounded">
                <div className="text-red-600 font-bold">{summary.declining}</div>
                <div>Declining</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-600 font-bold">{summary.unchanged}</div>
                <div>Unchanged</div>
              </div>
            </div>
          )} */}

          {/* Stocks List */}
          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {Object.entries(stocks).map(([symbol, data]) => (
              <div 
                key={symbol} 
                className={`flex items-center justify-between p-2 rounded border ${
                  favorites[symbol] ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{symbol.replace('.NS', '')}</span>
                    <div className={`text-xs font-medium ${getTrendColor(data.trend)}`}>
                      {getChangeDisplay(data.change, data.change_percent)}
                    </div>
                  </div>

                  <div className="text-base font-bold ml-auto">
                    ₹{parseFloat(data.price).toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-2">
                  <button
                  onClick={()=>navigate(`/stocks/${symbol}`)}
                    // onClick={() => window.location.href = `/analysis/${symbol}`}
                    className="text-blue-500 hover:bg-blue-50 p-1 rounded"
                  >
                    <TrendingUp size={14} />
                  </button>
                  <button
                    onClick={() => toggleFavorite(symbol)}
                    className="text-blue-500 hover:bg-blue-50 p-1 rounded"
                  >
                    {favorites[symbol] ? 
                      <BookX size={14} color='black' /> : 
                      <BookMarked size={14} color='#3b82f6' />
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Connection Status */}
      <div className="absolute m-4 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs text-gray-600">
          {isConnected ? 'Live' : 'Connecting...'}
        </span>
      </div>

      {/* Three Column Layout */}
      <div className="flex gap-4 p-4">
        <StockList 
          stocks={indexData.nifty50?.stocks}
          title="NIFTY 50"
          summary={indexData.nifty50?.market_summary}
        />
        <StockList 
          stocks={indexData.niftyit?.stocks}
          title="NIFTY IT"
          summary={indexData.niftyit?.market_summary}
        />
        <StockList 
          stocks={indexData.niftybank?.stocks}
          title="NIFTY BANK"
          summary={indexData.niftybank?.market_summary}
        />
      </div>
    </div>
  );
};

export default StockWebSocket;