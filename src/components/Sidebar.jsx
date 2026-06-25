import React from 'react';
import { NavLink } from 'react-router-dom';
import { currentUser } from '../data';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { isExpanded, toggleExpanded } = useAppContext();

  return (
    <div className={`sidebar ${isExpanded ? 'collapsed' : ''}`}>
      <div className="sidebar-bg-image"></div>
      
      <div className="sidebar-logo" onClick={toggleExpanded} style={{ cursor: 'pointer' }}>cencops</div>
      
      <div className="sidebar-separator"></div>
      
      <div className="sidebar-section-title">WORKSPACE</div>
      
      <div className="nav-links">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon" style={{border: '1px solid currentColor'}}></div>
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon" style={{border: '1px solid currentColor'}}></div>
          Tasks
        </NavLink>
        
        <NavLink 
          to="/officers" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon" style={{border: '1px solid currentColor', borderRadius: '50%'}}></div>
          Officers
        </NavLink>
        
        <NavLink 
          to="/departments" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon" style={{border: '1px solid currentColor'}}></div>
          Departments
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon" style={{border: '1px solid currentColor', borderRadius: '5px'}}></div>
          Settings
        </NavLink>
      </div>
      
      <div className="user-profile">
        <div className="user-avatar">
          {/* Avatar Icon */}
          <div style={{width: 16, height: 16, background: '#000'}}></div>
        </div>
        <div className="user-name">{currentUser}</div>
      </div>
    </div>
  );
};

export default Sidebar;
