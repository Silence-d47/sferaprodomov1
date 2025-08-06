"use client"

import React, { useEffect, useState } from 'react'

interface EnhancedSectionDividerProps {
  variant?: 'wave' | 'organic' | 'geometric'
  animated?: boolean
  height?: 'sm' | 'md' | 'lg' | 'xl'
  fromColor?: string
  toColor?: string
  particles?: boolean
}

export function EnhancedSectionDivider({
  variant = 'wave',
  animated = true,
  height = 'lg',
  fromColor = 'from-transparent',
  toColor = 'to-white',
  particles = true
}: EnhancedSectionDividerProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!animated) return

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [animated])

  const heightClasses = {
    sm: 'h-16',
    md: 'h-24',
    lg: 'h-32',
    xl: 'h-40'
  }

  const particleElements = particles ? Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float-${i % 3}`}
      style={{
        left: `${10 + (i * 8)}%`,
        top: `${20 + (i % 3) * 20}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${3 + (i % 2)}s`
      }}
    />
  )) : null

  if (variant === 'organic') {
    return (
      <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${fromColor} ${toColor}`} />
        
        {/* Floating Particles */}
        {particleElements}
        
        {/* Organic SVG Shapes */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          style={{
            transform: animated ? `translateY(${scrollY * 0.1}px)` : 'none'
          }}
        >
          <defs>
            <linearGradient id="organicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="50%" stopColor="rgba(248,250,252,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
          </defs>
          
          {/* Main organic shape */}
          <path
            d="M0,160 C200,120 400,140 600,100 C800,60 1000,80 1200,40 L1200,160 L0,160 Z"
            fill="url(#organicGradient)"
            className={animated ? "animate-wave-slow" : ""}
          />
          
          {/* Secondary organic layer */}
          <path
            d="M0,160 C150,130 350,150 550,110 C750,70 950,90 1150,50 L1200,160 L0,160 Z"
            fill="rgba(255,255,255,0.8)"
            className={animated ? "animate-wave-medium" : ""}
          />
          
          {/* Tertiary organic layer */}
          <path
            d="M0,160 C100,140 300,160 500,120 C700,80 900,100 1100,60 L1200,160 L0,160 Z"
            fill="rgba(255,255,255,0.6)"
            className={animated ? "animate-wave-fast" : ""}
          />
        </svg>
      </div>
    )
  }

  if (variant === 'geometric') {
    return (
      <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor}`} />
        
        {/* Floating Particles */}
        {particleElements}
        
        {/* Geometric Shapes */}
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="geometricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
          </defs>
          
          {/* Geometric triangular pattern */}
          <polygon
            points="0,160 200,120 400,160 600,100 800,160 1000,80 1200,160"
            fill="url(#geometricGradient)"
            className={animated ? "animate-pulse-slow" : ""}
          />
          
          {/* Secondary geometric layer */}
          <polygon
            points="0,160 150,130 300,160 450,110 600,160 750,90 900,160 1050,70 1200,160"
            fill="rgba(255,255,255,0.7)"
            className={animated ? "animate-pulse-medium" : ""}
          />
        </svg>
      </div>
    )
  }

  // Default wave variant
  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden`}>
      {/* No gradient background - clean transition */}
      
      {/* Floating Particles */}
      {particleElements}
      
      {/* Enhanced Wave SVG */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        style={{
          transform: animated ? `translateY(${scrollY * 0.05}px)` : 'none'
        }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="50%" stopColor="rgba(248,250,252,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(248,250,252,0.9)" />
          </linearGradient>
        </defs>
        
        {/* First wave layer - largest */}
        <path
          d="M0,160 C200,100 400,120 600,80 C800,40 1000,60 1200,20 L1200,160 L0,160 Z"
          fill="url(#waveGradient1)"
          className={animated ? "animate-wave-slow" : ""}
        />
        
        {/* Second wave layer - medium */}
        <path
          d="M0,160 C150,110 350,130 550,90 C750,50 950,70 1150,30 L1200,160 L0,160 Z"
          fill="url(#waveGradient2)"
          className={animated ? "animate-wave-medium" : ""}
        />
        
        {/* Third wave layer - smallest */}
        <path
          d="M0,160 C100,120 300,140 500,100 C700,60 900,80 1100,40 L1200,160 L0,160 Z"
          fill="rgba(255,255,255,0.9)"
          className={animated ? "animate-wave-fast" : ""}
        />
        
        {/* Foam effect - tiny bubbles */}
        <circle cx="200" cy="120" r="2" fill="rgba(255,255,255,0.6)" className={animated ? "animate-bounce-slow" : ""} />
        <circle cx="400" cy="100" r="1.5" fill="rgba(255,255,255,0.5)" className={animated ? "animate-bounce-medium" : ""} />
        <circle cx="600" cy="110" r="1" fill="rgba(255,255,255,0.4)" className={animated ? "animate-bounce-fast" : ""} />
        <circle cx="800" cy="90" r="2.5" fill="rgba(255,255,255,0.6)" className={animated ? "animate-bounce-slow" : ""} />
        <circle cx="1000" cy="105" r="1.5" fill="rgba(255,255,255,0.5)" className={animated ? "animate-bounce-medium" : ""} />
      </svg>
    </div>
  )
}
