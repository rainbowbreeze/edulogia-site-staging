import React from 'react';

interface EdulogiaLogoProps {
  className?: string;
  size?: number;
}

export default function EdulogiaLogo({ className = "", size = 48 }: EdulogiaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Neo-brutalist drop shadow */}
      <rect x="23" y="28" width="54" height="42" rx="10" fill="#0F172A" />
      
      {/* Main Screen Body (Brand Yellow) */}
      <rect x="20" y="25" width="54" height="42" rx="10" fill="#FFD166" stroke="#0F172A" strokeWidth="4.5" strokeLinejoin="round" />
      
      {/* Inner Screen Area (White) */}
      <rect x="27" y="32" width="40" height="28" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
      
      {/* Little heart inside screen (Brand Pink) */}
      <path 
        d="M47 43 C45 40.5 41 40.5 39 43 C37 45.5 41 50 47 53 C53 50 57 45.5 55 43 C53 40.5 49 40.5 47 43 Z" 
        fill="#EF476F" 
        stroke="#0F172A" 
        strokeWidth="2.5" 
        strokeLinejoin="round"
      />
      
      {/* Sparkles / digital stars in the screen corner */}
      <path d="M61 36 L62 38 L64 39 L62 40 L61 42 L60 40 L58 39 L60 38 Z" fill="#06D6A0" stroke="#0F172A" strokeWidth="1.5" />
      
      {/* Laptop Base (Brand Blue) */}
      <path d="M12 73 C12 73 15 82 25 82 H75 C85 82 88 73 88 73" stroke="#0F172A" strokeWidth="4.5" fill="#06D6A0" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="28" y1="73" x2="72" y2="73" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
      
      {/* Sprout Stem coming out of the screen (Slate-900) */}
      <path d="M50 25 V12" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
      
      {/* Left Leaf (Brand Blue) */}
      <path 
        d="M50 18 Q36 14 42 6 Q50 10 50 18 Z" 
        fill="#06D6A0" 
        stroke="#0F172A" 
        strokeWidth="3.5" 
        strokeLinejoin="round" 
      />
      
      {/* Right Leaf (Brand Pink) */}
      <path 
        d="M50 14 Q64 10 58 2 Q50 6 50 14 Z" 
        fill="#EF476F" 
        stroke="#0F172A" 
        strokeWidth="3.5" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
