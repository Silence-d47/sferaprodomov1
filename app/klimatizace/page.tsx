// Importy zůstávají víceméně stejné, jen přidáme pár ikon pro nové designové prvky
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card" // Předpokládám, že tento komponent je již stylizovaný
import { ContactForm } from "@/components/ui/contact-form" // Použijeme náš nový, lepší formulář
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Quote,
  ChevronRight,
  Wrench,
  Users
} from "lucide-react"

// Důvody proč jsme nejlepší volba
const whyChooseUs = [
  { icon: Clock, title: "Montáž do 14 dnů", description: "Naše týmy jsou efektivní. Bez zbytečného čekání." },
  { icon: Users, title: "Certifikovaní technici", description: "Práci provádí pouze kvalifikovaní a proškolení odborníci." },
  { icon: Shield, title: "Záruka a rychlý servis", description: "Až 5 let záruka na vybrané modely a servisní zásah do 7 dnů." },
  { icon: CheckCircle, title: "Platba po realizaci", description: "U nás platíte až po dokončení práce a odzkoušení systému." },
]

// 8 nejprodávanějších modelů
const bestSellingModels = [
  {
    slug: 'daikin-emura-ftxj-ms',
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
    slug: 'mitsubishi-ln25vg',
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
    slug: 'lg-artcool-gallery',
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
    slug: 'panasonic-etherea',
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
    slug: 'fujitsu-asyg-keta',
    title: "Fujitsu ASYG-KETA",
    description: "Spolehlivá klimatizace s vynikajícím poměrem cena/výkon.",
    image: "/placeholder.svg?height=300&width=300&text=Fujitsu+KETA",
    features: ["Energetická třída A++", "DC Inverter", "Human sensor", "Tichý provoz", "Rychlá instalace"],
    catalogUrl: "/katalogy/fujitsu-keta.pdf",
  },
  {
    slug: 'toshiba-shorai-edge',
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
    slug: 'samsung-windfree',
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
    slug: 'gree-fairy',
    title: "Gree Fairy",
    description: "Elegantní klimatizace s vynikajícím poměrem cena/výkon.",
    image: "/placeholder.svg?height=300&width=300&text=Gree+Fairy",
    features: ["Energetická třída A++", "G10 Inverter", "WiFi modul", "Cold Plasma filtr", "Tichý provoz"],
    catalogUrl: "/katalogy/gree-fairy.pdf",
  },
]

// Ukázkové reference
const references = [
  {
    slug: 'rodinny-dum-opava',
    image: "/images/reference/rodinny-dum-opava.jpg",
    quote: "S firmou Sféra pro domov jsme byli maximálně spokojeni. Rychlá domluva, profesionální přístup a čistá práce. Klimatizace funguje skvěle a v létě je to k nezaplacení.",
    customer: "Rodina Novákova, Opava",
    project: "Instalace multisplit klimatizace"
  },
  {
    slug: 'kancelare-ostrava',
    image: "/images/reference/kancelare-ostrava.jpg",
    quote: "Potřebovali jsme vyřešit klimatizaci v našich nových kancelářích. Vše proběhlo hladce od návrhu až po realizaci. Technici byli ochotní a vše nám vysvětlili.",
    customer: "Firma ABC s.r.o., Ostrava",
    project: "Klimatizace pro komerční prostory"
  },
  {
    slug: 'byt-krnov',
    image: "/images/reference/byt-krnov.jpg",
    quote: "I v našem podkrovním bytě je teď v létě příjemně. Děkujeme za skvěle odvedenou práci a doporučujeme všem, kdo váhají.",
    customer: "Paní Svobodová, Krnov",
    project: "Nástěnná klimatizace do bytu"
  },
];

export default function KlimatizacePageRefined() {
  const primaryColor = "#2563EB"; // Vaše hlavní modrá (Tailwind blue-600) - pro konzistenci

  return (
    <div className="bg-white text-slate-800">
     <section className="relative h-[90vh] min-h-[600px] flex items-center text-white">
        <div className="absolute inset-0">
          <Image src="/images/klimatizace_hero.jpg" alt="Interiér s klimatizací" fill priority className="object-cover" />
          {/* Tmavší gradient pro výrazný kontrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10 container">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-white/10 border-white/30 text-white backdrop-blur-sm">
              Klimatizace pro váš domov i firmu
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
              Dokonalý komfort po celý rok
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
              Zajistíme profesionální návrh, instalaci a servis klimatizačních systémů. Rychle, spolehlivě a s prodlouženou zárukou.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Tlačítka s lepším kontrastem */}
              <Button size="lg" asChild className="bg-white text-blue-700 font-semibold hover:bg-blue-50 shadow-lg">
                <Link href="#kontakt">Získat nezávaznou nabídku</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/50 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                <Link href="#modely">Prohlédnout modely</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKCE PROČ MY (WHY CHOOSE US) --- */}
      <section className="py-20 sm:py-28 bg-slate-50/70">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proč si pro klimatizaci vybrat právě nás?</h2>
            <p className="text-lg text-slate-600">
              Kombinujeme rychlost, odbornost a férový přístup. Vaše spokojenost je pro nás na prvním místě.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason) => (
              <div key={reason.title} className="bg-white p-6 rounded-xl border border-slate-200/80 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-blue-100">
                    <reason.icon className="h-7 w-7 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

         {/* --- SEKCE NEJPRODÁVANĚJŠÍCH MODELŮ (OPRAVENO) --- */}
         <section id="modely" className="py-20 sm:py-28 bg-slate-50/70">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Naše nejprodávanější modely</h2>
            <p className="text-lg text-slate-600">
              Prohlédněte si výběr ověřených klimatizací od předních světových výrobců.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bestSellingModels.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <PDFDownloadButton
              url="/katalogy/klimatizace-kompletni-katalog.pdf"
              filename="sfera-klimatizace-katalog.pdf"
              title="Stáhnout kompletní katalog všech modelů"
            />
          </div>
        </div>
      </section>

      {/* --- SEKCE PROCES INSTALACE --- */}
      <section className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Od poptávky k pohodlí v 5 krocích</h2>
            <p className="text-lg text-slate-400">
              Náš proces je transparentní a navržený tak, aby pro vás byl co nejjednodušší a nejpohodlnější.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Spojovací čára pro desktop */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-700"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { step: "Nezávazná poptávka", icon: "1" },
                { step: "Konzultace a návrh", icon: "2" },
                { step: "Profesionální instalace", icon: "3" },
                { step: "Uvedení do provozu", icon: "4" },
                { step: "Záruka a servis", icon: "5" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:border-blue-500">
                    <span className="text-blue-400">{item.icon}</span>
                  </div>
                  <p className="font-semibold text-sm text-slate-300 leading-tight">{item.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

           {/* --- SEKCE REFERENCE (KOMPLETNĚ PŘEPRACOVÁNO) --- */}
           <section className="py-20 sm:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Co říkají naši zákazníci</h2>
            <p className="text-lg text-slate-600">
              Spokojenost našich klientů je pro nás nejlepší referencí. Podívejte se na ukázky naší práce.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {references.map((ref, index) => (
              <div key={index} className="bg-slate-50/70 rounded-2xl p-1 flex flex-col border border-slate-200/80">
                {/* Obrázek nahoře */}
                <div className="relative h-56 w-full">
                  <Image src={ref.image} alt={ref.project} layout="fill" objectFit="cover" className="rounded-t-2xl" />
                </div>
                {/* Textová část dole */}
                <div className="p-6 flex-grow flex flex-col">
                  <Quote className="w-8 h-8 text-blue-200 mb-4 flex-shrink-0" fill="currentColor" />
                  <p className="text-slate-600 italic mb-6 flex-grow">"{ref.quote}"</p>
                  <div className="mt-auto pt-5 border-t border-slate-200">
                    <p className="font-bold text-slate-800">{ref.customer}</p>
                    <p className="text-sm text-slate-500">{ref.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100">
              <Link href="/reference">
                Zobrazit všechny realizace <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      
            

      {/* --- SEKCE KONTAKTNÍ FORMULÁŘ --- */}
      <section id="kontakt" className="py-20 sm:py-28 bg-slate-50/70">
        <div className="container">
          <ContactForm
            customHeading="Získejte nabídku na míru"
            source="klimatizace-page"
          />
        </div>
      </section>

    </div>
  )
}