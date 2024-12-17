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
import { GiPayMoney } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3 md:px-8 lg:px-24">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <GiBurningEmbers size={36} className="text-black-500" />
          <span className="text-xl md:text-2xl font-semibold text-gray-800">
            STOCK VISION
          </span>
        </div>

        {/* Dropdown Menus */}
        <div className="flex flex-wrap items-center space-x-4 md:space-x-6">
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
              <Button variant="outline" className="text-gray-800 border-gray-300">
                Get Connected
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
            <Link to="Signin">
              <DropdownMenuItem>
                Log In
                <DropdownMenuShortcut>
                  <FiLogIn size={24} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link to="Signup">
              <DropdownMenuItem>
                Sign Up
                <DropdownMenuShortcut>
                  <LuUserRoundPlus size={24} />
                </DropdownMenuShortcut>
              </DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
