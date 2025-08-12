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
  const [parallaxOffset, setParallaxOffset] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => setParallaxOffset(window.scrollY * 0.5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Kontejner pro posuvná pozadí */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              transform: `translateX(${(index - currentSlide) * -100}%) translateY(${parallaxOffset * -1}px)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-orange-900/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Hlavní obsah a statická karta */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* STATICKÁ KARTA - Funguje jako maska (okno) */}
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl border border-white/10 relative overflow-hidden mx-2">
              
              {/* Kontejner pro posuvný OBSAH uvnitř karty */}
              <div className="relative min-h-[80vh] md:min-h-[70vh] flex items-center justify-center">
                {slides.map((slideData, index) => (
                  <div
                    key={slideData.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center px-4 py-8"
                    style={{
                      opacity: index === currentSlide ? 1 : 0,
                      pointerEvents: index === currentSlide ? 'auto' : 'none',
                    }}
                  >
                    {/* Samotný obsah jednoho slidu */}
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20 mx-auto">
                      <Shield className="w-4 h-4 text-orange-300" />
                      <span className="text-white/90 font-medium">Garance kvality a spolehlivosti</span>
                    </div>

                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                        {slideData.title}
                      </h1>
                      {slideData.subtitle && (
                        <p className="text-lg md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed">
                          {slideData.subtitle}
                        </p>
                      )}
                    </div>

                    {slideData.description && (
                      <p className="text-base md:text-xl text-white/80 leading-relaxed mb-6 md:mb-10 max-w-2xl mx-auto px-2">
                        {slideData.description}
                      </p>
                    )}

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                      {(slideData.features || []).map((feature, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-full px-3 md:px-6 py-2 md:py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                          <span className="text-white font-medium text-xs md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-lg mx-auto px-2">
                      <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0">
                        <Link href="/kontakt" className="flex items-center justify-center space-x-2 md:space-x-3">
                          <Calculator className="w-4 md:w-5 h-4 md:h-5" />
                          <span className="text-sm md:text-base">Nezávazná nabídka</span>
                        </Link>
                      </Button>
                      <Button asChild size="lg" className="flex-1 bg-white/15 hover:bg-white/25 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl md:rounded-2xl border border-white/30 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:scale-[1.02]">
                        <Link href={`tel:${slideData.phoneNumber || '+420735014112'}`} className="flex items-center justify-center space-x-2 md:space-x-3">
                          <Phone className="w-4 md:w-5 h-4 md:h-5" />
                          <span className="text-sm md:text-base">Zavolejte nám</span>
                        </Link>
                      </Button>
                    </div>
                    

                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
                      <p className="text-white/60 text-xs md:text-sm mb-2">Nebo nám zavolejte přímo:</p>
                      <a 
                        href={`tel:${slideData.phoneNumber || '+420735014112'}`} 
                        className="text-lg md:text-2xl font-bold text-white hover:text-orange-300 transition-colors duration-300"
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
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 hover:scale-110 ${
              index === currentSlide
                ? 'w-12 h-3 bg-orange-400 rounded-full'
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      
      {/* Vlnka na spodu stránky */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <EnhancedSectionDivider 
          variant="wave"
          animated={true}
          height="xl"
          fromColor="from-transparent"
          toColor="to-white"
          particles={false}
        />
      </div>
    </section>
  );
}