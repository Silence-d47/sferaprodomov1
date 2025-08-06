import React from 'react';

interface OrganicWaveDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
}

export function OrganicWaveDivider({ position = 'bottom', color = '#f8f9fa' }: OrganicWaveDividerProps) {
  const style = {
    transform: position === 'top' ? 'scaleY(-1)' : 'none',
  };

  return (
    <div className="relative w-full h-20 md:h-28 lg:h-32 overflow-hidden" style={style}>
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C200,40 400,20 600,60 C800,100 1000,80 1200,40 L1200,120 L0,120 Z"
          fill={color}
          className="transition-all duration-500"
        />
        <path
          d="M0,0 C150,30 350,10 550,50 C750,90 950,70 1150,30 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.5"
          className="transition-all duration-500"
        />
        <path
          d="M0,0 C100,20 300,0 500,40 C700,80 900,60 1100,20 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.3"
          className="transition-all duration-500"
        />
      </svg>
    </div>
  );
}