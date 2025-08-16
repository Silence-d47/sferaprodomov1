import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/ui/contact-form4"
import { ThemeProvider } from "@/components/theme-provider"
import { ReferenceSlider } from "@/components/ui/reference-slider"
import { ProductCard } from "@/components/ui/product-card"
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { groq } from "next-sanity"
import { CustomPortableText } from "@/lib/sanity.portableText"
import { urlForImage } from "@/lib/sanity.image"
import { productsByCategoryWithFilesQuery } from "@/lib/sanity.queries"
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  Users, 
  Award,
  Sparkles,
  Wrench,
  Zap,
  Home,
  Building,
  Smartphone,
  Car,
  FileText,
  ArrowRight,
  Star,
  MapPin,
  Calendar,
  AlertTriangle,
  X,
  ToggleLeft,
  Minus,
  Phone,
  Mail,
  AirVent,
  Split,
  Shuffle,
  Building2,
  Quote
} from "lucide-react"

interface Product {
  _id: string;
  title: string;
  description: string;
  image: any; // Sanity vrací obrázek jako objekt
  features: string[];
  isRecommended?: boolean;
  catalogUrl: string; // Legacy field
  files?: Array<{
    _id: string;
    title: string;
    fileUrl: string;
    fileType: string;
  }>;
}

// Používáme importovaný dotaz z sanity.queries.ts

type TestimonialEntry = {
  clientName: string
  clientTitle?: string
  clientCompany?: string
  clientImageUrl?: string
  quote: string
  rating?: number
  location?: string
  dateCompleted?: string
}

const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive == true && service == "klimatizace"]
  | order(coalesce(order, 9999) asc, _createdAt desc)[0...9] {
    clientName,
    clientTitle,
    clientCompany,
    "clientImageUrl": clientImage.asset->url,
    quote,
    rating,
    location,
    dateCompleted
  }
`

type FaqEntry = {
  question: string
  answer: any
}

const faqsQuery = groq`
  *[_type == "faq" && isActive == true && category in ["klimatizace", "obecne"]]
  | order(coalesce(order, 9999) asc, _createdAt asc) {
    question,
    answer
  }
`












// Důvody proč jsme nejlepší volba
const whyChooseUs = [
  { icon: Clock, title: "Montáž do 14 dnů", description: "Naše týmy jsou efektivní. Bez zbytečného čekání." },
  { icon: Users, title: "Certifikovaní technici", description: "Práci provádí pouze kvalifikovaní a proškolení odborníci." },
  { icon: Shield, title: "Záruka a rychlý servis", description: "Až 5 let záruka na vybrané modely a servisní zásah do 7 dnů." },
  { icon: CheckCircle, title: "Platba po realizaci", description: "U nás platíte až po dokončení práce a odzkoušení systému." },
]

// Typy klimatizací - nová sekce
const acTypes = [
  {
    icon: AirVent,
    title: " Monoblokové klimatizace",
    description: "Ideální pro prostoru, kde není možnost instalace venkovní jednotky.",
    advantages: [
      "Bez potřeby venkovní jednotky",
      "Vhodné pro oblastí, které jsou chráněné památkovými zákony",
      "Vyšší patra bytových domů bez balkonu"
    ]
  },
  {
    icon: Split,
    title: "Splitové klimatizace",
    description: "Ideální pro jednotlivé místnosti. Snadná instalace, nenáročný montážní zásah a rychlé chlazení/ohřev konkrétního prostoru.",
    advantages: [
      "Kazetové, podstropní, nástěnné a podparapetní varianty",
      "Rychlá instalace (1 den)",
      "Nízká hmotnost venkovní jednotky",
      "Možnost instalace do paneláku i rodinného domu",
      "Nejrozšířenější typ na trhu"
    ]
  },
  {
    icon: Shuffle,
    title: "Multisplitové klimatizace",
    description: "Jedna venkovní jednotka pro více vnitřních jednotek. Perfektní pro celý dům nebo byt s více místnostmi.",
    advantages: [
      "Ekonomické řešení pro více místností",
      "Možnost individuální regulace",
      "Jednodušší instalace (jedna venkovní jednotka a až pět vnitřních jednotek)",
      "Nižší provozní náklady"
    ]
  },
  {
    icon: Building2,
    title: "VRV/VRF systémy",
    description: "Pokročilé klimatizační systémy umožňují připojit větší množství vnitřních jednotek k jedné venkovní a nezávisle nastavit teplotu v každé místnosti.",
    advantages: [
      "Možnost připojit až 16 vnitřních jednotek",
      "Možnost individuální regulace",
      "Vhodné pro hotely, kanceláře, komerční prostory",
    ]
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

export default async function KlimatizacePageRefined() {
  // Import Sanity client inside the component
  const { client } = await import('@/lib/sanity.client')
  
  const [products, testimonials, faqs] = await Promise.all([
    client.fetch<Product[]>(productsByCategoryWithFilesQuery, { category: "klimatizace" }),
    client.fetch<TestimonialEntry[]>(testimonialsQuery),
    client.fetch<FaqEntry[]>(faqsQuery),
  ])

  const leftDynamicFaqs: FaqEntry[] = []
  const rightDynamicFaqs: FaqEntry[] = []
  faqs?.forEach((item, index) => {
    if (index % 2 === 0) leftDynamicFaqs.push(item)
    else rightDynamicFaqs.push(item)
  })

  return (
    <ThemeProvider theme="klimatizace">
      <div className="bg-white text-slate-800">
     <section className="relative h-[80vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center text-white">
        <div className="absolute inset-0">
          <Image src="/images/klimatizace_hero.jpg" alt="Interiér s klimatizací" fill priority className="object-cover" />
          {/* Tmavší gradient pro výrazný kontrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-black/70"></div>
        </div>
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-3 md:mb-4 bg-blue-500/40 text-blue-500 border-blue-500/30 text-white text-xs md:text-sm">
              Klimatizace pro váš domov i firmu
            </Badge>
            <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 leading-tight [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)]">
              Dokonalý komfort po celý rok
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
              Zajistíme profesionální návrh, instalaci a servis klimatizačních systémů. Rychle, spolehlivě a s prodlouženou zárukou.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Tlačítka s lepším kontrastem */}
              <Button size="lg" asChild className="bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-lg text-sm md:text-base py-3 md:py-4">
                <Link href="#kontakt">Získat nezávaznou nabídku</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-blue-500/50 bg-blue-500/10 text-white hover:bg-blue-100/50 backdrop-blur-sm text-sm md:text-base py-3 md:py-4">
                <Link href="#modely">Prohlédnout modely</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEKCE PROČ MY (WHY CHOOSE US) --- */}
      <section className="py-12 md:py-20 lg:py-28 bg-blue-50/70">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Proč si pro klimatizaci vybrat právě nás?</h2>
            <p className="text-base md:text-lg text-slate-600">
              Kombinujeme rychlost, odbornost a férový přístup. Vaše spokojenost je pro nás na prvním místě.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {whyChooseUs.map((reason) => (
              <div key={reason.title} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200/80 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="h-12 md:h-14 w-12 md:w-14 rounded-full flex items-center justify-center bg-blue-100">
                    <reason.icon className="h-6 md:h-7 w-6 md:w-7 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2">{reason.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

         {/* --- SEKCE TYPY KLIMATIZACÍ --- */}
         <section className="py-12 md:py-20 lg:py-28 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Jaký typ klimatizace je pro vás?</h2>
              <p className="text-base md:text-lg text-slate-600">
                Každý dům a každá místnost je jiná. Pomůžeme vám vybrat řešení, které bude přesně odpovídat vašim potřebám a možnostem.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {acTypes.map((type, index) => (
                <div key={index} className="bg-slate-50/70 rounded-xl md:rounded-2xl p-4 md:p-8 flex flex-col border border-slate-200/80 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="flex-shrink-0 h-10 md:h-16 w-10 md:w-16 rounded-full flex items-center justify-center bg-blue-500/10">
                      <type.icon className="h-5 md:h-8 w-5 md:w-8 text-blue-500" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold text-slate-800">{type.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 md:mb-6 flex-grow text-sm md:text-base">{type.description}</p>
                  <div className="space-y-2 md:space-y-3 mt-auto">
                    {type.advantages.map((advantage, idx) => (
                      <div key={idx} className="flex items-center text-xs md:text-sm">
                        <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-slate-700">{advantage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* --- SEKCE NEJPRODÁVANĚJŠÍCH MODELŮ (OPRAVENO) --- */}
         <section id="modely" className="py-12 md:py-20 lg:py-28 bg-blue-50/70">
          <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Naše nejprodávanější modely</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Prohlédněte si výběr ověřených klimatizací od předních světových výrobců.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                title={product.title}
                description={product.description}
                image={product.image ? urlForImage(product.image).url() : "/placeholder.svg"}
                features={product.features || []}
                isRecommended={product.isRecommended}
                catalogUrl={product.catalogUrl}
                files={product.files}
              />
            ))}
            </div>
          <div className="mt-8 md:mt-16 text-center">
            <PDFDownloadButton
              url="/katalogy/klimatizace-kompletni-katalog.pdf"
              filename="sfera-klimatizace-katalog.pdf"
              title="Stáhnout kompletní katalog všech modelů"
            />
          </div>
        </div>
      </section>

      {/* --- SEKCE PROCES INSTALACE --- */}
      <section className="py-12 md:py-20 lg:py-28 bg-blue-200/90 text-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Od poptávky k pohodlí v 5 krocích</h2>
            <p className="text-base md:text-lg text-slate-800/90">
              Náš proces je transparentní a navržený tak, aby pro vás byl co nejjednodušší a nejpohodlnější.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Spojovací čára pro desktop */}
            <div className="hidden md:block absolute top-6 md:top-8 left-0 w-full h-0.5 bg-slate-700"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 relative">
              {[
                { step: "Nezávazná poptávka", icon: "1" },
                { step: "Konzultace a návrh", icon: "2" },
                { step: "Profesionální instalace", icon: "3" },
                { step: "Uvedení do provozu", icon: "4" },
                { step: "Záruka a servis", icon: "5" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-12 md:w-16 h-12 md:h-16 bg-slate-800 border-2 border-slate-800/90 rounded-full flex items-center justify-center font-bold text-lg md:text-xl mx-auto mb-3 md:mb-4 transition-all duration-300 group-hover:border-blue-500">
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <p className="font-semibold text-xs md:text-sm text-slate-800/90 leading-tight">{item.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

           {/* --- SEKCE REFERENCE (KOMPLETNĚ PŘEPRACOVÁNO) --- */}
           <section className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Co říkají naši zákazníci</h2>
            <p className="text-base md:text-lg text-slate-600">
              Spokojenost našich klientů je pro nás nejlepší referencí. Podívejte se na ukázky naší práce.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {(testimonials && testimonials.length > 0 ? testimonials : []).map((t, index) => (
              <div key={`t-${index}`} className="bg-slate-50/70 rounded-xl md:rounded-2xl p-1 flex flex-col border border-slate-200/80">
                <div className="relative w-full overflow-hidden aspect-[5/4]">
                  <Image src={t.clientImageUrl || "/placeholder.svg"} alt={t.clientName} fill className="object-cover rounded-t-xl md:rounded-t-2xl" />
                </div>
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <Quote className="w-6 md:w-8 h-6 md:h-8 text-blue-200 mb-3 md:mb-4 flex-shrink-0" fill="currentColor" />
                  <p className="text-slate-600 italic mb-4 md:mb-6 flex-grow text-sm md:text-base">"{t.quote}"</p>
                  <div className="mt-auto pt-3 md:pt-5 border-t border-slate-200">
                    <p className="font-bold text-slate-800 text-sm md:text-base">{t.clientName}{t.clientTitle ? `, ${t.clientTitle}` : ""}</p>
                    <p className="text-xs md:text-sm text-slate-500">{t.clientCompany || t.location || ""}</p>
                  </div>
                </div>

                {leftDynamicFaqs && leftDynamicFaqs.map((item, idx) => (
                  <div key={`faq-left-${idx}`} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-blue-500">{item.question}</h3>
                        <div className="prose prose-sm max-w-none text-slate-700">
                          <CustomPortableText value={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            ))}

            {(!testimonials || testimonials.length === 0) && references.map((ref, index) => (
              <div key={`r-${index}`} className="bg-slate-50/70 rounded-xl md:rounded-2xl p-1 flex flex-col border border-slate-200/80">
                <div className="relative w-full overflow-hidden aspect-[5/4]">
                  <Image src={ref.image} alt={ref.project} fill className="object-cover rounded-t-xl md:rounded-t-2xl" />
                </div>
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <Quote className="w-6 md:w-8 h-6 md:h-8 text-blue-200 mb-3 md:mb-4 flex-shrink-0" fill="currentColor" />
                  <p className="text-slate-600 italic mb-4 md:mb-6 flex-grow text-sm md:text-base">"{ref.quote}"</p>
                  <div className="mt-auto pt-3 md:pt-5 border-t border-slate-200">
                    <p className="font-bold text-slate-800 text-sm md:text-base">{ref.customer}</p>
                    <p className="text-xs md:text-sm text-slate-500">{ref.project}</p>
                  </div>
                </div>

                {rightDynamicFaqs && rightDynamicFaqs.map((item, idx) => (
                  <div key={`faq-right-${idx}`} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-blue-500">{item.question}</h3>
                        <div className="prose prose-sm max-w-none text-slate-700">
                          <CustomPortableText value={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-16">
            <Button asChild size="lg" variant="outline" className="border-slate-300 hover:bg-slate-100 text-sm md:text-base">
              <Link href="/reference">
                Zobrazit všechny realizace <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      
            

      {/* FAQ - Modernized */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-24 md:w-32 h-24 md:h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-32 md:w-40 h-32 md:h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <Badge className="bg-blue-100 text-blue-800 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm">
                Otázky a odpovědi
              </Badge>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-900 to-blue-900 bg-clip-text text-transparent">
              Často kladené otázky
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Vše co potřebujete vědět o klimatizacích - odpovědi od expertů
            </p>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mt-4 md:mt-8"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
              {/* Levý sloupec */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="w-6 md:w-8 h-6 md:h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3 text-blue-900/90">Jak klimatizace funguje?</h3>  
                      <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
                        Klimatizace odvádí teplo z interiéru do exteriéru pomocí chladiva:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mr-2 md:mr-3" />
                          <span className="text-xs md:text-sm">Vnitřní jednotka nasává teplý vzduch z místnosti</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mr-2 md:mr-3" />
                          <span className="text-xs md:text-sm">Chladivo vnitřní jednotky absorbujte teplo</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mr-2 md:mr-3" />
                          <span className="text-xs md:text-sm">Kompresor stlačuje chladivo a zvyšuje jeho teplotu</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 md:h-5 w-4 md:w-5 text-blue-500 mr-2 md:mr-3" />
                          <span className="text-xs md:text-sm">Venkovní jednotka odvádí teplo ven</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Jaký je rozdíl mezi split a multisplit systémem?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="font-medium text-blue-700 mb-1">Split systém</p>
                          <ul className="text-sm space-y-1">
                            <li>• Jedna vnitřní a venkovní jednotka</li>
                            <li>• Ideální pro jednu místnost</li>
                            <li>• Nižší investice</li>
                            <li>• Snadná instalace</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="font-medium text-blue-700 mb-1">Multisplit systém</p>
                          <ul className="text-sm space-y-1">
                            <li>• Jedna venkovní a více vnitřních jednotek</li>
                            <li>• Ideální pro více místností</li>
                            <li>• Úspora na venkovních jednotkách</li>
                            <li>• Centrální ovládání</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Jak často je potřeba údržba klimatizace?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                          <span><strong>servis a dezinfekce:</strong> 1-2x ročně</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                          <span><strong>Čištění vnitřní jednotky:</strong> 1x ročně</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                          <span><strong>Servis venkovní jednotky:</strong> 1x ročně</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pravidelná údržba zahrnuje dezinfekci, diagnostiku, tlakové zkoušky a čištění. Tím je zajištěna efektivita a dlouhá životnost klimatizace.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Lze klimatizaci kombinovat s jinými systémy?</h3>
                      <p className="text-muted-foreground mb-4">
                        Ano, klimatizace lze kombinovat s různými systémy:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-blue-500 mr-2" />
                          <span>FV panely</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Nabíječky elektromobilů</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Rekuperace</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-blue-500 mr-2" />
                          <span>Podlahové vytápění</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pravý sloupec */}
              <div className="space-y-6">

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Jaký je energetický štítek klimatizace?</h3>
                      <p className="text-muted-foreground mb-4">
                        Energetický štítek označuje účinnost klimatizace:
                      </p>
                      <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Třída A+++:</span>
                          <span className="text-blue-500 font-bold">Nejúčinnější*</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Třída A++:</span>
                          <span className="text-blue-500 font-bold">Nejúčinnější</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Třída A+:</span>
                          <span className="text-blue-500 font-bold">Velmi účinná</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Třída A:</span>
                          <span className="text-blue-500 font-bold">Účinná</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
*A+++ třída u klimatizací bývá často kombinovaná i s topením. V takovém případě je možné čerpat státní dotace 'Nová zelená úsporám'.                       </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Je klimatizace hlučná?</h3>
                      <p className="text-muted-foreground mb-4">
                        Moderní klimatizace jsou tiché:
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Vnitřní jednotka:</span>
                          <span className="text-blue-500 font-bold">17-30 dB(A)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium">Venkovní jednotka:</span>
                          <span className="text-blue-500 font-bold">45-55 dB(A)</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Pro srovnání: normální konverzace = 60 dB(A), tichý šepot = 30 dB(A)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-900/90 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-blue-900/90">Jaká je záruka na klimatizace?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="font-medium">Práce a montáž:</span>
                          <span className="text-green-600 font-bold">až 5 let</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span className="font-medium">Jednotky:</span>
                          <span className="text-blue-600 font-bold">dle výrobce (3-7 let)</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        V případě akutní poruchy jsme k dispozici 24/7. Záruka je na všechny práce a materiály.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </ThemeProvider>
  )
}