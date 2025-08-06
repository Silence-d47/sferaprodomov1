import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ContactForm } from "@/components/ui/contact-form"
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { ServiceIcon } from "@/components/ui/service-icon"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Award, CheckCircle } from "lucide-react"

// Důvody proč jsme nejlepší volba
const whyChooseUs = [
  {
    icon: Clock,
    title: "Rychlost instalace",
    description: "Montáž do 14 dnů od objednávky. Bez zbytečného čekání.",
  },
  {
    icon: Award,
    title: "Certifikovaní technici",
    description: "Všechny práce provádí kvalifikovaní a certifikovaní odborníci.",
  },
  {
    icon: Shield,
    title: "Záruka a servis",
    description: "24 měsíců záruka + rychlý servis do 7 dnů.",
  },
  {
    icon: CheckCircle,
    title: "0% záloha",
    description: "Na skladové zboží nevyžadujeme žádnou zálohu.",
  },
]

// 8 nejprodávanějších modelů
const bestSellingModels = [
  {
    title: "Daikin Emura FTXJ-MS",
    description: "Prémiová nástěnná klimatizace s elegantním designem a nejvyšší energetickou účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Daikin+Emura",
    features: [
      "Energetická třída A+++",
      "Inverterová technologie",
      "Wi-Fi ovládání",
      "Tichý provoz 19 dB(A)",
      "3D proudění vzduchu",
    ],
    isRecommended: true,
    catalogUrl: "/katalogy/daikin-emura.pdf",
  },
  {
    title: "Mitsubishi MSZ-LN25VG",
    description: "Kompaktní a výkonná klimatizace s pokročilými funkcemi pro maximální komfort.",
    image: "/placeholder.svg?height=300&width=300&text=Mitsubishi+LN",
    features: [
      "Energetická třída A++",
      "3D i-see senzor",
      "Plasma Quad filtr",
      "Rychlé chlazení",
      "Automatické čištění",
    ],
    catalogUrl: "/katalogy/mitsubishi-ln.pdf",
  },
  {
    title: "LG Artcool Gallery",
    description: "Designová klimatizace, která se stane ozdobou vašeho interiéru.",
    image: "/placeholder.svg?height=300&width=300&text=LG+Gallery",
    features: [
      "Vyměnitelné designové panely",
      "Energetická třída A+++",
      "Dual Inverter technologie",
      "ThinQ aplikace",
      "UV nano technologie",
    ],
    catalogUrl: "/katalogy/lg-gallery.pdf",
  },
  {
    title: "Panasonic Etherea",
    description: "Prémiová řada s nanoe™ X technologií pro čistý a zdravý vzduch.",
    image: "/placeholder.svg?height=300&width=300&text=Panasonic+Etherea",
    features: [
      "nanoe™ X technologie",
      "Energetická třída A+++",
      "Econavi senzory",
      "Panasonic aplikace",
      "Aerowings technologie",
    ],
    catalogUrl: "/katalogy/panasonic-etherea.pdf",
  },
  {
    title: "Fujitsu ASYG-KETA",
    description: "Spolehlivá klimatizace s vynikajícím poměrem cena/výkon.",
    image: "/placeholder.svg?height=300&width=300&text=Fujitsu+KETA",
    features: ["Energetická třída A++", "DC Inverter", "Human sensor", "Tichý provoz", "Rychlá instalace"],
    catalogUrl: "/katalogy/fujitsu-keta.pdf",
  },
  {
    title: "Toshiba Shorai Edge",
    description: "Moderní design s pokročilými funkcemi pro inteligentní domácnost.",
    image: "/placeholder.svg?height=300&width=300&text=Toshiba+Shorai",
    features: [
      "Energetická třída A+++",
      "Toshiba Home AC aplikace",
      "Pure+ filtr",
      "Magic Coil technologie",
      "Hlasové ovládání",
    ],
    catalogUrl: "/katalogy/toshiba-shorai.pdf",
  },
  {
    title: "Samsung WindFree™",
    description: "Revoluční technologie bez průvanu pro maximální komfort.",
    image: "/placeholder.svg?height=300&width=300&text=Samsung+WindFree",
    features: [
      "WindFree™ technologie",
      "Energetická třída A+++",
      "SmartThings integrace",
      "AI Auto Cooling",
      "Virus Doctor technologie",
    ],
    catalogUrl: "/katalogy/samsung-windfree.pdf",
  },
  {
    title: "Gree Fairy",
    description: "Elegantní klimatizace s vynikajícím poměrem cena/výkon.",
    image: "/placeholder.svg?height=300&width=300&text=Gree+Fairy",
    features: ["Energetická třída A++", "G10 Inverter", "WiFi modul", "Cold Plasma filtr", "Tichý provoz"],
    catalogUrl: "/katalogy/gree-fairy.pdf",
  },
]

export default function KlimatizacePage() {
  return (
    <div className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=500&width=1200&text=Klimatizace+Hero"
            alt="Profesionální klimatizace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-sky-300 opacity-90" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/20">Klimatizace</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Klimatizace pro váš dokonalý komfort
              </h1>
              <p className="text-xl mb-8 leading-relaxed drop-shadow-lg">
                Profesionální instalace, servis a údržba klimatizačních systémů. Montáž do 14 dnů, 0% záloha na skladové
                zboží, platba až po spuštění.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-blue-500 hover:bg-blue-50">
                  <Link href="#kontakt">Nezávazná poptávka</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-blue-500 bg-transparent"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč si vybrat právě nás?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Rychlost, kvalita a spolehlivost. To jsou naše hlavní přednosti.
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6">
                  <ServiceIcon
                    icon={reason.icon}
                    className="mx-auto w-16 h-16 bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg mb-3 text-blue-500">{reason.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nejprodávanější modely */}
      <section id="modely" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Naše nejprodávanější modely</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Vybírali jsme pro vás ty nejlepší klimatizace na trhu. Každý model prošel našimi testy.
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PDFDownloadButton
                url="/katalogy/klimatizace-kompletni-katalog.pdf"
                filename="sfera-klimatizace-katalog.pdf"
                title="Stáhnout náš katalog"
                className="bg-blue-500 hover:bg-blue-600/90"
              />
              <Button variant="outline" asChild className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
                <Link href="/reference?kategorie=klimatizace">Naše realizace</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bestSellingModels.map((product, index) => (
              <ProductCard key={index} {...product} colorTheme="blue" />
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 max-w-2xl mx-auto">
              <p className="text-gray-600 mb-6 text-lg">Nenašli jste vhodný model? Máme jich mnohem více!</p>
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600/90">
                <Link href="/kontakt">Poraďte mi s výběrem</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kompletní služby v oblasti klimatizace */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Kompletní služby v oblasti klimatizace</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Od konzultace přes instalaci až po dlouhodobý servis. Vše pod jednou střechou.
              </p>
              <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: CheckCircle,
                  title: "Bezplatná konzultace",
                  description: "Návrh řešení na míru vašich potřeb a prostoru",
                  color: "bg-blue-500"
                },
                {
                  icon: Shield,
                  title: "Profesionální instalace",
                  description: "Certifikovanými techniky s dlouholetou praxí",
                  color: "bg-blue-500"
                },
                {
                  icon: Award,
                  title: "Uvedení do provozu",
                  description: "Včetně zaškolení a předání dokumentace",
                  color: "bg-blue-500"
                },
                {
                  icon: Clock,
                  title: "Pravidelný servis",
                  description: "Prodloužení životnosti a optimální výkon",
                  color: "bg-blue-500"
                },
                {
                  icon: CheckCircle,
                  title: "Rychlé opravy",
                  description: "Servisní zásah do 7 dnů od nahlášení",
                  color: "bg-blue-500"
                },
                {
                  icon: Shield,
                  title: "Záruka a podpora",
                  description: "24 měsíců záruka + technická podpora",
                  color: "bg-blue-500"
                }
              ].map((service, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-xl mb-4 text-gray-900">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Types of Air Conditioning */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 mb-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-500">Typy klimatizací</h3>
                <p className="text-gray-600 text-lg">Nabízíme kompletní řadu klimatizačních systémů pro každou potřebu</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Split klimatizace",
                    description: "Nejoblíbenější řešení pro domácnosti",
                    features: ["Tichý provoz", "Energeticky úsporné", "Snadná instalace", "Dostupná cena"]
                  },
                  {
                    title: "Multi-split systémy",
                    description: "Jedna venkovní jednotka pro více místností",
                    features: ["Úspora místa", "Jednotné ovládání", "Flexibilní řešení", "Nižší provozní náklady"]
                  },
                  {
                    title: "VRV/VRF systémy",
                    description: "Pro komerční objekty a větší budovy",
                    features: ["Vysoký výkon", "Centrální řízení", "Zónové ovládání", "Profesionální řešení"]
                  },
                  {
                    title: "Centrální klimatizace",
                    description: "Pro velké objekty a administrativní budovy",
                    features: ["Komplexní řešení", "Vysoká účinnost", "Centrální monitoring", "Snadná údržba"]
                  }
                ].map((type, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-start mb-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{type.title}</h4>
                        <p className="text-gray-600 mb-4">{type.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {type.features.map((feature, featureIndex) => (
                            <span key={featureIndex} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Process */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Proces instalace krok za krokem</h3>
                <p className="text-blue-200 text-lg">Transparentní proces od první konzultace po uvedení do provozu</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { step: "Bezplatná konzultace", icon: "1" },
                  { step: "Cenová nabídka", icon: "2" },
                  { step: "Profesionální instalace", icon: "3" },
                  { step: "Uvedení do provozu", icon: "4" },
                  { step: "Pravidelný servis", icon: "5" }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 bg-white text-blue-500 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {item.icon}
                      </div>
                      {index < 4 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-400 -translate-y-0.5"></div>
                      )}
                    </div>
                    <p className="font-semibold text-sm leading-tight">{item.step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Potřebujete klimatizaci?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-200">
            Kontaktujte nás pro bezplatnou konzultaci. Připravíme vám nabídku přesně na míru.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-blue-500 hover:bg-blue-50">
              <Link href="#kontakt">Nezávazná poptávka</Link>
            </Button>
            <div className="flex items-center gap-3 text-lg">
              <span>nebo zavolejte:</span>
              <Link href="tel:+420123456789" className="font-bold hover:text-blue-200">
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
              title="Poptávka klimatizace"
              subtitle="Vyplňte formulář a my vám připravíme nabídku na míru vašich potřeb."
              source="klimatizace-page"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
