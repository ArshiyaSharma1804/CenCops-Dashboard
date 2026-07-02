import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import { calculateAge } from '../utils';
import { User, ClipboardList, FileText, Check, Eye, Edit2, Trash2 } from 'lucide-react';
import './dashboard.css';

const Experts = () => {
  const { selectedCategory, globalSearchTerm, experts, cases, setEditingExpert, setIsEditExpertModalOpen, removeExpert } = useAppContext();
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [expertList, setExpertList] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  const handleEdit = () => {
    setEditingExpert(selectedExpert);
    setIsEditExpertModalOpen(true);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove ${selectedExpert.name}?`)) {
      removeExpert(selectedExpert.id);
      setSelectedExpert(null);
    }
  };

  useEffect(() => {
    setExpertList(selectedCategory === 'All' 
      ? experts 
      : experts.filter(o => o.category === selectedCategory)
    );
    setSelectedExpert(null);
  }, [selectedCategory, experts]);

  useEffect(() => {
    if (selectedExpert) {
      setActiveTab('profile');
    }
  }, [selectedExpert]);

  const expertCases = cases.filter(t => t.assigned_to_id === selectedExpert?.id);
  const reports = expertCases.filter(t => t.status === 'DONE').map((t, index) => ({
    orderId: t.order_id,
    caseNo: `CASE ${t.id}`,
    title: t.title,
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
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{expertList.length} registered experts in {selectedCategory}</div>
        <div className="page-title">Experts</div>
      </div>
      
      <div className="dashboard-grid" style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="card-container" style={{ flex: selectedExpert ? '0 0 65%' : '0 0 100%', transition: 'all 0.5s ease-in-out', height: '560px', display: 'flex', flexDirection: 'column' }}>
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
              {expertList.map((expert, index) => (
                <tr 
                  key={expert.id} 
                  style={{ 
                    cursor: 'pointer', 
                    background: selectedExpert?.id === expert.id ? 'rgba(0,0,0,0.05)' : 'transparent' 
                  }}
                  onClick={() => setSelectedExpert(selectedExpert?.id === expert.id ? null : expert)}
                >
                  <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                  <td>
                    <div style={{color: '#000', fontWeight: '400'}}>
                      <Highlight text={expert.name} highlight={globalSearchTerm} />
                    </div>
                    <div style={{color: '#5E594B', fontSize: '10px'}}>
                      <Highlight text={expert.email} highlight={globalSearchTerm} />
                    </div>
                  </td>
                  <td style={{color: '#000'}}>
                    <Highlight text={expert.badge_number} highlight={globalSearchTerm} />
                  </td>
                  <td style={{color: '#000'}}>{expert.category}</td>
                  <td style={{color: '#000'}}>{cases.filter(c => c.assigned_to_id === expert.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        
        <div 
          className="experts-sidebar" 
          style={{ 
            flex: selectedExpert ? '0 0 35%' : '0 0 0%', 
            paddingLeft: selectedExpert ? '20px' : '0px',
            opacity: selectedExpert ? 1 : 0,
            transform: selectedExpert ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.5s ease-in-out',
            visibility: selectedExpert ? 'visible' : 'hidden'
          }}
        >
          {selectedExpert && (
            <div style={{ width: '100%', paddingTop: '20px', paddingRight: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px' }}>
                <div style={{ background: '#d5d5d5', borderRadius: '20px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'var(--font-code)', fontSize: '12px' }}>
                  {selectedExpert.name.toUpperCase()}
                  <span 
                    onClick={() => setSelectedExpert(null)}
                    style={{ cursor: 'pointer', border: '1px solid #ddd', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', color: '#999' }}
                  >×</span>
                </div>
                
                <button 
                  onClick={handleEdit}
                  style={{ background: '#e0e0e0', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  title="Edit Expert"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={handleDelete}
                  style={{ background: '#ffdddd', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#d32f2f' }}
                  title="Remove Expert"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: '20px' }} />
              
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
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
                      <div className="info-value-code">{selectedExpert.badge_number}</div>
                    </div>
                    <div>
                      <div className="info-label">RANK</div>
                      <div className="info-value">{selectedExpert.rank}</div>
                    </div>
                    <div>
                      <div className="info-label">DOB</div>
                      <div className="info-value">{selectedExpert.dob}</div>
                    </div>
                    <div>
                      <div className="info-label">AGE</div>
                      <div className="info-value">{calculateAge(selectedExpert.dob)} Years</div>
                    </div>
                    <div>
                      <div className="info-label">DISTRICT</div>
                      <div className="info-value">{selectedExpert.district}</div>
                    </div>
                    <div>
                      <div className="info-label">STATE</div>
                      <div className="info-value">{selectedExpert.state}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cases' && (
                <div className="tab-content cases-tab">
                  <div className="cases-list">
                    {expertCases.map((caseItem) => (
                      <div key={caseItem.id} className={`case-item ${caseItem.status === 'DONE' ? 'done' : ''}`}>
                        <div className="case-checkbox">
                          {caseItem.status === 'DONE' && <Check size={12} color="white" />}
                        </div>
                        <div className="case-badge" style={{ backgroundColor: getStatusColor(caseItem.status), color: caseItem.status === 'PENDING' ? '#000' : '#fff' }}>
                          CASE {caseItem.id}
                        </div>
                        <div className="case-title">{caseItem.title}</div>
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
                          <div className="report-id">{report.orderId} / {report.caseNo}</div>
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

export default Experts;
