"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { Calculator, Phone, Shield } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  features: string[];
  phoneNumber: string; // Přidáno pro dynamické telefonní číslo, pokud by se lišilo
}

const SLIDES: HeroSlide[] = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    subtitle: "Dokonalý komfort po celý rok",
    description: "Profesionální instalace a servis klimatizačních systémů s garancí kvality a dlouhodobé spokojenosti.",
    bgImage: "/images/klima_homepage_hero.png",
    features: ["Úspora až 40%", "Záruka 5 let", "Servis 24/7", "Certifikace"],
    phoneNumber: "+420 735 014 112"
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla",
    subtitle: "Ekologické vytápění budoucnosti",
    description: "Moderní tepelná čerpadla s nejvyšší efektivitou. Šetrné k životnímu prostředí i vaší peněžence.",
    bgImage: "/images/tep_cer_homepage_hero.png",
    features: ["Úspora až 60%", "Třída A+++", "0% emisí", "Dotace až 180k"],
    phoneNumber: "+420 735 014 112"
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    subtitle: "Čerstvý vzduch bez tepelných ztrát",
    description: "Systémy rekuperace pro zdravé bydlení. Čistý vzduch s minimální spotřebou energie.",
    bgImage: "/images/rekuperace_homepage_hero.png",
    features: ["95% účinnost", "30% úspora", "Čistý vzduch", "Tichý provoz"],
    phoneNumber: "+420 735 014 112"
  },
];

export function UnifiedHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
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
  }, []);

  useEffect(() => {
    const handleScroll = () => setParallaxOffset(window.scrollY * 0.5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Kontejner pro posuvná pozadí */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
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
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* STATICKÁ KARTA - Funguje jako maska (okno) */}
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10 relative overflow-hidden">
              
              {/* Kontejner pro posuvný OBSAH uvnitř karty */}
              <div className="relative" style={{ minHeight: '65vh' }}>
                {SLIDES.map((slideData, index) => (
                  <div
                    key={slideData.id}
                    className="absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center"
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

                    <div className="space-y-4 mb-8">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                        {slideData.title}
                      </h1>
                      <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed">
                        {slideData.subtitle}
                      </p>
                    </div>

                    <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                      {slideData.description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                      {slideData.features.map((feature, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                          <span className="text-white font-medium text-sm md:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                      <Button asChild size="lg" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0">
                        <Link href="/kontakt" className="flex items-center justify-center space-x-3">
                          <Calculator className="w-5 h-5" />
                          <span>Nezávazná nabídka</span>
                        </Link>
                      </Button>
                      <Button asChild size="lg" className="flex-1 bg-white/15 hover:bg-white/25 text-white font-bold py-4 px-8 rounded-2xl border border-white/30 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:scale-[1.02]">
                        <Link href={`tel:${slideData.phoneNumber}`} className="flex items-center justify-center space-x-3">
                          <Phone className="w-5 h-5" />
                          <span>Zavolejte nám</span>
                        </Link>
                      </Button>
                    </div>
                    

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <p className="text-white/60 text-sm mb-2">Nebo nám zavolejte přímo:</p>
                      <a 
                        href={`tel:${slideData.phoneNumber}`} 
                        className="text-xl md:text-2xl font-bold text-white hover:text-orange-300 transition-colors duration-300"
                      >
                        {slideData.phoneNumber}
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
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {SLIDES.map((_, index) => (
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