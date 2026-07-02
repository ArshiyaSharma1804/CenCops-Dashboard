import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';

import iconAll from '../assets/all_cases.png';
import iconInProgress from '../assets/in_progress_cases.png';
import iconPending from '../assets/pending_cases.png';
import iconDone from '../assets/done_cases.png';

const Cases = () => {
  const { selectedCategory, globalSearchTerm, cases, experts } = useAppContext();
  const [caseList, setCaseList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    // Filter cases based on selected category from global state
    let filtered = selectedCategory === 'All' 
      ? cases 
      : cases.filter(t => t.category === selectedCategory);
      
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }
    setCaseList(filtered);
  }, [selectedCategory, statusFilter, cases]);

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
      
      <div className="card-container" style={{ height: '560px', marginTop: '20px', display: 'flex', flexDirection: 'column' }}>
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
              <tr key={caseItem.id}>
                <td style={{color: '#5E594B', textAlign: 'center'}}>{index + 1}</td>
                <td style={{color: '#000'}}>
                  <Highlight text={caseItem.title} highlight={globalSearchTerm} />
                </td>
                <td>
                  <select 
                    className="select-dropdown" 
                    defaultValue={caseItem.assigned_to_id || ''}
                  >
                    <option value="" disabled hidden>Unassigned</option>
                    {experts.map(off => (
                      <option key={off.id} value={off.id}>{off.name}</option>
                    ))}
                  </select>
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
    </div>
  );
};

export default Cases;
