import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import { User, ClipboardList, FileText, Check, Eye } from 'lucide-react';
import './dashboard.css';

const Officers = () => {
  const { selectedDepartment, globalSearchTerm, officers, tasks } = useAppContext();
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerList, setOfficerList] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setOfficerList(selectedDepartment === 'All' 
      ? officers 
      : officers.filter(o => o.department === selectedDepartment)
    );
    setSelectedOfficer(null);
  }, [selectedDepartment, officers]);

  useEffect(() => {
    if (selectedOfficer) {
      setActiveTab('profile');
    }
  }, [selectedOfficer]);

  const officerTasks = tasks.filter(t => t.assignedTo === selectedOfficer?.name);
  const reports = officerTasks.map((t, index) => ({
    orderId: t.orderId,
    taskNo: `TASK ${t.id}`,
    title: t.task,
    id: index
  }));

  const getStatusColor = (status) => {
    if (status === 'IN PROGRESS') return '#a61e1e'; // Red
    if (status === 'PENDING') return '#d1d1d1'; // Grey
    if (status === 'DONE') return '#1e2454'; // Dark Blue
    return '#d1d1d1';
  };

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{officerList.length} registered experts in {selectedDepartment}</div>
        <div className="page-title">Experts</div>
      </div>
      
      <div className="dashboard-grid" style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="card-container" style={{ flex: selectedOfficer ? '0 0 65%' : '0 0 100%', transition: 'all 0.5s ease-in-out', height: '560px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{width: '30px', textAlign: 'center'}}></th>
                <th>OFFICER</th>
                <th>BADGE</th>
                <th>DEPARTMENT</th>
                <th>TASKS</th>
              </tr>
            </thead>
            <tbody>
              {officerList.map((officer, index) => (
                <tr 
                  key={officer.id} 
                  style={{ 
                    cursor: 'pointer', 
                    background: selectedOfficer?.id === officer.id ? 'rgba(0,0,0,0.05)' : 'transparent' 
                  }}
                  onClick={() => setSelectedOfficer(selectedOfficer?.id === officer.id ? null : officer)}
                >
                  <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                  <td>
                    <div style={{color: '#000', fontWeight: '400'}}>
                      <Highlight text={officer.name} highlight={globalSearchTerm} />
                    </div>
                    <div style={{color: '#5E594B', fontSize: '10px'}}>
                      <Highlight text={officer.email} highlight={globalSearchTerm} />
                    </div>
                  </td>
                  <td style={{color: '#000'}}>
                    <Highlight text={officer.badge} highlight={globalSearchTerm} />
                  </td>
                  <td style={{color: '#000'}}>{officer.department}</td>
                  <td style={{color: '#000'}}>{officer.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        
        <div 
          className="officers-sidebar" 
          style={{ 
            flex: selectedOfficer ? '0 0 35%' : '0 0 0%', 
            paddingLeft: selectedOfficer ? '20px' : '0px',
            opacity: selectedOfficer ? 1 : 0,
            transform: selectedOfficer ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.5s ease-in-out',
            visibility: selectedOfficer ? 'visible' : 'hidden'
          }}
        >
          {selectedOfficer && (
            <div style={{ width: '100%', paddingTop: '20px', paddingRight: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#f5f5f5', borderRadius: '20px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-code)', fontSize: '12px' }}>
                  {selectedOfficer.name.toUpperCase()}
                  <span 
                    onClick={() => setSelectedOfficer(null)}
                    style={{ cursor: 'pointer', border: '1px solid #ddd', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', color: '#999' }}
                  >×</span>
                </div>
              </div>
              <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: '20px' }} />
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
                <button 
                  className={`action-btn ${activeTab === 'profile' ? 'active' : ''}`}
                  data-hover="[PROFILE]"
                  onClick={() => setActiveTab('profile')}
                >
                  <User size={24} />
                </button>
                <button 
                  className={`action-btn ${activeTab === 'cases' ? 'active' : ''}`}
                  data-hover="[CASES]"
                  onClick={() => setActiveTab('cases')}
                >
                  <ClipboardList size={24} />
                </button>
                <button 
                  className={`action-btn ${activeTab === 'reports' ? 'active' : ''}`}
                  data-hover="[REPORTS]"
                  onClick={() => setActiveTab('reports')}
                >
                  <FileText size={24} />
                </button>
              </div>

              <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: '20px' }} />

              {activeTab === 'profile' && (
                <div className="tab-content profile-tab">
                  <div className="info-grid">
                    <div>
                      <div className="info-label">BADGE</div>
                      <div className="info-value-code">{selectedOfficer.badge}</div>
                    </div>
                    <div>
                      <div className="info-label">RANK</div>
                      <div className="info-value">{selectedOfficer.rank}</div>
                    </div>
                    <div>
                      <div className="info-label">DOB</div>
                      <div className="info-value-code">{selectedOfficer.dob}</div>
                    </div>
                    <div>
                      <div className="info-label">AGE</div>
                      <div className="info-value">{selectedOfficer.age}</div>
                    </div>
                    <div>
                      <div className="info-label">DISTRICT</div>
                      <div className="info-value">{selectedOfficer.district}</div>
                    </div>
                    <div>
                      <div className="info-label">STATE</div>
                      <div className="info-value">{selectedOfficer.state}</div>
                    </div>
                    <div>
                      <div className="info-label">STATUS</div>
                      <div className="info-value">{selectedOfficer.status}</div>
                    </div>
                    <div>
                      <div className="info-label">SPECIALIZATION</div>
                      <div className="info-value">{selectedOfficer.specialization}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cases' && (
                <div className="tab-content cases-tab">
                  <div className="tasks-list">
                    {officerTasks.map((task) => (
                      <div key={task.id} className={`task-item ${task.status === 'DONE' ? 'done' : ''}`}>
                        <div className="task-checkbox">
                          {task.status === 'DONE' && <Check size={12} color="white" />}
                        </div>
                        <div className="task-badge" style={{ backgroundColor: getStatusColor(task.status), color: task.status === 'PENDING' ? '#000' : '#fff' }}>
                          TASK {task.id}
                        </div>
                        <div className="task-title">{task.task}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="tab-content reports-tab">
                  <div className="reports-list">
                    {reports.map((report) => (
                      <div key={report.id} className="report-card">
                        <div className="report-info">
                          <div className="report-id">{report.orderId} / {report.taskNo}</div>
                          <div className="report-title">{report.title}</div>
                        </div>
                        <div className="report-view">
                          <div className="eye-icon-container">
                            <Eye size={12} color="#fff" />
                          </div>
                          <span>view</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Officers;
