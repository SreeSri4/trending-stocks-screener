import React, { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, AlertCircle } from 'lucide-react';

const TrendingStocksScreener = () => {
  const [selectedCriteria, setSelectedCriteria] = useState('Volume Buzzers');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const dropdownOptions = [
    '52 week High',
    '1 Month High', 
    'Volume Buzzers',
    '100% up in a Year'
  ];

  const fetchStocks = async (criteria) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/stocks/screener', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      if (result.success) {
        setStocks(result.data || []);
        setLastUpdated(new Date());
        setError(null);
      } else {
        throw new Error(result.message || 'Failed to fetch stock data');
      }
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stocks:', err);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks(selectedCriteria);
  }, [selectedCriteria]);

  const handleCriteriaChange = (criteria) => {
    if (criteria !== selectedCriteria) {
      setSelectedCriteria(criteria);
    }
  };

  const handleRefresh = () => {
    fetchStocks(selectedCriteria);
  };

  const formatValue = (value, type) => {
    if (value === null || value === undefined || value === 'N/A') return '-';
    
    switch (type) {
      case 'price':
        return typeof value === 'number' ? `₹${value.toFixed(2)}` : '-';
      case 'change':
        return typeof value === 'number' ? `${value > 0 ? '+' : ''}${value.toFixed(2)}%` : '-';
      case 'volume':
        if (typeof value !== 'number') return '-';
        return value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : 
               value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value.toString();
      case 'marketCap':
        if (typeof value !== 'number') return '-';
        return value >= 1000000000000 ? `₹${(value / 1000000000000).toFixed(2)}T` : 
               value >= 1000000000 ? `₹${(value / 1000000000).toFixed(2)}B` : 
               value >= 1000000 ? `₹${(value / 1000000).toFixed(2)}M` : `₹${value.toFixed(2)}`;
      case 'decimal':
        return typeof value === 'number' ? value.toFixed(2) : value;
      default:
        return value;
    }
  };

  const formatSMADistance = (stock) => {
    if (!stock.smaDistance || typeof stock.smaDistance !== 'number') {
      return '-';
    }
    const distance = stock.smaDistance;
    return `${distance > 0 ? '+' : ''}${distance.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trending Stocks Screener</h1>
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </div>
        </div>

        {/* Stock Screener Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Stock Screener</h2>
              <p className="text-gray-600">Select a screening criteria to filter stocks</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 hidden sm:block">Screening Criteria</div>
              <div className="relative">
                <select 
                  value={selectedCriteria}
                  onChange={(e) => handleCriteriaChange(e.target.value)}
                  disabled={loading}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-48 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {dropdownOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 transition-colors disabled:cursor-not-allowed"
                title="Refresh data"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">{selectedCriteria}</h3>
              {!loading && !error && (
                <div className="text-sm text-gray-500">
                  {stocks.length} stock{stocks.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700 font-medium">Error loading stock data</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                    <button
                      onClick={handleRefresh}
                      className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading stocks...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Change</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Volume</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">RVol 10D</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">SMA20</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">SMA Distance</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">MCap</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.length > 0 ? (
                      stocks.map((stock, index) => (
                        <tr key={`${stock.symbol}-${index}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div>
                              <span className="text-blue-600 font-medium">
                                {stock.symbol || 'N/A'}
                              </span>
                              {stock.description && (
                                <div className="text-xs text-gray-500 mt-1 truncate max-w-32">
                                  {stock.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{formatValue(stock.price, 'price')}</td>
                          <td className="py-3 px-4">
                            <span className={`font-medium ${
                              typeof stock.change === 'number' 
                                ? stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                                : 'text-gray-500'
                            }`}>
                              {formatValue(stock.change, 'change')}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formatValue(stock.volume, 'volume')}</td>
                          <td className="py-3 px-4">{formatValue(stock.rvol, 'decimal')}</td>
                          <td className="py-3 px-4">{formatValue(stock.sma20, 'decimal')}</td>
                          <td className="py-3 px-4">
                            <span className={`${
                              typeof stock.smaDistance === 'number'
                                ? stock.smaDistance >= 0 ? 'text-green-600' : 'text-red-600'
                                : 'text-gray-500'
                            }`}>
                              {formatSMADistance(stock)}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formatValue(stock.marketCap, 'marketCap')}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                              {stock.sector || 'Finance'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      !loading && !error && (
                        <tr>
                          <td colSpan="9" className="py-8 text-center text-gray-500">
                            No stocks found for the selected criteria
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingStocksScreener;