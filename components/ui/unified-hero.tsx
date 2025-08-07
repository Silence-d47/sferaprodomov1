"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider';
import { CheckCircle, Zap, Clock, Calculator, Phone, ArrowRight, Shield } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  features: string[];
}

const SLIDES: HeroSlide[] = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    subtitle: "Dokonalý komfort po celý rok",
    description: "Profesionální instalace a servis klimatizačních systémů s garancí kvality a dlouhodobé spokojenosti.",
    bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
    features: ["Úspora až 40%", "Záruka 5 let", "Servis 24/7", "Certifikace"]
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla",
    subtitle: "Ekologické vytápění budoucnosti",
    description: "Moderní tepelná čerpadla s nejvyšší efektivitou. Šetrné k životnímu prostředí i vaší peněžence.",
    bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
    features: ["Úspora až 60%", "Třída A+++", "0% emisí", "Dotace až 180k"]
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    subtitle: "Čerstvý vzduch bez tepelných ztrát",
    description: "Systémy rekuperace pro zdravé bydlení. Čistý vzduch s minimální spotřebou energie.",
    bgImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    features: ["95% účinnost", "30% úspora", "Čistý vzduch", "Tichý provoz"]
  },
];

export function UnifiedHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlideData = SLIDES[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1500 ease-out"
        style={{ backgroundImage: `url(${currentSlideData.bgImage})` }}
      >
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-orange-900/30" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Main Glassmorphism Panel */}
            <div className="bg-white/[0.08] backdrop-blur-2xl rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/10 transform transition-all duration-1000">
              
              {/* Top Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <Shield className="w-4 h-4 text-orange-300" />
                <span className="text-white/90 font-medium">Odborníci s 15letou zkušeností</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed">
                  {currentSlideData.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
                {currentSlideData.description}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                {currentSlideData.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-full px-4 md:px-6 py-2 md:py-3 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <span className="text-white font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button 
                  asChild
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0"
                >
                  <Link href="/kontakt" className="flex items-center justify-center space-x-3">
                    <Calculator className="w-5 h-5" />
                    <span>Nezávazná nabídka</span>
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  size="lg"
                  className="flex-1 bg-white/15 hover:bg-white/25 text-white font-bold py-4 px-8 rounded-2xl border border-white/30 hover:border-white/40 transition-all duration-300 backdrop-blur-md hover:scale-[1.02]"
                >
                  <Link href="tel:+420735014112" className="flex items-center justify-center space-x-3">
                    <Phone className="w-5 h-5" />
                    <span>Zavolejte nám</span>
                  </Link>
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">Nebo nám zavolejte přímo:</p>
                <a 
                  href="tel:+420735014112" 
                  className="text-xl md:text-2xl font-bold text-white hover:text-orange-300 transition-colors duration-300"
                >
                  +420 735 014 112
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots - Bottom Center */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
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

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
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