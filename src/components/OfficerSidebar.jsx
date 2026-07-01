import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './OfficerSidebar.css';

const OfficerSidebar = ({ selectedOfficer, setSelectedOfficer }) => {
  const { tasks } = useAppContext();
  const [activeTab, setActiveTab] = useState('PROFILE');

  if (!selectedOfficer) return null;

  // Filter tasks assigned to this officer (using name matching as a simple foreign key for now)
  const officerTasks = tasks.filter(t => t.assignee === selectedOfficer.name || t.expert === selectedOfficer.name);

  // Generate 3 dummy reports for the reports tab
  const dummyReports = [
    { id: 'ORD-2023-1119', taskNo: 'TASK 6', title: 'Retrieve evidence for case 37' },
    { id: 'ORD-2026-0001', taskNo: 'TASK 1', title: 'Sort CDR data by area' },
    { id: 'ORD-2024-6864', taskNo: 'TASK 9', title: 'Convert raw data into insights' },
  ];

  const renderProfile = () => (
    <div className="profile-content">
      <div className="profile-name-title">{selectedOfficer.badge}</div>
      <div className="profile-value">{selectedOfficer.rank || 'Officer'}</div>
      
      <div className="profile-divider"></div>
      
      <div className="profile-info-grid">
        <div>
          <div className="profile-label">BADGE</div>
          <div className="profile-value">{selectedOfficer.badge}</div>
        </div>
        <div>
          <div className="profile-label">RANK</div>
          <div className="profile-value">{selectedOfficer.rank || 'Officer'}</div>
        </div>
        
        <div>
          <div className="profile-label">DOB</div>
          <div className="profile-value">{selectedOfficer.dob || '01-01-1980'}</div>
        </div>
        <div>
          <div className="profile-label">AGE</div>
          <div className="profile-value">{selectedOfficer.age || '40 Years'}</div>
        </div>
        
        <div>
          <div className="profile-label">DISTRICT</div>
          <div className="profile-value">{selectedOfficer.district || 'HQ'}</div>
        </div>
        <div>
          <div className="profile-label">STATE</div>
          <div className="profile-value">{selectedOfficer.state || 'Delhi'}</div>
        </div>
        
        <div>
          <div className="profile-label">STATUS</div>
          <div className="profile-value">Active</div>
        </div>
        <div>
          <div className="profile-label">SPECIALIZATION</div>
          <div className="profile-value">{selectedOfficer.department}</div>
        </div>
      </div>
    </div>
  );

  const renderCases = () => (
    <div className="cases-content">
      {officerTasks.length === 0 && (
        <div style={{ padding: '10px', fontSize: '10px', color: '#666' }}>No active cases.</div>
      )}
      {officerTasks.map(task => {
        const isDone = task.status === 'DONE';
        let statusClass = 'status-pending';
        if (task.status === 'IN PROGRESS') statusClass = 'status-inprogress';
        if (task.status === 'DONE') statusClass = 'status-done';
        
        return (
          <div key={task.id} className={`case-item ${isDone ? 'done' : ''}`}>
            <div className={`case-checkbox ${isDone ? 'done' : ''}`}>
              {isDone && <span style={{ color: '#fff', fontSize: '8px' }}>✓</span>}
            </div>
            <div className={`case-status-indicator ${statusClass}`}>
              {task.id}
            </div>
            <div className="case-title" title={task.title}>
              {task.title}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderReports = () => (
    <div className="reports-content">
      {dummyReports.map((report, idx) => (
        <div key={idx} className="report-item">
          <div className="report-id">{report.id} / {report.taskNo}</div>
          <div className="report-title">{report.title}</div>
          <div className="report-view-btn">
            <div className="report-icon"></div>
            <div className="report-view-text">view</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div 
      className="officer-sidebar-container" 
      style={{ 
        opacity: selectedOfficer ? 1 : 0,
        transform: selectedOfficer ? 'translateX(0)' : 'translateX(50px)',
        transition: 'all 0.5s ease-in-out',
        visibility: selectedOfficer ? 'visible' : 'hidden'
      }}
    >
      <div className="officer-sidebar-header">
        <div className="officer-name-tag">
          {selectedOfficer.name.toUpperCase()}
          <span className="officer-close-btn" onClick={() => setSelectedOfficer(null)}>
            ✕
          </span>
        </div>
      </div>
      
      <div className="officer-tabs">
        <button 
          className={`officer-tab-btn ${activeTab === 'PROFILE' ? 'active' : ''}`}
          onClick={() => setActiveTab('PROFILE')}
        >
          <div className="tab-icon-wrapper">👤</div>
          <div className="tab-text">[PROFILE]</div>
        </button>
        <button 
          className={`officer-tab-btn ${activeTab === 'CASES' ? 'active' : ''}`}
          onClick={() => setActiveTab('CASES')}
        >
          <div className="tab-icon-wrapper">📋</div>
          <div className="tab-text">[CASES]</div>
        </button>
        <button 
          className={`officer-tab-btn ${activeTab === 'REPORTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('REPORTS')}
        >
          <div className="tab-icon-wrapper">📁</div>
          <div className="tab-text">[REPORTS]</div>
        </button>
      </div>

      <div className="officer-tab-content">
        {activeTab === 'PROFILE' && renderProfile()}
        {activeTab === 'CASES' && renderCases()}
        {activeTab === 'REPORTS' && renderReports()}
      </div>
    </div>
  );
};

export default OfficerSidebar;
