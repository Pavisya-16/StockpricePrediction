import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { LuUserRoundPlus } from "react-icons/lu";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaSearchDollar } from "react-icons/fa";
import { GiPayMoney, GiTorch } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeProvider';
import { VscSearch } from 'react-icons/vsc';

const NavBar = () => {
  const [position, setPosition] = React.useState("bottom");

  return (
    <header className=" shadow-md sticky ">
      <div className=" flex flex-wrap items-center justify-between px-2 py-3 md:px-9 lg:px-5">
        {/* Logo Section */}
        <div className="flex items-center md:text-3xl font-semibold py-1 ">
        STOCK VISION
          <GiTorch  size={56} className=" mr-5  text-white bg-gradient-to-r  from-black via-blue-500 to-purple-500 p-3 rounded-full hover:text-black transition duration-300" /> 
        </div>

        {/* Dropdown Menus */}
        <div className="flex  space-x-2 md:space-x-3">
          {/* Elite Investments Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="bg-gradient-to-r from-black via-blue-500 to-purple-500 text-white"
              >
                Elite Investments <IoIosArrowDropdownCircle />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                Know About Your
                <DropdownMenuShortcut>
                  <FaHandHoldingDollar size={24} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuGroup>
                  <DropdownMenuRadioItem value="1">
                    Stock Forecasts
                    <DropdownMenuShortcut>
                      <BsGraphUpArrow size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2">
                    TickerInsight
                    <DropdownMenuShortcut>
                      <FaSearchDollar size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="3">
                    InvestBid
                    <DropdownMenuShortcut>
                      <GiPayMoney size={20} />
                    </DropdownMenuShortcut>
                  </DropdownMenuRadioItem>
                </DropdownMenuGroup>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Get Connected Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" border-gray-300">
                Get Connected
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
            <Link to="/Signin">
              <DropdownMenuItem>
                Log In
                <DropdownMenuShortcut>
                  <FiLogIn size={24} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link to="/Signup">
              <DropdownMenuItem>
                Sign Up
                <DropdownMenuShortcut>
                  <LuUserRoundPlus size={24} />
                </DropdownMenuShortcut>
              </DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
           

          {/* Theme Change */}
          <span
          className="text-slate-500 border-gray-700 hover:bg-gray-200 dark:text-white p-3 rounded-full border-slate-600 dark:border-gray-300 dark:hover:bg-gray-700 px-3 py-2 transition duration-200 ease-in-out "
        >
          <ThemeToggle />
        </span>

        </div>
      </div>
    </header>
  );
};

export default NavBar;
