import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Logout';
import Logout from './components/Auth/Sighup';
import AdminDashboard from './components/Admin/AdminDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import UserDashboard from './components/User/UserDashboard';
import Header from './components/Shared/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Dashboard Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/vendor/*" element={<VendorDashboard />} />
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
