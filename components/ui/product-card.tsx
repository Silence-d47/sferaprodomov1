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
    <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="relative w-full overflow-hidden aspect-[5/4] bg-muted rounded-t-2xl">
        <Image src={image} alt={title} fill className="object-cover" />
        {isRecommended && <Badge className="absolute top-3 right-3 bg-amber-400 text-amber-900">Doporučujeme</Badge>}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">{description}</p>
        
        <div>
          <h4 className="text-sm font-semibold mb-2 text-black">Klíčové vlastnosti:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 mt-1 text-black">•</span><span>{feature}</span>
              </li>
            ))}
            {features.length > 3 && <li className="text-xs text-muted-foreground/70 mt-1">+ {features.length - 3} dalších vlastností</li>}
          </ul>
        </div>

        <div className="mt-auto space-y-2 border-t pt-4">
          {/* Tlačítko pro stažení - prioritně files, pak catalogUrl */}
          {(files && files.length > 0) ? (
            // Pokud máme nahrané soubory, zobrazíme tlačítka pro každý
            <div className="space-y-2">
              {files.map((file) => (
                <Button 
                  key={file._id} 
                  variant="outline" 
                  asChild 
                  className="w-full border-black/30 text-black hover:bg-black/5"
                >
                  <a href={file.fileUrl} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> 
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
            <Button variant="outline" asChild className="w-full border-black/30 text-black hover:bg-black/5">
              <a href={catalogUrl} download target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" /> Stáhnout katalog
              </a>
            </Button>
          ) : null}
          
          <Button asChild className="w-full bg-black text-white hover:bg-black/90">
            <Link href="#kontakt">
              <MessageCircle className="mr-2 h-4 w-4" /> Nezávazná poptávka
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}