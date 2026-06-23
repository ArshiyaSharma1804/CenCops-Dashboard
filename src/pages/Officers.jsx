import React from 'react';
import { officers } from '../data';

const Officers = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>5 registered across 3 departments</div>
        <div className="page-title">Officers</div>
      </div>
      
      <div className="dashboard-grid">
        <div className="card-container" style={{ flex: 3 }}>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{width: '30px'}}></th>
                <th>OFFICER</th>
                <th>BADGE</th>
                <th>DEPARTMENT</th>
                <th>TASKS</th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer, index) => (
                <tr key={officer.id} style={{ cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.05)' }}}>
                  <td style={{color: '#5E594B'}}>{index + 1}</td>
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
        
        <div className="officers-sidebar" style={{ flex: 1, paddingLeft: '20px' }}>
          <div style={{ background: '#E3DDCC', border: '1px solid #C8BFA9', borderRadius: '15px', padding: '15px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px' }}>All Departments</span>
              <span>▼</span>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #C8BFA9', paddingTop: '20px' }}>
            <div style={{ background: '#E3DDCC', borderRadius: '15px', padding: '5px 15px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontFamily: 'var(--font-code)' }}>
              INSP. SINGH SANDHU
              <span style={{ cursor: 'pointer', border: '1px solid #C8BFA9', borderRadius: '50%', width: 14, height: 14, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: 10 }}>×</span>
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
