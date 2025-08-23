"use client"

// components/ui/product-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle, Eye, X, Star, Shield, Check, Info, Zap, Volume2, Thermometer, Leaf, GalleryHorizontal, FileDown } from "lucide-react"
import { ExpandableFeatures } from "./expandable-features"
import { useState, useEffect } from "react"

export interface ProductCardProps {
  title: string
  description: string
  image: string
  gallery?: { url: string; alt?: string }[]
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

export function ProductCard({ title, description, image, gallery, features, isRecommended, isBestSelling, catalogUrl, energyClass, specifications, price, warranty, brand, files }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mainImage, setMainImage] = useState(image)

  useEffect(() => {
    setMainImage(image)
  }, [image])
  
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
      <div 
        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full group overflow-hidden flex flex-col"
      >
        {/* Obrázek s badge */}
        <div 
          className="relative w-full overflow-hidden aspect-[4/3] bg-gray-50 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image src={image} alt={title} fill className="object-contain transition-transform duration-700 group-hover:scale-110" />
          
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <Eye className="h-5 w-5 text-gray-800" />
          </div>

          {/* Badge - vylepšený design */}
          {isRecommended && (
            <Badge className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 shadow-lg border-0">
              Doporučujeme
            </Badge>
          )}
          {isBestSelling && (
            <Badge className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 shadow-lg border-0">
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
          <div className={`bg-gray-50 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200/50 transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} grid lg:grid-cols-12`}>
            
            {/* --- LEVÝ SLOUPEC: OBRÁZKY --- */}
            <div className="lg:col-span-5 bg-white p-6 lg:p-8 flex flex-col gap-6">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <Image src={mainImage} alt={title} fill className="object-contain transition-all duration-300" />
              </div>
              
              {gallery && gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {/* Původní hlavní obrázek */}
                  <button onClick={() => setMainImage(image)} className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${mainImage === image ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-blue-400'}`}>
                    <Image src={image} alt={title} fill className="object-contain" />
                  </button>
                  {/* Galerie */}
                  {gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setMainImage(img.url)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${mainImage === img.url ? 'border-blue-600 shadow-md' : 'border-gray-200 hover:border-blue-400'}`}
                    >
                      <Image src={img.url} alt={img.alt || title} fill className="object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* --- PRAVÝ SLOUPEC: INFORMACE --- */}
            <div className="lg:col-span-7 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 lg:p-8 border-b border-gray-200 flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h2>
                  {brand && <p className="text-sm text-gray-500 font-medium">Výrobce: {brand}</p>}
                </div>
                <Button variant="ghost" size="sm" onClick={handleClose} className="h-10 w-10 p-0 hover:bg-gray-200/70 rounded-full transition-all duration-200 hover:scale-105">
                  <X className="h-5 w-5 text-gray-500" />
                </Button>
              </div>

              {/* Scrollovatelný obsah */}
              <div className="p-6 lg:p-8 space-y-8 overflow-y-auto">
                
                {/* Základní přehled */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 text-base">Základní přehled</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {specifications?.powerRange && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <Zap className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-500">Výkon</p>
                        <p className="font-bold text-sm text-gray-900">{specifications.powerRange.min}-{specifications.powerRange.max} kW</p>
                      </div>
                    )}
                    {specifications?.noiseLevel && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <Volume2 className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-500">Hluk</p>
                        <p className="font-bold text-sm text-gray-900">{specifications.noiseLevel} dB</p>
                      </div>
                    )}
                    {energyClass && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <Leaf className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-500">Třída</p>
                        <p className="font-bold text-sm text-gray-900">{energyClass}</p>
                      </div>
                    )}
                     {warranty && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <Shield className="mx-auto h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-xs text-gray-500">Záruka</p>
                        <p className="font-bold text-sm text-gray-900">{warranty} let</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Popis produktu */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-base">Popis produktu</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
                </div>

                {/* Klíčové vlastnosti */}
                {features && features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-base">Klíčové vlastnosti</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Technické specifikace */}
                 {specifications && (specifications.coolingCapacityRange || specifications.heatingCapacityRange) && (
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4 text-base">Technické specifikace</h3>
                        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                        {specifications.coolingCapacityRange && (
                          <div className="flex items-center justify-between p-3">
                            <span className="font-medium text-gray-600 text-sm">Chladící výkon</span>
                            <span className="text-gray-800 font-semibold text-sm">{specifications.coolingCapacityRange.min}-{specifications.coolingCapacityRange.max} kW</span>
                          </div>
                        )}
                        {specifications.heatingCapacityRange && (
                          <div className="flex items-center justify-between p-3">
                            <span className="font-medium text-gray-600 text-sm">Topný výkon</span>
                            <span className="text-gray-800 font-semibold text-sm">{specifications.heatingCapacityRange.min}-{specifications.heatingCapacityRange.max} kW</span>
                          </div>
                        )}
                        </div>
                    </div>
                 )}

                {/* Soubory ke stažení */}
                {(files && files.length > 0) && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4 text-base">Dokumentace ke stažení</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {files.map((file) => (
                        <Button key={file._id} variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 justify-start">
                          <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                            <FileDown className="mr-2 h-4 w-4" />
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
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}