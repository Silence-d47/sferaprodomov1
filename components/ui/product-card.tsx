// components/ui/product-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle } from "lucide-react"
import { ExpandableFeatures } from "./expandable-features"

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
  return (
    <div className="bg-card rounded-lg sm:rounded-xl border border-border shadow-sm flex flex-col transition-all duration-500 hover:shadow-lg hover:-translate-y-1 h-full group w-80">
      <div className="relative w-full overflow-hidden aspect-[4/3] bg-muted rounded-t-lg sm:rounded-t-xl">
        <Image src={image} alt={title} fill className="object-contain transition-transform duration-700 group-hover:scale-110" />
        {isRecommended && (
          <Badge className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs px-2 py-1 animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110">
            Doporučujeme
          </Badge>
        )}
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-sm sm:text-base text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 flex-grow overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">{description}</p>
        
        <div>
          <h4 className="text-xs font-semibold mb-2 text-black group-hover:text-blue-700 transition-colors duration-300">Klíčové vlastnosti:</h4>
          
          {/* Značka */}
          {brand && (
            <div className="flex items-center mb-1.5 text-xs">
              <span className="font-medium text-blue-600 mr-2 w-16">Značka:</span>
              <span className="text-slate-700 truncate">{brand}</span>
            </div>
          )}

          {/* Energetická třída */}
          {energyClass && (
            <div className="flex items-center mb-1.5 text-xs">
              <span className="font-medium text-blue-600 mr-2 w-16">Energetická třída:</span>
              <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-300 text-blue-700">
                {energyClass}
              </Badge>
            </div>
          )}

          {/* Technické specifikace */}
          {specifications && (
            <div className="space-y-1.5 mb-2">
              {specifications.powerRange && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Výkon:</span>
                  <span className="text-slate-700 truncate">
                    {specifications.powerRange.min}-{specifications.powerRange.max} kW
                  </span>
                </div>
              )}
              {specifications.coolingCapacityRange && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Chlazení:</span>
                  <span className="text-slate-700 truncate">
                    {specifications.coolingCapacityRange.min}-{specifications.coolingCapacityRange.max} kW
                  </span>
                </div>
              )}
              {specifications.heatingCapacityRange && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Topení:</span>
                  <span className="text-slate-700 truncate">
                    {specifications.heatingCapacityRange.min}-{specifications.heatingCapacityRange.max} kW
                  </span>
                </div>
              )}
              {specifications.noiseLevel && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Hluk:</span>
                  <span className="text-slate-700">{specifications.noiseLevel} dB</span>
                </div>
              )}
            </div>
          )}

          {/* Záruka */}
          {warranty && (
            <div className="flex items-center mb-1.5 text-xs">
              <span className="font-medium text-blue-600 mr-2 w-16">Záruka:</span>
              <span className="text-slate-700">{warranty} let</span>
            </div>
          )}

          {/* Cena (pokud je povolena) */}
          {price && price.showPrice && (
            <div className="space-y-1 mb-2">
              {price.basePrice && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Cena:</span>
                  <span className="text-slate-700 font-semibold truncate">{price.basePrice.toLocaleString()} Kč</span>
                </div>
              )}
              {price.installationPrice && (
                <div className="flex items-center text-xs">
                  <span className="font-medium text-blue-600 mr-2 w-16">Instalace:</span>
                  <span className="text-slate-700 truncate">{price.installationPrice.toLocaleString()} Kč</span>
                </div>
              )}
            </div>
          )}

          {/* Features - rozbalovací sekce */}
          <ExpandableFeatures features={features || []} />
        </div>

        <div className="mt-auto space-y-2 border-t pt-3">
          {/* Tlačítko pro stažení - prioritně files, pak catalogUrl */}
          {(files && files.length > 0) ? (
            // Pokud máme nahrané soubory, zobrazíme tlačítka pro každý
            <div className="space-y-2">
              {files.map((file) => (
                <Button 
                  key={file._id} 
                  variant="outline" 
                  asChild 
                  className="w-full border-black/30 text-black hover:bg-black/5 hover:scale-105 transition-all duration-300 hover:shadow-md group/btn text-xs h-8"
                >
                  <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-1.5 h-3 w-3 group-hover/btn:animate-bounce transition-all duration-300" /> 
                    {file.fileType === 'catalog' ? 'Stáhnout katalog' : 
                     file.fileType === 'manual' ? 'Stáhnout návod' :
                     file.fileType === 'datasheet' ? 'Stáhnout datasheet' :
                     `Stáhnout ${file.title}`}
                  </a>
                </Button>
              ))}
            </div>
          ) : catalogUrl ? (
            // Fallback na legacy catalogUrl
            <Button variant="outline" asChild className="w-full border-black/30 text-black hover:bg-black/5 hover:scale-105 transition-all duration-300 hover:shadow-md group/btn text-xs h-8">
              <a href={catalogUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-1.5 h-3 w-3 group-hover/btn:animate-bounce transition-all duration-300" /> Stáhnout katalog
              </a>
            </Button>
          ) : null}
          
          <Button asChild className="w-full bg-black text-white hover:bg-black/90 hover:scale-105 transition-all duration-300 hover:shadow-xl group/btn text-xs h-8">
            <Link href="#kontakt">
              <MessageCircle className="mr-1.5 h-3 w-3 group-hover/btn:animate-pulse transition-all duration-300" /> Nezávazná poptávka
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}