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
        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
      );
    }

    if (!userProfile) {
      return (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">?</span>
        </div>
      );
    }

    if (userProfile.picture) {
      return (
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={userProfile.picture}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-semibold border-2 border-gray-200">
        {getInitials(userProfile.name)}
      </div>
    );
  };

  return (
    <div className="shadow-md sticky">
      <div className="flex flex-wrap items-center justify-between px-4 md:px-6 lg:px-10 py-2">
        <LogoExample size={10} />

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-0 h-auto hover:bg-transparent">
                <ProfileIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              {error ? (
                <div className="p-2 text-sm text-red-500">
                  {error}
                </div>
              ) : (
                <>
                  <div className="flex flex-col space-y-1 p-2 border-b">
                    <p className="text-sm font-medium leading-none">
                      {isLoading ? 'Loading...' : userProfile?.name}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
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
  );
};

export default HomeNavBar;
