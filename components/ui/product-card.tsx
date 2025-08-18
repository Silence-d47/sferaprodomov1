// components/ui/product-card.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, MessageCircle } from "lucide-react"

export interface ProductCardProps {
  title: string
  description: string
  image: string
  features: string[]
  isRecommended?: boolean
  catalogUrl?: string
  files?: Array<{
    _id: string
    title: string
    fileUrl: string
    fileType: string
  }>
}

export function ProductCard({ title, description, image, features, isRecommended, catalogUrl, files }: ProductCardProps) {
  return (
    <div className="bg-card rounded-xl sm:rounded-2xl border border-border shadow-sm flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full group">
      <div className="relative w-full overflow-hidden aspect-[5/4] bg-muted rounded-t-xl sm:rounded-t-2xl">
        <Image src={image} alt={title} fill className="object-contain transition-transform duration-700 group-hover:scale-110" />
        {isRecommended && (
          <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-amber-400 text-amber-900 text-xs sm:text-sm px-2 py-1 animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110">
            Doporučujeme
          </Badge>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-base sm:text-lg text-foreground mb-1.5 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">{title}</h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 flex-grow overflow-hidden [display:-webkit-box] [-webkit-line-clamp:4] sm:[-webkit-line-clamp:5] [-webkit-box-orient:vertical] group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">{description}</p>
        
        <div>
          <h4 className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-black group-hover:text-blue-700 transition-colors duration-300">Klíčové vlastnosti:</h4>
          <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start hover:text-slate-700 transition-colors duration-200">
                <span className="mr-1.5 sm:mr-2 mt-0.5 text-black group-hover:text-blue-500 transition-colors duration-300">•</span><span className="leading-relaxed">{feature}</span>
              </li>
            ))}
            {features.length > 3 && <li className="text-xs text-muted-foreground/70 mt-1 group-hover:text-slate-600 transition-colors duration-300">+ {features.length - 3} dalších vlastností</li>}
          </ul>
        </div>

        <div className="mt-auto space-y-2 border-t pt-3 sm:pt-4">
          {/* Tlačítko pro stažení - prioritně files, pak catalogUrl */}
          {(files && files.length > 0) ? (
            // Pokud máme nahrané soubory, zobrazíme tlačítka pro každý
            <div className="space-y-2">
              {files.map((file) => (
                <Button 
                  key={file._id} 
                  variant="outline" 
                  asChild 
                  className="w-full border-black/30 text-black hover:bg-black/5 hover:scale-105 transition-all duration-300 hover:shadow-md group/btn text-xs sm:text-sm h-8 sm:h-10"
                >
                  <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:animate-bounce transition-all duration-300" /> 
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
            <Button variant="outline" asChild className="w-full border-black/30 text-black hover:bg-black/5 hover:scale-105 transition-all duration-300 hover:shadow-md group/btn text-xs sm:text-sm h-8 sm:h-10">
              <a href={catalogUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:animate-bounce transition-all duration-300" /> Stáhnout katalog
              </a>
            </Button>
          ) : null}
          
          <Button asChild className="w-full bg-black text-white hover:bg-black/90 hover:scale-105 transition-all duration-300 hover:shadow-xl group/btn text-xs sm:text-sm h-8 sm:h-10">
            <Link href="#kontakt">
              <MessageCircle className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:animate-pulse transition-all duration-300" /> Nezávazná poptávka
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}