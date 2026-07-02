import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css'; // Reusing the same CSS

const EditExpertModal = () => {
  const { isEditExpertModalOpen, setIsEditExpertModalOpen, editingExpert, setEditingExpert, categories, updateExpert } = useAppContext();
  
  const [name, setName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  // Extended profile info
  const [rank, setRank] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    if (editingExpert) {
      setName(editingExpert.name || '');
      setBadgeNumber(editingExpert.badge_number || '');
      setEmail(editingExpert.email || '');
      setCategoryId(editingExpert.category_id || '');
      setRank(editingExpert.rank || '');
      setDob(editingExpert.dob || '');
      setAge(editingExpert.age || '');
      setDistrict(editingExpert.district || '');
      setState(editingExpert.state || '');
    }
  }, [editingExpert]);

  if (!isEditExpertModalOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsEditExpertModalOpen(false);
      setEditingExpert(null);
    }
  };

  const handleSave = () => {
    if (name) {
      updateExpert(editingExpert.id, {
        name,
        badge_number: badgeNumber,
        email,
        category_id: categoryId ? parseInt(categoryId) : null,
        rank,
        dob,
        age,
        district,
        state
      });
      setIsEditExpertModalOpen(false);
      setEditingExpert(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content-experts" style={{ height: 'auto', maxHeight: '90vh', overflowY: 'auto', width: '500px' }}>
        
        <div className="modal-header">
          <h2 className="modal-title">Edit Expert Profile</h2>
          <p className="modal-subtitle">Update information for {name}</p>
          <button 
            className="modal-close-btn" 
            onClick={() => { setIsEditExpertModalOpen(false); setEditingExpert(null); }}
          >
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="modal-input-group">
            <input type="text" className="modal-input" placeholder="Expert Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Expert ID (Badge)" value={badgeNumber} onChange={(e) => setBadgeNumber(e.target.value)} />
            </div>
            
            <div className="modal-input-group">
              <input type="email" className="modal-input" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <select className="modal-input" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">No specific category (All)</option>
                {categories.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <div className="dropdown-icon-modal">▼</div>
            </div>
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Rank" value={rank} onChange={(e) => setRank(e.target.value)} />
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Date of Birth (DD-MM-YYYY)" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className="modal-input-group">
              <input type="text" className="modal-input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
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
          
        </div>

        <div className="modal-footer">
          <button className="modal-create-btn" onClick={handleSave}>
            SAVE CHANGES
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default EditExpertModal;
