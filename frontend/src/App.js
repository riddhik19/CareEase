import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import MyRequests from './pages/MyRequests';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ServiceDetail from './pages/ServiceDetail';

function AppContent() {
  const location = useLocation();
  const userName = localStorage.getItem('userName') || '';
  const hideNavbarPaths = ['/', '/login', '/register', '/service-detail'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar userName={userName} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;