import React from 'react';

const LogoIcon = ({ 
  width = 100, 
  height = 100, 
  fill = "currentColor", 
  className = "" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M 50 16
           C 70 16, 82 28, 84 52
           C 82 25, 65 25, 54 40
           C 52.5 48, 52.5 56, 54 64
           C 56 78, 70 84, 84 84
           C 72 82, 60 76, 50 76
           C 40 76, 28 82, 16 84
           C 30 84, 44 78, 46 64
           C 47.5 56, 47.5 48, 46 40
           C 35 25, 18 25, 16 52
           C 18 28, 30 16, 50 16
           Z" 
      />
    </svg>
  );
};

export default LogoIcon;
