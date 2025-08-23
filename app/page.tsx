import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReferenceSlider } from "@/components/ui/reference-slider"
import { ContactForm } from "@/components/ui/contact-form6"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { UnifiedHero, type UnifiedHeroSlide } from "@/components/ui/unified-hero"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { ServiceHub } from "@/components/ui/service-hub"
import { Shield , Clock, CheckCircle,   CreditCard, Calendar, HeadphonesIcon, Heart, Star, ArrowRight, Quote, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Award } from "lucide-react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Data fetching is done inside the component using Sanity client



const featureCards = [
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "0% záloha na skladové zboží",
    description: "Pokud máme zboží skladem, nebudeme po vás chtít žádnou zálohu.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Platba po realizaci",
    description: "Zaplatíte vždy až za odvedenou práci, nebo dodaný materiál.",
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Montáž do 14 dnů",
    description: "Nezdržujeme se. Rychlá realizace bez zbytečného čekání.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Servis/reklamace do 7 dnů",
    description: "Rychlé vyřízení všech servisních požadavků.",
  }, {
    icon: <HeadphonesIcon className="w-8 h-8" />,
    title: "Technická podpora na telefonu",
    description: "Vždy se nám dovoláte. Nebudeme se schovávat.",
  },   {
    icon: <Heart className="w-8 h-8" />,
    title: "Spolupráce nekončí fakturou",
    description: "Zakládáme si na dlouhodobé důvěře. Proto jsme Vám k dispozici po celou dobu životnosti námi dodaných zařízení.",
  },
]

// Services data (ponecháno staticky)
const services = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    description: "Profesionální instalace klimatizací léty prověřených značek s nadstandardním servisem",
    iconSrc: "/hub/klimatizace.svg",
    features: [], // Will be populated from Sanity
    isPopular: true,
    color: 'bg-blue-300',
    iconColor: 'text-blue-600',
    cardColor: 'bg-blue-50'
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla",
    description: "Efektivní vytápění kvalitními zdroji s maximální úsporou energií",
    iconSrc: "/hub/tepelna-cerpadla.svg",
    features: [], // Will be populated from Sanity
    color: 'bg-green-300',
    iconColor: 'text-green-600',
    cardColor: 'bg-green-50'
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    description: "Čerstvý vzduch bez tepelných ztrát pro zdravé domácí prostředí",
    iconSrc: "/hub/rekuperace.png",
    features: [], // Will be populated from Sanity
    color: 'bg-purple-300',
    iconColor: 'text-purple-600',
    cardColor: 'bg-purple-50'
  },
  {
    id: "elektroinstalace",
    title: "Elektroinstalace",
    description: "Kompletní elektroinstalace od drobných oprav, rekonstrukcí bytu, novostaveb až po chytrou domácnost",
    iconSrc: "/hub/elektroinstalace.svg",
    features: [], // Will be populated from Sanity
    color: 'bg-orange-300',
    iconColor: 'text-orange-600',
    cardColor: 'bg-orange-50'
  },
  {
    id: "fotovoltaika",
    title: "Fotovoltaika",
    description: "Vlastní výroba elektřiny s návratností 5-7 let",
    iconSrc: "/hub/fotovoltaika.svg",
    features: [], // Will be populated from Sanity
    color: 'bg-yellow-300',
    iconColor: 'text-yellow-600',
    cardColor: 'bg-yellow-50'
    }
]

type TopReference = {
  id: string
  title: string
  description: string
  image: string
  category: string
  location?: string
  isTopReference?: boolean
}
  async function ValueCard ({ icon, title, description, iconBgColor, iconColor }: { icon: React.ReactNode, title: string, description: string, iconBgColor: string, iconColor: string }) {
    const { client } = await import("@/lib/sanity.client")
    const { heroSlidesQuery } = await import("@/lib/sanity.queries")
  
    const [slides] = await Promise.all([
      client.fetch<UnifiedHeroSlide[]>(heroSlidesQuery),
    ])

  return (
    <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-center mb-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default async function HomePage() {
  const { client } = await import("@/lib/sanity.client")
  const { heroSlidesQuery, featuredReferencesQuery } = await import("@/lib/sanity.queries")
  
  const [slides, rawTopReferences] = await Promise.all([
    client.fetch<UnifiedHeroSlide[]>(heroSlidesQuery),
    client.fetch<any[]>(featuredReferencesQuery),
  ])

  // Map data to match TopReference interface
  const topReferences: TopReference[] = rawTopReferences.map(ref => ({
    id: ref.slug.current,
    title: ref.title,
    description: ref.description || '',
    image: ref.image || '',
    category: ref.category || '',
    location: ref.location,
    isTopReference: ref.isTopReference
  }))

  return (
    <>
      <div className="animate-fade-in">
        <UnifiedHero slides={slides} />
      </div>
      <ServiceHub />

      {/* Hodnocení - důvěryhodnost */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>Hodnocení zákazníků</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Děkujeme našim zákazníkům za projevenou <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent">důvěru</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spokojenost našich zákazníků je naše největší záruka kvality našich služeb
            </p>
          </div>
          
          {/* Hodnocení ikony */}
          <div className="flex justify-center gap-16 sm:gap-20 mb-8">
            {/* Google */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-20 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">248 recenzí</span>
            </div>

            {/* Seznam */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-20 mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg viewBox="-153 -46 652 652" className="w-full h-full">
                  <path fill="#DE0000" d="M452.9,270.1c-0.9-8-11.2-14.7-17.5-15.9c-5.7-1.1-11.5-1.5-17.3-1.5c-4.6-0.1-9.1,0.2-13.7,0.7c-6.5,0.7-9.7,3.1-12,9.6c-0.9,2.6-1.6,6.5,0.1,8.8c2.5,3.3,7.5,1.5,10.6,0.5c3.4-1.1,7.3-1.1,10.8-1.4c3.6-0.3,8.6-1.4,12.1,0.2c-1.5,3-5.7,4.5-8.3,6c-3.8,2.2-7.5,4.5-11.3,6.6c-10.4,5.6-21.2,12.4-32.3,16.4c-6.3,2.2-13,2.7-19.6,2.8c-5,0.1-10.1,0.3-15.1-0.2c-3.3-0.3-9.3-0.5-11.1-4.3c-1.3-2.7,0-5.9,1.3-8.2c7.4-12.8,18.8-21.2,33-21.7c3.5-0.1,7.4-0.5,9.3-4.2c2.5-4.8-1.2-9.5-5.2-11.4c-7.2-3.3-15.8-0.4-22.7,2.5c-6.8,2.8-13.4,6.7-18.1,12.8c-6.1,7.9-10.2,19.1-8.9,29.4c1.9,14.8,11.8,29,26.9,27.8c4.8-0.4,9.7-1.2,14.3-2.8c4.7-1.7,9.2-5.3,14.3-5.3c0.2,0,0.3,0,0.3,0.1c3.1,3.4,5.9,6.6,10.3,7.9c4.3,1.3,8.9,1,13.3,1.2c19.8,1.3,39.6-2.1,58.7-7.7c3.7-1.1,8-3.5,10.7-6.3c5.6-5.8-3.3-7.8-7.7-7.8c-5.2-0.1-10.4-0.2-15.6-0.3c-11.7-0.1-23.4,0.2-35.1,0.9c-3.4,0.2-6.8,0.6-10.2,0.7c-2.2,0.1-5.4-0.8-4-3.5c0.9-1.8,3.7-3.1,5.3-3.9c12.8-5.9,25.5-10,38.9-14.1c4.5-1.4,11.4-3.4,13.9-8.1C452.8,274.2,453.1,272.1,452.9,270.1 M292.8,270.9c0.3-3.2-0.2-6.5-2-8.6c-1.5-1.7-3.7-3.4-5.7-4.2c-3.1-1.2-5.8,1.9-8.1,3.5c-2.8,2-6.2,3.3-9.3,4.8c-6.5,2.9-12.2,4.5-19.7,5.6c-4.3,0.6-8.6,0.8-11.2-0.2c-2.6-1-4-9.3-4.3-10.2c-1.3-3.5-2.2-5.9-6.1-6.4c-3.4,0.5-4.6,3.9-5.3,7.4c-0.7,3.4-1.4,7.8-0.7,13.4c0.6,5.4,2.7,10.8,6.6,14.5c1.3,1.2,2.3,1.3,3.9,1.9c1.6,0.5,3.1,0.9,3.5,2.8c0.2,1.3,0,3.2,0,4.6c0.1,4,0.3,8,0.5,11.9c0.1,1.2,0.1,2.3,0.2,3.5c0.4,4.8-0.1,14.2,6.2,15.2c8.3,1.3,6.8-8,7-13.7c0.1-3.6,0.3-7.3,0.4-10.9c0-0.8,0.4-10.9,0.9-10.9c0.2,0,0.3,0,0.4,0c3.1-0.4,6.1-1,8.9-1.5c3.2-0.6,6.3-1.4,9.4-2.4c6-1.9,12-4.6,17-8.6c2.7-2.2,6-5.8,6.9-9.3C292.6,272.3,292.7,271.7,292.8,270.9 M298.7,319.3c1.7-3,2.2-7.5,0.7-10.7c-1.7-3.4-7.8-1.2-10.5-0.6c-2.8,0.5-6,1.6-6.9,4.8c-1,3.5,1.2,9.1,3.6,11.5C290.8,329.6,295.8,324.6,298.7,319.3 M64.5,275.9c-0.5-0.4-0.9-1-1.2-1.8c-1.1-4.3-1-7.7,3.6-8.5c5.2-0.9,9,1,14,1.7c1.8,0.3,3.8,1.9,3.5,4c-0.3,2-2.3,2.4-3.8,2.9C77,275.4,67.9,278.4,64.5,275.9L64.5,275.9z M205.8,317.2c0.1-1.2,0.1-2.4,0.1-3.6c0.6-8.9,1.4-17.7,2.4-26.6c0.8-7.7,1.9-15.4-3.9-21.2c-5.8-5.8-11.5-8.3-19-4.7c-8,3.8-15.2,9.6-23.6,12.5c1-0.3-6.1-12.5-6.9-13.4c-2.4-2.7-9.1-8.4-12.3-3.9c-2.1,2.9-2.1,7-2.9,10.4c-0.9,4.1-2,8.1-2.8,12.2c-1.8,8.6-4.8,18.3-7.1,26.7c-0.1,0-0.3,0-0.5-0.1c-9.2-2.5-18.6-3.7-27.8-6.4c-9.2-2.7-18.3-5.9-27.3-9.4c3.7-0.7,7.6-1.7,11.2-2.6c3.9-0.9,7.8-2.1,11.4-4c3-1.6,6.5-3.2,8.3-6.4c9.9-17.4-24.6-22.8-33.4-23.2c-6.1-0.2-24.7-2.3-26.2,7.2c-0.3,2.1,0.1,4.6,0.6,6.6c0.6,2.5,2.3,2.7,3.4,4.8c1.3,2.7-1.6,7.3-2.4,10c-1.2,4.1-2.1,8.2-3.2,12.4c-1.7,6.7-3,13.1-2.3,20.1c0.2,1.5,0.6,4.8,1.3,6c1.7,2.7,4.5,3.7,7.3,2.6c3.7-1.4,4-5.6,5.4-9.1c0.3-0.8,4-9.4,3.4-9.7c12.7,6.4,26.8,11.6,42.5,15.7c4.9,1.3,10.2,0.5,15-0.8c3-0.8,5.7-2.5,8.9-3.1c4.3-0.8,4.1,2,5.8,5.3c0.8,1.6,1.8,3.1,3,4.4c10.2,11,12.2-17.1,13.5-22.3c0.9-3.3,1-7.4,2.6-10.5c1.7-3.3,4.3,0.1,5.9,1.6c2.2,2.1,4.4,3.7,7.4,3.9c4.3,0.3,7.5-1.3,10.7-4.2c3.1-2.7,6.4-5.1,9.3-8.1c1.6-1.6,3.4-4.8,5.6-5.2c3.3-0.7,2.2,4.4,1.9,6.6c-0.5,4-0.6,8.1-0.8,12.2c-0.3,5-1.1,11-0.2,16c0.8,4.1,6.1,10.9,10.6,9.8C205.1,324.8,205.6,321,205.8,317.2L205.8,317.2z M34.6,277.7c0.5-3.3,1.9-7.4,0.5-10.5c-1.6-3.9-3-5.5-4.4-7.2c-1.3-1.7-5.7-5.9-8.3-4.5c-2.2,1.1-3.2,8.1-4,10.1c-1.8,4.7-3,9.6-4.2,14.4c-2.5,10.1-3,20-4.1,30.3c-0.5,4.2-0.8,8.4-0.3,12.6c0.7,6.3,6,7.1,11,3.6c6.4-4.4,7-12.6,8.5-19c1.4-5.8,2.3-11.7,3.6-17.3c0.9-3.9,1.1-7.9,1.6-11.9C34.6,278.1,34.6,277.9,34.6,277.7"/>
                  <path fill="#DE0000" d="M-3.2,224.4c-1.9-3.3-4.9-6.1-8-7.9c-11.7-6.8-24.9-6.9-37.8-6.9c-9.4,0-18.7,0.7-28,2c-5.1,0.7-10.2,1.7-15.3,2.8c-6,1.3-12,2.8-17.9,4.8c-5.3,1.8-10.5,4.9-15.4,7.7c-2.3,1.3-4.7,3-5.8,5.7c-1.3,3.2,0,6.2,0.2,9.4c0.4,4.5,2.2,5.9,4.4,9.2c4.3,6.6,11.3,8.5,18.4,5.6c1.9-0.7,6.5-4.3,8.2-3.8c2.8,0.9,0.4,10-0.2,12.2c-0.8,3-2.3,5.3-5.1,6.3c-2.3,0.9-7.2,0.4-8,3.7c-2.2,9.1,7.1,15.9,8.3,24c0.6,4.1-1,8.1-1.4,12.1c-0.6,5.3-0.8,10.6-1.3,15.8c-0.2,2.5-0.9,5.9-0.6,8.3c0.4,3.7,4.4,5.9,7.4,4.7c4.8-1.9,7.3-8.2,9.2-12.8c2.6-6.3,4-12.7,5.3-19.5c0.8-4.5,2.3-9.4,7.3-9.9c6.6-0.8,12.9-2.6,19.5-3.4c7.1-0.8,14.2-1.1,21.1-2.6c4.7-1,9.4-0.8,14.1-1.5c7.9-1.2,17.2-4.3,24.1-8.7c3.3-2.2,4.7-7,6-10.7c3.6-9.6-21-8.3-24.7-8.3c-10.6-0.1-20.4,0.2-29.5,1c-6.6,0.6-13.2,1.1-19.8,0.9c-2.9-0.1-7.1,0-9-2.8c-2.2-3.3-0.6-10.5,0.7-13.9c1.7-4.3,8.4-3.1,11.8-3.4c5.8-0.5,11.6-1.3,17.5-1.6c12.4-0.6,24.4-1.1,36.7-3.2c3.1-0.5,8.6-1.6,9.4-5.6C-0.7,230.6-1.5,227.3-3.2,224.4"/>
                </svg>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">127 hodnocení</span>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Carousel - Brand Partners */}
      <section className="relative">
        <div className="absolute top-0 left-0 right-0 z-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-8">
            </div>
            </div>
          </div>

        <OrganicWaveDivider />
        <div className="pt-0">
          <LogoCarousel
            speed="medium"
            direction="left"
            pauseOnHover={false}
          />
        </div>
      </section>

       <section
          className="relative py-20 bg-gradient-to-b from-white via-white to-blue-100/50 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating circles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/60 to-transparent rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-bl from-blue-400/50 to-transparent rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-tr from-blue-300/70 to-transparent rounded-full blur-lg"></div>
            
            {/* Thin lines */}
            
            {/* Geometric shapes */}

            {/* Subtle grid pattern */}
          </div>
          
          <div className="absolute top-2 right-2 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
          <div className="relative z-2">
          <div className="text-center">
            <br />
            <br />
            <br />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Naše<span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent"> služby</span>
              </h2>
              <br />
              <br />
              <br />
              </div>
            {/* Services Grid */}
            <div className="flex flex-wrap justify-center items-start gap-12 md:gap-16 max-w-6xl mx-auto">
              {services.map((service) => (
                <Link key={service.id} href={`/${service.id}`} className="flex justify-center relative w-64 group cursor-pointer">
                  <div className={`${service.cardColor} p-6 pl-16 w-full text-left shadow-md rounded-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-2`}>
                    <h3 className="text-sm font-bold text-gray-700 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    <div className="text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors duration-200 inline-flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Více informací
                      <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className={`w-16 h-16 ${service.color} flex items-center justify-center shadow-lg rounded-lg absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:-translate-y-3 group-hover:rotate-3`}>
                    <Image src={service.iconSrc} alt={service.title} width={56} height={56} className={`w-8 h-8 ${service.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
    </section>
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
  {/* Dekorativní prvek nahoře - navazuje na předchozí sekci */}
  <div className="absolute top-0 left-0 right-0 z-0">
    <div className="w-full h-32 bg-gradient-to-b from-white to-slate-50"></div>
  </div>
  
  {/* Abstraktní vlny na pozadí */}
  <div className="absolute inset-0 z-0 opacity-40">
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 250 C 300 150, 400 500, 720 400 S 1100 200, 1440 300 V 600 H 0 Z"
        fill="#E0F2FE" // light sky-100
      />
      <path
        d="M0 350 C 250 450, 500 250, 720 300 S 1000 500, 1440 450 V 600 H 0 Z"
        fill="#BAE6FD" // light sky-200
      />
    </svg>
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
    {/* Hlavička sekce */}
    <div className="mx-auto max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800 ring-1 ring-inset ring-blue-200">
        <Award className="h-4 w-4" />
        <span>Realizované projekty</span>
      </div>
      <h2 className="mt-6 text-4xl font-bold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl">
        Naše práce mluví
        <span className="mt-2 block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
          za nás
        </span>
      </h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Každý projekt je pro nás závazkem kvality a preciznosti. Prohlédněte si, jak jsme pomohli našim zákazníkům.
      </p>
    </div>

    {/* Karta se sliderem referencí */}
    <div className="mt-16 sm:mt-20 flex justify-center">
      <div className="w-auto max-w-4xl rounded-3xl bg-white/60 p-2 shadow-2xl shadow-slate-900/10 ring-1 ring-gray-200 backdrop-blur-md">
        {topReferences && topReferences.length > 0 && (
          <ReferenceSlider references={topReferences} />
        )}
      </div>
    </div>

    {/* Tlačítko pro zobrazení všech referencí */}
    <div className="mt-16 text-center">
      <Button asChild size="lg" className="group rounded-full bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#2D78AD]/40">
        <Link href="/reference" className="flex items-center gap-3">
          Všechny naše reference
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  </div>
</section>
      {/* About Us Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="container">
          {/* Top button - left aligned */}
          <div className="flex justify-start mb-12">
            <Button
              asChild
              size="sm"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <Link href="/o-nas" className="flex items-center gap-1">
                <Heart className="w-6 h-6" />
                <span>O nás</span>
              </Link>
            </Button>
          </div>
          {/* Main content - two columns layout with divider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
            {/* Vertical divider */}
            <div className="lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1B5D93]/30 to-transparent transform -translate-x-1/2"></div>
            {/* Left side - Text content */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Jsme tady pro <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent">váš</span> <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent">domov</span>
              </h2>
              <div className="relative mb-6">
                <div className="w-20 h-5 bg-gradient-to-br from-[#1B5D93]/20 to-[#2D78AD]/20 rounded-lg transform rotate-1 absolute top-0 left-0"></div>
              </div>
               
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">Rodinná firma</span> z Ostravy, která už řadu let pomáhá domácnostem v <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">Moravskoslezském a Olomouckém kraji</span> zlepšit <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">komfort bydlení</span>. 
                Zakládáme si na kvalitním provedení a <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">rychlém</span> zákazníckém servisu.
                </p>
            </div>
            {/* Right side - Enhanced logo */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Enhanced logo with effects */}
               {/* LEVÁ ČÁST: VIZUÁL */}
            <div className="relative">
              <div className="absolute -top-12 -left-16 w-72 h-72 bg-blue-50 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-slate-50 rounded-full opacity-70 blur-2xl"></div>
              <div className="relative z-10">
                <Image
                  src="/images/tym-sfera.webp"
                  alt="Jaroslav Hendrich, jednatel společnosti SFÉRA PRO DOMOV, s.r.o."
                  width={500}
                  height={600}
                  className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[600px] ring-8 ring-white/60"
                />
              </div>
            </div>
            </div>
          </div>
          {/* Additional content below */}
          <div className="mt-20 z-10">
            {/* CTA Button - moved up */}
            <div className="text-left mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] hover:from-[#2D78AD] hover:to-[#49A3D7] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Link href="/kontakt" className="flex items-center gap-3">
                  <span>Kontaktujte nás</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Spolehlivě, dlouhodobě a s úsměvem
            </h3>
            <div className="relative mb-8">
              <div className="w-24 h-6 bg-gradient-to-br from-[#1B5D93]/20 to-[#2D78AD]/20 rounded-lg transform rotate-2 absolute top-0 left-0"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-lg text-gray-600 leading-relaxed">
              Zajistíme kompletní řešení pro váš komfortní a úsporný domov. Nabízíme bezpečné elektroinstalace, výrobu vlastní elektřiny pomocí fotovoltaických elektráren, rekuperace pro efektivní výměnu čerstvého vzduchu, letní chlazení klimatizacemi i zimní vytápění tepelnými čerpadly. Vše realizujeme z komponentů léty ověřených výrobců, které nakupujeme u <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">oficiálních českých distributorů</span>.              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
              A protože k modernímu bydlení 21. století patří chytré ovládání, propojíme všechny technologie do inteligentní domácnosti, kterou máte pod kontrolou odkudkoliv.</p>
            </div>
          </div>
        </div>
      </section>
    




      {/* Our Story Section */}
      <section id="nas-pribeh" className="bg-white py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* LEVÁ ČÁST: VIZUÁL */}
            <div className="relative">
              <div className="absolute -top-12 -left-16 w-72 h-72 bg-blue-50 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-slate-200 rounded-full opacity-40 blur-2xl"></div>
              <div className="relative z-10">
                <Image
                  src="/images/hendrich_jaroslav.webp"
                  alt="Jaroslav Hendrich, jednatel společnosti SFÉRA PRO DOMOV, s.r.o."
                  width={600}
                  height={550}
                  className="rounded-2xl shadow-2xl object-cover w-full h-full max-h-[550px] ring-8 ring-white/60"
                />
              </div>
            </div>

            {/* PRAVÁ ČÁST: PŘÍBĚH */}
            <div className="relative z-20">
              <div className="inline-block bg-blue-50 text-blue-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
                Náš příběh
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                Děláme věci tak, jak je považujeme za správné.
              </h2>

              <Quote className="w-16 h-16 text-blue-100 mb-4" fill="currentColor" />

              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>
                Máme za sebou roky zkušeností z montážních firem, kde jsme se naučili řemeslo i práci se zákazníky. Ale také jsme si všimli něčeho, co nám vadilo – ústup od poctivého přístupu, zhoršující se servis a snaha ušetřit tam, kde by se naopak mělo přidat. Právě proto jsme založili SFERA PRO DOMOV s.r.o., firmu, která dělá věci tak, jak je považujeme za správné – férově, kvalitně a s respektem k zákazníkům.                </p>
                <p className="font-medium text-slate-700">
                Chceme být důkazem, že nejlepší cesta vede přes dlouhodobou spolupráci, rychlé a vstřícné jednání a telefonní číslo, které zvedáme i po letech. Díky tomu se k nám naši zákazníci s důvěrou vracejí.                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="font-bold text-slate-800">Jaroslav Hendrich</p>
                <p className="text-sm text-slate-500">Jednatel společnosti SFERA PRO DOMOV s.r.o.</p>
              </div>

              </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24">
  {/* SVG je nyní absolutně pozicováno, aby bylo na pozadí */}
  <div className="absolute top-0 left-0 w-full h-full z-0">
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none" // Důležité: roztáhne SVG, aby vyplnilo celý kontejner
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Nejsvětlejší modrá vlna */}
      <path
        d="M0 190 C 240 190, 280 60, 540 90 S 800 240, 1020 210 S 1200 130, 1440 160"
        stroke="#a0d3f0"
        fill="none"
        strokeWidth="6"
      />
      {/* Středně modrá vlna */}
      <path
        d="M0 120 C 200 120, 300 220, 600 180 S 900 40, 1140 90 S 1340 180, 1440 170"
        stroke="#4b9ce2"
        fill="none"
        strokeWidth="4"
      />
      {/* Tmavě modrá vlna */}
      <path
        d="M0 220 C 360 220, 360 80, 720 120 S 1080 260, 1440 200"
        stroke="#00529b"
        fill="none"
        strokeWidth="4"
      />
    </svg>
  </div>
  </section>
  
  {/* Team expertise, Feature cards, References, Contact -> zachováno, jen s jemnějšími efekty */}
      <section className="py-18 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left mt-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Prémiová péče</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                Nadstandardní
                <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                  servis
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Víme, jak je frustrující, když něco nefunguje a vy se nemůžete dovolat nikomu, kdo by to opravil.
                <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent font-semibold"> My se schovávat nebudeme.</span>
                Vždy jsme na telefonu, abychom Vám poradili a problém odstranili co nejdříve. Akutní poruchy řešíme do 3 dnů, v některých případech i do 24h.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
                <span className="text-md text-gray-400 font-medium">Férový přístup a dlouhodobá spolupráce</span>
              </div>
            </div>

            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-[#1B5D93]/20 to-[#49A3D7]/20 rounded-full blur-xl"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-[#2D78AD]/30 to-[#196097]/30 rounded-2xl rotate-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#3D8FC4]/10 pt-24 pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {featureCards.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1B5D93]/25 to-[#1B5D93]/15 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1B5D93] to-[#49A3D7] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md">
                        {React.cloneElement(feature.icon, { className: "w-10 h-10 text-white" })}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-[#1B5D93] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-grow">{feature.description}</p>

                    <div className="w-full mt-6">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" style={{ transitionDelay: '200ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Contact */}
      <section id="kontakt" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <ContactForm source="homepage-main" showTrustBadges={true} customHeading="Máte dotaz nebo zájem o naše služby?" />
        </div>
      </section>
</>  
)

}