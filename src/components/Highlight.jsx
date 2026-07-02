import React from 'react';

const Highlight = ({ text, highlight }) => {
  if (!text) return null;
  
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.toString().split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? (
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
