import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Officers from './pages/Officers';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import { AppProvider } from './context/AppContext';
import CreateCaseModal from './components/CreateCaseModal';
import RegisterOfficerModal from './components/RegisterOfficerModal';
import AddDepartmentModal from './components/AddDepartmentModal';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppProvider>
      <div className="app-wrapper">
        <Router>
        {!isAuthenticated ? (
          <Login onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <CreateCaseModal />
            <RegisterOfficerModal />
            <AddDepartmentModal />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
              <Route path="/officers" element={<Layout><Officers /></Layout>} />
              <Route path="/departments" element={<Layout><Departments /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </>
        )}
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
