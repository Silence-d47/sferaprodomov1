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
      hoverColor: 'bg-blue-500',
      iconSrc: '/hub/klimatizace.svg'
    },
    {
      id: 'tepelna-cerpadla',
      title: 'Tepelná Čerpadla',
      link: '/tepelna-cerpadla',
      hoverColor: 'bg-green-500',
      iconSrc: '/hub/tepelna-cerpadla.svg'
    },
    {
      id: 'elektroinstalace',
      title: 'Elektroinstalace',
      link: '/elektroinstalace',
      hoverColor: 'bg-orange-500',
      iconSrc: '/hub/elektroinstalace.svg'
    },
    {
      id: 'rekuperace',
      title: 'Rekuperace',
      link: '/rekuperace',
      hoverColor: 'bg-purple-500',
      iconSrc: '/hub/rekuperace.png'
    },
    {
      id: 'fotovoltaika',
      title: 'Fotovoltaika',
      link: '/fotovoltaika',
      hoverColor: 'bg-yellow-500',
      iconSrc: '/hub/fotovoltaika.svg'
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    setCurrentActive(serviceId);
    if (onServiceChange) {
      onServiceChange(serviceId);
    }
  };

  return (
    <div className={`fixed left-1/2 transform -translate-x-1/2 bottom-10 z-20 transition-all duration-500 ${
      isScrolled ? 'scale-75' : 'scale-100'
    }`}>
      <div className={`flex items-center gap-6 p-8 bg-white/15 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)_inset] transition-all duration-300 ${
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
                : `${service.hoverColor}/20`
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
                <span className="text-sm font-semibold text-white opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] whitespace-nowrap">
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
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm"
                >
                  <Link href={service.link}>
                    Zobrazit více
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ServiceHub }; 