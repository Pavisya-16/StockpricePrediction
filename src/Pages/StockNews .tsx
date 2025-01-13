import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock, Newspaper } from 'lucide-react';
import { fetchNews } from '@/services/stock.service';

const StockNewsCarousel = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const TRANSITION_DURATION = 800; // 800ms for transition

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
      setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
    }
  }, [isAnimating, news.length]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
      setTimeout(() => setIsAnimating(false), TRANSITION_DURATION);
    }
  }, [isAnimating, news.length]);

  // Auto-play effect
  useEffect(() => {
    let slideInterval;

    if (news.length > 0 && !isPaused) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    }

    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [news.length, isPaused, nextSlide]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetchNews(symbol, 10);
        setNews(response.news_items);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch news');
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
      <div className="space-y-4">
        <div className="animate-pulse flex items-center justify-center gap-3">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-8 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading news: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="flex items-center justify-center gap-4 pb-4 animate-fadeIn">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-2 transform transition-transform duration-700 hover:rotate-12">
            <Newspaper className="h-8 w-8 text-gray-800 dark:text-gray-200 animate-bounce" />
          </div>
        </div>
        <div className="relative group">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-slideIn">
            Equity Insights: Breaking Updates
          </h2>
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 transform origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100"></div>
        </div>
      </div>

      {/* Carousel Section */}
      <div 
        className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-20">
          <div 
            className="h-full bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300"
            style={{
              width: `${isPaused ? 0 : '100%'}`,
              transition: `width ${SLIDE_DURATION}ms linear`,
              animation: isPaused ? 'none' : `progressBar ${SLIDE_DURATION}ms linear infinite`
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-between z-10 px-4">
          <button
            onClick={() => {
              prevSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1000);
            }}
            disabled={isAnimating}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 transform hover:scale-110 hover:-translate-x-1"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 1000);
            }}
            disabled={isAnimating}
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-300 transform hover:scale-110 hover:translate-x-1"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="relative h-full">
          {news.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-800 transform ${
                index === currentIndex 
                  ? 'translate-x-0 opacity-100 scale-100' 
                  : index < currentIndex 
                  ? '-translate-x-full opacity-0 scale-95' 
                  : 'translate-x-full opacity-0 scale-95'
              }`}
            >
              <div className="relative h-full transform transition-transform duration-700 hover:scale-[1.01]">
                <img
                  src={item.thumbnail || '/api/placeholder/800/600'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-700" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-all duration-700 translate-y-0 hover:-translate-y-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-500">
                      {item.title}
                    </h3>
                  </a>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium tracking-wide uppercase text-blue-400">
                      {item.publisher}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Clock className="h-4 w-4" />
                      {formatDate(item.published)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setCurrentIndex(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 1000);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75 hover:w-4'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes progressBar {
          from { width: 0; }
          to { width: 100%; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StockNewsCarousel;