import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp, Newspaper, ArrowRight, Clock } from 'lucide-react';
import { fetchNews } from '@/services/stock.service';

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetchNews(symbol, 10);
        setNews(response.news_items);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to fetch news'
        );
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchNewsData();
    }
  }, [symbol]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error loading news: {error}
      </div>
    );
  }

  const displayedNews = isExpanded ? news : news.slice(0, 2);

  return (
    <div className="space-y-6 font-inter">
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg animate-pulse">
          <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
          News Letter
        </h3>
      </div>
      
      <div className="relative">
        {isExpanded && (
          <>
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent dark:from-gray-900 z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent dark:from-gray-900 z-10"></div>
          </>
        )}
        
        <div className={`${isExpanded ? 'h-96' : ''} overflow-y-auto pr-2 space-y-4 custom-scrollbar`}>
          {displayedNews.map((item, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 animate-fadeIn bg-white dark:bg-gray-800"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2"
                    >
                      <h4 className="text-base leading-6 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors tracking-tight">
                        {item.title}
                      </h4>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                    </a>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium tracking-wide uppercase">
                        {item.publisher}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(item.published)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {news.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 border rounded-lg hover:border-blue-500 hover:shadow-md tracking-wide uppercase"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4 animate-bounce" />
              </>
            ) : (
              <>
                Show More ({news.length - 2} more) <ChevronDown className="w-4 h-4 animate-bounce" />
              </>
            )}
          </button>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(155, 155, 155, 0.7);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StockNews;