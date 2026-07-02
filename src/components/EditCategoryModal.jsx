import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css';

const EditCategoryModal = () => {
  const { isEditCategoryModalOpen, setIsEditCategoryModalOpen, editingCategory, setEditingCategory, updateCategory } = useAppContext();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name || '');
      setDescription(editingCategory.description || '');
    }
  }, [editingCategory]);

  if (!isEditCategoryModalOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsEditCategoryModalOpen(false);
      setEditingCategory(null);
    }
  };

  const handleSave = () => {
    if (name) {
      updateCategory(editingCategory.id, {
        name,
        description
      });
      setIsEditCategoryModalOpen(false);
      setEditingCategory(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content-cases">
        
        <div className="modal-header">
          <h2 className="modal-title">Edit Category</h2>
          <p className="modal-subtitle">Update category details.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => { setIsEditCategoryModalOpen(false); setEditingCategory(null); }}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input 
              type="text" 
              className="modal-input" 
              placeholder="Category Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default EditCategoryModal;
