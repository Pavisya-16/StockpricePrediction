import React from "react";
import { CiMail } from "react-icons/ci";
import { FaRegAddressCard, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { MdOutlineLightbulbCircle } from "react-icons/md";

const FooterBar = () => {
  return (
    <div className="mt-36">
    <footer className="relative bg-gradient-to-r from-gray-900 to-black text-white ">
      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">StockVision</h3>
            <p className="text-gray-400 text-sm">
              Empowering investors with AI-driven stock market predictions and analysis.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <CiMail className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" size={20} />
                <a href="mailto:StockVisionprediction@gmail.com" 
                   className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  StockVisionprediction@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaRegAddressCard className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300" size={20} />
                <span className="text-sm text-gray-400">
                  MG Road, Church Street, Bangalore
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <div className="space-y-2">
              {['About Us', 'Services', 'Contact', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <a key={link} 
                   href="#" 
                   className="block text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { Icon: FaTwitter, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaGithub, href: "#" }
              ].map(({ Icon, href }, index) => (
                <a key={index} 
                   href={href}
                   className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                            hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Icon className="text-gray-400 hover:text-white transition-colors duration-300" size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} StockVision. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <a key={item} 
                 href="#" 
                 className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default FooterBar;