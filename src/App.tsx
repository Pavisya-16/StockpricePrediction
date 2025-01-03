import React from 'react';
import LandingPage from './Pages/LandingPage';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import MainPage from './Pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import StockSearch from './Pages/StockSearch';
import SearchMain from './Pages/SearchMain';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search" element={<SearchMain />} />
        </Routes>
      </Router>
  );
};

export default App;
