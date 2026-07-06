import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import defaultIcon from '../assets/svgviewer-png-output.png';
import dropicon from '../assets/image.png';
import iconNotifications from '../assets/topbar_icon_notifications.png';
import iconLogout from '../assets/topbar_icon_logout.png';
import iconRefresh from '../assets/topbar_icon_refresh.png';
import './topbar.css';
import { useAppContext } from '../context/AppContext';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { isExpanded, toggleExpanded, selectedCategory, setSelectedCategory, setGlobalSearchTerm, setIsCreateCaseModalOpen, setIsRegisterExpertModalOpen, setIsAddCategoryModalOpen, categories, experts, cases, userRole, setActiveNotificationCaseId, loggedInUser } = useAppContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [globalQuery, setGlobalQuery] = useState('');
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const globalSearchRef = useRef(null);

  const categoryList = ['All', ...categories.map(d => d.name)];

  const filteredCategories = categoryList.filter(cat => 
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
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
    
    cases.forEach(t => {
      const title = t.title || '';
      const assignedTo = t.assigned_to || '';
      const orderId = t.order_id || '';
      if (title.toLowerCase().includes(q) || assignedTo.toLowerCase().includes(q) || orderId.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Case: ${title}`, subtitle: `Assigned: ${assignedTo}`, page: 'Cases', link: '/cases', category: t.category });
      }
    });

    experts.forEach(o => {
      const name = o.name || '';
      const email = o.email || '';
      const badge = o.badge_number || '';
      if (name.toLowerCase().includes(q) || email.toLowerCase().includes(q) || badge.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Expert: ${name}`, subtitle: `Badge: ${badge}`, page: 'Experts', link: '/experts', category: o.category });
      }
    });

    categories.forEach(d => {
      const name = d.name || '';
      if (name.toLowerCase().includes(q)) {
        globalSearchResults.push({ title: `Category: ${name}`, subtitle: `Cases: ${cases.filter(c => c.category_id === d.id).length}`, page: 'Categories', link: '/categories', category: name });
      }
    });

    const settingsKeywords = ['email', 'alerts', 'push', 'notifications', 'tilak', 'kumar', 'pandey', 'chd-007', 'settings', 'profile'];
    if (settingsKeywords.some(kw => kw.includes(q) || q.includes(kw))) {
      globalSearchResults.push({ title: `Settings: Profile & Alerts`, subtitle: `Account Preferences`, page: 'Settings', link: '/settings', category: selectedCategory });
    }
  }

  const handleGlobalSearchClick = (res, event) => {
    event.stopPropagation(); // Prevent the document click listener from instantly clearing the highlight
    setGlobalSearchTerm(globalQuery);
    setGlobalQuery('');
    if (res.category && res.category !== selectedCategory) {
      setSelectedCategory(res.category);
    }
    navigate(res.link);
  };

  let headerActions = null;
  let currentIcon = <img src={defaultIcon} alt="icon" style={{width: 16, height: 16}} />;
  let drpicon = <img src={dropicon} alt="icon" style={{width: 16, height: 16}} />; 

  let onBtnClick = () => {};


const handleLogout = async () => {
  try {
    await axios.post('/api/logout');
  } catch(e) {
    console.error(e);
  } finally {
    window.location.reload();
  }
};

  if (userRole === 'admin') {
    if (path === '/experts' || path === '/dashboard' || path === '/categories') {
      let btnText = "Manage Experts";
      onBtnClick = () => navigate('/experts');
      if (path === '/experts') {
        btnText = "Register Expert";
        currentIcon = "+";
        onBtnClick = () => setIsRegisterExpertModalOpen(true);
      } else if (path === '/categories') {
        btnText = "Add Category";
        currentIcon = "+";
        onBtnClick = () => setIsAddCategoryModalOpen(true);
      }
      headerActions = (
        <button className="dropdown-btn" onClick={onBtnClick}>
          <span>{currentIcon}</span>
          {btnText}
        </button>
      );
    } else if (path === '/cases') {
      headerActions = (
        <button className="dropdown-btn" onClick={() => setIsCreateCaseModalOpen(true)}>
          <span>+</span>
          Register Case
        </button>
      );
    } else if (path === '/settings') {
      headerActions = (
        <button className="dropdown-btn" onClick={handleLogout}>
          <img src={iconLogout} alt="Logout" style={{ width: 16, height: 16, filter: 'brightness(0)' }} />
          Log out
        </button>
      );
    }
  } else {
    // User Role Actions
    if (path === '/dashboard') {
      headerActions = (
        <div className={`user-header-action ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <button className="dropdown-btn" onClick={() => window.location.reload()} style={{ width: '220px', justifyContent: 'center' }}>
            <img src={iconRefresh} alt="Refresh" style={{ width: 16, height: 16, filter: 'brightness(0)' }} />
            Refresh
          </button>
        </div>
      );
    } else if (path === '/settings') {
      headerActions = (
        <div className={`user-header-action ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <button className="dropdown-btn" onClick={handleLogout} style={{ width: '220px', justifyContent: 'center' }}>
            <img src={iconLogout} alt="Logout" style={{ width: 16, height: 16, filter: 'brightness(0)' }} />
            Log out
          </button>
        </div>
      );
    }
  }

  return (
    <div className="topbar">
      <div 
        className={`sidebar-logo black-logo ${isExpanded ? 'expanded' : 'collapsed'}`} 
        onClick={toggleExpanded} 
      >
        cencops
      </div>
      
      {userRole === 'admin' && (
        <div className={`cat-dropdown-container ${isExpanded ? 'expanded' : 'collapsed'}`} ref={dropdownRef} style={{ zIndex: 100 }}>
          <button 
            className={`dropdown-btn ${isOpen ? 'open' : ''}`}
            onClick={() => { setIsOpen(!isOpen); setSearchQuery(''); }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {drpicon}{selectedCategory}
            </span>
            <span style={{fontSize: 10, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', display: 'inline-block'}}>▼</span>
          </button>
  
          {isOpen && (
            <div className="cat-dropdown-menu">
              <ul className="cat-dropdown-list">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, index) => (
                    <li key={index} className="cat-dropdown-item" onClick={() => { setSelectedCategory(cat); setIsOpen(false); setSearchQuery(''); }}>
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
      )}
      
      {headerActions}
      
      <div className="search-bar" ref={globalSearchRef} style={{ position: 'relative', width: userRole === 'admin' ? '48%' : '55%', marginLeft: userRole === 'admin' ? '0' : '20px' }}>
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
      
      <div className="icon-btn" ref={notifRef} onClick={() => setIsNotifOpen(!isNotifOpen)} style={{ position: 'relative' }}>
        <img src={iconNotifications} alt="Notifications" style={{ width: 20, height: 20, objectFit: 'contain', filter: 'brightness(0)' }} />
        {isNotifOpen && (
          <div className="global-search-dropdown" style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: '250px',
            background: '#E7E7E7',
            border: '1px solid #D1D1D1',
            borderRadius: '15px',
            marginTop: '10px',
            padding: '10px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', paddingBottom: '5px', borderBottom: '1px solid #ccc' }}>
              {userRole === 'admin' ? 'Sent Notifications' : 'Received Notifications'}
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {userRole === 'admin' ? (
                <>
                  {cases.filter(c => c.status === 'PENDING').length > 0 ? (
                    cases.filter(c => c.status === 'PENDING').map((pendingCase) => (
                      <li key={pendingCase.id} style={{ padding: '8px 0', borderBottom: '1px solid #ddd', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>Case {pendingCase.order_id} assigned to {pendingCase.assigned_to}</div>
                        <div className="report-view" style={{ cursor: 'pointer', transform: 'scale(0.8)', margin: 0 }} onClick={(e) => { e.stopPropagation(); window.open(`/api/files/order/${pendingCase.id}`, '_blank'); }}>
                          <div className="eye-icon-container">
                            <Eye size={12} color="#fff" />
                          </div>
                          <span>view</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li style={{ padding: '8px 0', fontSize: '12px', color: '#888' }}>No new assignments.</li>
                  )}
                </>
              ) : (
                <>
                  {cases.filter(c => c.assignees_list?.some(a => a.name === loggedInUser) && c.status === 'PENDING').length > 0 ? (
                    cases.filter(c => c.assignees_list?.some(a => a.name === loggedInUser) && c.status === 'PENDING').map((pendingCase) => (
                      <li key={pendingCase.id} style={{ padding: '8px 0', borderBottom: '1px solid #ddd', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          onClick={() => {
                            setActiveNotificationCaseId(pendingCase.id);
                            setIsNotifOpen(false);
                            navigate('/dashboard');
                          }}>
                        <div>New case assigned: {pendingCase.title}</div>
                        <div className="report-view" style={{ cursor: 'pointer', transform: 'scale(0.8)', margin: 0 }} onClick={(e) => { e.stopPropagation(); window.open(`/api/files/order/${pendingCase.id}`, '_blank'); }}>
                          <div className="eye-icon-container">
                            <Eye size={12} color="#fff" />
                          </div>
                          <span>view</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li style={{ padding: '8px 0', fontSize: '12px', color: '#888' }}>No new notifications.</li>
                  )}
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
