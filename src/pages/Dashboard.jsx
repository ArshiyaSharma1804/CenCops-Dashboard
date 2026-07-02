import React, { useMemo, useState, useEffect } from 'react';
import './dashboard.css';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import { Eye, FileText, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { isExpanded, selectedCategory, globalSearchTerm, cases, experts, userRole, loggedInUser, activeNotificationCaseId, setActiveNotificationCaseId, updateCaseStatus } = useAppContext();
  
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  useEffect(() => {
    if (activeNotificationCaseId) {
      setSelectedCaseId(activeNotificationCaseId);
      // We also need to set the status to IN PROGRESS if it was PENDING
      const targetCase = cases.find(c => c.id === activeNotificationCaseId);
      if (targetCase && targetCase.status === 'PENDING') {
        updateCaseStatus(activeNotificationCaseId, 'IN PROGRESS');
      }
      setActiveNotificationCaseId(null);
    }
  }, [activeNotificationCaseId, cases, updateCaseStatus, setActiveNotificationCaseId]);

  const userCases = useMemo(() => {
    if (userRole === 'admin') return cases;
    return cases.filter(t => t.assigned_to === loggedInUser);
  }, [cases, userRole, loggedInUser]);

  const filteredCases = useMemo(() => 
    selectedCategory === 'All' 
      ? userCases 
      : userCases.filter(t => t.category === selectedCategory)
  , [selectedCategory, userCases]);
  
  const filteredExperts = useMemo(() => 
    selectedCategory === 'All' 
      ? experts 
      : experts.filter(o => o.category === selectedCategory)
  , [selectedCategory, experts]);

  const doneReports = userCases.filter(t => t.status.toUpperCase() === 'DONE').map((t, index) => ({
    orderId: t.order_id,
    caseNo: `CASE ${t.id}`,
    title: t.title,
    id: t.id
  }));
  
  const inProgressCases = filteredCases.filter(t => t.status.toUpperCase() === 'IN PROGRESS').length;
  const pendingCases = filteredCases.filter(t => t.status.toUpperCase() === 'PENDING').length;
  const doneCases = filteredCases.filter(t => t.status.toUpperCase() === 'DONE').length;

  const handleCaseClick = (caseItem) => {
    if (userRole === 'admin') return;
    
    setSelectedCaseId(caseItem.id);
    if (caseItem.status.toUpperCase() === 'PENDING') {
      updateCaseStatus(caseItem.id, 'IN PROGRESS');
    }
  };

  const selectedCase = selectedCaseId ? cases.find(c => c.id === selectedCaseId) : null;

  const handleSubmitReport = () => {
    if (selectedCaseId) {
      updateCaseStatus(selectedCaseId, 'DONE');
      setSelectedCaseId(null);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle">CATEGORY • IAF MUSEUM, 18C</div>
        <div className="page-title">{selectedCategory}</div>
      </div>
      
      <div className="status-widgets">
        <div className="widget widget-in-progress">
          <div>
            <div className="widget-title">IN PROGRESS</div>
            <div className="widget-subtitle">Active cases</div>
          </div>
          <div className="widget-count">{inProgressCases}</div>
        </div>
        
        <div className="widget widget-pending">
          <div>
            <div className="widget-title">PENDING</div>
            <div className="widget-subtitle">Awaiting assignment or review</div>
          </div>
          <div className="widget-count">{pendingCases}</div>
        </div>
        
        <div className="widget widget-done">
          <div>
            <div className="widget-title-done">DONE</div>
            <div className="widget-subtitle">Completed cases</div>
          </div>
          <div className="widget-count-done">{doneCases}</div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="card-container current-cases" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-title" style={{ alignSelf: 'flex-start' }}>Current Cases</div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table className="table" style={{ borderCollapse: 'separate', borderSpacing: '0 5px' }}>
              <thead>
                <tr>
                  <th style={{width: '30px'}}></th>
                  <th>TASK</th>
                  <th>ASSIGNED TO</th>
                  {isExpanded && <th>ORDER ID</th>}
                  <th>DUE</th>
                  <th style={{ textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem, index) => {
                  const isPending = caseItem.status.toUpperCase() === 'PENDING';
                  const rowStyle = {
                    cursor: userRole === 'admin' ? 'default' : 'pointer',
                    backgroundColor: selectedCaseId === caseItem.id ? '#f0f0f0' : 'transparent',
                    transition: 'background-color 0.2s'
                  };

                  return (
                    <tr key={caseItem.id} style={rowStyle} onClick={() => handleCaseClick(caseItem)}>
                      <td style={{color: '#5E594B', textAlign: 'center', fontWeight: isPending ? 'bold' : 'normal'}}>{index + 1}</td>
                      <td style={{fontWeight: isPending ? 'bold' : 'normal'}}>
                        <Highlight text={caseItem.title} highlight={globalSearchTerm} />
                      </td>
                      <td style={{fontWeight: isPending ? 'bold' : 'normal'}}>
                        <Highlight text={caseItem.assigned_to} highlight={globalSearchTerm} />
                      </td>
                      {isExpanded && <td style={{color: '#616161', fontWeight: isPending ? 'bold' : 'normal'}}>
                        <Highlight text={caseItem.order_id} highlight={globalSearchTerm} />
                      </td>}
                      <td style={{color: '#616161', fontWeight: isPending ? 'bold' : 'normal'}}>{caseItem.due_date || '-'}</td>
                      <td style={{ textAlign: 'center', fontWeight: isPending ? 'bold' : 'normal' }}>
                        <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                          {caseItem.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {userRole === 'admin' ? (
          <div className="card-container experts-list" style={{ display: 'flex', flexDirection: 'column', height: "8%" }}>
            <div className="card-title">Experts</div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>OFFICER</th>
                    <th style={{textAlign: 'right'}}>TASKS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExperts.map(expert => (
                    <tr key={expert.id}>
                      <td style={{color: '#000'}}>
                        <Highlight text={expert.name} highlight={globalSearchTerm} />
                      </td>
                      <td style={{textAlign: 'right', color: '#000'}}>{cases.filter(c => c.assigned_to_id === expert.id).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card-container experts-list" style={{ display: 'flex', flexDirection: 'column', height: "8%", background: '#f5f5f5', position: 'relative' }}>
            {selectedCaseId && selectedCase ? (
              <>
                <button onClick={() => setSelectedCaseId(null)} style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#888' }}>&times;</button>
                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <FileText size={18} /> Case Details
                </div>
                <div style={{ padding: '15px 0', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: '#888' }}>TITLE</strong>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedCase.title}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#888' }}>ORDER ID</strong>
                      <div>{selectedCase.order_id}</div>
                    </div>
                    <div>
                      <strong style={{ fontSize: '12px', color: '#888' }}>DUE DATE</strong>
                      <div>{selectedCase.due_date || 'No due date'}</div>
                    </div>
                  </div>
                  <div>
                    <strong style={{ fontSize: '12px', color: '#888' }}>DESCRIPTION</strong>
                    <div style={{ marginTop: '5px', fontSize: '14px', color: '#333', background: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #e0e0e0', minHeight: '80px' }}>
                      {selectedCase.description || 'No description provided.'}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleSubmitReport}
                  disabled={selectedCase.status.toUpperCase() === 'DONE'}
                  style={{
                    background: selectedCase.status.toUpperCase() === 'DONE' ? '#ccc' : '#000',
                    color: '#fff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '5px',
                    cursor: selectedCase.status.toUpperCase() === 'DONE' ? 'default' : 'pointer',
                    fontWeight: 'bold',
                    fontFamily: '"Google Sans Code", monospace',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px'
                  }}
                >
                  {selectedCase.status.toUpperCase() === 'DONE' ? <><CheckCircle size={16} /> REPORT SUBMITTED</> : 'SUBMIT REPORT'}
                </button>
              </>
            ) : (
              <>
                <div className="card-title">Submitted Reports</div>
                <div style={{ overflowY: 'auto', flex: 1, paddingRight: '10px' }}>
                  <div className="reports-list">
                    {doneReports.length > 0 ? doneReports.map((report) => (
                      <div key={report.id} className="report-card" style={{ marginBottom: '10px', background: '#fff' }}>
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
                    )) : (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No reports submitted yet.</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
