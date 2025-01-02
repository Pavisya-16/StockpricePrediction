import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeProvider";
import LogoExample from "@/components/Logo";

const NavBar = () => {
  const [position, setPosition] = React.useState("bottom");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
    <>
      {/* Elite Investments Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="bg-gradient-to-r from-black via-blue-500 to-purple-500 text-white w-full md:w-auto mb-2 md:mb-0"
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
          <Button
            variant="outline"
            className="border-gray-300 w-full md:w-auto mb-2 md:mb-0"
          >
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
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="shadow-md sticky top-0 bg-white dark:bg-gray-900 z-50">
      <div className="px-4 py-3 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0 space-x-2">
          <LogoExample className="max-h-32" />
          <h1 className="text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 via-slate-950 to-indigo-600 dark:bg-gradient-to-r dark:from-violet-500 dark:via-black dark:via-white dark:to-blue-500 drop-shadow-lg">
          STOCK<span className="text-4xl">`</span>VISION
        </h1>
        </div>
                


          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" className="p-2" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <NavLinks />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
