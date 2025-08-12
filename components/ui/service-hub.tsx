"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ServiceHubProps {
  onServiceChange?: (serviceId: string) => void;
  activeService?: string;
}

const ServiceHub: React.FC<ServiceHubProps> = ({ onServiceChange, activeService }) => {
  const [currentActive, setCurrentActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'klimatizace',
      title: 'Klimatizace',
      link: '/klimatizace',
      hoverColor: 'bg-blue-300',
      iconSrc: '/hub/klimatizace.svg'
    },
    {
      id: 'tepelna-cerpadla',
      title: 'Tepelná Čerpadla',
      link: '/tepelna-cerpadla',
      hoverColor: 'bg-green-300',
      iconSrc: '/hub/tepelna-cerpadla.svg'
    },
    {
      id: 'elektroinstalace',
      title: 'Elektroinstalace',
      link: '/elektroinstalace',
      hoverColor: 'bg-orange-300',
      iconSrc: '/hub/elektroinstalace.svg'
    },
    {
      id: 'rekuperace',
      title: 'Rekuperace',
      link: '/rekuperace',
      hoverColor: 'bg-purple-300',
      iconSrc: '/hub/rekuperace.png'
    },
    {
      id: 'fotovoltaika',
      title: 'Fotovoltaika',
      link: '/fotovoltaika',
      hoverColor: 'bg-yellow-300',
      iconSrc: '/hub/fotovoltaika.svg'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setCurrentActive(serviceId);
    if (onServiceChange) {
      onServiceChange(serviceId);
    }
  };

  const handleMobileToggle = () => {
    setIsMobileExpanded(!isMobileExpanded);
  };

  // Close mobile expanded view when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (isMobileExpanded && !(event.target as Element).closest('.service-hub-container')) {
        setIsMobileExpanded(false);
      }
    };

    if (isMobileExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileExpanded]);

  return (
    <div className={`fixed left-1/2 transform -translate-x-1/2 bottom-4 md:bottom-10 z-20 transition-all duration-500 ${
      isScrolled ? 'scale-100 md:scale-75' : 'scale-100'
    }`}>
      <div className="service-hub-container">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {!isMobileExpanded ? (
            // Collapsed mobile bar
            <div 
              className="flex items-center justify-center gap-2 p-3 bg-white/25 backdrop-blur-3xl border border-white/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] cursor-pointer"
              onClick={handleMobileToggle}
            >
              {services.map((service) => (
                <div key={service.id} className="w-8 h-8">
                  <Image
                    src={service.iconSrc}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) brightness(0) invert(1)"
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Vertical list - one service per row
            <div className="bg-white/25 backdrop-blur-3xl border border-white/40 rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] p-3 w-64">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.link}
                  className={`
                    flex items-center p-3 rounded-xl cursor-pointer mb-2 last:mb-0
                    transition-all duration-300 ease-out text-white
                    ${service.hoverColor}/80 hover:${service.hoverColor} hover:scale-[1.02]
                    shadow-[0_2px_8px_rgba(0,0,0,0.15)]
                  `}
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <Image
                      src={service.iconSrc}
                      alt={service.title}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                      style={{
                        filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3)) brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <span className="ml-3 text-sm font-medium text-black flex-grow">
                    {service.title}
                  </span>
                  <svg
                    className="w-5 h-5 text-black/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Layout - unchanged */}
        <div className="hidden md:block">
          <div className={`flex items-center gap-6 p-8 bg-white/25 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] transition-all duration-300 ${
            isScrolled && !hoveredService ? 'h-16' : hoveredService ? 'h-56' : 'h-32'
          }`}>
            {services.map((service) => (
              <div
                key={service.id}
                className={`
                  relative flex flex-col items-center justify-center rounded-2xl cursor-pointer
                  transition-all duration-300 ease-out text-white
                  ${isScrolled && !hoveredService ? 'w-12 h-12' : hoveredService === service.id ? 'w-48 h-44' : 'w-32 h-28'}
                  hover:transform hover:-translate-y-1 hover:scale-105
                  ${hoveredService === service.id 
                    ? `${service.hoverColor} shadow-[0_0_20px_rgba(0,0,0,0.3)]` 
                    : `${service.hoverColor}/70`
                  }
                `}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon - always visible, smaller when hovered */}
                <div className={`transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${
                  isScrolled && !hoveredService ? 'mb-0' : hoveredService === service.id ? 'mb-2' : 'mb-0'
                }`}>
                  <Image
                    src={service.iconSrc}
                    alt={service.title}
                    width={isScrolled && !hoveredService ? 32 : hoveredService === service.id ? 48 : 64}
                    height={isScrolled && !hoveredService ? 32 : hoveredService === service.id ? 48 : 64}
                    className={`transition-all duration-300 object-contain ${
                      isScrolled && !hoveredService ? "w-8 h-8" : hoveredService === service.id ? "w-12 h-12" : "w-16 h-16"
                    }`}
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4)) brightness(0) invert(1)"
                    }}
                  />
                </div>
                
                {/* Title - only visible on hover */}
                {hoveredService === service.id && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-center">
                    <span className="text-sm font-semibold text-black opacity-79 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] whitespace-nowrap">
                      {service.title}
                    </span>
                  </div>
                )}
                
                {/* Button - only visible on hover */}
                {hoveredService === service.id && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                    <Button 
                      asChild
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm text-black hover:bg-black/30 border border-white/10 px-2 py-2 rounded-full font-small transition-all duration-300 text-sm"
                    >
                      <Link href={service.link}>
                        Více &gt;
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ServiceHub }; 