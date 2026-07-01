import React from 'react';
import { useAppContext } from '../context/AppContext';
import { departments, officers } from '../data';
import './CreateCaseModal.css';

const CreateCaseModal = () => {
  const { isCreateCaseModalOpen, setIsCreateCaseModalOpen } = useAppContext();

  if (!isCreateCaseModalOpen) return null;

  const handleOverlayClick = (e) => {
    // Only close if the background overlay is clicked
    if (e.target.classList.contains('modal-overlay')) {
      setIsCreateCaseModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        <div className="modal-header">
          <h2 className="modal-title">Create Case</h2>
          <p className="modal-subtitle">register a case for the Digital Forensics department.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => setIsCreateCaseModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input type="text" className="modal-input" placeholder="Title" />
          </div>
          
          <div className="modal-input-group">
            <textarea className="modal-input modal-textarea" placeholder="Description"></textarea>
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <select className="modal-input" defaultValue="">
                <option value="" disabled hidden>Category</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
              <div className="dropdown-icon-modal">▼</div>
            </div>
            
            <div className="modal-input-group">
              <select className="modal-input" defaultValue="">
                <option value="" disabled hidden>Assignee</option>
                {officers.map(officer => (
                  <option key={officer.id} value={officer.name}>{officer.name}</option>
                ))}
              </select>
              <div className="dropdown-icon-modal">▼</div>
            </div>
          </div>
          
          <div className="modal-input-group" style={{ cursor: 'pointer' }}>
            <div className="modal-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#616161' }}>
              <span>Attach relevant documents</span>
              <span style={{ fontSize: '16px' }}>+</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-create-btn" onClick={() => setIsCreateCaseModalOpen(false)}>
            CREATE
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateCaseModal;
