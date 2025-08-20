"use client"

import { ProductCard } from "./product-card"

// Ukázkové produkty pro demonstraci
const sampleProducts = [
  {
    _id: "1",
    title: "Rekuperační jednotka Daikin VAM 250 G",
    description: "Vysokovýkonná rekuperační jednotka s účinností až 90% pro rodinné domy. Ideální pro novostavby i rekonstrukce s možností chlazení a vlhčení vzduchu.",
    image: "/images/rekuperace/rekuperace_homepage_hero.png",
    features: [
      "Účinnost až 90%",
      "Tichý provoz pod 30 dB",
      "Možnost chlazení",
      "Automatické ovládání",
      "Filtrace vzduchu"
    ],
    isRecommended: true,
    isBestSelling: false,
    energyClass: "A+",
    specifications: {
      powerRange: { min: 0.5, max: 2.5 },
      noiseLevel: 28
    },
    warranty: 5,
    brand: "Daikin",
    files: [
      {
        _id: "file1",
        title: "Technický list",
        fileUrl: "#",
        fileType: "datasheet"
      },
      {
        _id: "file2", 
        title: "Montážní návod",
        fileUrl: "#",
        fileType: "manual"
      }
    ]
  },
  {
    _id: "2",
    title: "Klimatizace Midea Oasis Plus",
    description: "Invertorová klimatizace s WiFi ovládáním a vysokou účinností. Vhodná pro obývací pokoje a ložnice s možností topení i chlazení.",
    image: "/images/klimatizace/klimatizace_hero.jpg",
    features: [
      "Invertorová technologie",
      "WiFi ovládání",
      "Topení i chlazení",
      "Tichý provoz",
      "Energeticky úsporná"
    ],
    isRecommended: false,
    isBestSelling: true,
    energyClass: "A+++",
    specifications: {
      coolingCapacityRange: { min: 2.5, max: 3.5 },
      heatingCapacityRange: { min: 2.8, max: 4.0 },
      noiseLevel: 22
    },
    warranty: 3,
    brand: "Midea",
    files: [
      {
        _id: "file3",
        title: "Katalog",
        fileUrl: "#", 
        fileType: "catalog"
      }
    ]
  },
  {
    _id: "3",
    title: "Tepelné čerpadlo vzduch-voda Viessmann",
    description: "Efektivní tepelné čerpadlo pro vytápění a ohřev TUV. Vhodné pro rodinné domy s možností chlazení v létě.",
    image: "/images/tep_cer_homepage_hero.png",
    features: [
      "Vzduch-voda systém",
      "Vytápění i chlazení",
      "Ohřev TUV",
      "Nízké provozní náklady",
      "Dotace Nová zelená úsporám"
    ],
    isRecommended: true,
    isBestSelling: true,
    energyClass: "A++",
    specifications: {
      powerRange: { min: 5, max: 16 },
      heatingCapacityRange: { min: 6, max: 18 }
    },
    warranty: 7,
    brand: "Viessmann",
    files: [
      {
        _id: "file4",
        title: "Technický list",
        fileUrl: "#",
        fileType: "datasheet"
      }
    ]
  },
  {
    _id: "4",
    title: "Rekuperační jednotka Zehnder ComfoAir 200",
    description: "Decentralizovaná rekuperační jednotka pro jednotlivé místnosti. Ideální pro rekonstrukce bytů a domů bez nutnosti rozvodů.",
    image: "/images/rekuperace/rekuperace.webp",
    features: [
      "Decentralizovaná jednotka",
      "Jednoduchá instalace",
      "Bez potrubí",
      "Tichý provoz",
      "Účinnost až 85%"
    ],
    isRecommended: false,
    isBestSelling: false,
    energyClass: "A",
    specifications: {
      powerRange: { min: 0.3, max: 1.2 },
      noiseLevel: 32
    },
    warranty: 3,
    brand: "Zehnder"
  }
]

export function ProductShowcase() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Ukázka nové implementace produktů
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Nová kompaktní karta s modálním oknem pro detaily. Všechny karty mají stejnou výšku a konzistentní layout.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
              description={product.description}
              image={product.image}
              features={product.features}
              isRecommended={product.isRecommended}
              isBestSelling={product.isBestSelling}
              energyClass={product.energyClass}
              specifications={product.specifications}
              warranty={product.warranty}
              brand={product.brand}
              files={product.files}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Klikněte na "Zobrazit detaily" pro otevření modálního okna s kompletními informacemi o produktu.
          </p>
        </div>
      </div>
    </div>
  )
}
