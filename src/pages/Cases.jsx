import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';

import iconAll from '../assets/all_cases.png';
import iconInProgress from '../assets/in_progress_cases.png';
import iconPending from '../assets/pending_cases.png';
import iconDone from '../assets/done_cases.png';

const Cases = () => {
  const { selectedCategory, globalSearchTerm, cases, experts, getCaseUpdates } = useAppContext();
  const [caseList, setCaseList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseUpdates, setCaseUpdates] = useState([]);

  const updateCaseAssignees = async (caseId, newAssigneeIds) => {
    try {
      await axios.put(`/api/cases/${caseId}`, { assignee_ids: newAssigneeIds });
      // Reload logic - a simple reload or context update could be called here
      // For now, let's just reload the window to ensure data sync
      window.location.reload();
    } catch(e) { console.error(e); }
  };

  const AssigneeChecklist = ({ caseItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedIds = caseItem.assignees_list?.map(a => a.id) || [];
    
    return (
      <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
        <div 
          className="select-dropdown" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', width: '70%', padding: '5px 10px', borderRadius: '40px', border: '1px solid #ccc' }}
        >
          <span style={{ fontSize: '13px' }}>{selectedIds.length > 0 ? `${selectedIds.length} Assigned` : 'Unassigned'}</span>
          <span style={{ fontSize: '10px' }}>▼</span>
        </div>
        {isOpen && (
          <div style={{ 
            position: 'absolute', top: '100%', left: 0, right: 0, 
            background: '#fff', border: '1px solid #ccc', zIndex: 10,
            maxHeight: '150px', overflowY: 'auto', padding: '5px', borderRadius: '4px', marginTop: '2px'
          }}>
            {experts.map(expert => (
              <label key={expert.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '2px 0', fontSize: '12px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(expert.id)} 
                  onChange={(e) => {
                    const newIds = e.target.checked 
                      ? [...selectedIds, expert.id]
                      : selectedIds.filter(id => id !== expert.id);
                    updateCaseAssignees(caseItem.id, newIds);
                  }}
                />
                {expert.name}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    // Filter cases based on selected category from global state
    let filtered = selectedCategory === 'All' 
      ? cases 
      : cases.filter(t => t.categories_list?.some(c => c.name === selectedCategory));
      
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    setCaseList(filtered);
    setSelectedCase(null);
  }, [selectedCategory, statusFilter, cases]);

  useEffect(() => {
    if (selectedCase) {
      getCaseUpdates(selectedCase.id).then(setCaseUpdates);
    }
  }, [selectedCase]);

  const exportPDF = (caseItem) => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(`Case Report: ${caseItem.title}`, 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Order ID: ${caseItem.order_id}`, 14, 30);
    doc.text(`Start Date: ${caseItem.start_date}`, 14, 38);
    doc.text(`Completed Date: ${new Date().toLocaleDateString()}`, 14, 46);
    
    const assignees = caseItem.assignees_list?.map(a => a.name).join(', ') || 'None';
    doc.text(`Assignees: ${assignees}`, 14, 54);
    
    doc.text("Project Summary:", 14, 64);
    doc.setFont("times", "italic");
    const dummySummary = `This case was successfully investigated by the assigned team. Various artifacts were collected and analyzed over the course of the investigation. The timeline below details the step-by-step progress made by the officers before concluding the task. All evidence has been securely filed.`;
    const splitSummary = doc.splitTextToSize(dummySummary, 180);
    doc.text(splitSummary, 14, 72);
    
    doc.setFont("times", "normal");
    doc.text("Timeline of Updates:", 14, 95);
    
    const tableData = caseUpdates.map(u => [u.timestamp, u.user_name, u.content]);
    autoTable(doc, {
      startY: 100,
      head: [['Date & Time', 'User', 'Update Content']],
      body: tableData,
      theme: 'grid',
      styles: { font: 'times', fontSize: 10 }
    });
    
    doc.save(`${caseItem.order_id}_Summary.pdf`);
  };

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{selectedCategory} • {caseList.length} cases</div>
        <div className="page-title">Cases</div>
        
        <div className="cases-header-actions">
          <button className="action-btn black" onClick={() => setStatusFilter('ALL')}><img src={iconAll} alt="All" /></button>
          <button className="action-btn pink" onClick={() => setStatusFilter('IN PROGRESS')}><img src={iconInProgress} alt="In Progress" /></button>
          <button className="action-btn yellow" onClick={() => setStatusFilter('PENDING')}><img src={iconPending} alt="Pending" /></button>
          <button className="action-btn green" onClick={() => setStatusFilter('DONE')}><img src={iconDone} alt="Done" /></button>
        </div>
      </div>
      
      <div className="dashboard-grid" style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="card-container" style={{ flex: selectedCase ? '0 0 65%' : '0 0 100%', transition: 'all 0.5s ease-in-out', height: '560px', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table className="table" style={{ width: '100%', marginTop: '10px', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '5%', textAlign: 'center' }}></th>
                <th style={{ width: '25%' }}>TASK</th>
                <th style={{ width: '20%' }}>ASSIGNED TO</th>
                <th style={{ width: '15%' }}>ORDER ID</th>
                <th style={{ width: '10%' }}>DATE</th>
                <th style={{ width: '10%' }}>DUE</th>
                <th style={{ width: '15%', textAlign: 'center' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {caseList.map((caseItem, index) => (
                <tr 
                  key={caseItem.id}
                  style={{ 
                    cursor: 'pointer', 
                    background: selectedCase?.id === caseItem.id ? 'rgba(0,0,0,0.05)' : 'transparent' 
                  }}
                  onClick={() => setSelectedCase(selectedCase?.id === caseItem.id ? null : caseItem)}
                >
                  <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                  <td style={{color: '#000'}}>
                    <Highlight text={caseItem.title} highlight={globalSearchTerm} />
                  </td>
                  <td>
                    <AssigneeChecklist caseItem={caseItem} />
                  </td>
                  <td style={{color: '#000'}}>
                    <Highlight text={caseItem.order_id} highlight={globalSearchTerm} />
                  </td>
                  <td style={{color: '#000'}}>{caseItem.start_date}</td>
                  <td style={{color: '#000'}}>{caseItem.due_date || '-'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`status-badge ${caseItem.status.toLowerCase().replace(' ', '-')}`}>
                      {caseItem.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div 
          className="experts-sidebar" 
          style={{ 
            flex: selectedCase ? '0 0 35%' : '0 0 0%', 
            paddingLeft: selectedCase ? '20px' : '0px',
            opacity: selectedCase ? 1 : 0,
            transform: selectedCase ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.5s ease-in-out',
            visibility: selectedCase ? 'visible' : 'hidden',
            marginTop: '20px'
          }}
        >
          {selectedCase && (
            <div style={{ width: '100%', paddingTop: '10px', paddingRight: '20px', display: 'flex', flexDirection: 'column', height: '560px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{selectedCase.order_id}</div>
                <button onClick={() => setSelectedCase(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#888' }}>&times;</button>
              </div>
              
              <div style={{ fontSize: '14px', marginBottom: '15px', color: '#333' }}>
                <strong>Title:</strong> {selectedCase.title}
              </div>
              
              <hr style={{ borderTop: '1px solid #e0e0e0', marginBottom: '15px' }} />
              
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '10px' }}>Updates Timeline</div>
              
              <div style={{ overflowY: 'auto', flex: 1, background: '#f9f9f9', padding: '10px', borderRadius: '5px', border: '1px solid #e0e0e0' }}>
                {caseUpdates.length > 0 ? (
                  caseUpdates.map(update => (
                    <div key={update.id} style={{ background: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '10px', border: '1px solid #ddd' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', marginBottom: '5px' }}>
                        <strong>{update.user_name}</strong>
                        <span>{update.timestamp}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#333', whiteSpace: 'pre-wrap' }}>{update.content}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '20px' }}>No updates logged yet.</div>
                )}
              </div>
              
              {selectedCase.status.toUpperCase() === 'DONE' && (
                <button 
                  onClick={() => exportPDF(selectedCase)}
                  style={{
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontFamily: '"Google Sans Code", monospace',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '15px'
                  }}
                >
                  <Download size={16} /> EXPORT SUMMARY PDF
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cases;
