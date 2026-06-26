import React, { useState } from 'react';
import { officers } from '../data';

const Officers = () => {
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  return (
    <div>
      <div className="page-header">
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>5 registered across 3 departments</div>
        <div className="page-title">Experts</div>
      </div>
      
      <div className="dashboard-grid" style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="card-container" style={{ flex: selectedOfficer ? '0 0 75%' : '0 0 100%', transition: 'all 0.5s ease-in-out' }}>
          
          {/* Always visible All Departments tab above the table on the right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
            <div style={{ background: '#5e594b3e', border: '1px solid #C8BFA9', borderRadius: '15px', padding: '10px 20px', display: 'flex', gap: '30px', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '14px', color: '#5E594B' }}>All Categories</span>
              <span style={{ fontSize: '10px', color: '#5E594B' }}>▼</span>
            </div>
          </div>

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
              {officers.map((officer, index) => (
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
                    <div style={{color: '#000', fontWeight: '400'}}>{officer.name}</div>
                    <div style={{color: '#5E594B', fontSize: '10px'}}>{officer.email}</div>
                  </td>
                  <td style={{color: '#000'}}>{officer.badge}</td>
                  <td style={{color: '#000'}}>{officer.department}</td>
                  <td style={{color: '#000'}}>{officer.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div 
          className="officers-sidebar" 
          style={{ 
            flex: selectedOfficer ? '0 0 25%' : '0 0 0%', 
            paddingLeft: selectedOfficer ? '20px' : '0px',
            opacity: selectedOfficer ? 1 : 0,
            transform: selectedOfficer ? 'translateX(0)' : 'translateX(50px)',
            transition: 'all 0.5s ease-in-out',
            visibility: selectedOfficer ? 'visible' : 'hidden'
          }}
        >
          <div style={{ width: '250px', paddingTop: '20px' }}>
            <div style={{ width: '200px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: '#E3DDCC', borderRadius: '15px', padding: '5px 15px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontFamily: 'var(--font-code)' }}>
                {selectedOfficer?.name?.toUpperCase() || 'OFFICER'}
                <span 
                  onClick={() => setSelectedOfficer(null)}
                  style={{ cursor: 'pointer', border: '1px solid #C8BFA9', borderRadius: '50%', width: 14, height: 14, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: 10 }}
                >×</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button className="action-btn" style={{ background: '#C8BFA9', width: '60px', height: '60px' }}>👤</button>
              <button className="action-btn" style={{ background: '#C8BFA9', width: '60px', height: '60px' }}>📋</button>
              <button className="action-btn" style={{ background: '#C8BFA9', width: '60px', height: '60px' }}>📁</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Officers;
