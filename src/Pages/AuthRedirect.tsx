import React from 'react'

import { Navigate } from 'react-router-dom';

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('accessToken'); // Or your auth check method
  
  if (isAuthenticated) {
    return <Navigate to="/search" replace />;
  }
  
  return <>{children}</>;
};
