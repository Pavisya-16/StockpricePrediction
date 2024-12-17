// import React, { useState, useEffect } from 'react';
// import stock1 from '../assets/stocks3.jpg';
// import stock2 from '../assets/stocks4.jpg';
// import stock3 from '../assets/stocks 5.jpg';

// const Body: React.FC = () => {
//   const slides = [
//     {
//       text: 'Stock Analysis Simplified',
//       image: stock1,
//     },
//     {
//       text: 'Stay Ahead in Trading',
//       image: stock2,
//     },
//     {
//       text: 'Empower Your Investments',
//       image: stock3,
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Automatically change slides every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="relative w-[400px] h-[450px] overflow-hidden bg-gray-200 rounded-lg shadow-lg pt-6">
//       {/* Carousel Slides */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{
//           transform: `translateX(-${currentSlide * 100}%)`,
//           width: `${slides.length * 100}%`,
//         }}
//       >
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between w-full h-[450px] px-6"
//             style={{ flex: '0 0 100%' }}
//           >
//             {/* Text Content */}
//             <div className="text-left">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 {slide.text}
//               </h2>
//               <p className="text-gray-600">
//                 Explore insights and make confident investment decisions with
//                 cutting-edge tools and analysis.
//               </p>
//             </div>
//             {/* Image */}
//             <div className="absolute bottom-6 right-6 w-[150px] h-[150px]">
//               <img
//                 src={slide.image}
//                 alt={slide.text}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentSlide ? 'bg-gray-800' : 'bg-gray-400'
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Body;
import React, { useState, useEffect } from 'react';
import stock1 from '../assets/stocks3.jpg';
import stock2 from '../assets/stocks4.jpg';
import stock3 from '../assets/stocks 5.jpg';

const Body: React.FC = () => {
  return (
  <>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  {/* Wrapper div for all sections */}
  <div className="relative w-[500px] h-[400px] bg-white shadow-lg rounded-lg">
    {/* Top div */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md">
      <span>↑ Top Content</span>
    </div>

    {/* Left div */}
    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
      <span>← Left Content</span>
    </div>

    {/* Center div (main content) */}
    <div className="absolute inset-0 flex items-center">
      <p className="text-lg font-bold capitalize text-gray-700 ml-4">
        Center Text Content
      </p>
    </div>

    {/* Right div */}
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
      <span>Right Content →</span>
    </div>

    {/* Bottom div */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-2 rounded-md">
      <span>↓ Bottom Content</span>
    </div>
  </div>
</div>

</>
  )
}
export default Body;