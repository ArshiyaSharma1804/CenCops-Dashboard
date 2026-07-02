import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css';

const CreateCaseModal = () => {
  const { isCreateCaseModalOpen, setIsCreateCaseModalOpen, categories, experts, addCase } = useAppContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  if (!isCreateCaseModalOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsCreateCaseModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (title && categoryId && assigneeId) {
      // Generate realistic looking dummy data for new case
      const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

      addCase({
        title: title,
        description: description,
        assigned_to_id: parseInt(assigneeId),
        order_id: newOrderId,
        status: 'PENDING',
        category_id: parseInt(categoryId)
      });

      // Reset and close
      setTitle('');
      setDescription('');
      setCategoryId('');
      setAssigneeId('');
      setIsCreateCaseModalOpen(false);
    } else {
      alert("Please fill in Title, Category, and Assignee.");
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content-cases">
        
        <div className="modal-header">
          <h2 className="modal-title">Create Case</h2>
          <p className="modal-subtitle">register a case for the category.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => setIsCreateCaseModalOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="modal-input-group">
            <textarea 
              className="modal-input modal-textarea" 
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          
          <div className="modal-row">
            <div className="modal-input-group">
              <select 
                className="modal-input" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" disabled hidden>Category</option>
                {categories.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              <div className="dropdown-icon-modal">▼</div>
            </div>
            
            <div className="modal-input-group">
              <select 
                className="modal-input" 
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              >
                <option value="" disabled hidden>Assignee</option>
                {experts.filter(o => !categoryId || o.category_id === parseInt(categoryId)).map(expert => (
                  <option key={expert.id} value={expert.id}>{expert.name}</option>
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
          <button className="modal-create-btn" onClick={handleCreate}>
            CREATE
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateCaseModal;
