import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultIcon from '../assets/svgviewer-png-output.png';
import dropicon from '../assets/image.png';
import './topbar.css';
import { useAppContext } from '../context/AppContext';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { isExpanded, toggleExpanded, selectedDepartment, setSelectedDepartment, setGlobalSearchTerm, setIsCreateCaseModalOpen, setIsRegisterOfficerModalOpen, setIsAddDepartmentModalOpen, departments, officers, tasks } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalQuery, setGlobalQuery] = useState('');
  const dropdownRef = useRef(null);
  const globalSearchRef = useRef(null);

  const categories = ['All', ...departments.map(d => d.name)];

  const filteredCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
      if (globalSearchRef.current && !globalSearchRef.current.contains(event.target)) {
        setGlobalQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const globalSearchResults = [];
  if (globalQuery.length > 0) {
    const q = globalQuery.toLowerCase();
    
    tasks.forEach(t => {
      if (t.task.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q) || t.orderId.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Task: ${t.task}`, subtitle: `Assigned: ${t.assignedTo}`, page: 'Tasks', link: '/tasks', department: t.department });
      }
    });

    officers.forEach(o => {
      if (o.name.toLowerCase().includes(q) || o.email.toLowerCase().includes(q) || o.badge.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Officer: ${o.name}`, subtitle: `Badge: ${o.badge}`, page: 'Officers', link: '/officers', department: o.department });
      }
    });

    departments.forEach(d => {
      if (d.name.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Category: ${d.name}`, subtitle: `Cases: ${d.tasks}`, page: 'Departments', link: '/departments', department: d.name });
      }
    });

    const settingsKeywords = ['email', 'alerts', 'push', 'notifications', 'tilak', 'kumar', 'pandey', 'chd-007', 'settings', 'profile'];
    if (settingsKeywords.some(kw => kw.includes(q) || q.includes(kw))) {
      globalSearchResults.push({ title: `Settings: Profile & Alerts`, subtitle: `Account Preferences`, page: 'Settings', link: '/settings', department: selectedDepartment });
    }
  }

  const handleGlobalSearchClick = (res, event) => {
    event.stopPropagation(); // Prevent the document click listener from instantly clearing the highlight
    setGlobalSearchTerm(globalQuery);
    setGlobalQuery('');
    if (res.department && res.department !== selectedDepartment) {
      setSelectedDepartment(res.department);
    }
    navigate(res.link);
  };

  let headerActions = null;
  let currentIcon = <img src={defaultIcon} alt="icon" style={{width: 16, height: 16}} />;
  let drpicon = <img src={dropicon} alt="icon" style={{width: 16, height: 16}} />; 

  let onBtnClick = () => {};

  if (path === '/officers' || path === '/dashboard' || path === '/departments') {
    let btnText = "Manage Officers";
    onBtnClick = () => navigate('/officers');
    if (path === '/officers') {
      btnText = "Register Officer";
      currentIcon = "+";
      onBtnClick = () => setIsRegisterOfficerModalOpen(true);
    } else if (path === '/departments') {
      btnText = "Add Department";
      currentIcon = "+";
      onBtnClick = () => setIsAddDepartmentModalOpen(true);
    }
    headerActions = (
      <button className="dropdown-btn" onClick={onBtnClick}>
        <span>{currentIcon}</span>
        {btnText}
      </button>
    );
  } else if (path === '/tasks') {
    headerActions = (
      <button className="dropdown-btn" onClick={() => setIsCreateCaseModalOpen(true)}>
        <span>+</span>
        Register Case
      </button>
    );
  } else if (path === '/settings') {
    headerActions = (
      <button className="dropdown-btn" onClick={() => window.location.reload()}>
        <span style={{ width: 16, height: 16, display: 'inline-block' }}></span>
        Log out
      </button>
    );
  }

  return (
    <div className="topbar">
      <div 
        className={`sidebar-logo black-logo ${isExpanded ? 'expanded' : 'collapsed'}`} 
        onClick={toggleExpanded} 
      >
        cencops
      </div>
      
      <div className={`cat-dropdown-container ${isExpanded ? 'expanded' : 'collapsed'}`} ref={dropdownRef} style={{ zIndex: 100 }}>
        <button 
          className={`dropdown-btn ${isOpen ? 'open' : ''}`}
          onClick={() => { setIsOpen(!isOpen); setSearchQuery(''); }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {drpicon}{selectedDepartment}
          </span>
          <span style={{fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', display: 'inline-block'}}>▼</span>
        </button>

        {isOpen && (
          <div className="cat-dropdown-menu">
            <ul className="cat-dropdown-list">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, index) => (
                  <li key={index} className="cat-dropdown-item" onClick={() => { setSelectedDepartment(cat); setIsOpen(false); setSearchQuery(''); }}>
                    <span className="cat-bullet">•</span> <span className="cat-text">{cat}</span>
                  </li>
                ))
              ) : (
                <li className="cat-dropdown-item" style={{ color: '#888', cursor: 'default' }}>No categories found</li>
              )}
            </ul>
            <div className="cat-dropdown-search">
              <svg className="cat-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search categories" 
                className="cat-search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      
      {headerActions}
      
      <div className="search-bar" ref={globalSearchRef} style={{ position: 'relative' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={globalQuery}
          onChange={(e) => setGlobalQuery(e.target.value)}
        />
        {globalQuery.length > 0 && (
          <div className="global-search-dropdown" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#E7E7E7',
            border: '1px solid #D1D1D1',
            borderRadius: '15px',
            marginTop: '10px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px 0' }}>
              {globalSearchResults.length > 0 ? (
                globalSearchResults.map((res, index) => (
                  <li 
                    key={index} 
                    style={{ 
                      padding: '10px 20px', 
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: index < globalSearchResults.length - 1 ? '1px solid #D1D1D1' : 'none'
                    }}
                    onClick={(event) => handleGlobalSearchClick(res, event)}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>{res.title}</span>
                      <span style={{ fontSize: '12px', color: '#616161' }}>{res.subtitle}</span>
                    </div>
                    <span style={{ 
                      fontSize: '11px', 
                      background: '#fff', 
                      padding: '2px 8px', 
                      borderRadius: '10px',
                      border: '1px solid #D1D1D1',
                      color: '#616161'
                    }}>
                      {res.page}
                    </span>
                  </li>
                ))
              ) : (
                <li style={{ padding: '10px 20px', color: '#888', fontSize: '14px' }}>No matches found</li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      <div className="icon-btn">
        <span style={{border: '1.25px solid #5E594B', width: 15, height: 16, display: 'inline-block'}}></span>
      </div>
    </div>
  );
};

export default Topbar;
