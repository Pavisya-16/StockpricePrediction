import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import axiosInstance from '../api/axios';

const StockSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        setIsLoading(true);
        setError(null);
        
        try {
          const { data } = await axiosInstance.get(`/stocks/search/${searchTerm}`);
          setSearchResults(data.companies || []);
          setShowResults(true);
        } catch (err) {
          setError(err.response?.data?.detail || 'An error occurred');
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
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

  const handleSelectCompany = (company) => {
    setSearchTerm(company.name);
    setShowResults(false);

    // Navigate to the company details page
    navigate(`/stocks/${company.symbol}`, { state: { company } });
  };

  return (
    <div className="max-w-2xl mx-auto p-4" ref={searchRef}>
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a company"
            className="w-full px-4 py-3 pl-12 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute w-full mt-1 bg-red-50 border border-red-200 rounded-lg p-3 text-red-600">
            {error}
          </div>
        )}

        {/* Search Results */}
        {showResults && searchResults.length > 0 && !error && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchResults.map((company) => (
              <div
                key={company.symbol}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
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
                      {company.day_high && company.day_low && (
                        <div className="text-xs text-gray-500">
                          {company.day_low} - {company.day_high}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {showResults && searchTerm.length >= 3 && searchResults.length === 0 && !isLoading && !error && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 text-gray-500 text-center">
              No results found
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockSearch;
