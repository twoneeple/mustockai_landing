import React from 'react';

const MustockLogo = ({ size = 'medium' }) => {
  // Determine dimensions based on size prop
  let width, height, fontSize, subtitleSize;
  
  switch(size) {
    case 'small':
      width = 120;
      height = 40;
      fontSize = 18;
      subtitleSize = 8;
      break;
    case 'large':
      width = 240;
      height = 80;
      fontSize = 36;
      subtitleSize = 14;
      break;
    case 'medium':
    default:
      width = 180;
      height = 60;
      fontSize = 24;
      subtitleSize = 10;
      break;
  }

  return (
    <div className="flex items-center">
      {/* Logo SVG */}
      <svg 
        width={height} // Square aspect ratio for the icon
        height={height}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="#4F46E5" />
        
        {/* Guitar shape */}
        <path 
          d="M30 65 Q40 70 50 65 Q60 60 70 65 L65 35 Q55 30 45 35 Q35 40 30 35 Z" 
          fill="#FFFFFF" 
          stroke="#1E1B4B" 
          strokeWidth="2"
        />
        
        {/* Guitar strings */}
        <line x1="40" y1="40" x2="40" y2="60" stroke="#1E1B4B" strokeWidth="1" />
        <line x1="50" y1="40" x2="50" y2="60" stroke="#1E1B4B" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="60" stroke="#1E1B4B" strokeWidth="1" />
        
        {/* Sound hole */}
        <circle cx="50" cy="50" r="5" fill="#1E1B4B" />
      </svg>
      
      {/* Text part of logo */}
      <div className="ml-2">
        <div className="font-bold text-indigo-700" style={{ fontSize: `${fontSize}px` }}>
          Mustock<span className="text-gray-800">AI</span>
        </div>
        <div className="text-gray-600" style={{ fontSize: `${subtitleSize}px` }}>
          Music Inventory Assistant
        </div>
      </div>
    </div>
  );
};

export default MustockLogo;