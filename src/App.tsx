import React from 'react';
import LandingPage from './Pages/LandingPage';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import MainPage from './Pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="277686266990-aoreajgo5kblj2e0npl3hbjr59j6grdk.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
