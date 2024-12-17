import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { GiBurningEmbers } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { BiLogOutCircle } from 'react-icons/bi';

const MainPage = () => {
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-black shadow-md sticky top-0 z-50 max-h-full">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <GiBurningEmbers size={28} className="text-white" />
            <span className="text-lg sm:text-xl md:text-2xl font-normal text-white">
              STOCK VISION
            </span>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-black via-blue-500 to-purple-500 text-white px-3 py-2 font-normal text-xs sm:text-base md:text-lg"
                >
                  Your Profile <CgProfile size={20} />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>

            {/* Logout Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-slate-500 border-gray-300 px-3 py-2 font-light text-xs sm:text-base md:text-lg"
                >
                  Log Out <BiLogOutCircle size={20} />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
