import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import axiosInstance from '@/api/axios';

const StockSearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data } = await axiosInstance.get(`/stocks/search/${query}`);
      setSearchResults(data.companies || []);
      setShowResults(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length < 3) {
      setShowResults(false);
    }
  };

  const handleSelectCompany = (company) => {
    setSearchTerm(company.name);
    setShowResults(false);
    if (onSelect) {
      onSelect(company);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchTerm.length >= 3) {
      e.preventDefault();
      fetchSearchResults(searchTerm);
    }
  };

  return (
    <>
    <div className="max-w-2xl mx-auto p-4" ref={searchRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter minimum 3 characters to search"
            className="w-full px-4 py-3 pl-12 text-indigo-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200  dark:border-gray-300 shadow-white dark:bg-slate-200 "
          />
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-700 dark:border-gray-300  " 
            size={30} 
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
            </div>
          )}
        </div>

        {/* Character count indicator */}
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <div className="absolute right-4 -bottom-6 text-sm text-gray-500 dark:text-slate-100 ">
            Enter {3 - searchTerm.length} more character{3 - searchTerm.length !== 1 ? 's' : ''}
          </div>
        )}

        {error && (
          <div className="absolute w-full mt-1 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600">
            {error}
          </div>
        )}

        {showResults && searchResults.length > 0 && !error && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchResults.map((company) => (
              <div
                key={company.symbol}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors duration-200"
                onClick={() => handleSelectCompany(company)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">
                      {company.symbol.replace('.NS', '')}
                    </div>
                    <div className="text-sm text-gray-500">{company.name}</div>
                  </div>
                  {company.current_price && (
                    <div className="text-right">
                      <div className="font-medium">
                        ₹{company.current_price.toLocaleString('en-IN', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2 
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showResults && searchTerm.length >= 3 && searchResults.length === 0 && !isLoading && !error && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 text-gray-500 text-center">
              No results found
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StockSearch;