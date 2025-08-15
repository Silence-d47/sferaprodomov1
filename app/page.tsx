"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/lib/sanity.client"
import { groq } from "next-sanity"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { ReferenceSlider } from "@/components/ui/reference-slider"
import { ContactForm } from "@/components/ui/contact-form6"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { UnifiedHero, type UnifiedHeroSlide } from "@/components/ui/unified-hero"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { ServiceHub } from "@/components/ui/service-hub"
import { Shield, Clock, Phone, CheckCircle, Users, CreditCard, Calendar, HeadphonesIcon, Heart, Star, Award, ArrowRight, ChevronDown, Quote } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { motion } from "framer-motion"

// GROQ dotazy
const heroSlidesQuery = groq`
  *[_type == "heroSlide" && isActive == true] | order(order asc) {
    "id": _id,
    title,
    subtitle,
    description,
    "bgImage": bgImage.asset->url,
    features,
    phoneNumber
  }
`

const topReferencesQuery = groq`
  *[_type == "projectReference" && isTopReference == true] | order(_createdAt desc)[0...6] {
    "id": slug.current,
    title,
    "description": coalesce(description, ""),
    "image": image.asset->url,
    category,
    location,
    isTopReference
  }
`

// SWR fetcher
const fetcher = (query: string) => client.fetch(query)



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
    features: ["Montáž do 14 dnů", "bez akontace", "až 5 let záruka"],
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
    features: ["Vzduch-Vzduch", "Vzduch-Voda", "Země-Voda", "Dotace a podpory"],
    color: 'bg-green-300',
    iconColor: 'text-green-600',
    cardColor: 'bg-green-50'
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    description: "Čerstvý vzduch bez tepelných ztrát pro zdravé domácí prostředí",
    iconSrc: "/hub/rekuperace.png",
    features: ["Centrální rekuperace", "Decentrální jednotky", "Tiché provoz", "Úsporu až 30%"],
    color: 'bg-orange-300',
    iconColor: 'text-orange-300',
    cardColor: 'bg-orange-50'
  },
  {
    id: "elektroinstalace",
    title: "Elektroinstalace",
    description: "Kompletní elektroinstalace od drobných oprav, rekonstrukcí bytu, novostaveb až po chytrou domácnost",
    iconSrc: "/hub/elektroinstalace.svg",
    features: ["Certifikované materiály", "Dodržení ČSN norem", "Chytrá domácnost", "Revize a servis"],
    color: 'bg-purple-300',
    iconColor: 'text-purple-600',
    cardColor: 'bg-purple-50'
  },
  {
    id: "fotovoltaika",
    title: "Fotovoltaika",
    description: "Vlastní výroba elektřiny s návratností 5-7 let",
    iconSrc: "/hub/fotovoltaika.svg",
    features: ["On-grid systémy", "Hybridní řešení", "Dotace NZÚ", "Monitoring výroby"],
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
function ValueCard  ({ icon, title, description, iconBgColor, iconColor }: { icon: React.ReactNode, title: string, description: string, iconBgColor: string, iconColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex justify-center mb-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function HomePage() {
  const { data: slides, error: heroError, isLoading: heroLoading } = useSWR<UnifiedHeroSlide[]>(heroSlidesQuery, fetcher)
  const { data: topReferences } = useSWR<TopReference[]>(topReferencesQuery, fetcher)

  if (heroLoading) {
    return <div>Načítání...</div>
  }
  if (heroError) {
    return <div>Chyba při načítání dat.</div>
  }
  if (!slides || slides.length === 0) {
    return <div>Žádná data pro hero sekci.</div>
  }

  return (
    
< >      {/* Unified Hero Section (tvoje data zůstávají) */}
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: {},
        visible: {}
      }}>
        <UnifiedHero slides={slides} />
      </motion.div>
      <ServiceHub />

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
    <div className="mt-16 sm:mt-20">
      <div className="rounded-3xl bg-white/60 p-2 shadow-2xl shadow-slate-900/10 ring-1 ring-gray-200 backdrop-blur-md">
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
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
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
            </motion.div>
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
            <motion.div initial={{ opacity: 20, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute -top-12 -left-16 w-72 h-72 bg-blue-50 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-slate-200 rounded-full opacity-40 blur-2xl"></div>
              <div className="relative z-10">
                <Image
                  src="/images/hendrich_jaroslav.webp"
                  alt="Jaroslav Hendrich, jednatel společnosti SFÉRA PRO DOMOV, s.r.o."
                  width={600}
                  height={550}
                  className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[550px] ring-8 ring-white/60"
                />
              </div>
            </motion.div>

            {/* PRAVÁ ČÁST: PŘÍBĚH */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-20">
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

              </motion.div>
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
              <motion.div key={index} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }} className="group relative">
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
              </motion.div>
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