import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Experts from './pages/Experts';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import { AppProvider, useAppContext } from './context/AppContext';
import CreateCaseModal from './components/CreateCaseModal';
import RegisterExpertModal from './components/RegisterExpertModal';
import AddCategoryModal from './components/AddCategoryModal';
import EditExpertModal from './components/EditExpertModal';
import EditCategoryModal from './components/EditCategoryModal';
import './index.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content" style={{ position: 'relative' }}>
        <img src="/image.png" className="bg-watermark" alt="Background Watermark" />
        <Topbar />
        {children}
      </div>
    </div>
  );
};


const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { userRole, setUserRole, setLoggedInUser, setUserProfile } = useAppContext();

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/me');
        const data = response.data;
        setUserRole(data.user.role);
        setLoggedInUser(data.user.name);
        setUserProfile(data.user);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, [setUserRole, setLoggedInUser]);

  if (isCheckingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#e3ddcc' }}>Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      <Router>
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          {userRole === 'admin' && (
            <>
              <CreateCaseModal />
              <RegisterExpertModal />
              <AddCategoryModal />
              <EditExpertModal />
              <EditCategoryModal />
            </>
          )}
          
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            
            {/* Admin-only routes */}
            {userRole === 'admin' && (
              <>
                <Route path="/cases" element={<Layout><Cases /></Layout>} />
                <Route path="/experts" element={<Layout><Experts /></Layout>} />
                <Route path="/categories" element={<Layout><Categories /></Layout>} />
              </>
            )}
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </>
      )}
      </Router>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
