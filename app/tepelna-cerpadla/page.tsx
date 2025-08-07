import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ContactForm } from "@/components/ui/contact-form"
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { ServiceIcon } from "@/components/ui/service-icon"
import { Badge } from "@/components/ui/badge"
import { Leaf, Zap, Shield, CheckCircle, TrendingDown, Home, Building, Thermometer } from "lucide-react"

// Důvody proč jsme nejlepší volba
const whyChooseUs = [
  {
    icon: Leaf,
    title: "Ekologické řešení",
    description: "Využívají obnovitelnou energii ze vzduchu, země nebo vody.",
  },
  {
    icon: TrendingDown,
    title: "Úspora až 75%",
    description: "Dramatické snížení nákladů na vytápění oproti plynu nebo elektřině.",
  },
  {
    icon: Zap,
    title: "Vysoká účinnost",
    description: "COP až 5,0 - z 1 kWh elektřiny získáte až 5 kWh tepla.",
  },
  {
    icon: Shield,
    title: "Dlouhá životnost",
    description: "Kvalitní tepelná čerpadla vydrží 20+ let s minimální údržbou.",
  },
]

// 8 nejprodávanějších modelů tepelných čerpadel
const bestSellingModels = [
  {
    title: "Daikin Altherma 3 H HT",
    description: "Vysoce účinné tepelné čerpadlo vzduch-voda pro vytápění a ohřev teplé vody.",
    image: "/placeholder.svg?height=300&width=300&text=Daikin+Altherma",
    features: [
      "COP až 5,1",
      "Provoz do -25°C",
      "Integrovaný zásobník TUV",
      "Bluevolution technologie",
      "Tichý provoz 35 dB(A)",
    ],
    isRecommended: true,
    catalogUrl: "/katalogy/daikin-altherma.pdf",
  },
  {
    title: "Mitsubishi Ecodan Zubadan",
    description: "Revolučná technologie pro extrémně nízké teploty až -28°C.",
    image: "/placeholder.svg?height=300&width=300&text=Mitsubishi+Zubadan",
    features: [
      "Provoz do -28°C",
      "COP až 4,9",
      "Flash Injection technologie",
      "MELCloud ovládání",
      "Hybridní možnosti",
    ],
    catalogUrl: "/katalogy/mitsubishi-ecodan.pdf",
  },
  {
    title: "Vaillant aroTHERM plus",
    description: "Prémiové tepelné čerpadlo s vynikajícím designem a účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Vaillant+AroTherm",
    features: ["COP až 5,0", "Natural cooling", "myVAILLANT aplikace", "Kompaktní design", "Energetická třída A+++"],
    catalogUrl: "/katalogy/vaillant-arotherm.pdf",
  },
  {
    title: "Viessmann Vitocal 200-S",
    description: "Spolehlivé tepelné čerpadlo s pokročilým řízením Vitotronic.",
    image: "/placeholder.svg?height=300&width=300&text=Viessmann+Vitocal",
    features: ["COP až 4,7", "Vitotronic 200 regulace", "ViCare aplikace", "Modulární konstrukce", "Tichý provoz"],
    catalogUrl: "/katalogy/viessmann-vitocal.pdf",
  },
  {
    title: "LG Therma V R32 Monoblok",
    description: "Kompaktní monoblokové řešení s ekologickým chladivem R32.",
    image: "/placeholder.svg?height=300&width=300&text=LG+Therma+V",
    features: ["Chladivo R32", "COP až 4,6", "LG ThinQ integrace", "Kompaktní rozměry", "Snadná instalace"],
    catalogUrl: "/katalogy/lg-therma-v.pdf",
  },
  {
    title: "Panasonic Aquarea T-CAP",
    description: "Inovativní technologie pro maximální výkon i při nízkých teplotách.",
    image: "/placeholder.svg?height=300&width=300&text=Panasonic+Aquarea",
    features: ["T-CAP technologie", "COP až 4,8", "Aquarea Smart Cloud", "Provoz do -20°C", "Inteligentní defrost"],
    catalogUrl: "/katalogy/panasonic-aquarea.pdf",
  },
  {
    title: "Bosch Compress 7000i AW",
    description: "Prémiové tepelné čerpadlo s inteligentním řízením a vysokou účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Bosch+Compress",
    features: [
      "COP až 4,9",
      "EasyStart technologie",
      "Bosch HomeCom aplikace",
      "Hybridní připravenost",
      "Kompaktní design",
    ],
    catalogUrl: "/katalogy/bosch-compress.pdf",
  },
  {
    title: "Stiebel Eltron WPL 25 ACS",
    description: "Německá kvalita s pokročilými funkcemi a dlouhou životností.",
    image: "/placeholder.svg?height=300&width=300&text=Stiebel+Eltron",
    features: ["COP až 4,5", "Internet Service Gateway", "Natural cooling", "Modulační provoz", "25 let zkušeností"],
    catalogUrl: "/katalogy/stiebel-eltron.pdf",
  },
]

// Typy tepelných čerpadel
const heatPumpTypes = [
  {
    icon: Thermometer,
    title: "Vzduch-voda",
    description: "Nejoblíbenější typ, využívá energii z venkovního vzduchu",
    advantages: ["Nižší pořizovací náklady", "Snadná instalace", "Vhodné pro většinu domů"],
  },
  {
    icon: Home,
    title: "Země-voda (geotermální)",
    description: "Využívá stabilní teplotu země pomocí zemních kolektorů",
    advantages: ["Nejvyšší účinnost", "Stabilní výkon", "Dlouhá životnost"],
  },
  {
    icon: Building,
    title: "Voda-voda",
    description: "Čerpá energii ze spodní nebo povrchové vody",
    advantages: ["Excelentní COP", "Celoroční stabilita", "Možnost chlazení"],
  },
]

export default function TepelnaCerpadlaPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=500&width=1200&text=Tepelná+čerpadla+Hero"
            alt="Tepelná čerpadla"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 opacity-90" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/20">Tepelná čerpadla</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">Tepelná čerpadla pro úsporu až 75%</h1>
              <p className="text-xl mb-8 leading-relaxed drop-shadow-lg">
                Ekologické vytápění s minimálními provozními náklady. Využijte obnovitelnou energii a ušetřete na účtech
                za vytápění.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-green-700 hover:bg-green-100">
                  <Link href="#kontakt">Nezávazná poptávka</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  <Link href="#modely">Nejprodávanější modely</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Důvody proč jsme nejlepší volba */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč tepelná čerpadla?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Moderní, ekologické a ekonomické řešení pro vytápění vašeho domova.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6">
                  <ServiceIcon
                    icon={reason.icon}
                    className="mx-auto w-16 h-16 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg mb-3 text-primary">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typy tepelných čerpadel */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Typy tepelných čerpadel</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vyberte si typ podle vašich potřeb a možností pozemku.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {heatPumpTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary"
              >
                <div className="text-center mb-6">
                  <ServiceIcon icon={type.icon} className="mx-auto w-16 h-16 bg-primary/10 text-primary mb-4" />
                  <h3 className="font-bold text-xl text-primary">{type.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-center">{type.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Výhody:</h4>
                  {type.advantages.map((advantage, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {advantage}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nejprodávanější modely */}
      <section id="modely" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše nejprodávanější tepelná čerpadla</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ověřené modely s nejvyšší účinností a spolehlivostí od předních světových výrobců.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PDFDownloadButton
                url="/katalogy/tepelna-cerpadla-kompletni-katalog.pdf"
                filename="sfera-tepelna-cerpadla-katalog.pdf"
                title="Stáhnout náš katalog"
              />
              <Button variant="outline" asChild>
                <Link href="/reference?kategorie=tepelna-cerpadla">Naše realizace</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bestSellingModels.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Potřebujete poradit s výběrem vhodného typu?</p>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">Bezplatná konzultace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proces instalace a výhody */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Kompletní služby tepelných čerpadel</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Proces instalace */}
              <div>
                <h3 className="text-2xl font-bold mb-8 text-primary">Proces instalace</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Energetický audit",
                      description: "Posouzení vašeho domu a výpočet tepelných ztrát",
                    },
                    {
                      step: "2",
                      title: "Návrh řešení",
                      description: "Výběr optimálního typu a výkonu tepelného čerpadla",
                    },
                    {
                      step: "3",
                      title: "Cenová nabídka",
                      description: "Detailní kalkulace včetně možných dotací",
                    },
                    {
                      step: "4",
                      title: "Profesionální instalace",
                      description: "Montáž certifikovanými techniky do 14 dnů",
                    },
                    {
                      step: "5",
                      title: "Uvedení do provozu",
                      description: "Testování, nastavení a zaškolení obsluhy",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Výhody a úspory */}
              <div>
                <h3 className="text-2xl font-bold mb-8 text-primary">Úspory a výhody</h3>
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                    <h4 className="font-bold text-lg mb-3">Roční úspora nákladů</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Oproti plynovému kotli:</span>
                        <span className="font-semibold text-primary">až 60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oproti elektrokotli:</span>
                        <span className="font-semibold text-primary">až 75%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Oproti uhlí:</span>
                        <span className="font-semibold text-primary">až 50%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Možnost dotace až 130 000 Kč",
                      "Zvýšení hodnoty nemovitosti",
                      "Nulové emise CO₂ na místě",
                      "Možnost chlazení v létě",
                      "Minimální údržba",
                      "Tichý provoz",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Zajímá vás tepelné čerpadlo?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Získejte bezplatnou konzultaci a výpočet úspor. Pomůžeme vám vybrat ideální řešení pro váš dům.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-gray-100">
              <Link href="#kontakt">Bezplatná konzultace</Link>
            </Button>
            <div className="flex items-center gap-3 text-lg">
              <span>nebo zavolejte:</span>
              <Link href="tel:+420123456789" className="font-bold hover:underline">
                +420 123 456 789
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="kontakt" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <ContactForm
              title="Poptávka tepelného čerpadla"
              subtitle="Vyplňte formulář a my vám připravíme nabídku včetně výpočtu úspor a možných dotací."
              source="tepelna-cerpadla-page"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
