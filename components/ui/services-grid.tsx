"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Snowflake, 
  Zap, 
  Wind, 
  Wrench, 
  Sun,
  ArrowRight,
  Star
} from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  gradient: string
  features: string[]
  isPopular?: boolean
}

const services: Service[] = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    description: "Profesionální instalace klimatizací všech značek s nadstandardním servisem",
    icon: Snowflake,
    color: "text-blue-500",
    gradient: "from-blue-400 to-cyan-400",
    features: ["Montáž do 14 dnů", "Platba až po spuštění", "5 let záruka", "24/7 servis"],
    isPopular: true
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla",
    description: "Efektivní vytápění a chlazení s maximálními úsporami energií",
    icon: Zap,
    color: "text-green-500",
    gradient: "from-green-400 to-emerald-400",
    features: ["Vzduch-Vzduch", "Vzduch-Voda", "Země-Voda", "Dotace a podpory"]
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    description: "Čerstvý vzduch bez ztrát tepla pro zdravé vnitřní prostředí",
    icon: Wind,
    color: "text-purple-500",
    gradient: "from-purple-400 to-violet-400",
    features: ["Centrální rekuperace", "Decentrální jednotky", "Tiché provoz", "Úspora až 30%"]
  },
  {
    id: "elektroinstalace",
    title: "Elektroinstalace",
    description: "Kompletní elektroinstalace od novostaveb po chytrou domácnost",
    icon: Wrench,
    color: "text-orange-500",
    gradient: "from-orange-400 to-red-400",
    features: ["Certifikované materiály", "Dodržení ČSN norem", "Chytrá domácnost", "Revize a servis"]
  },
  {
    id: "fotovoltaika",
    title: "Fotovoltaika",
    description: "Vlastní výroba elektřiny s návratností 5-7 let",
    icon: Sun,
    color: "text-yellow-500",
    gradient: "from-yellow-400 to-orange-400",
    features: ["On-grid systémy", "Hybridní řešení", "Dotace NZÚ", "Monitoring výroby"]
  }
]

interface ServicesGridProps {
  showPopular?: boolean
  className?: string
}

export function ServicesGrid({ showPopular = true, className }: ServicesGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {services.map((service, index) => {
        const Icon = service.icon
        
        return (
          <Card 
            key={service.id} 
            className="group hover:shadow-2xl transition-all duration-500 overflow-hidden relative bg-white/90 backdrop-blur-sm border-white/50 hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {service.isPopular && showPopular && (
              <Badge className="absolute top-4 right-4 bg-blue-600 text-white border-0 z-10 shadow-lg animate-pulse">
                <Star className="h-3 w-3 mr-1" />
                POPULÁRNÍ
              </Badge>
            )}
            
            <CardHeader className="text-center pb-6 relative z-10">
              {/* Enhanced icon container */}
              <div className="relative mb-6">
                <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                  <Icon className="h-12 w-12 text-white" />
                </div>
                {/* Check badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed text-gray-600">
                {service.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 relative z-10">
              <div className="space-y-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm group/item hover:translate-x-1 transition-transform duration-200">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.gradient} shadow-sm group-hover/item:scale-110 transition-transform duration-200`} />
                    <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors duration-200">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Progress indicator */}
              <div className="w-full mb-4">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${service.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                    style={{ transitionDelay: '200ms' }}
                  ></div>
                </div>
              </div>
              
              <Link href={`/${service.id}`}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group-hover:shadow-lg border border-blue-200/50">
                  <span className="font-semibold text-blue-900">Více informací</span>
                  <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

// Compact version for smaller spaces
export function ServicesCompact({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 ${className}`}>
      {services.map((service) => {
        const Icon = service.icon
        
        return (
          <Link key={service.id} href={`/${service.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 text-center p-4 cursor-pointer">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold">{service.title}</CardTitle>
            </Card>
          </Link>
        )
      })}
    </div>
  )
} 