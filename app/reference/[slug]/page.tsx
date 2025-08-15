"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { EnhancedSectionDivider } from "@/components/ui/enhanced-section-divider"
import { ArrowLeft, Star, Quote, CheckCircle, Award, Users, Phone } from "lucide-react"
import useSWR from "swr"
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

const fetcher = ([_q, _p]: [string, Record<string, any>]) => client.fetch(_q, _p)

export default function ReferenceDetailPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const { data: reference, error } = useSWR<Reference | null>(slug ? [queryBySlug, { slug }] : null, fetcher)

  if (error) return <div className="container py-20">Chyba při načítání.</div>
  if (!reference) return <div className="container py-20">Načítání…</div>

  const showReview = Boolean(reference.testimonial?.quote)
  const showDetails = Boolean(
    (reference.highlights && reference.highlights.length > 0) ||
      (reference.technicalSpecs && reference.technicalSpecs.length > 0) ||
      reference.description ||
      reference.projectDetails
  )

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

      {/* Project heading placed OUTSIDE the hero */}
      <section className="py-12 bg-white relative z-10">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{reference.title}</h2>
            {(reference.location || reference.year || reference.category) && (
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-4">
                {reference.category && <Badge className="bg-blue-50 text-blue-700 border-0">{reference.category}</Badge>}
                {reference.location && <span>{reference.location}</span>}
                {reference.year && <span>• {reference.year}</span>}
              </div>
            )}
            {reference.description && (
              <p className="text-slate-600 text-lg leading-relaxed">{reference.description}</p>
            )}
          </div>
        </div>
      </section>

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

      {/* Technical Details */}
      {showDetails && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {reference.highlights && reference.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Hlavní body projektu</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {reference.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {reference.technicalSpecs && reference.technicalSpecs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Technické specifikace</h3>
                    <div className="space-y-2">
                      {reference.technicalSpecs.map((s, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{s.label}</span>
                          <span className="font-medium">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                {reference.projectDetails && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4 flex items-center"><Award className="h-5 w-5 text-blue-600 mr-2" />Detaily projektu</h3>
                      <div className="space-y-3">
                        {reference.projectDetails.clientType && (
                          <div className="flex justify-between"><span className="text-muted-foreground">Typ zákazníka:</span><span className="font-medium">{reference.projectDetails.clientType}</span></div>
                        )}
                        {reference.projectDetails.projectSize !== undefined && (
                          <div className="flex justify-between"><span className="text-muted-foreground">Rozsah projektu (m²):</span><span className="font-medium">{String(reference.projectDetails.projectSize)}</span></div>
                        )}
                        {reference.projectDetails.duration !== undefined && (
                          <div className="flex justify-between"><span className="text-muted-foreground">Doba trvání (dny):</span><span className="font-medium">{String(reference.projectDetails.duration)}</span></div>
                        )}
                        {reference.projectDetails.teamSize !== undefined && (
                          <div className="flex justify-between"><span className="text-muted-foreground">Počet členů týmu:</span><span className="font-medium">{String(reference.projectDetails.teamSize)}</span></div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center"><Users className="h-5 w-5 text-blue-600 mr-2" />Máte podobný projekt?</h3>
                    <p className="text-muted-foreground mb-4">Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku.</p>
                    <div className="space-y-3">
                      <Button asChild className="w-full"><Link href="/kontakt"><Phone className="h-4 w-4 mr-2" />Nezávazná poptávka</Link></Button>
                      <Button variant="outline" asChild className="w-full"><Link href="/reference">Další reference</Link></Button>
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
              <p className="text-xl text-muted-foreground">Podívejte se na fotografie z realizace</p>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reference.gallery.map((image, index) => (
                <div key={index} className="aspect-video relative rounded-xl overflow-hidden shadow-lg group">
                  <Image src={image || "/placeholder.svg"} alt={`${reference.title} - foto ${index + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
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


