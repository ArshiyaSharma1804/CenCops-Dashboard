import React from 'react';
import { currentDepartment } from '../data';
import { useLocation } from 'react-router-dom';
import defaultIcon from '../assets/svgviewer-png-output.png';
import './topbar.css';

const Topbar = () => {
  const location = useLocation();
  const path = location.pathname;

  let headerActions = null;
  let currentIcon = <img src={defaultIcon} alt="icon" style={{width: 16, height: 16}} />;

  if (path === '/officers' || path === '/dashboard' || path === '/departments') {
    let btnText = "Manage Officers";
    if (path === '/officers') {
      btnText = "Register Officer";
      currentIcon = "+";
    } else if (path === '/departments') {
      btnText = "Add Department";
      currentIcon = "+";
    }
    headerActions = (
      <button className="dropdown-btn">
        <span>{currentIcon}</span>
        {btnText}
      </button>
    );
  } else if (path === '/tasks') {
    headerActions = (
      <button className="dropdown-btn">
        <span>+</span>
        New Task
      </button>
    );
  }

  return (
    <div className="topbar">
      
      
      <button className="dropdown-btn">
        <span style={{border: '1.25px solid #5E594B', width: 16, height: 16, display: 'inline-block'}}></span>
        {currentDepartment}
        <span style={{fontSize: 10, marginLeft: 10}}>▼</span>
      </button>
      
      {headerActions}
      
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="icon-btn">
        <span style={{border: '1.25px solid #5E594B', width: 15, height: 16, display: 'inline-block'}}></span>
      </div>
    </div>
  );
};

export default Topbar;
