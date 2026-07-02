import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { currentUser } from '../data';
import { useAppContext } from '../context/AppContext';

import iconDashboard from '../assets/sidebar_icon_dashboard.png';
import iconCases from '../assets/sidebar_icon_cases.png';
import iconExperts from '../assets/sidebar_icon_experts.png';
import iconCategories from '../assets/sidebar_icon_categories.png';
import iconSettings from '../assets/sidebar_icon_settings.png';
import iconProfile from '../assets/profile_icon_pandey.png';

const Sidebar = () => {
  const { isExpanded, toggleExpanded, userRole, loggedInUser } = useAppContext();
  const location = useLocation();
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeItem = navRef.current.querySelector('.nav-item.active');
        if (activeItem) {
          setIndicatorStyle({
            top: activeItem.offsetTop,
            height: activeItem.offsetHeight,
            opacity: 1
          });
        }
      }
    };
    const timeout = setTimeout(updateIndicator, 50);
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isExpanded ? '' : 'collapsed'}`}>
      <div className="sidebar-bg-image"></div>
      
      <div className="sidebar-logo" onClick={toggleExpanded} style={{ cursor: 'pointer' }}>cencops</div>
      
      <div className="sidebar-separator"></div>
      
      <div className="sidebar-section-title">WORKSPACE</div>
      
      <div className="nav-links" ref={navRef}>
        <div className="nav-active-indicator" style={{
          position: 'absolute',
          left: 0,
          width: '220px',
          top: indicatorStyle.top,
          height: indicatorStyle.height,
          opacity: indicatorStyle.opacity,
          background: 'var(--bg-light)',
          borderRadius: '10px 0 0 10px',
          marginLeft: '-15px',
          transition: 'top 0.5s cubic-bezier(0.25, 1, 0.5, 1), height 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          zIndex: 0
        }}>
          <div className="nav-curve-top"></div>
          <div className="nav-curve-bottom"></div>
        </div>

        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <img src={iconDashboard} alt="Dashboard" style={{ width: 18, height: 18, objectFit: 'contain' }} />
          Dashboard
        </NavLink>
        
        {userRole === 'admin' && (
          <>
            <NavLink to="/cases" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <img src={iconCases} alt="Cases" style={{ width: 18, height: 18, objectFit: 'contain' }} />
              Cases
            </NavLink>
            
            <NavLink to="/experts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <img src={iconExperts} alt="Experts" style={{ width: 18, height: 18, objectFit: 'contain' }} />
              Experts
            </NavLink>
            
            <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <img src={iconCategories} alt="Categories" style={{ width: 18, height: 18, objectFit: 'contain' }} />
              Categories
            </NavLink>
          </>
        )}
        
        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <img src={iconSettings} alt="Settings" style={{ width: 18, height: 18, objectFit: 'contain' }} />
          Settings
        </NavLink>
      </div>
      
      <div className="user-profile">
        <div className="user-avatar" style={{ overflow: 'hidden' }}>
          <img src={iconProfile} alt="Profile" style={{ width: '50%', height: '50%', objectFit: 'cover' }} />
        </div>
        <div className="user-name">{loggedInUser || 'User'}</div>
      </div>
    </div>
  );
};

export default Sidebar;
