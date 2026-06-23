import React from 'react';
import { departments } from '../data';

const Departments = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>3 departments configured</div>
        <div className="page-title">Departments</div>
      </div>
      
      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="department-image">
              <div className="department-name">{dept.name}</div>
            </div>
            
            <button className={`department-btn ${dept.status === 'ACTIVE' ? 'active' : 'switch'}`}>
              {dept.status}
            </button>
            
            <div className="department-stats">
              <div className="stat-box">Officers: {dept.officers < 10 ? `0${dept.officers}` : dept.officers}</div>
              <div className="stat-box">Tasks: {dept.tasks < 10 ? `0${dept.tasks}` : dept.tasks}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <div style={{ width: '150px', height: '6px', background: '#E3DDCC', borderRadius: '3px', position: 'relative' }}>
          <div style={{ width: '30px', height: '10px', background: '#C8BFA9', borderRadius: '5px', position: 'absolute', top: '-2px', left: '0' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
