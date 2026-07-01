import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css'; // Reusing the same CSS for identical modal styling

const AddDepartmentModal = () => {
  const { isAddDepartmentModalOpen, setIsAddDepartmentModalOpen, addDepartment } = useAppContext();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  if (!isAddDepartmentModalOpen) return null;

  const handleOverlayClick = (e) => {
    // Only close if the background overlay is clicked
    if (e.target.classList.contains('modal-overlay')) {
      setIsAddDepartmentModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (name) {
      addDepartment({
        name,
        description: description || 'New department',
        image: image || null
      });
      // Reset and close
      setName('');
      setDescription('');
      setImage('');
      setIsAddDepartmentModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        
        <div className="modal-header">
          <h2 className="modal-title">Add Department</h2>
          <p className="modal-subtitle">Create a new organizational category.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => setIsAddDepartmentModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Department Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="modal-input-group">
            <textarea 
              className="modal-input modal-textarea" 
              placeholder="Department Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <div className="modal-input-group">
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Image URL (optional)" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          
        </div>

        <div className="modal-footer">
          <button className="modal-create-btn" onClick={handleCreate}>
            ADD
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AddDepartmentModal;
