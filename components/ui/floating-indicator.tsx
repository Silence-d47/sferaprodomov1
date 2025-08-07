"use client"

import React, { useState, useEffect } from 'react';
import { Phone, Activity, Clock } from 'lucide-react';

interface FloatingIndicatorProps {
  phoneNumber?: string;
  service?: string;
  location?: string;
}

const FloatingIndicator: React.FC<FloatingIndicatorProps> = ({ 
  phoneNumber = "+420 735 014 112",
  service = "24h Elektropohotovost",
  location = "Opava a okolí do 25km"
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed z-30 transition-all duration-500 ${
        isScrolled 
          ? 'right-1/2 transform translate-x-1/2 translate-x-16 bottom-10 scale-90' 
          : 'right-6 top-1/2 transform -translate-y-1/2 scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes pulseFromCenter {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .pulse-center {
          animation: pulseFromCenter 2s ease-out infinite;
        }
      `}</style>
      <div className={`
        relative flex items-center gap-3 
        bg-gradient-to-r from-red-600/95 to-red-700/95 
        backdrop-blur-xl border border-white/20 
        shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
        transition-all duration-300 text-white
        ${isHovered ? 'rounded-2xl p-4 w-64 scale-110' : 'rounded-full p-3 w-14 h-14 scale-100'}
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)]
        cursor-pointer
      `}>
        {/* Pulsing button */}
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
          </div>
          {/* Pulsing ring from center */}
          <div className="absolute inset-0 w-8 h-8 border-2 border-red-400 rounded-full pulse-center origin-center"></div>
        </div>

        {/* Content - visible on hover */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'
        }`}>
          <div className="whitespace-nowrap">
            <div className="font-bold text-sm">{service}</div>
            <div className="text-xs text-white/80">{location}</div>
            <div className="flex items-center gap-2 mt-1">
              <Phone className="h-3 w-3 text-white/80" />
              <span className="text-xs font-medium">{phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Small indicator when not hovered */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse ${
          isHovered ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}>
          <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default FloatingIndicator; 