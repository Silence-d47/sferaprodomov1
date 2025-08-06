"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Building, 
  Star, 
  Quote, 
  Facebook, 
  Mail, 
  Globe,
  CheckCircle,
  Award,
  Users,
  Phone
} from "lucide-react"

// Mock data - in real app, this would come from CMS
const referenceData: Record<string, any> = {
  "rodinny-dum-praha": {
    type: "technical", // "technical" or "review"
    title: "Rodinný dům Praha",
    description: "Kompletní klimatizace rodinného domu včetně tepelného čerpadla a rekuperace.",
    category: "Klimatizace",
    categoryColor: "text-blue-600",
    categoryBg: "bg-blue-50",
    location: "Praha",
    year: "2024",
    month: "Listopad",
    client: "Rodina Nováková",
    mainImage: "/placeholder.svg?height=600&width=800&text=Rodinny+dum+Praha",
    logo: "/placeholder.svg?height=60&width=120",
    gallery: [
      "/placeholder.svg?height=400&width=600&text=Venkovni+jednotka",
      "/placeholder.svg?height=400&width=600&text=Vnitrni+jednotka+obyvak",
      "/placeholder.svg?height=400&width=600&text=Ovladaci+panel",
      "/placeholder.svg?height=400&width=600&text=Tepelne+cerpadlo",
    ],
    details: {
      area: "180 m²",
      rooms: "5 pokojů",
      system: "Multi-split klimatizace + tepelné čerpadlo",
      brand: "Daikin",
      power: "12 kW",
      efficiency: "A+++",
      warranty: "5 let",
      completion: "14 dní"
    },
    content: `
      <h2>Popis projektu</h2>
      <p>Pro rodinu Novákovou jsme realizovali kompletní klimatizační systém v jejich novém rodinném domě. Projekt zahrnoval instalaci multi-split klimatizace pro všechny obytné místnosti, tepelné čerpadlo pro vytápění a ohřev teplé vody, a rekuperační systém pro zajištění čerstvého vzduchu.</p>
      
      <h3>Použité technologie</h3>
      <ul>
        <li>Multi-split klimatizace Daikin s 5 vnitřními jednotkami</li>
        <li>Tepelné čerpadlo vzduch-voda Daikin Altherma</li>
        <li>Rekuperační jednotka s účinností 95%</li>
        <li>Inteligentní řízení přes mobilní aplikaci</li>
      </ul>
      
      <h3>Výsledky</h3>
      <p>Díky moderním technologiím se podařilo snížit energetické náklady na vytápění a chlazení o 60% oproti původnímu návrhu s plynovým kotlem. Rodina oceňuje především tichý provoz a možnost individuálního nastavení teploty v každé místnosti.</p>
    `,
    clientReview: {
      rating: 5,
      text: "Jsme naprosto spokojeni s prací firmy Sfera. Montáž proběhla rychle a profesionálně, technici byli velmi zdvořilí a vše nám vysvětlili. Klimatizace funguje perfektně a úspory na vytápění jsou opravdu znatelné. Určitě doporučujeme!",
      author: "Paní Nováková",
      source: "Facebook",
      date: "15. prosince 2024",
      verified: true
    }
  },
  "restaurace-praha-recenze": {
    type: "review", // Pouze klientská recenze
    title: "Restaurace U Fleku - Praha",
    description: "Klimatizace a větrání pro tradiční pražskou restauraci",
    category: "Komerční",
    categoryColor: "text-green-600",
    categoryBg: "bg-green-50",
    location: "Praha 1",
    year: "2024",
    month: "Říjen",
    client: "Restaurace U Fleku",
    mainImage: "/placeholder.svg?height=600&width=800&text=Restaurace+U+Fleku",
    clientReview: {
      rating: 5,
      text: "Výborná práce! Firma Sfera nám vyřešila problém s klimatizací v naší restauraci. Instalace proběhla během jediného dne bez narušení provozu. Hosté si pochvalují příjemnou teplotu i v horkých letních dnech. Personál je profesionální a servis je na výborné úrovni. Rozhodně doporučujeme všem provozovatelům restaurací!",
      author: "Jan Novák, majitel restaurace",
      source: "Firmy.cz",
      date: "28. října 2024",
      verified: true,
      businessInfo: "Restaurace U Fleku, Praha 1"
    },
    gallery: [
      "/placeholder.svg?height=400&width=600&text=Restaurace+exteriér",
      "/placeholder.svg?height=400&width=600&text=Klimatizace+v+provozu"
    ]
  },
  "wellness-centrum-email": {
    type: "review", // E-mailová recenze
    title: "Wellness centrum Ostrava",
    description: "Speciální klimatizace a rekuperace pro wellness centrum",
    category: "Rekuperace",
    categoryColor: "text-purple-600",
    categoryBg: "bg-purple-50",
    location: "Ostrava",
    year: "2024",
    month: "Září",
    client: "AquaRelax Wellness",
    mainImage: "/placeholder.svg?height=600&width=800&text=Wellness+centrum",
    clientReview: {
      rating: 5,
      text: "Chtěl bych poděkovat celému týmu firmy Sfera za skvělou práci na našem wellness centru. Instalace rekuperace a speciální klimatizace pro prostory s bazénem a saunami byla velmi náročná, ale zvládli to na jedničku. Kvalita vzduchu se výrazně zlepšila a provozní náklady klesly. Doporučujem všem kolegům z branže!",
      author: "Ing. Pavel Svoboda, provozní ředitel",
      source: "E-mail",
      date: "12. září 2024",
      verified: true,
      businessInfo: "AquaRelax Wellness, Ostrava"
    },
    gallery: [
      "/placeholder.svg?height=400&width=600&text=Wellness+bazén",
      "/placeholder.svg?height=400&width=600&text=Sauna+prostory",
      "/placeholder.svg?height=400&width=600&text=Rekuperace+jednotka"
    ]
  }
}

interface ReferenceDetailPageProps {
  params: {
    slug: string
  }
}

// Helper function to get source icon
const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />
    case 'firmy.cz':
    case 'seznam':
      return <Globe className="h-4 w-4" />
    case 'e-mail':
    case 'email':
      return <Mail className="h-4 w-4" />
    default:
      return <Quote className="h-4 w-4" />
  }
}

export default function ReferenceDetailPage({ params }: ReferenceDetailPageProps) {
  const reference = referenceData[params.slug]

  if (!reference) {
    notFound()
  }

  const isReviewOnly = reference.type === 'review'

  return (
    <div className="flex flex-col">
      {/* Hero Section - konzistentní s hlavní stránkou */}
      <section className="relative h-[500px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image 
            src={reference.mainImage || "/placeholder.svg"} 
            alt={reference.title} 
            fill 
            className="object-cover opacity-30" 
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-4xl text-white">
              <div className="flex items-center mb-6">
                <Image 
                  src="/logo/logo.svg" 
                  alt="Sfera logo" 
                  width={50} 
                  height={50} 
                  className="mr-4" 
                />
                <Badge className={`${reference.categoryBg} ${reference.categoryColor} border-0`}>
                  {reference.category}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                {reference.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
                {reference.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-blue-100">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {reference.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {reference.month} {reference.year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Navigation */}
      <section className="py-6 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
        <div className="container">
          <Button variant="ghost" asChild className="hover:bg-blue-50">
            <Link href="/reference" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět na reference
            </Link>
          </Button>
        </div>
      </section>

      {/* Client Review Section - Prioritní umístění */}
      {reference.clientReview && (
        <section className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <Quote className="h-8 w-8 text-blue-600 mr-3" />
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                    Oficiální recenze klienta
                  </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Co říká náš klient</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
              </div>

              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        {getSourceIcon(reference.clientReview.source)}
                        <span className="ml-2 text-sm font-medium text-blue-700">
                          {reference.clientReview.source}
                        </span>
                        {reference.clientReview.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                        )}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < reference.clientReview.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                        <span className="ml-2 font-semibold text-lg">
                          {reference.clientReview.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    <Quote className="h-12 w-12 text-blue-300 mb-4" />
                    <blockquote className="text-lg leading-relaxed text-gray-800 mb-6 italic">
                      "{reference.clientReview.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-blue-200">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {reference.clientReview.author}
                        </div>
                        {reference.clientReview.businessInfo && (
                          <div className="text-sm text-gray-600">
                            {reference.clientReview.businessInfo}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reference.clientReview.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Technical Details - pouze pro technické reference */}
      {!isReviewOnly && reference.content && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {reference.logo && (
                  <div className="mb-8">
                    <Image
                      src={reference.logo || "/placeholder.svg"}
                      alt={`${reference.client} logo`}
                      width={150}
                      height={75}
                      className="h-12 w-auto"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: reference.content }} />
              </div>

              {/* Project Info Sidebar */}
              <div className="space-y-6">
                {reference.details && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center">
                        <Award className="h-5 w-5 text-blue-600 mr-2" />
                        Detaily projektu
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(reference.details).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            area: 'Plocha',
                            rooms: 'Počet místností',
                            system: 'Systém',
                            brand: 'Značka',
                            power: 'Výkon',
                            efficiency: 'Účinnost',
                            warranty: 'Záruka',
                            completion: 'Doba realizace'
                          }
                          return (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground">{labels[key] || key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-2" />
                      Máte podobný projekt?
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku.
                    </p>
                    <div className="space-y-3">
                      <Button asChild className="w-full">
                        <Link href="/kontakt">
                          <Phone className="h-4 w-4 mr-2" />
                          Nezávazná poptávka
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/reference">
                          Další reference
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {reference.gallery && reference.gallery.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Fotogalerie</h2>
              <p className="text-xl text-muted-foreground">
                Podívejte se na fotografie z realizace
              </p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reference.gallery.map((image: string, index: number) => (
                <div key={index} className="aspect-video relative rounded-xl overflow-hidden shadow-lg group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${reference.title} - foto ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=CTA+Background')] opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Chcete být naší další referencí?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Kontaktujte nás a společně vytvoříme řešení přesně pro vaše potřeby. 
              Každý projekt realizujeme s maximální péčí a profesionalitou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                <Link href="/kontakt">
                  <Phone className="h-5 w-5 mr-2" />
                  Nezávazná poptávka
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/reference">
                  Všechny reference
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
