// src/components/Chart/DonutChart.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DonutChart = ({ value, maxValue, label, color }) => {
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100">
          <motion.circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <span className="text-lg font-bold group-hover:scale-110 transition-transform">
            {percentage.toFixed(0)}%
          </span>
        </motion.div>
      </div>
      <motion.span
        className="mt-2 text-sm font-medium text-gray-600 group-hover:text-sky-700 dark:group-hover:text-teal-200 transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {label}
      </motion.span>
    </div>
  );
};

export default DonutChart;