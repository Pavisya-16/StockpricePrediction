// src/services/stock.service.js
import axiosInstance from '../api/axios';

export const fetchStockInfo = async (symbol) => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/stocks/stock/info/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock info:', error);
    throw error;
  }
};

export const searchStocks = async (query) => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/stocks/search?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching stocks:', error);
    throw error;
  }
};

export const fetchStockChart = async (symbol) => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/chart/stock/${symbol}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock info:', error);
    throw error;
  }
};



export const analyzeStock = async (symbol:string, interval = '1d') => {
  try {
    const response = await axiosInstance.post(`${import.meta.env.VITE_Dev_URL}/chart/train/${symbol}`, null, {
      params: { interval }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing stock:', error);
    throw error;
  }
};



export const fetchStockCharts = async (symbol, interval = '1d') => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/chart/stock/${symbol}`, {
      params: { interval }
    });
    
    // Format the data for the chart
    const formattedData = response.data.data.map(item => ({
      time: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close
    }));

    return {
      data: formattedData,
      metadata: {
        symbol: response.data.symbol,
        interval: response.data.interval,
        startDate: response.data.start_date,
        endDate: response.data.end_date,
        totalRecords: response.data.total_records
      }
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};


export const fetchNews = async (symbol: string, limit: number = 10) => {
  try {
    const response = await axiosInstance.get(`${import.meta.env.VITE_Dev_URL}/stocks/stock/news/${symbol}`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};