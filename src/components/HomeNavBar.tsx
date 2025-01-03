import React from 'react';
import { Button } from '@/components/ui/button';
import { GiTorch } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';
import { Home, Link } from 'lucide-react';
import { VscSearch } from 'react-icons/vsc';

const HomeNavBar = () => {
  return (
    <>
      {/* Navbar Section */}
      <div className=" sticky">
        <div className="flex flex-wrap items-center justify-between px-4 md:px-6 lg:px-10 py-2">
        {/* Logo Section */}
              <div className="flex items-center md:text-3xl font-semibold py-2 ">
                <GiTorch  size={56} className=" mr-5  text-white bg-gradient-to-r  from-black via-blue-500 to-purple-500 p-3 rounded-full hover:text-black transition duration-300" /> 
                  {/* Input Field with Search Icon */}
                  <div className="relative w-fit">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg pl-12"
                />
                {/* Search Icon */}
                <VscSearch
                  size={20}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500"
                />
              </div>
              </div>  
              

          {/* Buttons Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Profile Dropdown */}
            <Button
              variant="outline"
              className="bg-gradient-to-r from-black via-blue-500 to-purple-500 text-white px-3 py-2 font-medium text-xs sm:text-base md:text-lg flex items-center"
            >
              Your Profile <CgProfile size={20} className="ml-1" />
            </Button>

            {/* Logout Button */}
            <Button
              variant="outline"
              className="text-slate-500 border-gray-300 px-3 py-2 font-light text-xs sm:text-base md:text-lg flex items-center"
            >
              Log Out <BiLogOutCircle size={20} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNavBar;
