"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

interface Reference {
  id: string
  title: string
  description: string
  image: string
  logo?: string
  category: string
  location?: string
  isTopReference?: boolean
}

interface ReferenceSliderProps {
  references: Reference[]
}

export function ReferenceSlider({ references }: ReferenceSliderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {references.map((reference) => (
        <Card key={reference.id} className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="relative overflow-hidden aspect-[5/4]">
              <Image
                src={reference.image || "/placeholder.svg"}
                alt={reference.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {reference.isTopReference && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-500 text-white border-0 gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    TOP
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="bg-blue-600/10 text-blue-600 border-0">
                  {reference.category}
                </Badge>
                {reference.location && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {reference.location}
                  </div>
                )}
              </div>

              {reference.logo && (
                <div className="mb-4">
                  <Image
                    src={reference.logo || "/placeholder.svg"}
                    alt={`${reference.title} logo`}
                    width={80}
                    height={40}
                    className="h-8 w-auto opacity-70"
                  />
                </div>
              )}

              <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors">
                {reference.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                {reference.description}
              </p>
              {/* Optional: expand toggle could be added later if potřebné */}

              {/* Tlačítko vždy na stejném místě */}
              <div className="mt-auto">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                >
                  <Link href={`/reference/${reference.id}`}>Zobrazit detail</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
