import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css'; // Reusing the same CSS for identical modal styling

const RegisterOfficerModal = () => {
  const { isRegisterOfficerModalOpen, setIsRegisterOfficerModalOpen, departments, addOfficer } = useAppContext();
  
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('All');

  if (!isRegisterOfficerModalOpen) return null;

  const handleOverlayClick = (e) => {
    // Only close if the background overlay is clicked
    if (e.target.classList.contains('modal-overlay')) {
      setIsRegisterOfficerModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (name) {
      addOfficer({
        name,
        badge: badge || 'PENDING',
        email: email || 'pending@cencops.gov',
        department: department,
        tasks: 0,
        image: null // We don't have image upload for officers yet
      });
      // Reset and close
      setName('');
      setBadge('');
      setEmail('');
      setDepartment('All');
      setIsRegisterOfficerModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        <div className="modal-header">
          <h2 className="modal-title">Register Officer</h2>
          <p className="modal-subtitle">Add a new expert to the CenCops roster.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => setIsRegisterOfficerModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Officer Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <input 
                type="text" 
                className="modal-input" 
                placeholder="Officer ID (Badge)" 
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
              />
            </div>
            
            <div className="modal-input-group">
              <input 
                type="email" 
                className="modal-input" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="modal-input-group">
            <select 
              className="modal-input" 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="All">No specific department (All)</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <div className="dropdown-icon-modal">▼</div>
          </div>
          
        </div>

        <div className="modal-footer">
          <button className="modal-create-btn" onClick={handleCreate}>
            REGISTER
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default RegisterOfficerModal;
