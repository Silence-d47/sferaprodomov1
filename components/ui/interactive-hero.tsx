"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Snowflake, 
  Zap, 
  RefreshCw, 
  Wrench, 
  Sun,
  ChevronRight
} from "lucide-react"

interface ServiceSlide {
  id: string
  title: string
  description: string
  cta: string
  ctaLink: string
  bgColor: string
  icon: React.ReactNode
  gradient: string
}

const services: ServiceSlide[] = [
  {
    id: "klimatizace",
    title: "Klimatizace pro dokonalý komfort",
    description: "Profesionální montáž a servis klimatizací všech značek. Rychlá realizace do 14 dnů s 0% zálohou na skladové zboží.",
    cta: "Zjistit více o klimatizacích",
    ctaLink: "/klimatizace",
    bgColor: "from-blue-500 via-blue-600 to-cyan-500",
    icon: <Snowflake className="w-32 h-32 opacity-10" />,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #06b6d4 100%)"
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla pro úsporné vytápění",
    description: "Moderní tepelná čerpadla vzduch-voda a země-voda. Snížíte náklady na vytápění až o 70% s návratností do 5 let.",
    cta: "Zjistit více o tepelných čerpadlech",
    ctaLink: "/tepelna-cerpadla",
    bgColor: "from-green-500 via-emerald-500 to-teal-500",
    icon: <Zap className="w-32 h-32 opacity-10" />,
    gradient: "linear-gradient(135deg, #22c55e 0%, #10b981 50%, #14b8a6 100%)"
  },
  {
    id: "rekuperace",
    title: "Rekuperace pro čerstvý vzduch",
    description: "Centrální rekuperační jednotky s účinností až 95%. Zajistíme zdravé vnitřní prostředí s minimálními náklady.",
    cta: "Zjistit více o rekuperaci",
    ctaLink: "/rekuperace",
    bgColor: "from-purple-500 via-violet-500 to-indigo-500",
    icon: <RefreshCw className="w-32 h-32 opacity-10" />,
    gradient: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%)"
  },
  {
    id: "elektroinstalace",
    title: "Elektroinstalace pro moderní domácnost",
    description: "Kompletní elektroinstalace včetně chytré domácnosti. Certifikované materiály a dodržování všech norem ČSN.",
    cta: "Zjistit více o elektroinstalaci",
    ctaLink: "/elektroinstalace",
    bgColor: "from-orange-500 via-red-500 to-pink-500",
    icon: <Wrench className="w-32 h-32 opacity-10" />,
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 50%, #ec4899 100%)"
  },
  {
    id: "fotovoltaika",
    title: "Fotovoltaika pro energetickou nezávislost",
    description: "Kompletní fotovoltaické systémy s bateriovými úložišti. Snížíte účty za elektřinu a získáte energetickou nezávislost.",
    cta: "Zjistit více o fotovoltaice",
    ctaLink: "/fotovoltaika",
    bgColor: "from-yellow-400 via-orange-400 to-red-400",
    icon: <Sun className="w-32 h-32 opacity-10" />,
    gradient: "linear-gradient(135deg, #facc15 0%, #fb923c 50%, #f87171 100%)"
  }
]

export function InteractiveHero() {
  const [activeService, setActiveService] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleServiceClick = (index: number) => {
    setActiveService(index)
    setIsAutoPlaying(false) // Pause auto-play when user interacts
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <section 
      className="relative h-screen flex flex-col lg:flex-row overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left Side: Visual Pane (65%) */}
      <div className="relative flex-1 lg:w-[65%] overflow-hidden">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 interactive-hero-slide ${
              index === activeService 
                ? "active" 
                : "inactive"
            }`}
            style={{
              background: service.gradient
            }}
          >
            {/* Background Icon */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-white">
              {service.icon}
            </div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center lg:justify-start px-8 lg:px-16">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                  {service.description}
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href={service.ctaLink} className="flex items-center gap-2">
                    {service.cta}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side: Navigation (35%) */}
      <div className="lg:w-[35%] bg-white p-8 lg:p-12 flex flex-col justify-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Naše služby
          </h2>
          
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                index === activeService
                  ? "bg-gray-100 shadow-lg scale-105"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleServiceClick(index)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.bgColor} flex items-center justify-center`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Auto-play indicator */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex space-x-1">
            {services.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full auto-play-dot ${
                  index === activeService 
                    ? "bg-gray-900 active" 
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 