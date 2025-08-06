"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { ExternalLink } from "lucide-react"

interface ProductCardProps {
  title: string
  description: string
  image: string
  features: string[]
  isRecommended?: boolean
  catalogUrl?: string
  colorTheme?: 'blue' | 'green' | 'purple' | 'orange'
}

export function ProductCard({ title, description, image, features, isRecommended, catalogUrl, colorTheme = 'blue' }: ProductCardProps) {
  const handleCatalogDownload = () => {
    console.log(`Katalog stažen: ${title}`)
  }

  const handleReferenceClick = () => {
    console.log(`Reference proklik: ${title}`)
  }

  // Dynamic color classes based on theme
  const colorClasses = {
    blue: {
      hoverText: 'group-hover:text-blue-600',
      sectionTitle: 'text-blue-600',
      bullet: 'bg-blue-600',
      buttonBorder: 'border-blue-600 text-blue-600 hover:bg-blue-600',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-600/90'
    },
    green: {
      hoverText: 'group-hover:text-green-600',
      sectionTitle: 'text-green-600',
      bullet: 'bg-green-600',
      buttonBorder: 'border-green-600 text-green-600 hover:bg-green-600',
      buttonPrimary: 'bg-green-600 hover:bg-green-600/90'
    },
    purple: {
      hoverText: 'group-hover:text-purple-600',
      sectionTitle: 'text-purple-600',
      bullet: 'bg-purple-600',
      buttonBorder: 'border-purple-600 text-purple-600 hover:bg-purple-600',
      buttonPrimary: 'bg-purple-600 hover:bg-purple-600/90'
    },
    orange: {
      hoverText: 'group-hover:text-orange-600',
      sectionTitle: 'text-orange-600',
      bullet: 'bg-orange-600',
      buttonBorder: 'border-orange-600 text-orange-600 hover:bg-orange-600',
      buttonPrimary: 'bg-orange-600 hover:bg-orange-600/90'
    }
  }

  const colors = colorClasses[colorTheme]

  return (
    <Card className="relative group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden flex flex-col h-full">
      {isRecommended && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-yellow-500 text-white border-0 shadow-lg">Doporučeno</Badge>
        </div>
      )}

      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className={`font-bold text-lg mb-3 ${colors.hoverText} transition-colors`}>{title}</h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">{description}</p>

          <div className="space-y-2 mb-6 flex-1">
            <h4 className={`font-semibold text-sm ${colors.sectionTitle}`}>Klíčové vlastnosti:</h4>
            <ul className="space-y-1">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className={`w-1.5 h-1.5 ${colors.bullet} rounded-full mr-2 flex-shrink-0`} />
                  {feature}
                </li>
              ))}
              {features.length > 4 && (
                <li className="text-xs text-muted-foreground">+ {features.length - 4} dalších vlastností</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        <div className="space-y-2 w-full">
          {catalogUrl && (
            <PDFDownloadButton
              url={catalogUrl}
              filename={`${title.toLowerCase().replace(/\s+/g, "-")}-katalog.pdf`}
              title="Stáhnout"
              className="text-xs h-8 w-full"
              onClick={handleCatalogDownload}
            />
          )}
          <Button
            variant="outline"
            size="sm"
            className={`text-xs h-8 ${colors.buttonBorder} hover:text-white bg-transparent w-full`}
            onClick={handleReferenceClick}
            asChild
          >
            <Link href={`/reference?model=${encodeURIComponent(title)}`}>
              <ExternalLink className="h-3 w-3 mr-1" />
              Reference
            </Link>
          </Button>
          <Button className={`w-full ${colors.buttonPrimary} h-9`} asChild>
            <Link href="/kontakt">Nezávazná poptávka</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
