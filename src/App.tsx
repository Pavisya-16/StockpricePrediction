import React from "react";
import LandingPage from './Pages/LandingPage';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import MainPage from './Pages/MainPage';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import SearchMain from './Pages/SearchMain';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthRedirect } from "./Pages/AuthRedirect";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/LandingPage" element={<LandingPage />} />
                
                {/* Wrap auth routes with AuthRedirect */}
                <Route path="/Signin" element={
                    <AuthRedirect>
                        <Signin />
                    </AuthRedirect>
                } />
                <Route path="/Signup" element={
                    <AuthRedirect>
                        <Signup />
                    </AuthRedirect>
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Protected Routes */}
                <Route path="/MainPage" element={
                    <ProtectedRoute>
                        <MainPage />
                    </ProtectedRoute>
                } />
                <Route path="/search" element={
                    <ProtectedRoute>
                        <SearchMain />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
