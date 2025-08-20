"use client"

// components/ui/product-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Eye, X } from "lucide-react"
import { ExpandableFeatures } from "./expandable-features"
import { useState } from "react"

export interface ProductCardProps {
  title: string
  description: string
  image: string
  features: string[]
  isRecommended?: boolean
  isBestSelling?: boolean
  catalogUrl?: string
  energyClass?: string
  specifications?: {
    powerRange?: { min?: number; max?: number };
    coolingCapacityRange?: { min?: number; max?: number };
    heatingCapacityRange?: { min?: number; max?: number };
    noiseLevel?: number;
  };
  price?: {
    basePrice?: number;
    installationPrice?: number;
    showPrice?: boolean;
  };
  warranty?: number;
  brand?: string;
  files?: Array<{
    _id: string
    title: string
    fileUrl: string
    fileType: string
  }>
}

export function ProductCard({ title, description, image, features, isRecommended, isBestSelling, catalogUrl, energyClass, specifications, price, warranty, brand, files }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Kompaktní karta */}
      <div className="bg-card rounded-lg border border-border shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full group min-h-[320px]">
        <div className="relative w-full overflow-hidden aspect-[4/3] bg-muted rounded-t-lg">
          <Image src={image} alt={title} fill className="object-contain transition-transform duration-500 group-hover:scale-105" />
          {isRecommended && (
            <Badge className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs px-2 py-1">
              Doporučujeme
            </Badge>
          )}
          {isBestSelling && (
            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">
              Nejprodávanější
            </Badge>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          {/* Název produktu */}
          <h3 className="font-bold text-base text-foreground mb-2 group-hover:text-slate-700 transition-colors duration-300 leading-tight line-clamp-2 min-h-[3rem]">
            {title}
          </h3>
          
          {/* Značka a energetická třída */}
          <div className="space-y-1 mb-3 min-h-[3rem]">
            {brand && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-slate-600 mr-2">Značka:</span>
                <span className="text-slate-700 truncate">{brand}</span>
              </div>
            )}
            {energyClass && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-slate-600 mr-2">Třída:</span>
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-slate-300 text-slate-700">
                  {energyClass}
                </Badge>
              </div>
            )}
          </div>

          {/* Tlačítka */}
          <div className="mt-auto space-y-2 pt-2">
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:scale-105 transition-all duration-300"
            >
              <Eye className="mr-2 h-4 w-4" />
              Zobrazit detaily
            </Button>
            
            <Button asChild className="w-full bg-slate-700 text-white hover:bg-slate-800 hover:scale-105 transition-all duration-300">
              <Link href="#kontakt">
                <MessageCircle className="mr-2 h-4 w-4" />
                Poptávka
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Modální okno s detaily */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Levý sloupec - obrázek a základní info */}
                <div>
                  <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                    <Image src={image} alt={title} fill className="object-contain" />
                  </div>
                  
                                     <div className="space-y-3">
                     {brand && (
                       <div className="flex items-center">
                         <span className="font-medium text-slate-600 mr-3 w-20">Značka:</span>
                         <span className="text-slate-700">{brand}</span>
                       </div>
                     )}
                     {energyClass && (
                       <div className="flex items-center">
                         <span className="font-medium text-slate-600 mr-3 w-20">Energetická třída:</span>
                         <Badge variant="outline" className="px-3 py-1 border-slate-300 text-slate-700">
                           {energyClass}
                         </Badge>
                       </div>
                     )}
                     {warranty && (
                       <div className="flex items-center">
                         <span className="font-medium text-slate-600 mr-3 w-20">Záruka:</span>
                         <span className="text-slate-700">{warranty} let</span>
                       </div>
                     )}
                   </div>
                </div>

                {/* Pravý sloupec - popis a specifikace */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">Popis</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                  </div>

                  {/* Technické specifikace */}
                  {specifications && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-900">Technické specifikace</h3>
                                             <div className="space-y-2">
                         {specifications.powerRange && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Výkon:</span>
                             <span className="text-gray-700">
                               {specifications.powerRange.min}-{specifications.powerRange.max} kW
                             </span>
                           </div>
                         )}
                         {specifications.coolingCapacityRange && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Chlazení:</span>
                             <span className="text-gray-700">
                               {specifications.coolingCapacityRange.min}-{specifications.coolingCapacityRange.max} kW
                             </span>
                           </div>
                         )}
                         {specifications.heatingCapacityRange && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Topení:</span>
                             <span className="text-gray-700">
                               {specifications.heatingCapacityRange.min}-{specifications.heatingCapacityRange.max} kW
                             </span>
                           </div>
                         )}
                         {specifications.noiseLevel && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Hluk:</span>
                             <span className="text-gray-700">{specifications.noiseLevel} dB</span>
                           </div>
                         )}
                       </div>
                    </div>
                  )}

                  {/* Cena */}
                  {price && price.showPrice && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-900">Cena</h3>
                                             <div className="space-y-2">
                         {price.basePrice && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Základní cena:</span>
                             <span className="text-gray-700 font-semibold">{price.basePrice.toLocaleString()} Kč</span>
                           </div>
                         )}
                         {price.installationPrice && (
                           <div className="flex items-center text-sm">
                             <span className="font-medium text-slate-600 mr-3 w-20">Instalace:</span>
                             <span className="text-gray-700">{price.installationPrice.toLocaleString()} Kč</span>
                           </div>
                         )}
                       </div>
                    </div>
                  )}

                  {/* Funkce */}
                  {features && features.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-900">Klíčové vlastnosti</h3>
                      <ExpandableFeatures features={features} />
                    </div>
                  )}
                </div>
              </div>

              {/* Soubory ke stažení */}
              {(files && files.length > 0) && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Dokumentace ke stažení</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {files.map((file) => (
                                             <Button 
                         key={file._id} 
                         variant="outline" 
                         asChild 
                         className="border-slate-300 text-slate-700 hover:bg-slate-50"
                       >
                        <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          {file.fileType === 'catalog' ? 'Katalog' : 
                           file.fileType === 'manual' ? 'Návod' :
                           file.fileType === 'datasheet' ? 'Datasheet' :
                           file.title}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback na catalogUrl */}
              {(!files || files.length === 0) && catalogUrl && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Dokumentace</h3>
                                     <Button variant="outline" asChild className="border-slate-300 text-slate-700 hover:bg-slate-50">
                    <a href={catalogUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Stáhnout katalog
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-gray-300"
              >
                Zavřít
              </Button>
                             <Button asChild className="bg-slate-700 text-white hover:bg-slate-800">
                <Link href="#kontakt">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Nezávazná poptávka
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}