`use client`
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
import { Shield, Clock, Phone, CheckCircle, Users, CreditCard, Calendar, HeadphonesIcon, Heart, Star, Award, ArrowRight, Building2, Zap } from "lucide-react"
import FloatingIndicator from "@/components/ui/floating-indicator"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ChevronDown, Quote } from "lucide-react"

// Hero carousel data - editovatelné v CMS
const heroSlides = [
  {
    type: "intro",
    title: "Hovno - Váš partner pro dokonalé klima",
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

// Services data
const services = [
  {
    id: "klimatizace",
    title: "Klimatizace",
    description: "Profesionální instalace klimatizací všech značek s nadstandardním servisem",
    iconSrc: "/hub/klimatizace.svg",
    features: ["Montáž do 14 dnů", "bez akontace", "až 5 let záruka"],
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
// Pomocný komponent pro karty s hodnotami (aby kód zůstal čistý)
// Design přesně kopíruje styl karet z "Nadstandardní servis"
function ValueCard  ({ icon, title, description, iconBgColor, iconColor }: { icon: React.ReactNode, title: string, description: string, iconBgColor: string, iconColor: string }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-center mb-4">
        <div className={`h-14 w-14 rounded-full flex items-center justify-center ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Unified Hero Section */}
      <UnifiedHero slides={heroSlides} />
      {/* Service Hub Banner */}
      <ServiceHub />
      {/* Logo Carousel - Brand Partners */}
      <section className="relative">
        {/* Text positioned to overlap with divider */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="container">
            <div className="text-center py-8">
              <h2 className="text-2xl md:text-2xl font-light text-gray-900 mb-8">
                <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent">Spolupracujeme </span>se světovými značkami
              </h2>
            </div>
          </div>
        </div>
        
        {/* Organic Wave Divider */}
       <OrganicWaveDivider />
        {/* Logo Carousel */}
        <div className="pt-0">
          <LogoCarousel
            speed="medium"
            direction="left"
            pauseOnHover={false}
          />
        </div>
      </section>
      {/* Our Story Section */}
      <section id="nas-pribeh" className="bg-white py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* --- LEVÁ ČÁST: VIZUÁL --- */}
          <div className="relative">
            {/* Dekorativní tvary v pozadí */}
            <div className="absolute -top-12 -left-16 w-72 h-72 bg-blue-50 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-slate-100 rounded-full opacity-70 blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Zde vložte fotku jednatele nebo týmu */}
              <Image
                src="/images/hendrich_jaroslav.jpg" 
                alt="Jaroslav Hendrich, jednatel společnosti SFERA PRO DOMOV"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[600px] ring-8 ring-white/50"
              />
            </div>
          </div>

          {/* --- PRAVÁ ČÁST: PŘÍBĚH --- */}
          <div className="relative z-20">
            <div className="inline-block bg-blue-100 text-blue-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
              Náš příběh
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 leading-tight">
              Děláme věci tak, jak je považujeme za správné.
            </h2>
            
            <Quote className="w-16 h-16 text-blue-100 mb-4" fill="currentColor" />

            <div className="text-slate-600 space-y-4 text-base leading-relaxed">
              <p>
                Máme za sebou roky zkušeností, kde jsme se naučili řemeslo, ale taky viděli, co nám vadilo: ústup od poctivosti a snaha ušetřit na nesprávných místech.
              </p>
              <p className="font-medium text-slate-700">
                Právě proto jsme založili SFERA PRO DOMOV. Firmu, která stojí na férovosti, kvalitě a respektu k lidem, kterým pomáháme. Chceme být důkazem, že nejlepší cesta vede přes dlouhodobou spolupráci a spokojenost, která je pro nás tou nejlepší vizitkou.
              </p>
            </div>

            {/* Podpis */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="font-bold text-slate-800">Jaroslav Hendrich</p>
              <p className="text-sm text-slate-500">Jednatel společnosti SFERA PRO DOMOV s.r.o.</p>
            </div>
            
            {/* Bonus: Elegantní rozbalení pro zvědavce */}
            <details className="group mt-8 text-sm">
                <summary className="text-blue-600 font-semibold cursor-pointer list-none flex items-center gap-2">
                    <span>V čem jsme jiní a kam míříme?</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-slate-500 space-y-3 prose prose-sm max-w-none">
                    <p>Naše ambice nejsou malé. Chceme, aby telefonní číslo, které od nás máte, platilo i po letech. Ať už řešíte nový kotel, klimatizaci, nebo potřebujete poradit s fotovoltaikou, jsme tu pro vás. Rádi vám ukážeme, jak vypadá poctivá práce, za kterou si stojíme.</p>
                </div>
            </details>

          </div>
        </div>
      </div>
    </section>
      {/* About Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container">
          {/* Top button - left aligned */}
          <div className="flex justify-start mb-4">
            <Button
              asChild
              size="sm"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              <Link href="/o-nas" className="flex items-center gap-2">
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
                <span className="bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] bg-clip-text text-transparent font-semibold">Elektropohotovost Opava a okolí do 25km</span> s garantovanými opravami do 24 hodin.
              </p>
            </div>

            {/* Right side - Enhanced logo */}
            <div className="relative">
              {/* Enhanced logo with effects */}
              <div className="relative z-1">
                <Image
                  src="/logo/logo.svg"
                  alt="Sfera logo"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover drop-shadow-xl"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(71, 131, 228, 0.2))'
                  }}
                />
                {/* Reflection effect */}
                <div className="absolute -bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-blue-200/10 to-transparent transform scale-y-[-10] opacity-1"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-blue-500/60 rounded-5xl blur-2xl -z-0"></div>
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Additional content below */}
          <div className="mt-20">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <p className="text-lg text-gray-600 leading-relaxed">
                Postaráme se o vše, co váš domov potřebuje: od bezpečné elektroinstalace, přes efektivní vytápění, až po klimatizace, které v létě ochladí a v zimě spolehlivě vytopí.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                A protože víme, že čistý a čerstvý vzduch je základ zdravého bydlení, nabízíme také moderní systémy rekuperace vzduchu.
              </p>
              <div className="relative mt-4">
                <div className="w-28 h-5 bg-gradient-to-br from-[#1B5D93]/20 to-[#2D78AD]/20 rounded-lg transform -rotate-1 absolute top-0 left-0"></div>
              </div>
            </div>

           


          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-16">
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
                <div className="relative mb-6">
                  <div className="w-16 h-4 bg-gradient-to-br from-[#1B5D93]/20 to-[#2D78AD]/20 rounded-lg transform rotate-1 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Kompletní řešení pro vaše klima, vytápění a elektroinstalace
                </p>
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
          </div>
        </div>
      </section>
      {/* Team expertise section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left mt-16">
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
              Víme, jak je frustrující, když něco nefunguje a vy se nemůžete dovolat nikomu, kdo by to opravil. 
              <span className="block bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] bg-clip-text text-transparent">
                My se schovávat nebudeme.
                </span>
              Vždy jsme na telefonu, abychom Vám poradili a problém odstranili co nejdříve. Akutní poruchy řešíme do 3 dnů, v některých případech i do 24h.              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-gradient-to-r from-[#1B5D93] to-[#49A3D7] rounded-full"></div>
                <span className="text-md text-gray-400 font-medium">Férový přístup a dlouhodobá spolupráce
                </span>
              </div>
            </div>

            {/* Abstract decorative shape */}
            <div className="relative">
              {/* Main abstract shape */}
              <div className="w-64 h-64 bg-gradient-to-br from-[#1B5D93]/20 to-[#49A3D7]/20 rounded-full blur-xl"></div>
              
              {/* Overlapping geometric shapes */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-[#2D78AD]/30 to-[#196097]/30 rounded-2xl rotate-12"></div>
              <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-br from-[#49A3D7]/40 to-[#3D8FC4]/40 rounded-xl -rotate-6"></div>
              <div className="absolute top-24 right-24 w-16 h-16 bg-gradient-to-br from-[#1B5D93]/50 to-[#2D78AD]/50 rounded-lg rotate-45"></div>
              
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-12 w-6 h-6 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-20 right-20 w-4 h-4 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Connecting lines */}
              <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-r from-[#1B5D93]/30 to-transparent transform rotate-45"></div>
              <div className="absolute top-16 right-16 w-12 h-px bg-gradient-to-r from-[#49A3D7]/30 to-transparent transform -rotate-30"></div>
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
      {/* Modern Contact Section */}
      <section id="kontakt" className="py-20 md:py-32 bg-slate-100/70">
        <div className="container mx-auto px-4">
          <ContactForm 
            source="homepage-main" 
            showTrustBadges={true} 
            customHeading="Máte dotaz nebo zájem o naše služby?"
          />
        </div>
      </section>
    </div>
  )
  }