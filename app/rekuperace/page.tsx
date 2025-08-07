import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ContactForm } from "@/components/ui/contact-form"
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { ServiceIcon } from "@/components/ui/service-icon"
import { Badge } from "@/components/ui/badge"
import { Wind, Heart, Leaf, Shield, CheckCircle, Home, Building, Factory } from "lucide-react"

// Důvody proč rekuperace
const whyRecuperation = [
  {
    icon: Heart,
    title: "Zdravé bydlení",
    description: "Čerstvý vzduch bez otevírání oken, filtrované alergeny a pyl.",
  },
  {
    icon: Leaf,
    title: "Úspora energie až 90%",
    description: "Rekuperace tepla ze vzduchu snižuje náklady na vytápění.",
  },
  {
    icon: Wind,
    title: "Stálé větrání",
    description: "24/7 přívod čerstvého vzduchu bez průvanu a hluku.",
  },
  {
    icon: Shield,
    title: "Ochrana před vlhkostí",
    description: "Prevence plísní a kondenzace, zdravé vnitřní klima.",
  },
]

// Nejprodávanější rekuperační jednotky
const bestSellingModels = [
  {
    title: "Zehnder ComfoAir Q350",
    description: "Prémiová rekuperační jednotka s nejvyšší účinností a tichým provozem.",
    image: "/placeholder.svg?height=300&width=300&text=Zehnder+Q350",
    features: [
      "Účinnost rekuperace 95%",
      "Průtok vzduchu 350 m³/h",
      "Tichý provoz 25 dB(A)",
      "ComfoConnect ovládání",
      "Bypass pro letní provoz",
    ],
    isRecommended: true,
    catalogUrl: "/katalogy/zehnder-comfoair.pdf",
  },
  {
    title: "Atrea Duplex ECV5",
    description: "Česká kvalita s pokročilými funkcemi a snadnou údržbou.",
    image: "/placeholder.svg?height=300&width=300&text=Atrea+Duplex",
    features: [
      "Účinnost rekuperace 93%",
      "Průtok vzduchu 500 m³/h",
      "RD5 regulace",
      "Protiproudý výměník",
      "Snadná údržba",
    ],
    catalogUrl: "/katalogy/atrea-duplex.pdf",
  },
  {
    title: "Jablotron Futura",
    description: "Kompaktní jednotka s inteligentním řízením a vysokou účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Jablotron+Futura",
    features: [
      "Účinnost rekuperace 92%",
      "Průtok vzduchu 280 m³/h",
      "MyJablotron aplikace",
      "Kompaktní rozměry",
      "Automatické řízení",
    ],
    catalogUrl: "/katalogy/jablotron-futura.pdf",
  },
  {
    title: "Systemair SAVE VTR 300",
    description: "Švédská kvalita s rotačním výměníkem a vysokou účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Systemair+SAVE",
    features: [
      "Rotační výměník",
      "Účinnost rekuperace 85%",
      "Průtok vzduchu 300 m³/h",
      "Modbus komunikace",
      "Robustní konstrukce",
    ],
    catalogUrl: "/katalogy/systemair-save.pdf",
  },
  {
    title: "Daikin VAM800FB",
    description: "Profesionální řešení s pokročilými filtry a tichým provozem.",
    image: "/placeholder.svg?height=300&width=300&text=Daikin+VAM",
    features: [
      "Účinnost rekuperace 90%",
      "Průtok vzduchu 800 m³/h",
      "HEPA filtry",
      "Inteligentní řízení",
      "Nízká spotřeba energie",
    ],
    catalogUrl: "/katalogy/daikin-vam.pdf",
  },
  {
    title: "Brink Renovent Excellent 300",
    description: "Holandská preciznost s inovativními funkcemi pro maximální komfort.",
    image: "/placeholder.svg?height=300&width=300&text=Brink+Renovent",
    features: [
      "Účinnost rekuperace 95%",
      "Průtok vzduchu 300 m³/h",
      "Enthalpický výměník",
      "Brink HOME aplikace",
      "Automatické filtry",
    ],
    catalogUrl: "/katalogy/brink-renovent.pdf",
  },
  {
    title: "Salda RIRS 350 PE EKO 3.0",
    description: "Litevská kvalita s vynikajícím poměrem cena/výkon.",
    image: "/placeholder.svg?height=300&width=300&text=Salda+RIRS",
    features: [
      "Účinnost rekuperace 91%",
      "Průtok vzduchu 350 m³/h",
      "SmartTouch ovládání",
      "Protiproudý výměník",
      "Nízké provozní náklady",
    ],
    catalogUrl: "/katalogy/salda-rirs.pdf",
  },
  {
    title: "Vents VUT 300 H",
    description: "Ekonomické řešení s dobrými parametry pro menší objekty.",
    image: "/placeholder.svg?height=300&width=300&text=Vents+VUT",
    features: [
      "Účinnost rekuperace 87%",
      "Průtok vzduchu 300 m³/h",
      "Jednoduché ovládání",
      "Kompaktní design",
      "Dostupná cena",
    ],
    catalogUrl: "/katalogy/vents-vut.pdf",
  },
]

// Typy rekuperačních systémů
const recuperationTypes = [
  {
    icon: Home,
    title: "Centrální rekuperace",
    description: "Jedna jednotka pro celý dům s rozvodem potrubí",
    advantages: ["Nejvyšší účinnost", "Centrální řízení", "Optimální pro novostavby"],
  },
  {
    icon: Building,
    title: "Decentralizovaná rekuperace",
    description: "Jednotlivé jednotky pro každou místnost",
    advantages: ["Snadná instalace", "Vhodné pro rekonstrukce", "Nezávislé řízení místností"],
  },
  {
    icon: Factory,
    title: "Průmyslová rekuperace",
    description: "Velkokapacitní systémy pro komerční objekty",
    advantages: ["Vysoké průtoky", "Robustní konstrukce", "Úspora provozních nákladů"],
  },
]

export default function RekuperacePage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=500&width=1200&text=Rekuperace+Hero"
            alt="Rekuperační systémy"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 opacity-90" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/20">Rekuperace</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">Rekuperace pro zdravé bydlení</h1>
              <p className="text-xl mb-8 leading-relaxed drop-shadow-lg">
                Čerstvý vzduch 24/7 s úsporou energie až 90%. Filtrované alergeny, žádné průvany, tichý provoz.
                Investice do vašeho zdraví.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-purple-700 hover:bg-purple-100">
                  <Link href="#kontakt">Nezávazná poptávka</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-purple-700 bg-transparent"
                >
                  <Link href="#modely">Nejprodávanější modely</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Důvody proč rekuperace */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč rekuperace?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Moderní domy jsou těsné, což způsobuje problémy s vlhkostí a kvalitou vzduchu. Rekuperace je řešení.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyRecuperation.map((reason, index) => (
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

      {/* Typy rekuperačních systémů */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Typy rekuperačních systémů</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Vyberte si řešení podle typu objektu a vašich potřeb.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recuperationTypes.map((type, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše nejprodávanější rekuperační jednotky</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ověřené modely s nejvyšší účinností rekuperace od předních evropských výrobců.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PDFDownloadButton
                url="/katalogy/rekuperace-kompletni-katalog.pdf"
                filename="sfera-rekuperace-katalog.pdf"
                title="Stáhnout náš katalog"
              />
              <Button variant="outline" asChild>
                <Link href="/reference?kategorie=rekuperace">Naše realizace</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bestSellingModels.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Nevíte, kterou jednotku vybrat? Pomůžeme vám!</p>
            <Button asChild variant="outline" size="lg">
              <Link href="/kontakt">Bezplatná konzultace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Jak rekuperace funguje */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Jak rekuperace funguje?</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">Princip funkce</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Přívod čerstvého vzduchu</h4>
                      <p className="text-muted-foreground">
                        Venkovní vzduch je nasáván a filtrován od prachových částic a alergenů.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Odvod odpadního vzduchu</h4>
                      <p className="text-muted-foreground">
                        Teplý vzduch z interiéru je odváděn ven přes výměník tepla.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Rekuperace tepla</h4>
                      <p className="text-muted-foreground">
                        Teplo z odpadního vzduchu se přenáší na čerstvý vzduch (až 95% účinnost).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Distribuce do místností</h4>
                      <p className="text-muted-foreground">
                        Předehřátý čerstvý vzduch je rozváděn do obytných místností.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-primary">Výhody pro vaše zdraví</h3>
                <div className="space-y-4">
                  {[
                    "Odstranění alergenů a prachových částic",
                    "Optimální vlhkost vzduchu (40-60%)",
                    "Prevence plísní a kondenzace",
                    "Lepší spánek díky čerstvému vzduchu",
                    "Snížení rizika respiračních onemocnění",
                    "Eliminace pachů z vaření a kouření",
                    "Konstantní teplota bez průvanů",
                    "Tichý provoz - nerušený odpočinek",
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Investujte do svého zdraví</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Rekuperace není jen o úspoře energie, ale především o kvalitě života. Získejte bezplatnou konzultaci a návrh
            řešení.
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
              title="Poptávka rekuperace"
              subtitle="Vyplňte formulář a my vám připravíme návrh rekuperačního systému pro váš dům."
              source="rekuperace-page"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
