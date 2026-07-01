import React, { useState, useRef, useEffect } from 'react';

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('IPDR / CDR');
  const dropdownRef = useRef(null);

  const categories = [
    'IPDR / CDR',
    'OSINT',
    'Image / Video',
    'Mobile',
    'CPU / Hard Drive'
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="cat-dropdown-container" ref={dropdownRef}>
      <button 
        className={`cat-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="cat-dropdown-trigger-left">
          <svg className="cat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="cat-dropdown-text">{selected}</span>
        </div>
        <svg 
          className="cat-chevron" 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="cat-dropdown-menu">
          <ul className="cat-dropdown-list">
            {categories.map((cat, index) => (
              <li key={index} className="cat-dropdown-item" onClick={() => { setSelected(cat); setIsOpen(false); }}>
                <span className="cat-bullet">•</span> <span className="cat-text">{cat}</span>
              </li>
            ))}
          </ul>
          <div className="cat-dropdown-search">
            <svg className="cat-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input type="text" placeholder="Search categories" className="cat-search-input" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
