import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo.webp'
const LogoExample = ({ className }) => {
  return (
    <Link to="/" className="block">
      <img
        src={img}
        alt="StockVision Logo"
        className={`
          rounded-2xl
          h-8 w-auto         /* Default size for mobile */
          sm:h-10            /* Small screens */
          md:h-12            /* Medium screens */
          lg:h-14            /* Large screens */
          transition-all duration-200 hover:scale-105
          ${className}
        `}
        style={{
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
        }}
      />
    </Link>
  );
};

export default LogoExample;