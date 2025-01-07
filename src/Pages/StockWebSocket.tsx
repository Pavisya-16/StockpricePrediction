import React, { useState, useEffect, useRef } from 'react';
import { Bookmark, BookMarked, BookX, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const StockWebSocket = () => {
  const [indexData, setIndexData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteStocks');
    return saved ? JSON.parse(saved) : {};
  });
  const navigate = useNavigate();
  const wsRef = useRef(null);

  useEffect(() => {
    const createWebSocket = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log('Using existing WebSocket connection');
        return;
      }

      if (wsRef.current?.readyState === WebSocket.CONNECTING) {
        console.log('WebSocket is currently connecting');
        return;
      }

      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(`${import.meta.env.VITE_Socket}/stocks/ws/all_indices`);
      wsRef.current = ws;

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
        setTimeout(createWebSocket, 5000);
      };

      ws.onerror = (error) => {
        toast({
          title: "WebSocket Error",
          description: "Failed to connect to the stock data feed.",
          status: "error",
        });
      };
    };

    createWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
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

  const handleStockClick = (symbol, stockData) => {
    const cleanSymbol = symbol.replace('.NS', '');
    navigate('/search', { 
      state: { 
        selectedStock: {
          symbol: cleanSymbol,
          name: stockData.name || cleanSymbol,
          price: stockData.price,
          change: stockData.change,
          change_percent: stockData.change_percent
        }
      }
    });
  };

  const StockList = ({ stocks, title }) => {
    if (!stocks) return null;

    return (
      <div className="flex-1 min-w-0 p-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          
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
                    onClick={() => handleStockClick(symbol, data)}
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
      <div className="absolute m-4 flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs text-gray-600">
          {isConnected ? 'Live' : 'Connecting...'}
        </span>
      </div>

      <div className="flex gap-4 p-4">
        <StockList 
          stocks={indexData.nifty50?.stocks}
          title="NIFTY 50"
        />
        <StockList 
          stocks={indexData.niftyit?.stocks}
          title="NIFTY IT"
        />
        <StockList 
          stocks={indexData.niftybank?.stocks}
          title="NIFTY BANK"
        />
      </div>
    </div>
  );
};

export default StockWebSocket;