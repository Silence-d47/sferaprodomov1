"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { ShapedSectionHeader } from "@/components/ui/shaped-section-header"
import { 
  MapPin, 
  Calendar, 
  Star, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Users,
  ChevronLeft,
  ChevronRight,
  Phone
} from "lucide-react"
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Top 3 featured references
const featuredReferences = [
  {
    id: "rodinny-dum-praha",
    title: "Rodinný dům Praha",
    description: "Kompletní klimatizace s tepelným čerpadlem a rekuperací pro maximální komfort.",
    image: "/placeholder.svg?height=400&width=600&text=TOP+Reference+1",
    category: "Klimatizace",
    location: "Praha",
    year: "2024",
    rating: 5,
    highlights: ["Multi-split systém", "Tepelné čerpadlo", "Rekuperace", "Chytrá domácnost"],
    savings: "65% úspora nákladů",
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50"
  },
  {
    id: "kancelarsky-komplex-brno",
    title: "Kancelářský komplex Brno",
    description: "Centrální klimatizační systém pro 200 zaměstnanců s inteligentním řízením.",
    image: "/placeholder.svg?height=400&width=600&text=TOP+Reference+2",
    category: "Komerční",
    location: "Brno",
    year: "2024",
    rating: 5,
    highlights: ["VRV systém", "Inteligentní řízení", "Monitoring", "Údržba 24/7"],
    savings: "40% snížení spotřeby",
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50"
  },
  {
    id: "wellness-centrum-ostrava",
    title: "Wellness centrum Ostrava",
    description: "Speciální klimatizace a rekuperace pro wellness s bazénem a saunou.",
    image: "/placeholder.svg?height=400&width=600&text=TOP+Reference+3",
    category: "Rekuperace",
    location: "Ostrava",
    year: "2024",
    rating: 5,
    highlights: ["Odolnost vlhkosti", "Speciální filtrace", "Tichý provoz", "Úspora energie"],
    savings: "50% čerstvější vzduch",
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50"
  },
]

// Ostatní reference
const otherReferences = [
  {
    id: "bytovy-dum-cb",
    title: "Bytový dům České Budějovice",
    description: "Tepelné čerpadlo a centrální klimatizace pro bytový dům s 24 byty.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+4",
    category: "Tepelná čerpadla",
    location: "České Budějovice",
    year: "2024",
    month: "Listopad",
    rating: 4.8,
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50"
  },
  {
    id: "restaurace-praha",
    title: "Restaurace v centru Prahy",
    description: "Klimatizace a větrání pro restauraci s kapacitou 100 hostů.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+5",
    category: "Větrání",
    location: "Praha",
    year: "2024",
    month: "Říjen",
    rating: 4.9,
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50"
  },
  {
    id: "prumyslovy-objekt-plzen",
    title: "Průmyslový objekt Plzeň",
    description: "Průmyslová klimatizace a větrání pro výrobní halu.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+6",
    category: "Průmyslové",
    location: "Plzeň",
    year: "2024",
    month: "Září",
    rating: 4.7,
    categoryColor: "text-orange-600",
    categoryBg: "bg-orange-50"
  },
  {
    id: "hotel-karlovy-vary",
    title: "Hotel Karlovy Vary",
    description: "Kompletní klimatizace a rekuperace pro 4* hotel s 80 pokoji.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+7",
    category: "Hotelnictví",
    location: "Karlovy Vary",
    year: "2024",
    month: "Srpen",
    rating: 4.9,
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50"
  },
  {
    id: "skolka-liberec",
    title: "Mateřská škola Liberec",
    description: "Bezpečná klimatizace a rekuperace pro děti s antibakteriální filtrací.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+8",
    category: "Vzdělávání",
    location: "Liberec",
    year: "2024",
    month: "Červenec",
    rating: 5.0,
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50"
  },
  {
    id: "fitness-centrum-olomouc",
    title: "Fitness centrum Olomouc",
    description: "Výkonná klimatizace a větrání pro fitness centrum s kardio a posilovnou.",
    image: "/placeholder.svg?height=300&width=400&text=Reference+9",
    category: "Sport",
    location: "Olomouc",
    year: "2024",
    month: "Červen",
    rating: 4.8,
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50"
  }
]

// Custom arrow components for carousel
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
  >
    <ChevronLeft className="h-6 w-6 text-gray-700" />
  </button>
)

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
  >
    <ChevronRight className="h-6 w-6 text-gray-700" />
  </button>
)

export default function ReferencePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
        i === currentSlide ? 'bg-blue-600' : 'bg-white/50'
      }`} />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - konzistentní s hlavní stránkou */}
      <section className="relative h-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image 
            src="/placeholder.svg?height=500&width=1200&text=Reference+Hero" 
            alt="Naše reference" 
            fill 
            className="object-cover opacity-20" 
          />
        </div>
        <div className="relative z-10 container h-full">
          <div className="grid lg:grid-cols-12 gap-8 items-center h-full">
            {/* Left side - Content */}
            <div className="lg:col-span-8 text-white">
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-3 py-1 mb-6 inline-block">
                Naše reference
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Úspěšné projekty po celé ČR
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
                Podívejte se na naše realizace klimatizací, tepelných čerpadel a rekuperací. 
                Každý projekt je důkazem naší odbornosti a spokojenosti zákazníků.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                  <Link href="/kontakt">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all" asChild>
                  <Link href="#reference-mapa">
                    <MapPin className="h-5 w-5 mr-2" />
                    Zobrazit na mapě
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right side - Logo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full scale-110 animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-full p-8 border border-white/30 shadow-2xl">
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Map Section - Modernized */}
      <section id="reference-mapa" className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                Naše pokrytí
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
Chcete být naši další referencí?            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Naše pověst nás předchází napříč Moravskoslezským krajem. Děkujeme!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mt-8"></div>
          </div>
            
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Hledáte kvalitní řešení a spolehlivou firmu?</h3>
              <p className="text-gray-600 mb-6">
                Jsme připraveni realizovat váš projekt s maximální profesionalitou.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/kontakt">
                    <Phone className="h-4 w-4 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                  <Link href="#top-reference">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Zobrazit reference
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Reference Carousel */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-yellow-500 mr-3" />
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                TOP reference
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše nejlepší projekty</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tyto projekty jsou naši pýchou. 
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <Slider {...carouselSettings}>
                {featuredReferences.map((reference) => (
                  <div key={reference.id} className="px-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                      <div className="grid lg:grid-cols-2 gap-0">
                        <div className="relative h-80 lg:h-auto">
                          <Image
                            src={reference.image}
                            alt={reference.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              TOP
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <div className="flex items-center bg-white/90 rounded-full px-3 py-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                              <span className="ml-2 text-xs font-medium">{reference.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className={`${reference.categoryBg} ${reference.categoryColor} border-0`}>
                              {reference.category}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              {reference.location}
                              <Calendar className="h-4 w-4 ml-3 mr-1" />
                              {reference.year}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{reference.title}</h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">{reference.description}</p>
                          
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Klíčové vlastnosti:</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {reference.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-green-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center">
                              <Award className="h-5 w-5 text-green-600 mr-2" />
                              <span className="font-semibold text-green-800">{reference.savings}</span>
                            </div>
                          </div>
                          
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                            <Link href={`/reference/${reference.id}`}>
                              Zobrazit detail projektu
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8"></div>

      {/* Ostatní reference */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Projekty</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Každý projekt je pro nás důležitý a zaslouží si naši veškerou a plnou pozornost. Také i proto se všechny projekty u nás zůstávají v našem paměti. Vy si je můžete prohlédnout níže.</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherReferences.map((reference) => (
              <Card key={reference.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={reference.image}
                      alt={reference.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs font-medium">{reference.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${reference.categoryBg} ${reference.categoryColor} border-0 text-xs`}>
                        {reference.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {reference.location}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{reference.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{reference.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {reference.month} {reference.year}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 text-blue-600 mr-1" />
                        <span className="text-xs text-blue-600 font-medium">Realizováno</span>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                      <Link href={`/reference/${reference.id}`}>
                        Zobrazit detail
                        <ArrowRight className="h-3 w-3 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=CTA+Background')] opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <Badge className="bg-white/20 text-white border-white/20 px-4 py-2 mb-6">
              Děkujeme našim klientům za hodnocení.
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Staňte se naší další referencí
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Máte projekt, který by mohl být naší další úspěšnou referencí? 
              Kontaktujte nás a společně vytvoříme řešení přesně pro vaše potřeby.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg" asChild>
                <Link href="/kontakt">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Nezávazná poptávka
                </Link>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all font-semibold" asChild>
                <Link href="/sluzby">
                  Naše služby
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Garantovaná kvalita</h3>
                <p className="text-blue-100 text-sm">Každý projekt se zárukou na práci i materiál</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Zkušený tým</h3>
                <p className="text-blue-100 text-sm">Náš tým se účastní pravidelných školení a přezkoušení z oboru</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Certifikáty</h3>
                <p className="text-blue-100 text-sm">Jsme certifikovaným týmem v oboru a řídíme se normami ISO 9001 a 14001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
