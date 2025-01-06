import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { analyzeStock, fetchStockCharts } from '@/services/stock.service';

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

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        const result = await fetchStockCharts(CName, interval);
        setData(result.data);
        // You can also use the metadata if needed
        // setMetadata(result.metadata);
      } catch (error) {
        setError('Failed to fetch chart data');
        console.error('Chart data error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadChartData();
  }, [CName, interval]);// Refetch when interval changes

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const analysisData = await analyzeStock(CName, interval);
      
      setAnalysis(analysisData);
      setSupportLevel(analysisData.support_level);
      setResistanceLevel(analysisData.resistance_level);
      setTradingSignals(analysisData.trading_signals);
    } catch (error) {
      setError('Failed to analyze stock');
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!chartContainerRef.current || loading || error) return;

    // Create the chart
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

    // Add candlestick series
    const candlestickSeries = chart.current.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    // Set the data
    candlestickSeries.setData(data);

    if (supportLevel) {
      // Add support line
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

    if (resistanceLevel) {
      // Add resistance line
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

    // Fit content
    chart.current.timeScale().fitContent();

    // Cleanup
    return () => {
      if (chart.current) {
        chart.current.remove();
      }
    };
  }, [data, loading, error, supportLevel, resistanceLevel]);

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
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Stock'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Model Accuracy: {(analysis.model_accuracy * 100).toFixed(2)}%</p>
                <p className="text-sm text-gray-600">Validation Accuracy: {(analysis.validation_accuracy * 100).toFixed(2)}%</p>
                <p className="text-sm text-gray-600">Latest Prediction: <span className="font-medium uppercase">{analysis.latest_prediction}</span></p>
                <p className="text-sm text-gray-600">Prediction Confidence: {(analysis.prediction_confidence * 100).toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Trading Signals:</p>
                <div className="space-y-1">
                  {Object.entries(tradingSignals).map(([date, signal]) => (
                    <p key={date} className="text-sm">
                      {date}: <span className="font-medium uppercase">{signal}</span>
                    </p>
                  ))}
                </div>
              </div>
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