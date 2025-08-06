"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Calendar, Users } from "lucide-react"
import Image from "next/image"

interface MapReference {
  id: string
  title: string
  description: string
  image: string
  category: string
  location: string
  coordinates: [number, number] // [lat, lng]
  isTopReference?: boolean
  installed?: string
  capacity?: string
}

interface InteractiveMapProps {
  references: MapReference[]
  onReferenceClick?: (reference: MapReference) => void
}

export function InteractiveMap({ references, onReferenceClick }: InteractiveMapProps) {
  const [selectedReference, setSelectedReference] = useState<MapReference | null>(null)
  const [hoveredReference, setHoveredReference] = useState<string | null>(null)

  // Simplified Czech Republic coordinates (approximate)
  const czechRepublicBounds = {
    north: 51.1,
    south: 48.5,
    east: 18.9,
    west: 12.1,
  }

  const normalizeCoordinates = (lat: number, lng: number) => {
    const x = ((lng - czechRepublicBounds.west) / (czechRepublicBounds.east - czechRepublicBounds.west)) * 100
    const y = ((lat - czechRepublicBounds.south) / (czechRepublicBounds.north - czechRepublicBounds.south)) * 100
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
  }

  const topReferences = references.filter(ref => ref.isTopReference)
  const otherReferences = references.filter(ref => !ref.isTopReference)

  return (
    <div className="space-y-8">
      {/* Map Container */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Naše realizace v České republice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
            {/* Simplified Czech Republic outline */}
            <div className="relative w-full h-96 bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              {/* Map background with regions */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 opacity-30" />
              
              {/* Major cities as reference points */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full" />
              <div className="absolute top-1/4 left-1/4 -ml-1 -mt-1 text-xs text-gray-500">Praha</div>
              
              <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-gray-400 rounded-full" />
              <div className="absolute top-1/2 left-1/3 -ml-1 -mt-1 text-xs text-gray-500">Brno</div>
              
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gray-400 rounded-full" />
              <div className="absolute top-1/3 right-1/4 -ml-1 -mt-1 text-xs text-gray-500">Ostrava</div>

              {/* Reference pins */}
              {references.map((reference) => {
                const coords = normalizeCoordinates(reference.coordinates[0], reference.coordinates[1])
                return (
                  <div
                    key={reference.id}
                    className={`absolute cursor-pointer transition-all duration-300 ${
                      hoveredReference === reference.id ? 'scale-125' : 'scale-100'
                    }`}
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseEnter={() => setHoveredReference(reference.id)}
                    onMouseLeave={() => setHoveredReference(null)}
                    onClick={() => {
                      setSelectedReference(reference)
                      onReferenceClick?.(reference)
                    }}
                  >
                    <div className={`relative ${
                      reference.isTopReference 
                        ? 'text-yellow-600' 
                        : 'text-blue-600'
                    }`}>
                      <MapPin className={`h-6 w-6 ${
                        reference.isTopReference 
                          ? 'fill-yellow-400 stroke-yellow-600' 
                          : 'fill-blue-400 stroke-blue-600'
                      }`} />
                      {reference.isTopReference && (
                        <Star className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                      )}
                    </div>
                    
                    {/* Tooltip */}
                    {hoveredReference === reference.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-white rounded-lg shadow-lg p-3 border min-w-48">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {reference.category}
                            </Badge>
                            {reference.isTopReference && (
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            )}
                          </div>
                          <h4 className="font-semibold text-sm">{reference.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {reference.location}
                          </p>
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mx-auto" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 fill-blue-400 stroke-blue-600" />
                <span>Standardní reference</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <MapPin className="h-4 w-4 fill-yellow-400 stroke-yellow-600" />
                  <Star className="absolute -top-0.5 -right-0.5 h-2 w-2 fill-yellow-500" />
                </div>
                <span>TOP reference</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Reference Detail */}
      {selectedReference && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {selectedReference.title}
              </CardTitle>
              <button
                onClick={() => setSelectedReference(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedReference.image}
                  alt={selectedReference.title}
                  fill
                  className="object-cover"
                />
                {selectedReference.isTopReference && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1" />
                    TOP
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedReference.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kategorie:</span>
                    <Badge variant="secondary">{selectedReference.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lokalita:</span>
                    <span className="font-medium">{selectedReference.location}</span>
                  </div>
                  {selectedReference.installed && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Instalováno:</span>
                      <span className="font-medium">{selectedReference.installed}</span>
                    </div>
                  )}
                  {selectedReference.capacity && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Výkon:</span>
                      <span className="font-medium">{selectedReference.capacity}</span>
                    </div>
                  )}
                </div>
                
                <Button className="w-full" onClick={() => onReferenceClick?.(selectedReference)}>
                  Zobrazit detail
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 