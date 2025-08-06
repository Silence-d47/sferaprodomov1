"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Snowflake, Zap, RefreshCw, Wrench, Sun } from "lucide-react"

interface CTASection {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  gradient: string
  icon: React.ReactNode
}

const ctaSections: CTASection[] = [
  {
    title: "Klimatizace",
    description: "Profesionální montáž a servis",
    buttonText: "více →",
    buttonLink: "/klimatizace",
    gradient: "from-blue-500 via-blue-600 to-cyan-500",
    icon: <Snowflake className="w-24 h-24 opacity-40" />
  },
  {
    title: "Tepelná čerpadla",
    description: "Úsporné vytápění pro váš domov",
    buttonText: "více →",
    buttonLink: "/tepelna-cerpadla",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: <Zap className="w-24 h-24 opacity-40" />
  },
  {
    title: "Rekuperace",
    description: "Čerstvý vzduch s úsporou energie",
    buttonText: "více →",
    buttonLink: "/rekuperace",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    icon: <RefreshCw className="w-24 h-24 opacity-40" />
  },
  {
    title: "Elektroinstalace",
    description: "Moderní řešení pro váš domov",
    buttonText: "více →",
    buttonLink: "/elektroinstalace",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: <Wrench className="w-24 h-24 opacity-40" />
  },
  {
    title: "Fotovoltaika",
    description: "Čistá energie pro váš domov",
    buttonText: "více →",
    buttonLink: "/fotovoltaika",
    gradient: "from-yellow-400 via-orange-400 to-red-400",
    icon: <Sun className="w-24 h-24 opacity-40" />
  }
]

export function CTABanner() {
  return (
    <div className="container mx-auto px-4 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 rounded-xl overflow-hidden shadow-2xl">
        {ctaSections.map((section, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${section.gradient} text-white p-6 flex flex-col justify-between relative overflow-hidden hover:brightness-110 transition-all duration-300 min-h-[200px]`}
          >
            {/* Background Icon */}
            <div className="absolute top-3 right-3 text-white/50">
              {section.icon}
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-2">
                  {section.title}
                </h3>
                <p className="text-xs opacity-90 leading-tight">
                  {section.description}
                </p>
              </div>
              
              <div className="mt-4">
                <Button 
                  asChild
                  className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                  <Link href={section.buttonLink}>
                    {section.buttonText}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 