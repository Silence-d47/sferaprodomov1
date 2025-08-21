"use client"

// components/ui/product-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Eye, X, Star, Shield, Check, Info } from "lucide-react"
import { ExpandableFeatures } from "./expandable-features"
import { useState, useEffect } from "react"

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
  const [isAnimating, setIsAnimating] = useState(false)

  // Animace při otevírání/zavírání modálu
  useEffect(() => {
    if (isModalOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleClose = () => {
    setIsModalOpen(false)
  }

  // Zavření modálu při kliknutí na overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <>
      {/* Kompaktní karta - vylepšený design */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full group overflow-hidden">
        {/* Obrázek s badge */}
        <div className="relative w-full overflow-hidden aspect-[4/3] bg-gray-50">
          <Image src={image} alt={title} fill className="object-contain transition-transform duration-700 group-hover:scale-110" />
          
          {/* Badge - vylepšený design */}
          {isRecommended && (
            <Badge className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 shadow-lg border-0">
              Doporučujeme
            </Badge>
          )}
          {isBestSelling && (
            <Badge className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 shadow-lg border-0">
              Nejprodávanější
            </Badge>
          )}
        </div>
        
        {/* Obsah karty - vylepšený spacing a typografie */}
        <div className="p-5 flex-grow flex flex-col">
          {/* Název produktu - lepší typografie */}
          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300 leading-tight line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
          
          {/* Značka a energetická třída - lepší layout */}
          <div className="space-y-2 mb-4 min-h-[3rem]">
            {brand && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-600 mr-2">Značka:</span>
                <span className="text-gray-800 font-medium">{brand}</span>
              </div>
            )}
            {energyClass && (
              <div className="flex items-center text-sm">
                <span className="font-medium text-gray-600 mr-2">Třída:</span>
                <Badge variant="outline" className="text-xs px-2.5 py-1 border-gray-300 text-gray-700 font-medium">
                  {energyClass}
                </Badge>
              </div>
            )}
          </div>

          {/* Tlačítka - lepší design a spacing */}
          <div className="mt-auto space-y-3 pt-3">
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] transition-all duration-300 font-medium"
            >
              <Eye className="mr-2 h-4 w-4" />
              Zobrazit detaily
            </Button>
            
            <Button asChild className="w-full bg-gray-800 text-white hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 font-medium shadow-md">
              <Link href="#kontakt">
                <MessageCircle className="mr-2 h-4 w-4" />
                Poptávka
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Modální okno s detaily - profesionální design */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 transition-all duration-300"
          onClick={handleOverlayClick}
        >
          <div className={`bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200/50 transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            {/* Header - profesionální design */}
            <div className="relative flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
                    {brand && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs px-3 py-1 border-blue-200 text-blue-700 bg-blue-50">
                          {brand}
                        </Badge>
                        {isRecommended && (
                          <Badge className="text-xs px-3 py-1 bg-amber-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Doporučujeme
                          </Badge>
                        )}
                        {isBestSelling && (
                          <Badge className="text-xs px-3 py-1 bg-green-600 text-white">
                            <Shield className="h-3 w-3 mr-1" />
                            Nejprodávanější
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-12 w-12 p-0 hover:bg-gray-200/70 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <X className="h-6 w-6 text-gray-500" />
              </Button>
            </div>

            {/* Content - bez scrollování, fixovaný layout */}
            <div className="p-8 max-h-[calc(90vh-200px)] overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-8 h-full">
                {/* Levý sloupec - obrázek a základní info */}
                <div className="space-y-6">
                  {/* Obrázek */}
                  <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <Image src={image} alt={title} fill className="object-contain" />
                  </div>
                  
                  {/* Základní informace - profesionální design */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-4 border border-blue-100/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">Základní informace</h4>
                    </div>
                    {brand && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-600">Značka</span>
                        <span className="text-gray-900 font-medium">{brand}</span>
                      </div>
                    )}
                    {energyClass && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-600">Energetická třída</span>
                        <Badge variant="outline" className="px-3 py-1 border-gray-300 text-gray-700 font-medium">
                          {energyClass}
                        </Badge>
                      </div>
                    )}
                    {warranty && (
                      <div className="flex items-center justify-between py-2">
                        <span className="font-medium text-gray-600">Záruka</span>
                        <span className="text-gray-900 font-medium">{warranty} let</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pravý sloupec - popis a specifikace */}
                <div className="space-y-6 overflow-y-auto flex-1">
                  {/* Popis produktu */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">Popis produktu</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base pl-11">{description}</p>
                  </div>

                  {/* Technické specifikace - profesionální design */}
                  {specifications && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">Technické specifikace</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {specifications.powerRange && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 text-sm">Výkon</span>
                            <span className="text-gray-900 font-medium text-sm">
                              {specifications.powerRange.min}-{specifications.powerRange.max} kW
                            </span>
                          </div>
                        )}
                        {specifications.coolingCapacityRange && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 text-sm">Chlazení</span>
                            <span className="text-gray-900 font-medium text-sm">
                              {specifications.coolingCapacityRange.min}-{specifications.coolingCapacityRange.max} kW
                            </span>
                          </div>
                        )}
                        {specifications.heatingCapacityRange && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 text-sm">Topení</span>
                            <span className="text-gray-900 font-medium text-sm">
                              {specifications.heatingCapacityRange.min}-{specifications.heatingCapacityRange.max} kW
                            </span>
                          </div>
                        )}
                        {specifications.noiseLevel && (
                          <div className="flex items-center justify-between py-2">
                            <span className="font-medium text-gray-600 text-sm">Hladina hluku</span>
                            <span className="text-gray-900 font-medium text-sm">{specifications.noiseLevel} dB</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cena - profesionální design */}
                  {price && price.showPrice && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">Cena</h3>
                      </div>
                      <div className="space-y-3">
                        {price.basePrice && (
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-600 text-sm">Základní cena</span>
                            <span className="text-gray-900 font-bold text-lg">{price.basePrice.toLocaleString()} Kč</span>
                          </div>
                        )}
                        {price.installationPrice && (
                          <div className="flex items-center justify-between py-2">
                            <span className="font-medium text-gray-600 text-sm">Instalace</span>
                            <span className="text-gray-900 font-medium text-sm">{price.installationPrice.toLocaleString()} Kč</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Klíčové vlastnosti - profesionální design */}
                  {features && features.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">Klíčové vlastnosti</h3>
                      </div>
                      <ExpandableFeatures features={features} />
                    </div>
                  )}
                </div>
              </div>

              {/* Soubory ke stažení - profesionální design */}
              {(files && files.length > 0) && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Download className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">Dokumentace ke stažení</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {files.map((file) => (
                      <Button 
                        key={file._id} 
                        variant="outline" 
                        asChild 
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
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
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Download className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900">Dokumentace</h3>
                  </div>
                  <Button variant="outline" asChild className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 py-3">
                    <a href={catalogUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5" />
                      Stáhnout katalog
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Footer - profesionální design s lepší viditelností */}
            <div className="flex items-center justify-between p-8 border-t border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100/50">
              <Button
                variant="outline"
                onClick={handleClose}
                className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium rounded-xl"
              >
                Zavřít
              </Button>
              <Button asChild className="px-8 py-3 bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all duration-200 font-medium rounded-xl hover:scale-105">
                <Link href="#kontakt">
                  <MessageCircle className="mr-2 h-5 w-5" />
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