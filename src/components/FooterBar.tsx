import React from "react";
import { CiMail } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa6";
import { MdOutlineLightbulbCircle } from "react-icons/md";

const FooterBar = () => {
  return (
    <footer className="bg-black text-white py-6 mt-7 ">
      <div className="container mx-auto px-4">
        {/* Flex Container with Column Layout */}
        <div className="flex flex-column md:flex-row justify-between items-start space-y-6 md:space-y-0">
          {/* Email Icon and Text */}
          <div className="flex  space-x-2">
            <CiMail size={20} />
            <span className="font-extralight">StockVisionprediction@gmail.com</span>
          </div>
          {/* Address Icon and Text */}
          <div className="flex space-x-2">
            <FaRegAddressCard size={20} />
            <span className="font-extralight">25th Street, Effiel Garder, Paris</span>
          </div>
          {/* Copyright Icon and Text */}
          <div className="flex space-x-2">
            <span className="font-extralight" >Copyright © 2025 StockVision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
