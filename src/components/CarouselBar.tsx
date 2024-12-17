import React from 'react';
import stock1 from '../assets/insight2.jpg';
import stock3 from '../assets/stock5.jpg';
import stock2 from '../assets/stocks.jpg';

const CarouselBar = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between mt-20 px-4 md:px-16 lg:px-28">
      {/* Left Section - Text Content */}
      <div className="w-full md:w-1/2 font-semibold bg-opacity-50 mb-6 md:mb-0">
        <p className="text-left text-slate-100 text-base md:text-lg font-bold capitalize bg-gradient-to-r from-gray-900 via-slate-600 to-gray-800  p-4 rounded-lg shadow-indigo-600 shadow-md mb-4">
          Accelerate Growth: Discover New Investment Pathways
        </p>
        <p className="text-left text-slate-100 text-base md:text-lg font-bold capitalize bg-gradient-to-r from-gray-900 via-slate-600 to-gray-800 p-4 rounded-lg shadow-indigo-600 shadow-md mb-4">
          Stay Ahead: Revolutionize Trading with New Strategies
        </p>
        <p className="text-left text-slate-100 text-base md:text-lg font-bold capitalize bg-gradient-to-r from-gray-900 via-slate-600 to-gray-800 p-4 rounded-lg shadow-indigo-600 shadow-md">
          Innovate and Grow: Unlock New Opportunities
        </p>
      </div>

      {/* Right Section - Semicircle Arrangement */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-around h-[400px] md:h-[600px] relative">
        {/* Top Span */}
        <span
          className="w-[200px] h-[150px] md:w-[300px] md:h-[200px] rounded-full shadow-lg absolute top-4 right-1/4 md:right-1/3 border-4 border-dashed border-b-zinc-700 shadow-gray-950"
          style={{
            backgroundImage: `url(${stock1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></span>

        {/* Center Span */}
        <span
          className="w-[200px] h-[150px] md:w-[300px] md:h-[200px] rounded-full shadow-lg absolute right-4 md:right-8 border-4 border-dashed border-b-slate-950 shadow-gray-950"
          style={{
            backgroundImage: `url(${stock3})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></span>

        {/* Bottom Span */}
        <span
          className="w-[200px] h-[150px] md:w-[300px] md:h-[200px] rounded-full shadow-lg absolute bottom-4 right-1/4 md:right-1/3 border-4 border-dashed border-b-stone-950 shadow-gray-950"
          style={{
            backgroundImage: `url(${stock2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></span>
      </div>
    </div>
  );
};

export default CarouselBar;
