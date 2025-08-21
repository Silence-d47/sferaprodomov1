"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { Calculator, Phone, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Pomocná funkce pro spojování classNames (běžná u shadcn/ui)

// Interface zůstává stejný
export interface UnifiedHeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  bgImage: string;
  features?: string[];
  phoneNumber?: string;
  primaryButton?: { text: string; link: string; isActive: boolean; };
  secondaryButton?: { text: string; link: string; isActive: boolean; };
}

interface UnifiedHeroProps {
  slides: UnifiedHeroSlide[];
  options?: EmblaOptionsType;
}

// Varianty animací pro Framer Motion
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

const otherElementsVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 } },
};


export function UnifiedHero({ slides, options }: UnifiedHeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {loop: true, ...options} as any, // Použijeme any pro vyřešení konfliktu typů
    [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })] as any 
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ progress, setProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setProgress(progress * 100);
    }
    
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi]);

  const currentSlideData = slides[selectedIndex];

  return (
    <section className="relative min-h-[100svh] md:h-screen min-h-[540px] overflow-hidden bg-gray-900">
      <div className="embla absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="embla__slide relative h-full">
              {/* Vylepšené pozadí s Ken Burns efektem */}
              <div
                className="absolute inset-0 transition-transform duration-[10000ms] ease-linear"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: selectedIndex === slides.indexOf(slide) ? 'scale(1.15)' : 'scale(1)',
                }}
              />
              {/* Vylepšený overlay pro lepší čitelnost */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/15 to-black/30 sm:from-blue-900/40 sm:via-purple-900/30 sm:to-black/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Hlavní obsah a statická karta */}
      <div className="relative z-30 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl mx-auto text-center">
          <div className="w-full max-w-4xl mx-auto bg-white/25 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-white/30 relative overflow-hidden relative z-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlideData.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col justify-center items-center"
              >
                <motion.div variants={otherElementsVariants as any} className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-white/40">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                  <span className="text-white font-medium text-xs sm:text-sm">Garance kvality a spolehlivosti</span>
                </motion.div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <motion.h1
                    variants={titleVariants as any}
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
                  >
                    {currentSlideData.title}
                  </motion.h1>
                  {currentSlideData.subtitle && (
                    <motion.p variants={subtitleVariants as any} className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-medium leading-tight">
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}
                </div>
                
                <motion.div variants={otherElementsVariants as any} className="w-full">
                  {currentSlideData.description && (
                    <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
                      {currentSlideData.description}
                    </p>
                  )}
                  
                  {/* CTA tlačítka */}
                   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto relative z-50">
                      {currentSlideData.primaryButton?.isActive !== false && (
                        <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold h-12 sm:h-14 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0 text-sm sm:text-base relative z-50">
                          <Link href={currentSlideData.primaryButton?.link || "/kontakt"} className="flex items-center justify-center space-x-2">
                            <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>{currentSlideData.primaryButton?.text || "Nezávazná nabídka"}</span>
                          </Link>
                        </Button>
                      )}
                      
                      {currentSlideData.secondaryButton?.isActive !== false && (
                        <Button asChild size="lg" className="flex-1 bg-white/25 hover:bg-white/35 text-white font-bold h-12 sm:h-14 rounded-xl border border-white/40 hover:border-white/50 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-xl text-sm sm:text-base relative z-50">
                          <Link href={currentSlideData.secondaryButton?.link || `tel:${currentSlideData.phoneNumber || '+420735014112'}`} className="flex items-center justify-center space-x-2">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>{currentSlideData.secondaryButton?.text || "Zavolejte nám"}</span>
                          </Link>
                        </Button>
                      )}
                    </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigace a Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4">
        <div className="flex items-center justify-center gap-6">
            <button onClick={scrollPrev} aria-label="Předchozí slide" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-transform hover:scale-110">
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-3">
                {slides.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    )}
                    aria-label={`Přejít na slide ${index + 1}`}
                    />
                ))}
            </div>
             <button onClick={scrollNext} aria-label="Další slide" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-transform hover:scale-110">
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </div>
        {/* Autoplay Progress Bar */}
        <div className="absolute top-[-20px] left-0 w-full h-1 bg-white/20 overflow-hidden rounded-full">
             <motion.div 
                className="h-full bg-white"
                style={{ width: `${(100 / slides.length) * (selectedIndex + 1)}%` }} // Tento progress ukazuje, na kterém jste slidu
                // Pro plynulý progress na základě scrollování
                // style={{ width: `${progress}%` }}
             />
        </div>
      </div>

      {/* Enhanced Section Divider */}
      <div className="absolute bottom-0 z-30 -left-1 -right-1 overflow-hidden">
        <div className="w-[calc(100%+8px)] -ml-1">
          <EnhancedSectionDivider />
        </div>
      </div>
    </section>
  );
}