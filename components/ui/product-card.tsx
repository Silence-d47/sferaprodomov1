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
  catalogUrl: string
}

export function ProductCard({ title, description, image, features, isRecommended, catalogUrl }: ProductCardProps) {
  const decentBlue = "#0369A1"; // Naše nová, sofistikovaná modrá

    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[1/1] w-full bg-slate-100 rounded-t-2xl">
        <Image src={image} alt={title} layout="fill" objectFit="contain" className="p-4" />
        {isRecommended && <Badge className="absolute top-3 right-3 bg-amber-400 text-amber-900">Doporučujeme</Badge>}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 flex-grow">{description.substring(0, 100)}...</p>
        
        <div>
          <h4 className="text-sm font-semibold mb-2" style={{ color: decentBlue }}>Klíčové vlastnosti:</h4>
          <ul className="space-y-1 text-sm text-slate-600 mb-6">
            {features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 mt-1" style={{ color: decentBlue }}>•</span><span>{feature}</span>
              </li>
            ))}
            {features.length > 3 && <li className="text-xs text-slate-400 mt-1">+ {features.length - 3} dalších vlastností</li>}
          </ul>
        </div>

        <div className="mt-auto space-y-2 border-t pt-4">
        <Button variant="outline" asChild className="w-full border-slate-300 text-slate-600">
                      <a href={catalogUrl} download>
              <Download className="mr-2 h-4 w-4" /> Stáhnout katalog
            </a>
            </Button>
          <Button asChild className="w-full text-white" style={{ backgroundColor: decentBlue }}>
            <Link href="#kontakt">
              <MessageCircle className="mr-2 h-4 w-4" /> Nezávazná poptávka
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}