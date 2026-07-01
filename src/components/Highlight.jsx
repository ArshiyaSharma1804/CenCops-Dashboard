import React from 'react';

const Highlight = ({ text, highlight }) => {
  if (!text) return null;
  
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  
  // Use a regex to split the text by the highlight term, ignoring case
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.toString().split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} style={{ backgroundColor: '#FFCC00', color: '#000', borderRadius: '2px', padding: '0 2px' }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default Highlight;
