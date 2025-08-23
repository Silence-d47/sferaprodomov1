"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { Calculator, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
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
  options?: CarouselOptions;
}

// Vylepšené varianty animací pro Framer Motion s profesionálními přechody
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1], // Profesionální cubic-bezier
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      damping: 20,
      stiffness: 100
    } 
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const subtitleVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    scale: 0.96
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      damping: 22,
      stiffness: 90
    } 
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.96,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  }
};

const contentVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      damping: 25,
      stiffness: 120
    } 
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

const buttonsVariants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      damping: 20,
      stiffness: 140
    } 
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
  }
};


export function UnifiedHero({ slides, options }: UnifiedHeroProps) {
  console.log("DATA PRO HERO:", slides);
  
  // Opraveno: Přidán watchDrag: true pro lepší detekci interakce
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false })).current;
  const [emblaRef, emblaApi] = useEmblaCarousel(
      {
      loop: true,
      skipSnaps: false,
      dragFree: false,
      watchDrag: true,
      draggable: true,
      slidesToScroll: 1,
      align: 'center',
      containScroll: 'trimSnaps',
      ...options
      } as unknown as  CarouselOptions & { watchDrag?: boolean } & { watchResize?: boolean } & { watchSlides?: boolean } & { watchFocus?: boolean }   , 
    [autoplay]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);
      emblaApi.scrollPrev();
    }
  }, [emblaApi, isTransitioning]);

  const scrollNext = useCallback(() => {
    if (emblaApi && !isTransitioning) {
      setIsTransitioning(true);
      emblaApi.scrollNext();
    }
  }, [emblaApi, isTransitioning]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi && !isTransitioning && index !== selectedIndex) {
      setIsTransitioning(true);
      emblaApi.scrollTo(index);
    }
  }, [emblaApi, isTransitioning, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      console.log('Slide changed to:', newIndex, 'Previous index:', selectedIndex);
      setSelectedIndex(newIndex);
      setIsTransitioning(false);
    };
    
    const onScroll = () => {
      // Aktualizace během scrollování
      const currentSnap = emblaApi.selectedScrollSnap();
      if (currentSnap !== selectedIndex) {
        setSelectedIndex(currentSnap);
      }
    };

    const onSettle = () => {
      setIsTransitioning(false);
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setIsTransitioning(false);
      setSelectedIndex(emblaApi.selectedScrollSnap());
      console.log('Carousel initialized with slide:', emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('settle', onSettle);
    emblaApi.on('init', onInit);



    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
      emblaApi.off('settle', onSettle);
      emblaApi.off('init', onInit);
    };
  }, [emblaApi, selectedIndex]);

  // Fallback pokud nejsou slides
  if (!slides || slides.length === 0) {
    return (
      <section className="relative min-h-[100svh] md:h-screen min-h-[540px] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
          <p>Hero slides are being loaded</p>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[selectedIndex] || slides[0];



    return (
      <section className="relative min-h-[120svh] md:h-screen min-h-[640px] overflow-hidden bg-gray-900 isolate">
        <div className="embla absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {slides.map((slide, index) => (
            <div key={slide.id || `slide-${index}`} className="embla__slide relative h-full overflow-hidden min-w-full flex-[0_0_100%]">
              {/* Vylepšené pozadí s Ken Burns efektem a  plynulými přechody */}
              {/* Obrázek na pozadí jako div s backgroundImage */}
      {slide.bgImage ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={slide.bgImage}
                    alt={slide.title || 'Slide background'}
                    fill
                    style={{
                      objectFit: 'cover',
                      opacity: selectedIndex === index ? 1 : 0,
                      // Přidáno pro debugging opacity

                      transition: 'opacity 0.5s ease-in-out',
                    }}
                    priority={true}
                  />
                </div>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-800" />
              )}
              
              {/* Vylepšený overlay s gradientem pro lepší viditelnost textu */}
              <motion.div 
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900/25 via-purple-900/20 to-black/40 md:from-blue-900/35 md:via-purple-900/30 md:to-black/50"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: selectedIndex === index ? 1 : 0.7
                }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
              
              {/* Přidaný jemný světelný efekt pro aktivní slide */}
              {selectedIndex === index && (
                <motion.div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-white/5 to-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hlavní obsah a statická karta - modernizovaný design s glassmorphismem */}
      <div className="relative z-30 h-full flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Modernizovaný glassmorphism design pro mobilní a desktopové zobrazení */}
          <div onMouseEnter={() => autoplay.stop()} onMouseLeave={() => autoplay.play()} className="w-full max-w-[95%] sm:max-w-3xl mx-auto bg-gradient-to-br from-white/10 via-white/15 to-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden z-40 mt-8 md:mt-0">
            {/* Glassmorphism efekt - dekorativní prvky */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/30 to-purple-500/20 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-orange-400/20 to-pink-500/20 rounded-full blur-3xl opacity-40"></div>
            
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlideData.id}
                variants={containerVariants as unknown as Variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col justify-center items-center relative z-10"
              >
             
                <div className="space-y-2 sm:space-y-4 mb-5 sm:mb-8">
                  <motion.h1
                    variants={titleVariants as unknown as Variants}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-tight"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)' }}
                  >
                    {currentSlideData.title}
                  </motion.h1>
                  {currentSlideData.subtitle && (
                    <motion.p 
                      variants={subtitleVariants as unknown as Variants} 
                      className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white font-medium leading-tight" 
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                    >
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}
                </div>
                
                {/* Popis se zobrazí pouze na větších zařízeních */}
                <motion.div variants={contentVariants as unknown as Variants} className="w-full hidden sm:block">
                  {currentSlideData.description && (
                    <p className="text-xs sm:text-base md:text-lg text-white leading-relaxed mb-5 sm:mb-8 max-w-xl mx-auto font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.8)' }}>
                      {currentSlideData.description}
                    </p>
                  )}
                </motion.div>
                  
                {/* Zjednodušená CTA tlačítka */}
                <motion.div 
                  variants={buttonsVariants as unknown as Variants}
                  className="flex flex-row gap-3 sm:gap-4 justify-center w-full mx-auto relative z-50"
                >
                  {currentSlideData.primaryButton?.isActive !== false && (
                    <Button asChild size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 sm:h-11 md:h-12 rounded-md shadow-md transition-all duration-200 hover:shadow-lg border-0 text-xs sm:text-sm md:text-base relative z-50 px-2 sm:px-3 md:px-4 truncate">
                      <Link href={currentSlideData.primaryButton?.link || "/kontakt"} className="flex items-center justify-center gap-1 sm:gap-2 w-full">
                        <Calculator className="min-w-4 h-4 sm:min-w-5 sm:h-5 md:min-w-5 md:h-5" />
                        <span className="truncate">{currentSlideData.primaryButton?.text || "Nezávazná nabídka"}</span>
                      </Link>
                    </Button>
                  )}
                  
                  {currentSlideData.secondaryButton?.isActive !== false && (
                    <Button asChild size="sm" className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold h-10 sm:h-11 md:h-12 rounded-md border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm hover:shadow-md text-xs sm:text-sm md:text-base relative z-50 px-2 sm:px-3 md:px-4 truncate">
                      <Link href={currentSlideData.secondaryButton?.link || `tel:${currentSlideData.phoneNumber || '+420735014112'}`} className="flex items-center justify-center gap-1 sm:gap-2 w-full">
                        <Phone className="min-w-4 h-4 sm:min-w-5 sm:h-5 md:min-w-5 md:h-5" />
                        <span className="truncate">{currentSlideData.secondaryButton?.text || "Zavolejte nám"}</span>
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modernizovaná navigace s glassmorphism efektem */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Navigační tlačítko - předchozí */}
            <motion.button 
              onClick={scrollPrev} 
              disabled={!emblaApi}
              aria-label="Předchozí slide" 
              className="bg-white/15 hover:bg-white/25 p-3 md:p-4 rounded-full backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.15)] group overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
                {/* Animovaný efekt záře */}
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-500/30 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 z-0 group-hover:animate-pulse"></span>
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </motion.button>
            
            {/* Modernizované tečky s glassmorphism efektem */}
            <div className="flex items-center gap-2.5 md:gap-3.5">
                {slides.map((slide, index) => (
                    <motion.button
                    key={`slide-dot-${slide.id || index}`}
                    onClick={() => scrollTo(index)}
                    disabled={!emblaApi}
                    className={cn(
                        "rounded-full transition-all duration-500 ease-out backdrop-blur-lg disabled:cursor-not-allowed",
                        index === selectedIndex 
                          ? 'w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-white/80 to-white/60 shadow-lg shadow-white/30 border border-white/70' 
                          : 'w-3 h-3 md:w-4 md:h-4 bg-white/30 hover:bg-white/50 border border-white/40 hover:border-white/60'
                    )}
                    aria-label={`Přejít na slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: index === selectedIndex ? 1 : 0.85,
                      opacity: index === selectedIndex ? 1 : 0.7
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Vnitřní kroužek pro aktivní tečku */}
                      {index === selectedIndex && (
                        <motion.span 
                          className="absolute inset-1.5 md:inset-2 rounded-full bg-white/90"
                          layoutId="activeDot"
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </motion.button>
                ))}
            </div>
            
            {/* Navigační tlačítko - další */}
            <motion.button 
              onClick={scrollNext} 
              disabled={!emblaApi}
              aria-label="Další slide" 
              className="bg-white/15 hover:bg-white/25 p-3 md:p-4 rounded-full backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(0,0,0,0.15)] group overflow-hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
                {/* Animovaný efekt záře */}
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-500/30 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 z-0 group-hover:animate-pulse"></span>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10 group-hover:translate-x-0.5 transition-transform duration-300" />
            </motion.button>
        </div>
      </div>

      {/* Enhanced Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden">
        <div className="w-full">
          <EnhancedSectionDivider />
        </div>
      </div>
    </section>
  );
}