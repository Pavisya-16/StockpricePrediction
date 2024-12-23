import React from 'react'
import LandingPage from './Pages/LandingPage'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';


const App = () => {
  

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={ <LandingPage/>} />
        <Route path="/LandingPage" element={ <LandingPage/>} />
        {/* <GoogleOAuthProvider clientId ={""}>
            <Route path="/Signin" element={<Signin/>} />
        </GoogleOAuthProvider> */}
       
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Signup" element={< Signup />} />
        <Route path="/MainPage" element={< MainPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
