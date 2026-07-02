import React from 'react';
import { departments } from '../data';
import { useAppContext } from '../context/AppContext';

const Departments = () => {
  const { isExpanded, selectedDepartment, setSelectedDepartment } = useAppContext();

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{departments.length} departments configured</div>
        <div className="page-title">Departments</div>
      </div>
      
      <div className={`departments-grid ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {departments.map((dept) => {
          const isActive = dept.name === selectedDepartment;
          return (
            <div key={dept.id} className="department-card">
              <div 
                className="department-image" 
                style={dept.image && !dept.image.startsWith('image:') ? { backgroundImage: `url("${dept.image}")` } : {}}
              >
                <div className="department-name">{dept.name}</div>
              </div>
              
              <button 
                className={`department-btn ${isActive ? 'active' : 'switch'}`}
                onClick={() => setSelectedDepartment(dept.name)}
              >
                {isActive ? 'ACTIVE' : 'SWITCH'}
              </button>
            
            <div className="department-stats">
              <div className="stat-box">Officers: {dept.officers < 10 ? `0${dept.officers}` : dept.officers}</div>
              <div className="stat-box">Tasks: {dept.tasks < 10 ? `0${dept.tasks}` : dept.tasks}</div>
            </div>
          </div>
        )})};
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
       
          
        </div>
      </div>
  );
};

export default Departments;
