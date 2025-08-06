"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3
  const maxIndex = Math.max(0, references.length - itemsPerView)

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {references.map((reference) => (
            <div key={reference.id} className="w-1/3 flex-shrink-0 px-3">
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden">
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

                  <div className="p-6">
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
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{reference.description}</p>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                    >
                      <Link href={`/reference/${reference.id}`}>Zobrazit detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg border-blue-600/20 hover:bg-blue-600 hover:text-white z-10"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg border-blue-600/20 hover:bg-blue-600 hover:text-white z-10"
        onClick={goToNext}
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
