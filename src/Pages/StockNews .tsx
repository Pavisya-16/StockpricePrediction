import React, { useState, useEffect } from "react";
import { Clock, Newspaper, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { fetchNews } from "@/services/stock.service";
import StockNewsItem  from "../assets/Bitcoin 1.png";

const StockNewsCarousel = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const INTERVAL_TIME = 5000;

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetchNews(symbol, 10);
        setNews(response.news_items);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchNewsData();
    }
  }, [symbol]);

  useEffect(() => {
    if (!isPaused && news.length > 0) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, INTERVAL_TIME);

      return () => clearInterval(slideInterval);
    }
  }, [news.length, isPaused]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleNewsClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 w-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading news: {error}</div>;
  }

  // if (!news.length) {
  //   return <div className="text-gray-500">No news available</div>;
  // }
  // if (!news.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center text-gray-500 py-10">
  //       <img
  //         src={StockNewsItem}
  //         alt="No News"
  //         className="w-32 h-32 opacity-70 animate-pulse"
  //       />
  //       <p className="mt-4 text-lg font-medium">No news available</p>
  //     </div>
  //   );
  // }
  if (!news.length) {
    return (
      <div className="flex flex-col  items-center justify-center py-4">
     <img
      src={StockNewsItem}
      className="w-60 h-40 object-cover rounded-lg shadow-md animate-pulse bg-gray-200 dark:bg-gray-700"
    />
        <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          News Desk is Empty!</p> 
      </div>
    );
  }
 


  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="flex items-center justify-center gap-4 pb-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-700 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-2">
            <Newspaper className="h-8 w-8 text-gray-800 dark:text-gray-200" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Equity Insights: Breaking Updates
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full"
           onMouseEnter={() => setIsPaused(true)}
           onMouseLeave={() => setIsPaused(false)}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-10">
          <div 
            className="h-full bg-gradient-to-r from-pink-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            style={{
              width: isPaused ? '0%' : '100%',
              transition: `width ${INTERVAL_TIME}ms linear`
            }}
          />
        </div>

        {/* News Card */}
        <div 
          onClick={() => handleNewsClick(news[currentIndex].link)}
          className="relative w-full bg-white dark:bg-gray-800 overflow-hidden cursor-pointer"
        >
          <div className="relative h-64">
            <img
              src={news[currentIndex].thumbnail || "/api/placeholder/800/600"}
              alt={news[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-3">
                {news[currentIndex].title}
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-medium text-blue-400">
                  {news[currentIndex].publisher}
                </span>
                <span className="flex items-center gap-1 text-gray-300">
                  <Clock className="h-4 w-4" />
                  {formatDate(news[currentIndex].published)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-all h-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-all h-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 2000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-6 bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockNewsCarousel;