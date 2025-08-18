"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { Calculator, Phone, Shield } from 'lucide-react';

export interface UnifiedHeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  bgImage: string;
  features?: string[];
  phoneNumber?: string;
}

interface UnifiedHeroProps {
  slides: UnifiedHeroSlide[];
}

export function UnifiedHero({ slides }: UnifiedHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, 7000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    stopAutoPlay();
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [slides?.length]);

  return (
    <section className="relative min-h-[100svh] md:h-screen min-h-[540px] overflow-hidden">
      {/* Kontejner pro posuvná pozadí */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-transform duration-1000 ease-in-out z-0"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              // Pouze posun pro slideshow bez paralax efektu
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-orange-900/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/*   Hlavní obsah a statická karta */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* STATICKÁ KARTA - Funguje jako maska (okno) */}
            <div className="w-full max-w-[560px] sm:max-w-3xl mx-4 sm:mx-auto bg-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-4 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10 ring-1 ring-white/20 relative overflow-hidden">
              
              {/* Kontejner pro posuvný OBSAH uvnitř karty */}
              <div className="relative min-h-[52vh] md:min-h-[68vh] flex items-center justify-center">
                {slides.map((slideData, index) => (
                  <div
                    key={slideData.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center px-1 py-1"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      pointerEvents: index === currentSlide ? 'auto' : 'none',
                    }}
                  >
                    {/* Samotný obsah jednoho slidu */}
                    <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-orange-500/25 to-blue-500/25 backdrop-blur-md rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 mb-4 sm:mb-6 border border-white/20 mx-auto mt-2 sm:mt-4 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-300 animate-pulse hover:animate-bounce transition-all duration-300" />
                      <span className="text-white/90 font-medium text-xs sm:text-sm">Garance kvality a spolehlivosti</span>
                    </div>

                    <div className="space-y-2 sm:space-y-3 md:space-y-4 mb-4 sm:mb-6 md:mb-8">
                      <h1 className="text-[24px] sm:text-[28px] md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight hover:scale-105 transition-transform duration-500">
                        {slideData.title}
                      </h1>
                      {slideData.subtitle && (
                        <p className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl text-blue-100 font-light leading-relaxed hover:text-white transition-colors duration-300">
                          {slideData.subtitle}
                        </p>
                      )}
                    </div>

                    {slideData.description && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-4 sm:mb-6 md:mb-10 max-w-sm sm:max-w-2xl mx-auto px-2 sm:px-3 hover:text-white/90 transition-colors duration-300">
                        {slideData.description}
                      </p>
                    )}

                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-4 mb-6 sm:mb-8 md:mb-12">
                      {(slideData.features || []).map((feature, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-full px-2 py-1.5 sm:px-3 sm:py-2 md:px-6 md:py-3 border border-white/20 hover:bg-white/15 hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-pointer">
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center max-w-sm sm:max-w-lg mx-auto px-2">
                      <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 hover:animate-pulse text-sm sm:text-base h-10 sm:h-12 md:h-14">
                        <Link href="/kontakt" className="flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3">
                          <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-bounce" />
                          <span className="text-xs sm:text-sm md:text-base">Nezávazná nabídka</span>
                        </Link>
                      </Button>
                      <Button asChild size="lg" className="flex-1 bg-white/15 hover:bg-white/25 text-white font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg sm:rounded-xl md:rounded-2xl border border-white/30 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base h-10 sm:h-12 md:h-14">
                        <Link href={`tel:${slideData.phoneNumber || '+420735014112'}`} className="flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 animate-pulse" />
                          <span className="text-xs sm:text-sm md:text-base">Zavolejte nám</span>
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-white/10">
                      <p className="text-white/60 text-xs sm:text-sm mb-1.5 sm:mb-2">Nebo nám zavolejte přímo:</p>
                      <a 
                        href={`tel:${slideData.phoneNumber || '+420735014112'}`} 
                        className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white hover:text-orange-300 transition-colors duration-300 hover:scale-105 inline-block"
                      >
                        {slideData.phoneNumber || '+420 735 014 112'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigační tečky */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
              aria-label={`Přejít na slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Section Divider - vlnka na spodu */}
      <div className="absolute bottom-0 z-30 -left-1 -right-1 overflow-hidden">
        <div className="w-[calc(100%+8px)] -ml-1">
          <EnhancedSectionDivider />
        </div>
      </div>
    </section>
  );
}