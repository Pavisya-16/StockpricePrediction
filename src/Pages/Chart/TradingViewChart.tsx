import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { analyzeStock, fetchStockCharts } from '@/services/stock.service';
import { FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMicroscopeLens } from "react-icons/gi";


const TradingViewChart = ({CName}) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supportLevel, setSupportLevel] = useState();
  const [resistanceLevel, setResistanceLevel] = useState();
  const [tradingSignals, setTradingSignals] = useState({});
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [interval, setInterval] = useState('1d');

  const timeframes = [
    { label: '1 Day', value: '1d' },
    { label: '1 Week', value: '1wk' },
    { label: '1 Month', value: '1mo' }
  ];

  const parseDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      return {
        time: dateStr,
        timestamp: date.getTime()
      };
    } catch {
      return null;
    }
  };

  const parseSignalPoints = (pointsStr, isBuy = true) => {
    if (!pointsStr) return [];
    
    return pointsStr.split('\n')
      .map(point => {
        try {
          const [date, price] = point.split(': ');
          const parsedDate = parseDate(date);
          if (!parsedDate) return null;

          return {
            time: parsedDate.time,
            position: isBuy ? 'belowBar' : 'aboveBar',
            color: isBuy ? '#22c55e' : '#ef4444',
            shape: isBuy ? 'arrowUp' : 'arrowDown',
            text: isBuy ? 'BUY' : 'SELL',
            size: 2,
            timestamp: parsedDate.timestamp
          };
        } catch {
          return null;
        }
      })
      .filter(point => point !== null);
  };

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        const result = await fetchStockCharts(CName, interval);
        if (Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data);
        } else {
          setError('No data available');
        }
      } catch (error) {
        setError('Failed to fetch chart data');
        console.error('Chart data error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadChartData();
  }, [CName, interval]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const analysisData = await analyzeStock(CName, interval);
      if (!analysisData) throw new Error('No analysis data received');
      
      setAnalysis(analysisData);
      setSupportLevel(analysisData.support_level);
      setResistanceLevel(analysisData.resistance_level);
      setTradingSignals(analysisData.trading_signals || {});
    } catch (error) {
      setError('Failed to analyze stock');
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current || loading || error || !data.length) return;

    chart.current = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#dfdfdf',
      },
      timeScale: {
        borderColor: '#dfdfdf',
        timeVisible: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
    });

    const candlestickSeries = chart.current.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(data);

    if (tradingSignals.signals) {
      const buyPoints = parseSignalPoints(tradingSignals.buy_points, true);
      const sellPoints = parseSignalPoints(tradingSignals.sell_points, false);
      
      const allMarkers = [...buyPoints, ...sellPoints]
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(({timestamp, ...marker}) => marker);

      if (allMarkers.length > 0) {
        candlestickSeries.setMarkers(allMarkers);
      }
    }

    if (supportLevel && !isNaN(supportLevel)) {
      const supportSeries = chart.current.addLineSeries({
        color: '#22c55e',
        lineWidth: 2,
        lineStyle: 2,
      });

      const supportData = data.map(item => ({
        time: item.time,
        value: supportLevel
      }));
      supportSeries.setData(supportData);
    }

    if (resistanceLevel && !isNaN(resistanceLevel)) {
      const resistanceSeries = chart.current.addLineSeries({
        color: '#ef4444',
        lineWidth: 2,
        lineStyle: 2,
      });

      const resistanceData = data.map(item => ({
        time: item.time,
        value: resistanceLevel
      }));
      resistanceSeries.setData(resistanceData);
    }

    chart.current.timeScale().fitContent();

    return () => {
      if (chart.current) {
        chart.current.remove();
      }
    };
  }, [data, loading, error, supportLevel, resistanceLevel, tradingSignals]);


// const renderTradingSignals = () => {
//   if (!tradingSignals.signals) return null;
  
//   const signals = tradingSignals.signals.split('\n')
//     .filter(signal => signal && signal.includes(': '))
//     .map((signal, index) => {
//       const [date, value] = signal.split(': ');
//       const isBuySignal = value.toLowerCase() === 'buy'; // Check if it's a Buy or Sell signal
//       const isSellSignal = value.toLowerCase() === 'sell'; // Check if it's a Sell signal

//       return (
//         <div key={index} className={`group p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 ${isBuySignal ? 'bg-green-50 dark:bg-green-800' : isSellSignal ? 'bg-red-50 dark:bg-red-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
//           <div className="flex items-center space-x-2">
//             <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
//             <p className="text-sm text-gray-900 dark:text-gray-100">{date}</p>
//           </div>
//           <p className={`text-sm text-gray-900 dark:text-gray-100`}>
//             {isBuySignal && <FaArrowUp className="inline-block text-green-600 dark:text-green-400 mr-1" />}
//             {isSellSignal && <FaArrowDown className="inline-block text-red-600 dark:text-red-400 mr-1" />}
//             <span className={`font-medium uppercase ${isBuySignal ? 'text-green-600 dark:text-green-400' : isSellSignal ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>{value}</span>
//           </p>
//         </div>
//       );
//     });

//   return signals.length > 0 
//     ? signals 
//     : <div className="group bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105">
//         <p className="text-sm text-gray-500 dark:text-gray-400">No recent signals</p>
//       </div>;
// };
const renderTradingSignals = () => {
  if (!tradingSignals.signals) return null;
  
  const signals = tradingSignals.signals.split('\n')
    .filter(signal => signal && signal.includes(': '))
    .map((signal, index) => {
      const [date, value] = signal.split(': ');
      const isBuySignal = value.toLowerCase() === 'buy'; // Determine if it's a Buy or Sell signal

      return (
        <div key={index} className={`group p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 ${isBuySignal ? 'bg-green-50 dark:bg-green-800' : 'bg-red-50 dark:bg-red-800'}`}>
          
          <div className="flex items-center space-x-2">
           <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-900 dark:text-gray-100">{date}</p>
         </div>
          <p className={`text-sm text-gray-900 dark:text-gray-100`}>
            <span className={`font-medium uppercase ${isBuySignal ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-300'}`}>{value}</span>
          </p>
        </div>
      );
    });

  return signals.length > 0 
    ? signals 
    : <div className="group bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105">
        <p className="text-sm text-gray-500 dark:text-gray-400">No recent signals</p>
      </div>;
};


  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full p-4">
      <div className="mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setInterval(tf.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  interval === tf.value
                   ? 'bg-gray-600 text-white hover:bg-slate-700 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-500'
                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
          <div className="flex items-end">
          <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="px-4 py-2 rounded-md 
             bg-indigo-600 text-white hover:bg-teal-300 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
             dark:bg-teal-400 dark:text-gray-900 dark:hover:bg-gray-400 
             dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 
             disabled:opacity-50"
>
              {analyzing ? 'Analyzing...' : 'Analyze Stock'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 shadow-sm border-t-4 border-t-amber-500">
          {/* Left Cardlet */}
          <div className="group bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-100 dark:text-gray-100 gap-2 flex items-center">
            <GiMicroscopeLens className="h-12 w-12 p-2 inline-block ml-2 text-cyan-700 rounded-full bg-slate-100 dark:bg-slate-700 transform rotate-12 dark:text-white" />
              Analysis Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Sub-card: Model Accuracy */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Model Accuracy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {(analysis.model_accuracy * 100).toFixed(2)}%
                </p>
              </div>
    
              {/* Sub-card: Validation Accuracy */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Validation Accuracy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {(analysis.validation_accuracy * 100).toFixed(2)}%
                </p>
              </div>
    
              {/* Sub-card: Latest Prediction */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Latest Prediction
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium uppercase">
                  {analysis.latest_prediction}
                </p>
              </div>
    
              {/* Sub-card: Prediction Confidence */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Prediction Confidence
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {(analysis.prediction_confidence * 100).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
    
          {/* Cardlet: Trading Signals */}
          <div className="group bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-all hover:scale-105">
          <h3 className="text-lg font-medium mb-2 text-slate-100 dark:text-gray-100 flex items-center gap-2">
            <GiTakeMyMoney className="h-12 w-12 p-2 inline-block ml-2 text-amber-200 rounded-full bg-slate-500 dark:bg-slate-700 transform rotate-12" />
            Trading Signals
          </h3>
          <div className="space-y-1">{renderTradingSignals()}</div>
        </div>
        </div>
       
        )}
      </div>

      <div 
        ref={chartContainerRef} 
        className="h-96 w-full"
      />
    </div>
  );
};

export default TradingViewChart;