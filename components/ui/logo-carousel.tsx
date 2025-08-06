"use client"

import React from 'react'
import Image from 'next/image'

interface LogoCarouselProps {
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export function LogoCarousel({
  speed = 'medium',
  direction = 'left',
  pauseOnHover = true
}: LogoCarouselProps) {
  // List of all logos from public/labels directory
  const logos = [
    { name: 'MDV', src: '/labels/mdv.svg' },
    { name: 'Midea', src: '/labels/midea.svg' },
    { name: 'Nordstar', src: '/labels/nordstar.svg' },
    { name: 'Panasonic', src: '/labels/panasonic.svg' },
    { name: 'Samsung', src: '/labels/samsung.svg' },
    { name: 'Viessmann', src: '/labels/viessmann.svg' }
  ]

  // Duplicate logos multiple times for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos]

  return (
    <section className="carousel-section">
      <style jsx>{`
        .carousel-section {
          padding: 3rem 0;
          background: transparent;
          backdrop-filter: none;
          border-top: none;
          border-bottom: none;
          overflow: hidden;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          position: relative;
          filter: blur(0.3px);
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-logos {
          animation: scroll 60s linear infinite;
          display: flex;
          width: max-content;
          overflow: hidden;
          filter: blur(0.5px);
        }
        .scrolling-logos {
          animation: scroll 60s linear infinite;
          display: flex;
          width: max-content;
          overflow: hidden;
          filter: blur(0.5px);
        }
        .scrolling-logos:hover {
          animation-play-state: running;
        }
        .fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5rem;
          background: linear-gradient(to right, transparent);
          z-index: 10;
        }
        .fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 5rem;
          background: linear-gradient(to left, transparent);
          z-index: 10;
        }
      `}</style>
      
      <div className="w-full px-4 relative">
        {/* Blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none"></div>
        
        <div className="text-center mb-8 max-w-4xl mx-auto relative z-10">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Důvěřují nám přední značky
          </p>
        </div>
        
        <div className="relative overflow-hidden w-full">
          {/* Gradient fade edges */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>
          
          {/* Scrolling logos container */}
          <div className="scrolling-logos items-center gap-20">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className={`flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 mx-8 ${
                  logo.name === 'Nordstar' ? 'w-48 h-24' : 'w-32 h-16'
                }`}
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={logo.name === 'Nordstar' ? 192 : 128}
                  height={logo.name === 'Nordstar' ? 96 : 64}
                  className="max-w-full max-h-full object-contain filter brightness-0 opacity-60 hover:brightness-100 hover:opacity-100 transition-all duration-300"
                  priority={index < logos.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

