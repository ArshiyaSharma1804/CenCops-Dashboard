import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import OfficerSidebar from '../components/OfficerSidebar';
import './dashboard.css';

const Officers = () => {
  const { selectedDepartment, globalSearchTerm, officers } = useAppContext();
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [officerList, setOfficerList] = useState([]);

  useEffect(() => {
    setOfficerList(selectedDepartment === 'All' 
      ? officers 
      : officers.filter(o => o.department === selectedDepartment)
    );
    setSelectedOfficer(null); // Reset selection when department changes
  }, [selectedDepartment, officers]);

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{officerList.length} registered experts in {selectedDepartment}</div>
        <div className="page-title">Experts</div>
      </div>
      
      <div className="dashboard-grid" style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="card-container" style={{ flex: selectedOfficer ? '0 0 75%' : '0 0 100%', transition: 'all 0.5s ease-in-out', height: '560px', display: 'flex', flexDirection: 'column' }}>
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
        
        <div style={{ flex: selectedOfficer ? '0 0 25%' : '0 0 0%', transition: 'all 0.5s ease-in-out' }}>
          <OfficerSidebar selectedOfficer={selectedOfficer} setSelectedOfficer={setSelectedOfficer} />
        </div>
      </div>
    </div>
  );
};

export default Officers;
