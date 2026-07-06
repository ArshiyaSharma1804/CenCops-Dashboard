import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import './CreateCaseModal.css';

const CreateCaseModal = () => {
  const { isCreateCaseModalOpen, setIsCreateCaseModalOpen, categories, experts, addCaseWithDocument } = useAppContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [assigneeIds, setAssigneeIds] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

  if (!isCreateCaseModalOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsCreateCaseModalOpen(false);
    }
  };

  const handleCreate = () => {
    if (title && categoryIds.length > 0 && assigneeIds.length > 0) {
      // Generate realistic looking dummy data for new case
      const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('order_id', newOrderId);
      formData.append('status', 'PENDING');
      
      categoryIds.forEach(id => formData.append('category_ids[]', id));
      assigneeIds.forEach(id => formData.append('assignee_ids[]', id));
      
      documentFiles.forEach(file => formData.append('documents[]', file));

      addCaseWithDocument(formData);

      // Reset and close
      setTitle('');
      setDescription('');
      setCategoryIds([]);
      setAssigneeIds([]);
      setDocumentFiles([]);
      setIsCreateCaseModalOpen(false);
    } else {
      alert("Please fill in Title, select at least one Category, and at least one Assignee.");
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
          
          <div className="modal-row" style={{ display: 'flex', gap: '20px' }}>
            <div className="modal-input-group" style={{ flex: 1, position: 'relative' }}>
              <div 
                className="modal-input" 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: categoryIds.length ? '#000' : '#616161' }}
              >
                <span>{categoryIds.length > 0 ? `${categoryIds.length} Categories Selected` : 'Select Category'}</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </div>
              {isCategoryOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '150px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px', background: '#fff', zIndex: 10 }}>
                  {categories.map(dept => (
                    <label key={dept.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={categoryIds.includes(dept.id)}
                        onChange={(e) => {
                          if (e.target.checked) setCategoryIds([...categoryIds, dept.id]);
                          else setCategoryIds(categoryIds.filter(id => id !== dept.id));
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#333' }}>{dept.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            <div className="modal-input-group" style={{ flex: 1, position: 'relative' }}>
              <div 
                className="modal-input" 
                onClick={() => setIsAssigneeOpen(!isAssigneeOpen)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: assigneeIds.length ? '#000' : '#616161' }}
              >
                <span>{assigneeIds.length > 0 ? `${assigneeIds.length} Assignees Selected` : 'Select Assignee'}</span>
                <span style={{ fontSize: '10px' }}>▼</span>
              </div>
              {isAssigneeOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '150px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px', background: '#fff', zIndex: 10 }}>
                  {experts
                    .filter(o => categoryIds.length === 0 || categoryIds.includes(o.category_id))
                    .map(expert => (
                    <label key={expert.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={assigneeIds.includes(expert.id)}
                        onChange={(e) => {
                          if (e.target.checked) setAssigneeIds([...assigneeIds, expert.id]);
                          else setAssigneeIds(assigneeIds.filter(id => id !== expert.id));
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#333' }}>{expert.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="modal-input-group" style={{ cursor: 'pointer', position: 'relative' }}>
            <div className="modal-input" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#616161' }}>
              <span>{documentFiles.length > 0 ? `${documentFiles.length} file(s) selected` : 'Attach relevant documents'}</span>
              <span style={{ fontSize: '16px' }}>+</span>
            </div>
            <input 
              type="file" 
              multiple
              accept=".pdf,.docx,.jpg,.png" 
              onChange={(e) => setDocumentFiles(Array.from(e.target.files))}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
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
