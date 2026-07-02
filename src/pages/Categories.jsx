import React from 'react';
import { useAppContext } from '../context/AppContext';
import Highlight from '../components/Highlight';
import { Edit2, Trash2 } from 'lucide-react';

import card1 from '../assets/image IPDR.png';
import card2 from '../assets/image OSINT.png';
import card3 from '../assets/image MOBILE.png';
import card4 from '../assets/image HARD_DRIVE.png';
import card5 from '../assets/image MEDIA.png';

const categoryImages = {
  "IPDR / CDR": card1,
  "OSINT": card2,
  "Mobile": card3,
  "Hard Drive": card4,
  "Media": card5
};

const Categories = () => {
  const { isExpanded, selectedCategory, setSelectedCategory, globalSearchTerm, categories, experts, cases, setEditingCategory, setIsEditCategoryModalOpen, removeCategory } = useAppContext();

  const handleEdit = (dept, e) => {
    e.stopPropagation();
    setEditingCategory(dept);
    setIsEditCategoryModalOpen(true);
  };
  
  const handleDelete = (dept, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove the ${dept.name} category?`)) {
      removeCategory(dept.id);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <div className="page-subtitle" style={{ color: '#5E594B', letterSpacing: '-0.04em' }}>{categories.length} categories configured</div>
        <div className="page-title">Categories</div>
      </div>
      
      <div className={`categories-grid ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        {categories.map((dept) => {
          const isActive = dept.name === selectedCategory;
          const imageSrc = categoryImages[dept.name];
          const expertsCount = experts.filter(e => e.category_id === dept.id).length;
          const casesCount = cases.filter(c => c.category_id === dept.id).length;
          
          return (
            <div key={dept.id} className="category-card">
              <div 
                className="category-image" 
                style={imageSrc ? { backgroundImage: `url("${imageSrc}")`, position: 'relative' } : { position: 'relative' }}
              >
                <div className="category-actions" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px', zIndex: 10 }}>
                  <button onClick={(e) => handleEdit(dept, e)} style={{ background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} title="Edit Category">
                    <Edit2 size={14} color="#000" />
                  </button>
                  <button onClick={(e) => handleDelete(dept, e)} style={{ background: 'rgba(255,0,0,0.8)', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} title="Remove Category">
                    <Trash2 size={14} color="#fff" />
                  </button>
                </div>
                <div className="category-name">
                  <Highlight text={dept.name} highlight={globalSearchTerm} />
                </div>
              </div>
              
              <button 
                className={`category-btn ${isActive ? 'active' : 'switch'}`}
                onClick={() => setSelectedCategory(dept.name)}
              >
                {isActive ? 'ACTIVE' : 'SWITCH'}
              </button>
            
            <div className="category-stats">
              <div className="stat-box">Experts: {expertsCount < 10 ? `0${expertsCount}` : expertsCount}</div>
              <div className="stat-box">Cases: {casesCount < 10 ? `0${casesCount}` : casesCount}</div>
            </div>
          </div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
       
          
        </div>
      </div>
  );
};

export default Categories;
