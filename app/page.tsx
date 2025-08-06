"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReferenceSlider } from "@/components/ui/reference-slider"
import { ContactForm } from "@/components/ui/contact-form"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { UnifiedHero } from "@/components/ui/unified-hero"
import { LogoCarousel } from "@/components/ui/logo-carousel"
import { ServiceHub } from "@/components/ui/service-hub"
import { Shield, Clock, Phone, CheckCircle, Users, CreditCard, Calendar, HeadphonesIcon, Heart, Star, Award, ArrowRight, Building2 } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Hero carousel data - editovatelné v CMS
const heroSlides = [
  {
    type: "intro",
    title: "Sfera - Váš partner pro dokonalé klima",
    description:
      "Profesionální klimatizace, tepelná čerpadla a rekuperace s nadstandardním servisem. Montáž do 14 dnů, platba až po spuštění.",
    bgColor: "from-blue-600 via-blue-700 to-cyan-600",
    cta: "Nezávazná poptávka",
    ctaLink: "/kontakt",
  },
  {
    type: "reference",
    title: "Rodinný dům Praha - Kompletní klimatizace",
    description:
      "Podívejte se na naši nejnovější realizaci. Multi-split klimatizace s tepelným čerpadlem pro maximální komfort.",
    bgColor: "from-green-600 via-emerald-600 to-teal-600",
    cta: "Zobrazit referenci",
    ctaLink: "/reference/rodinny-dum-praha",
  },
  {
    type: "blog",
    title: "Jak vybrat správnou klimatizaci pro váš domov",
    description: "Přečtěte si náš nejnovější článek o výběru klimatizace. Praktické tipy a rady od našich expertů.",
    bgColor: "from-red-600 via-pink-600 to-purple-600",
    cta: "Číst článek",
    ctaLink: "/blog/jak-vybrat-klimatizaci",
  },
]

const featureCards = [
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "0% záloha na skladové zboží",
    description: "Pokud máme zboží skladem, nebudeme po vás chtít žádnou zálohu.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Platba po realizaci",
    description: "Zaplatíte až bude instalace hotová.",
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
  }, {
    icon: <Heart className="w-8 h-8" />,
    title: "Spolupráce nekončí fakturou",
    description: "Staráme se o vás po celou životnost klimatizace.",
  },
]

// Services data
const services = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    description: "Profesionální instalace klimatizací všech značek s nadstandardním servisem",
    iconSrc: "/hub/klimatizace.svg",
    features: ["Montáž do 14 dnů", "Platba až po spuštění", "5 let záruka", "24/7 servis"],
    isPopular: true
  },
  {
    id: "tepelna-cerpadla",
    title: "Tepelná čerpadla",
    description: "Efektivní vytápění a chlazení s maximálními úsporami energií",
    iconSrc: "/hub/tepelna-cerpadla.svg",
    features: ["Vzduch-Vzduch", "Vzduch-Voda", "Země-Voda", "Dotace a podpory"]
  },
  {
    id: "rekuperace",
    title: "Rekuperace",
    description: "Čerstvý vzduch bez ztrát tepla pro zdravé vnitřní prostředí",
    iconSrc: "/hub/rekuperace.png",
    features: ["Centrální rekuperace", "Decentrální jednotky", "Tiché provoz", "Úsporu až 30%"]
  },
  {
    id: "elektroinstalace",
    title: "Elektroinstalace",
    description: "Kompletní elektroinstalace od novostaveb po chytrou domácnost",
    iconSrc: "/hub/elektroinstalace.svg",
    features: ["Certifikované materiály", "Dodržení ČSN norem", "Chytrá domácnost", "Revize a servis"]
  },
  {
    id: "fotovoltaika",
    title: "Fotovoltaika",
    description: "Vlastní výroba elektřiny s návratností 5-7 let",
    iconSrc: "/hub/fotovoltaika.svg",
    features: ["On-grid systémy", "Hybridní řešení", "Dotace NZÚ", "Monitoring výroby"]
  }
]

// Top 3 reference - možnost "topovat" v administraci
const featuredReferences = [
  {
    id: "rodinny-dum-praha",
    title: "Rodinný dům Praha",
    description: "Kompletní klimatizace s tepelným čerpadlem a rekuperací pro maximální komfort.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+1",
    category: "Klimatizace",
    location: "Praha",
    isTopReference: true,
  },
  {
    id: "kancelarsky-komplex-brno",
    title: "Kancelářský komplex Brno",
    description: "Centrální klimatizační systém pro 200 zaměstnanců s inteligentním řízením.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+2",
    category: "Komerční",
    location: "Brno",
    isTopReference: true,
  },
  {
    id: "wellness-centrum-ostrava",
    title: "Wellness centrum Ostrava",
    description: "Speciální klimatizace a rekuperace pro wellness s bazénem a saunou.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+3",
    category: "Rekuperace",
    location: "Ostrava",
    isTopReference: true,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Unified Hero Section */}
      <UnifiedHero slides={heroSlides} />

      {/* Service Hub Banner */}
      <ServiceHub />

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Logo Carousel - Brand Partners */}
      <section className="py-16 bg-white">
        <LogoCarousel
          speed="medium"
          direction="left"
          pauseOnHover={false}
        />
      </section>

      {/* About Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          {/* Modern asymmetric header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 relative">
            {/* Vertical divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-200 to-transparent transform -translate-x-1/2"></div>

            {/* Left side - content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-[#3D8FC4]/10 text-[#1B5D93] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                <span>JSME TADY PRO VÁŠ DOMOV</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Spolehlivě, dlouhodobě
                <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                  a s úsměvem.
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Jsme rodinná firma z Ostravy a už řadu let pomáháme domácnostem v Moravskoslezském a Olomouckém kraji zlepšit komfort bydlení. Postaráme se o vše, co váš domov potřebuje:
                od bezpečné elektroinstalace, přes efektivní vytápění, až po klimatizace, které v létě ochladí a v zimě spolehlivě vytopí. A protože víme, že čistý a čerstvý vzduch je základ zdravého bydlení, nabízíme také moderní systémy rekuperace vzduchu.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
                <span className="text-sm text-gray-400 font-medium">Poskytujeme kompletní služby : elektroinstalace, topení, klimatizace i rekuperace</span>
              </div>
            </div>

            {/* Right side - logo with decorative background */}
            <div className="relative">
              {/* Decorative background shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl rotate-12 opacity-20"></div>
              <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl -rotate-6 opacity-30"></div>
              <div className="absolute top-16 right-16 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-xl rotate-45 opacity-40"></div>

              {/* Logo with reflection effect */}
              <div className="relative z-10">
                <Image
                  src="/logo/logo.svg"
                  alt="Sfera logo"
                  width={200}
                  height={200}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.3))'
                  }}
                />
                {/* Reflection effect */}
                <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-blue-200/30 to-transparent transform scale-y-[-0.3] opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 bg-white">
        <div className="container">
          {/* Modern asymmetric header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left side - decorative */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#3D8FC4]/20 to-[#2D78AD]/20 rounded-3xl rotate-12 opacity-20"></div>
              <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-[#2D78AD]/30 to-[#196097]/30 rounded-2xl -rotate-6 opacity-30"></div>
              <div className="absolute top-16 left-16 w-16 h-16 bg-gradient-to-br from-[#196097]/40 to-[#1B5D93]/40 rounded-xl rotate-45 opacity-40"></div>
            </div>

            {/* Right side - content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-[#3D8FC4]/10 text-[#1B5D93] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Kompletní řešení</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                Naše
                <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                  služby
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Kompletní řešení pro vaše klima, vytápění a elektroinstalace
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
                <span className="text-sm text-gray-400 font-medium">Od roku 2010</span>
              </div>
            </div>
          </div>

          {/* Enhanced services grid with colored icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600',
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600',
                'from-yellow-500 to-yellow-600'
              ];

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center border border-gray-100"
                >
                  {/* Colored icon container */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Image
                      src={service.iconSrc}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                      style={{
                        filter: "brightness(0) invert(1)"
                      }}
                    />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1B5D93] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <Link href={`/${service.id}`} className="inline-flex items-center gap-2 text-[#1B5D93] hover:text-[#2D78AD] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    Více informací
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team expertise section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Proč si zákazníci vybírají právě nás?</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Jsme lokální firma a známe potřeby domů v regionu.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Star className="w-4 h-4" />
                    <span>Prémiová péče</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                    Nadstandardní
                    <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                      servis
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    Důraz na jistotu a spolehlivost. Že se nám dovoláte, nebudeme se schovávat, problém vždy vyřešíme.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
                    <span className="text-sm text-gray-400 font-medium">Stavíme na férovém přístupu a dlouhodobé spolupráci
                    </span>
                  </div>
                </div>

                {/* Services cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {services.slice(0, 6).map((service) => (
                    <div
                      key={service.id}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
                    >
                      {/* Service icon */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B5D93] to-[#49A3D7] flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Image
                          src={service.iconSrc}
                          alt={service.title}
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                          style={{
                            filter: "brightness(0) invert(1)"
                          }}
                        />
                      </div>

                      <h4 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-[#1B5D93] transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {service.description}
                      </p>

                      <Link href={`/${service.id}`} className="inline-flex items-center gap-1 text-[#1B5D93] hover:text-[#2D78AD] font-medium text-xs group-hover:gap-2 transition-all duration-300 mt-2">
                        Více
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-gradient-to-br from-[#f8f9fa] via-white to-[#3D8FC4]/10 pt-24 pb-32 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#3D8FC4]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#2D78AD]/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#3D8FC4]/15 to-[#2D78AD]/10 rounded-full blur-2xl"></div>

        <div className="container relative z-10">
          {/* Modern feature cards with staggered animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {featureCards.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#1B5D93]/30 to-[#1B5D93]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Icon with modern styling */}
                      <div className="relative mb-6">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1B5D93] to-[#49A3D7] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                          {React.cloneElement(feature.icon, {
                            className: "w-10 h-10 text-white"
                          })}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#1B5D93] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {feature.description}
                      </p>

                      {/* Progress indicator */}
                      <div className="w-full mt-6">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}
                            style={{ transitionDelay: '200ms' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment text section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Horizontal divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3D8FC4] to-transparent mb-16"></div>

            {/* Commitment text */}
            <div className="mb-8">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Naše práce ale <span className="font-bold text-[#1B5D93]">montáží nekončí</span>. Když se něco pokazí, <span className="font-semibold text-gray-900">nepřestaneme brát telefony</span>. Naopak – <span className="font-bold text-[#1B5D93]">servis a opravy řešíme rychle a přednostně</span>, protože víme, jak frustrující může být, když se firma po instalaci odmlčí. <span className="font-bold text-gray-900">My stojíme za svou prací dlouhodobě</span>. Jsme vám k dispozici <span className="font-semibold text-[#1B5D93]">během realizace i po ní</span> – ať už se jedná o <span className="font-medium text-gray-800">konzultaci, údržbu nebo pomoc s čímkoli dalším</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Support Section - Full width */}
      <section className="py-32 bg-gradient-to-br from-[#1B5D93] via-[#2D78AD] to-[#49A3D7] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#3D8FC4]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#196097]/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <Phone className="h-8 w-8 text-white animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping"></div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">Technická podpora</div>
                  <div className="text-white font-bold text-xl">+420 735 014 112</div>
                </div>
                <div className="text-left ml-8">
                  <div className="text-sm text-white/80">Pracovní doba</div>
                  <div className="text-white font-medium">Po - Pá: 8:00 - 20:00</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1B5D93] hover:bg-gray-50 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-0"
              >
                <Link href="/kontakt" className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  <span>Nezávazná poptávka</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              {/* Button glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-white/40 to-white/30 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Section - Centered design */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-tl from-blue-200/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          {/* Centered header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#3D8FC4]/10 text-[#1B5D93] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Ověřená kvalita a spolehlivost</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Naše
              <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                reference
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Realizovali jsme řadu úspěšných projektů pro spokojené zákazníky.
              Každá instalace je pro nás příležitostí ukázat naši odbornost a preciznost.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
              <span className="text-sm text-gray-400 font-medium">Důvěra zákazníků</span>
            </div>
          </div>

          <ReferenceSlider references={featuredReferences} />

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] hover:from-[#2D78AD] hover:to-[#49A3D7] text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Link href="/reference" className="flex items-center gap-3">
                <span>Prohlédněte si všechny reference</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Profesionální výzva k akci */}
      <section className="py-32 bg-gradient-to-br from-[#1B5D93] via-[#2D78AD] to-[#49A3D7] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#3D8FC4]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#196097]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Potřebujete klimatizační řešení?
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Kontaktujte nás pro profesionální konzultaci a nezávaznou cenovou nabídku.
              Naši odborníci vám navrhnou optimální řešení pro vaše potřeby.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                asChild
                className="bg-white text-[#1B5D93] hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/kontakt" className="flex items-center gap-2">
                  <span>Nezávazná poptávka</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/80" />
                <Link
                  href="tel:+420735014112"
                  className="text-lg font-semibold hover:text-white transition-colors duration-300"
                >
                  +420 735 014 112
                </Link>
              </div>
            </div>

            {/* Professional trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/30">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-white/80 mx-auto mb-3" />
                <div className="font-semibold mb-1">Nezávazná konzultace</div>
                <div className="text-sm text-white/70">Zcela zdarma</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-white/80 mx-auto mb-3" />
                <div className="font-semibold mb-1">Rychlá odezva</div>
                <div className="text-sm text-white/70">Do 24 hodin</div>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-white/80 mx-auto mb-3" />
                <div className="font-semibold mb-1">5 let záruky</div>
                <div className="text-sm text-white/70">Na všechny práce</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Profesionální kontaktní formulář */}
      <section className="py-32 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Kontaktujte nás
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Vyplněte formulář a naši odborníci se vám ozvou s nezávaznou nabídkou přesně na míru vašich potřeb.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left side - Benefits */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Rychlá odezva</h3>
                      <p className="text-gray-600">Odpovídáme do 24 hodin, většinou ještě týž den.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Individuální přístup</h3>
                      <p className="text-gray-600">Každý projekt řešíme podle konkrétních požadavků zákazníka.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Bez závazků</h3>
                      <p className="text-gray-600">Konzultace a cenová nabídka jsou zcela zdarma a bez závazků.</p>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="bg-[#1B5D93] rounded-xl p-6 text-white">
                  <h3 className="font-semibold mb-4">Přímý kontakt</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-white/80" />
                      <Link href="tel:+420735014112" className="hover:text-white transition-colors">
                        +420 735 014 112
                      </Link>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-white/80" />
                      <span className="text-white/80">Po-Pá 8:00-17:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <ContactForm
                  title="Nezávazná poptávka"
                  subtitle="Vyplňte formulář a získejte nabídku na míru"
                  source="homepage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}