// src/components/Chart/PriceRangeIndicator.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PriceRangeIndicator = ({ low, high, current }) => {
  const range = high - low;
  const position = ((current - low) / range) * 100;
  const boundedPosition = Math.min(Math.max(position, 0), 100);

  return (
    <div className="relative">
      <motion.div 
        className="h-2 flex rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-1/3 bg-gradient-to-r from-red-500 to-yellow-500"></div>
        <div className="w-1/3 bg-gradient-to-r from-yellow-500 to-green-500"></div>
        <div className="w-1/3 bg-gradient-to-r from-green-500 to-green-600"></div>
      </motion.div>
      <motion.div 
        className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${boundedPosition}%` }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <div className="w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-lg hover:scale-125 hover:border-blue-700 transition-all duration-300">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              ₹{current.toFixed(2)}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PriceRangeIndicator;