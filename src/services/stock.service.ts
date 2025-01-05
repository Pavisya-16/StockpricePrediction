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