"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { CheckCircle, Zap, Clock, Calculator, Phone, Star, Users, Award, Heart } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  description: string;
  bgImage: string;
  cta: string;
  ctaLink: string;
  ctaIcon: React.ComponentType<{ className?: string }>;
  secondaryCta: string;
  secondaryCtaLink: string;
  secondaryCtaIcon: React.ComponentType<{ className?: string }>;
}

const heroSlides: HeroSlide[] = [
  {
    id: "klimatizace",
    title: "Dokonalá klimatizace pro váš domov",
    description: "Odborná instalace, servis a poradenství. Zajistíme vám ideální teplotu po celý rok s úsporou energie až 40%.",
    bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    cta: "Nezávazná kalkulace",
    ctaLink: "/kontakt",
    ctaIcon: Calculator,
    secondaryCta: "Zavolejte nám",
    secondaryCtaLink: "tel:+420735014112",
    secondaryCtaIcon: Phone,
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla s maximální úsporou",
    description: "Efektivní vytápění a chlazení s úsporou až 60% nákladů. Profesionální instalace a servis.",
    bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
    cta: "Nezávazná kalkulace",
    ctaLink: "/kontakt",
    ctaIcon: Calculator,
    secondaryCta: "Zavolejte nám",
    secondaryCtaLink: "tel:+420735014112",
    secondaryCtaIcon: Phone,
  },
  {
    id: "rekuperace",
    title: "Čerstvý vzduch bez ztrát tepla",
    description: "Rekuperační systémy pro zdravé vnitřní prostředí. Úspora až 30% nákladů na vytápění.",
    bgImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "Nezávazná kalkulace",
    ctaLink: "/kontakt",
    ctaIcon: Calculator,
    secondaryCta: "Zavolejte nám",
    secondaryCtaLink: "tel:+420735014112",
    secondaryCtaIcon: Phone,
  },
];

export function UnifiedHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setSlideDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with image and overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${currentSlideData.bgImage})`
        }}
      >
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* White gradient overlay for logo visibility */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-white/50 via-white/30 to-transparent" style={{ borderRadius: '50%' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
                  <div className="text-center lg:text-left">
          
          {/* Left Content */}
          <div className={`text-white space-y-8 transition-all duration-1000 ease-in-out max-w-5xl mx-auto lg:mx-0 animate-fade-in-out ${
            slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
          }`}>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-900/40 rounded-2xl -z-10 transform -rotate-1"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg relative z-10">
                  {currentSlideData.title}
                </h1>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed opacity-95 max-w-2xl mx-auto lg:mx-0 drop-shadow-lg text-white font-medium">
                {currentSlideData.description}
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 bg-white/30 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-white/20">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="font-semibold drop-shadow-sm text-sm">Záruka 5 let</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/30 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-white/20">
                <Zap className="w-4 h-4 text-white" />
                <span className="font-semibold drop-shadow-sm text-sm">Úspora až 40%</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/30 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-white/20">
                <Clock className="w-4 h-4 text-white" />
                <span className="font-semibold drop-shadow-sm text-sm">Servis 24/7</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/30 backdrop-blur-md rounded-full px-5 py-2.5 shadow-lg border border-white/20">
                <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-900">✓</span>
                </div>
                <span className="font-semibold drop-shadow-sm text-sm">Certifikováno</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link href={currentSlideData.ctaLink} className="flex items-center space-x-2">
                  <currentSlideData.ctaIcon className="w-5 h-5" />
                  <span>{currentSlideData.cta}</span>
                </Link>
              </Button>
              <Button 
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 backdrop-blur-sm hover:scale-105"
              >
                <Link href="tel:+420735014112" className="flex items-center space-x-3 group">
                  <Phone className="w-5 h-5 animate-phone-shake" />
                  <span>Zavolejte nám</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Navigation Dots */}
    <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-4">
      {heroSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
            index === currentSlide 
              ? 'bg-white scale-125' 
              : 'bg-white/50 hover:bg-white/75'
          }`}
        />
      ))}
    </div>

    {/* Navigation Arrows */}
    <button
      onClick={prevSlide}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      onClick={nextSlide}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* Enhanced Wave Divider at bottom */}
    <div className="absolute bottom-0 left-0 right-0">
        <EnhancedSectionDivider 
          variant="wave"
          animated={true}
          height="xl"
          fromColor="from-white/5"
          toColor="to-white"
          particles={false}
        />
    </div>
  </section>
  );
}