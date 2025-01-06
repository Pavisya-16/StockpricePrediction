import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoExample from './Logo';
import { fetchUserProfile } from '@/services/auth.service';
import { ThemeToggle } from './ThemeProvider';
import stock3 from '../assets/stocks4.jpg';

const HomeNavBar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const getUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const profile = await fetchUserProfile();

        if (isMounted) {
          setUserProfile(profile);
          console.log('User profile fetched successfully:', profile);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || 'Failed to fetch user profile');
          console.error('Error fetching user profile:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem('accessToken'); // Remove the authentication token
    localStorage.removeItem('user'); // Remove the authentication token
    navigate('/Signin'); // Redirect to the Signin page
  };

  const ProfileIcon = () => {
    if (isLoading) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      );
    }
    // else
    // {
    //   return (
    //     <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
    //       <span className="text-gray-500">
    //       <img src={stock3} className="w-full h-full object-cover" alt="Stock Forecast" />
    //       </span>
    //     </div>
    //   );
    // }

    if (!userProfile) {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">
            <img src={stock3} className="w-full h-full object-cover" alt="Stock Forecast" />
          </span>
        </div>
      );
    }

    if (userProfile.picture) {
      return (
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={userProfile.picture}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-gray-200">
        {getInitials(userProfile.name)}
      </div>
    );
  };

  return (
    <div className="shadow-md sticky top-0 bg-white dark:bg-gray-900 z-50">
    <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-10 py-2">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <LogoExample size={8} />
        <h1 className="text-2xl md:text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 via-slate-950 to-indigo-600 dark:bg-gradient-to-r dark:from-violet-500 dark:via-black dark:via-white dark:to-blue-500">
          STOCK<span className="text-5xl text-slate-900 dark:text-white font-extrabold">V</span>ISION
        </h1>
      </div>
  
      {/* Right Section */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
        {/* Theme Toggle */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <ThemeToggle />
        </div>
  
        {/* Profile Dropdown */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start mt-2 sm:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <ProfileIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              {error ? (
                <div className="p-2 text-sm text-red-500">{error}</div>
              ) : (
                <>
                  <div className="flex flex-col space-y-1 p-2 border-b">
                    <p className="text-sm font-medium">
                      {isLoading ? 'Loading...' : userProfile?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isLoading ? 'Loading...' : userProfile?.email}
                    </p>
                  </div>
                  <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-100">
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 cursor-pointer hover:bg-gray-100">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="py-2 cursor-pointer hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default HomeNavBar;
