import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css'; // Reusing the same CSS for identical modal styling

const AddCategoryModal = () => {
  const { isAddCategoryModalOpen, setIsAddCategoryModalOpen, addCategory } = useAppContext();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  if (!isAddCategoryModalOpen) return null;

  const handleOverlayClick = (e) => {
    // Only close if the background overlay is clicked
    if (e.target.classList.contains('modal-overlay')) {
      setIsAddCategoryModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (name) {
      addCategory({
        name,
        description: description || 'New category',
        image: image || null
      });
      // Reset and close
      setName('');
      setDescription('');
      setImage('');
      setIsAddCategoryModalOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content-categories">
        
        <div className="modal-header">
          <h2 className="modal-title">Add Category</h2>
          <p className="modal-subtitle">Create a new organizational category.</p>
          <button 
            className="modal-close-btn" 
            onClick={() => setIsAddCategoryModalOpen(false)}
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
              placeholder="Category Description"
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

export default AddCategoryModal;
