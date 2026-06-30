import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import MyRequests from './pages/MyRequests';
import Navbar from './components/Navbar';

function AppContent({ userName, setUserName }) {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar userName={userName} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              userName={userName}
              setUserName={setUserName}
            />
          }
        />
        <Route
          path="/my-requests"
          element={<MyRequests userName={userName} />}
        />
      </Routes>
    </>
  );
}

function App() {
  const [userName, setUserName] = useState('');

  return (
    <BrowserRouter>
      <AppContent userName={userName} setUserName={setUserName} />
    </BrowserRouter>
  );
}

export default App;