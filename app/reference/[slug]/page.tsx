"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { EnhancedSectionDivider } from "@/components/ui/enhanced-section-divider"
import { ArrowLeft, Star, Quote, CheckCircle, Award, Users, Phone, MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react"
import { client } from "@/lib/sanity.client"
import { groq } from "next-sanity"

type Reference = {
  title: string
  description?: string
  category: string
  location?: string
  year?: string
  mainImage?: string
  gallery?: string[]
  rating?: number
  highlights?: string[]
  projectDetails?: {
    clientType?: string
    projectSize?: number
    duration?: number
    teamSize?: number
  }
  testimonial?: {
    quote?: string
    clientName?: string
    clientTitle?: string
  }
  technicalSpecs?: { label: string; value: string }[]
}

const queryBySlug = groq`
  *[_type == "projectReference" && slug.current == $slug][0] {
    title,
    description,
    category,
    location,
    year,
    "mainImage": image.asset->url,
    "gallery": gallery[].asset->url,
    rating,
    highlights,
    projectDetails,
    testimonial,
    technicalSpecs[]{label, value}
  }
`

export default function ReferenceDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug as string
  const [reference, setReference] = useState<Reference | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return
      setIsLoading(true)
      try {
        const data = await client.fetch<Reference>(queryBySlug, { slug })
        setReference(data)
      } catch (error) {
        console.error('Error fetching reference:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [slug])

  if (isLoading) return <div className="container py-20">Načítání…</div>
  if (!reference) return <div className="container py-20">Reference nenalezena.</div>

  const showReview = Boolean(reference.testimonial?.quote)
  const showDetails = Boolean(
    (reference.highlights && reference.highlights.length > 0) ||
      (reference.technicalSpecs && reference.technicalSpecs.length > 0) ||
      reference.description ||
      reference.projectDetails
  )
    
  const handleNextImage = () => {
    if (selectedImageIndex !== null && reference.gallery) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === null ? 0 : (prevIndex + 1) % reference.gallery!.length
      );
    }
  }

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && reference.gallery) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === null ? 0 : (prevIndex - 1 + reference.gallery!.length) % reference.gallery!.length
      );
    }
  }


  return (
    <div className="flex flex-col">
      {/* Universal hero for all references (no project-specific text) */}
      <section className="relative h-[360px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image src="/images/hero_reference.jpg" alt="Reference Hero" fill className="object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 flex items-center pt-36 md:pt-44">
          <div className="container">
            <div className="max-w-4xl text-white">
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-3 py-1 mb-6 inline-block">Naše reference</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">Detail reference</h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">
                Podívejte se na realizaci a zkušenost klienta. Níže najdete fotografie a technické údaje projektu.
              </p>
              <div className="mt-6">
                <Button variant="ghost" asChild className="bg-white/10 text-white hover:bg-white/20">
                  <Link href="/reference" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Zpět na všechny reference
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnhancedSectionDivider variant="wave" animated={true} height="xl" fromColor="from-transparent" toColor="to-white" particles={false} />

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Hlavní obsah - text nahoře, vedle jeden obrázek */}
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
              {/* Levý sloupec - Text */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-4 bg-blue-100 text-blue-800 border-0">
                    {reference.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {reference.title}
                  </h1>
                  {reference.location && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{reference.location}</span>
                    </div>
                  )}
                  {reference.year && (
                    <div className="flex items-center text-gray-600 mb-6">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Rok realizace: {reference.year}</span>
                    </div>
                  )}
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {reference.description}
                  </p>
                </div>

                {/* Klíčové vlastnosti */}
                {reference.highlights && reference.highlights.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Klíčové vlastnosti projektu</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {reference.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technické specifikace */}
                {reference.technicalSpecs && reference.technicalSpecs.length > 0 && (
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Technické specifikace</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {reference.technicalSpecs.map((spec, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-blue-200 last:border-b-0">
                          <span className="font-medium text-blue-800">{spec.label}</span>
                          <span className="text-blue-700">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detaily projektu */}
                {reference.projectDetails && (
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Detaily projektu</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {reference.projectDetails.clientType && (
                        <div className="text-center p-3 bg-white rounded-lg">
                          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-medium text-green-800">Typ klienta</div>
                          <div className="text-sm text-green-700">{reference.projectDetails.clientType}</div>
                        </div>
                      )}
                      {reference.projectDetails.projectSize && (
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">{reference.projectDetails.projectSize}m²</div>
                          <div className="text-sm text-green-700">Velikost projektu</div>
                        </div>
                      )}
                      {reference.projectDetails.duration && (
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">{reference.projectDetails.duration} dnů</div>
                          <div className="text-sm text-green-700">Doba realizace</div>
                        </div>
                      )}
                      {reference.projectDetails.teamSize && (
                        <div className="text-center p-3 bg-white rounded-lg">
                          <div className="text-2xl font-bold text-green-600 mb-1">{reference.projectDetails.teamSize}</div>
                          <div className="text-sm text-green-700">Členů týmu</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Pravý sloupec - Jeden hlavní obrázek */}
              <div className="lg:sticky lg:top-8">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
                  <Image
                    src={reference.mainImage || "/placeholder.svg"}
                    alt={reference.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/90 rounded-full px-3 py-1 shadow-lg">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      {reference.rating && (
                        <span className="ml-2 text-sm font-medium text-gray-700">{reference.rating}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>





{/* Fotogalerie - macOS Dock Style */}
            {reference.gallery && reference.gallery.length > 0 && (
              <div className="border-t border-gray-200 pt-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Fotogalerie projektu</h2>
                  <p className="text-gray-600">Prohlédněte si fotografie kliknutím. Posouvejte pro zobrazení dalších.</p>
                  <div className="w-24 h-1 bg-blue-600 mx-auto mt-4" />
                </div>
                
                <div className="flex justify-center py-8">
                  {/* Zvětšený prostor pro hover efekt - přidán větší padding nahoře a změněno zarovnání */}
                  <div className="flex items-center gap-3 md:gap-4 p-4 pt-24 pb-12 overflow-x-auto w-full">
                    {reference.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="relative flex-shrink-0 w-40 h-32 md:w-48 md:h-40 rounded-xl overflow-hidden shadow-lg cursor-pointer origin-center bg-gray-100"
                        whileHover={{ scale: 1.4, zIndex: 10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${reference.title} - foto ${index + 1}`}
                          fill
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 160px, 192px"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}





          </div>
        </div>
      </section>
      
      {/* Lightbox pro zvětšené obrázky */}
      <AnimatePresence>
        {selectedImageIndex !== null && reference.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            {/* Tlačítko Zavřít */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-50"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Tlačítko Předchozí */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-50"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            {/* Tlačítko Další */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-50"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full h-full max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()} // Zabrání zavření při kliknutí na obrázek
            >
              <Image
                src={reference.gallery[selectedImageIndex] || "/placeholder.svg"}
                alt={`${reference.title} - foto ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Client Review */}
      {showReview && (
        <section className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <Quote className="h-8 w-8 text-blue-600 mr-3" />
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">Oficiální recenze klienta</Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Co říká náš klient</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto" />
              </div>
              <Card className="bg-white shadow-xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Quote className="h-4 w-4" />
                        <span className="ml-2 text-sm font-medium text-blue-700">Zkušenost zákazníka</span>
                      </div>
                      {typeof reference.rating === "number" && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < (reference.rating ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                          ))}
                          <span className="ml-2 font-semibold text-lg">{reference.rating}/5</span>
                        </div>
                      )}
                    </div>
                    <Quote className="h-12 w-12 text-blue-300 mb-4" />
                    <blockquote className="text-lg leading-relaxed text-gray-800 mb-6 italic">“{reference.testimonial?.quote}”</blockquote>
                    <div className="flex items-center justify-between pt-6 border-t border-blue-200">
                      <div>
                        <div className="font-semibold text-gray-900">{reference.testimonial?.clientName}</div>
                        {reference.testimonial?.clientTitle && <div className="text-sm text-gray-600">{reference.testimonial.clientTitle}</div>}
                      </div>
                      <div className="text-sm text-gray-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=CTA+Background')] opacity-10" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Chcete být naší další referencí?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">Kontaktujte nás a společně vytvoříme řešení přesně pro vaše potřeby. Každý projekt realizujeme s maximální péčí a profesionalitou.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild><Link href="/kontakt">Nezávazná poptávka</Link></Button>
              <Button size="lg" variant="outline" className="border-blue-700 bg-blue-300 text-blue-700 font-bold hover:bg-blue-700 hover:text-white" asChild><Link href="/reference">Všechny reference</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}