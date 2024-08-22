import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import JobSearchPage from './pages/SearchPage';
import Home from './pages/Home';
import Login from "./pages/Login"
import Register from './pages/Register'
import Profile from "./pages/UserProfile"
import Comprofile from './pages/companyprofile'
import HomePage from './pages/Dasboard'
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Jobs" element={<JobSearchPage />} />
            <Route path="/login" element={< Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" elemment={<Profile />} />
            <Route path="/homepage" element={< HomePage/>} />
            <Route path='/comprofile' element={<Comprofile/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
