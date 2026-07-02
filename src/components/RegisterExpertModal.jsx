import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css'; // Reusing the same CSS for identical modal styling

const RegisterExpertModal = () => {
  const { isRegisterExpertModalOpen, setIsRegisterExpertModalOpen, categories, addExpert } = useAppContext();
  
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rank, setRank] = useState('');
  const [dob, setDob] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [age, setAge] = useState('');
  const [categoryId, setCategoryId] = useState('');

  if (!isRegisterExpertModalOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsRegisterExpertModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (name) {
      addExpert({
        name,
        badge_number: badgeNumber || 'PENDING',
        email: email || 'pending@cencops.in',
        password: password || badgeNumber,
        rank,
        dob,
        district,
        state,
        age,
        category_id: categoryId ? parseInt(categoryId) : null
      });
      setName('');
      setBadgeNumber('');
      setEmail('');
      setPassword('');
      setRank('');
      setDob('');
      setDistrict('');
      setState('');
      setAge('');
      setCategoryId('');
      setIsRegisterExpertModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content-experts" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        
        <div className="modal-header">
          <h2 className="modal-title">Register Expert</h2>
          <p className="modal-subtitle">Add a new expert to the CenCops roster.</p>
          <button className="modal-close-btn" onClick={() => setIsRegisterExpertModalOpen(false)}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <input type="email" className="modal-input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Badge Number" value={badgeNumber} onChange={(e) => setBadgeNumber(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <input type="password" className="modal-input" placeholder="Temporary Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Rank (e.g. Sub-Inspector)" value={rank} onChange={(e) => setRank(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Date of Birth (DD-MM-YYYY)" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-input-group">
              <input type="number" className="modal-input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <select className="modal-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">No specific category (All)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <div className="dropdown-icon-modal">▼</div>
            </div>
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

export default RegisterExpertModal;
