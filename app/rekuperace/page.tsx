// Importy inspirované moderním designem
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card" 
import { ContactForm } from "@/components/ui/contact-form3" 
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { client } from "@/lib/sanity.client"
import { groq } from "next-sanity"
import { CustomPortableText } from "@/lib/sanity.portableText"
import { urlForImage } from "@/lib/sanity.image"
import { 
  Shield, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Quote,
  ChevronRight,
  Wind,      // Pro čerstvý vzduch
  Heart,     // Pro zdraví
  Droplets,  // Pro vlhkost
  Wallet,    // Pro úspory
  Users,
  Home,
  Building,
  Factory,
  Wrench
} from "lucide-react"

// Import pro dynamické barvy

// Důvody, proč si vybrat rekuperaci (v novém stylu)
const whyChooseUs = [
  { icon: Heart, title: "Zdravější bydlení", description: "Filtrovaný vzduch bez alergenů, prachu a pylu pro celou rodinu." },
  { icon: Wallet, title: "Úspora nákladů až 30 %", description: "Rekuperace tepla výrazně snižuje náklady na vytápění v zimě." },
  { icon: Droplets, title: "Konec plísní a vlhkosti", description: "Efektivně odvádí vlhkost a brání vzniku plísní a rosení oken." },
  { icon: Wind, title: "Komfort bez kompromisů", description: "Stále čerstvý vzduch bez nutnosti větrání, průvanu a hluku z ulice." },
]

// Typy rekuperačních systémů
const recuperationTypes = [
  {
    icon: Home,
    title: "Centrální rekuperace",
    description: "Jedna centrální jednotka zajišťuje větrání celého domu či bytu pomocí systému rozvodů vzduchu. Ideální pro novostavby.",
    advantages: ["Nejvyšší účinnost a komfort", "Tichý provoz", "Komplexní řešení", "Možnost chlazení a vlhčení"],
  },
  {
    icon: Building,
    title: "Decentralizovaná rekuperace",
    description: "Jednotlivé jednotky se instalují přímo do obvodových zdí konkrétních místností. Vhodné pro rekonstrukce a byty.",
    advantages: ["Jednoduchá instalace bez potrubí", "Nižší pořizovací náklady", "Řešení pro jednotlivé místnosti", "Flexibilita"],
  },
  {
    icon: Factory,
    title: "Komerční a průmyslová",
    description: "Výkonné systémy navržené pro kanceláře, restaurace, školy a výrobní haly, kde je kladen důraz na velký objem výměny vzduchu.",
    advantages: ["Vysoký vzduchový výkon", "Robustní a spolehlivá konstrukce", "Splnění hygienických norem", "Výrazná úspora provozních nákladů"],
  }
]

// 8 nejprodávanějších modelů (data ponechána, upraveny slugy pro URL)
const bestSellingModels = [
  {
    slug: 'zehnder-comfoair-q350',
    title: "Zehnder ComfoAir Q350",
    description: "Prémiová jednotka s nejvyšší účinností rekuperace tepla a vlhkosti na trhu.",
    image: "/placeholder.svg?height=300&width=300&text=Zehnder+Q350",
    features: ["Účinnost až 96%", "Entalpický výměník", "Ovládání přes aplikaci", "Letní bypass", "Extrémně tichý provoz"],
    isRecommended: true,
    catalogUrl: "/katalogy/zehnder-comfoair.pdf",
  },
  {
    slug: 'atrea-duplex-ecv5',
    title: "Atrea Duplex ECV5",
    description: "Osvědčená česká kvalita s vysokou účinností a pokročilou regulací.",
    image: "/placeholder.svg?height=300&width=300&text=Atrea+Duplex",
    features: ["Účinnost až 93%", "Regulace RD5", "Protiproudý výměník", "Týdenní program", "Snadná údržba"],
    catalogUrl: "/katalogy/atrea-duplex.pdf",
  },
  {
    slug: 'jablotron-futura',
    title: "Jablotron Futura",
    description: "Inteligentní rekuperace s možností chlazení a řízením podle CO₂.",
    image: "/placeholder.svg?height=300&width=300&text=Jablotron+Futura",
    features: ["Aktivní rekuperace s TČ", "Chlazení v létě", "Aplikace MyJablotron", "CO₂ čidla v ceně", "Kompaktní rozměry"],
    catalogUrl: "/katalogy/jablotron-futura.pdf",
  },
  {
    slug: 'systemair-save-vtr-300',
    title: "Systemair SAVE VTR 300",
    description: "Švédská spolehlivost s rotačním výměníkem, ideální do chladných podmínek.",
    image: "/placeholder.svg?height=300&width=300&text=Systemair+SAVE",
    features: ["Rotační výměník tepla", "Účinnost až 86%", "Vestavěný vlhkostní senzor", "Modbus komunikace", "Robustní konstrukce"],
    catalogUrl: "/katalogy/systemair-save.pdf",
  },
]

// Ukázkové reference pro rekuperaci
const references = [
  {
    slug: 'novostavba-olomouc-rekuperace',
    image: "/images/reference/novostavba-olomouc.jpg",
    quote: "V naší nové dřevostavbě byla rekuperace nutností. Tým ze Sféry pro domov odvedl perfektní práci od projektu až po realizaci. Doma máme stále čerstvý vzduch a v zimě jsme výrazně ušetřili na topení.",
    customer: "Rodina Novotných, Olomouc",
    project: "Instalace centrální rekuperace Zehnder"
  },
  {
    slug: 'rekonstrukce-bytu-ostrava',
    image: "/images/reference/byt-ostrava-rekuperace.jpg",
    quote: "Měli jsme v bytě problém s plísní a vlhkostí. Po instalaci decentrální rekuperace se vše vyřešilo. Technici byli rychlí, čistotní a vše nám skvěle vysvětlili. Velká spokojenost.",
    customer: "Paní Králová, Ostrava",
    project: "Instalace decentrální rekuperace"
  },
  {
    slug: 'kancelare-frydek-mistek',
    image: "/images/reference/kancelare-frydek-mistek.jpg",
    quote: "Pro naše nové kanceláře jsme potřebovali zajistit kvalitní vzduch pro zaměstnance. Rekuperační systém funguje skvěle, je tichý a v létě oceňujeme i možnost nočního předchlazení.",
    customer: "IT Firma s.r.o., Frýdek-Místek",
    project: "Komerční rekuperace pro kanceláře"
  },
];

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
  *[_type == "testimonial" && isActive == true && service == "rekuperace"]
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
  *[_type == "faq" && isActive == true && category in ["rekuperace", "obecne"]]
  | order(coalesce(order, 9999) asc, _createdAt asc) {
    question,
    answer
  }
`

export default async function RekuperacePageRefined() {
  const [testimonials, faqs] = await Promise.all([
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
    <ThemeProvider theme="rekuperace">
      <div className="bg-white text-purple-800">
        <section className="relative h-[70vh] md:h-[90vh] min-h-[500px] md:min-h-[600px] flex items-center text-white">
          <div className="absolute inset-0">
            <Image src="/images/rekuperace.webp" alt="Interiér s vývodem rekuperace" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-transparent to-black"></div>
          </div>
          <div className="relative z-10 container px-4 md:px-6">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-4 md:mb-6 bg-purple-900/10 border-purple-900/30 text-white text-xs md:text-sm">
                Řízené větrání s rekuperací tepla
              </Badge>
              <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-4 leading-tight [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)] text-white-70">
                Dýchejte doma zdravě a čistě
              </h1>
              <p className="text-base md:text-xl text-white mb-6 md:mb-8 max-w-2xl [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Zajistíme vám stálý přísun čerstvého, filtrovaného vzduchu bez ztráty tepla. Řekněte sbohem alergenům, vlhkosti a plísním.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button size="lg" asChild className="bg-white text-violet-900 font-semibold hover:bg-white/40 shadow-lg text-sm md:text-base">
                  <Link href="#kontakt">Získat nezávaznou nabídku</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-purple-900/50 bg-white/10 text-purple-200 hover:bg-white/20 backdrop-blur-sm text-sm md:text-base">
                  <Link href="#modely">Prohlédnout jednotky</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-28 bg-slate-50/70">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Proč je rekuperace klíčová pro moderní bydlení?</h2>
              <p className="text-base md:text-lg text-slate-600">
                V dnešních utěsněných domech je řízené větrání jediný způsob, jak zajistit zdravé a komfortní prostředí.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {whyChooseUs.map((reason) => (
                <div key={reason.title} className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-purple-200/80 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="h-12 md:h-14 w-12 md:w-14 rounded-full flex items-center justify-center bg-purple-200">
                      <reason.icon className="h-6 md:h-7 w-6 md:w-7 text-purple-800" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-purple-800 mb-2">{reason.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 lg:py-28 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Jaký systém rekuperace je pro vás?</h2>
              <p className="text-base md:text-lg text-slate-600">
                Ať už stavíte nový dům, rekonstruujete byt, nebo vybavujete kancelář, máme pro vás ideální řešení.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              {recuperationTypes.map((type, index) => (
                <div key={index} className="bg-purple-50/70 rounded-xl md:rounded-2xl p-4 md:p-8 flex flex-col border border-purple-200/80 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="flex-shrink-0 h-12 md:h-16 w-12 md:w-16 rounded-full flex items-center justify-center bg-purple-200">
                            <type.icon className="h-6 md:h-8 w-6 md:w-8 text-purple-800" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold text-slate-800">{type.title}</h3>
                    </div>
                    <p className="text-slate-600 mb-4 md:mb-6 flex-grow text-sm md:text-base">{type.description}</p>
                    <div className="space-y-2 md:space-y-3 mt-auto">
                      {type.advantages.map((advantage, idx) => (
                        <div key={idx} className="flex items-center text-xs md:text-sm">
                          <CheckCircle className="h-5 w-5 text-purple-800 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="modely" className="py-12 md:py-20 lg:py-28 bg-muted/70">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Naše nejprodávanější rekuperační jednotky</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Nabízíme výběr prověřených jednotek od předních evropských výrobců, které zaručují vysokou účinnost a spolehlivos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {(await client.fetch<any[]>(
                groq`*[_type == "product" && category->slug.current == "rekuperace" && isBestSelling == true] | order(_createdAt desc)[0...12] {
                  title,
                  description,
                  image,
                  features,
                  isRecommended,
                  catalogUrl
                }`
              )).map((p, idx, arr) => (
                <ProductCard
                  key={`best-rek-${idx}`}
                  title={p.title}
                  description={p.description || ""}
                  image={p.image ? urlForImage(p.image).url() : "/placeholder.svg"}
                  features={p.features || []}
                  isRecommended={Boolean(p.isRecommended)}
                  catalogUrl={p.catalogUrl || "#"}
                />
              ))}
              {/** Fallback na hardcoded, pokud by query vrátilo prázdno */}
              {(await client.fetch<number>(groq`count(*[_type == "product" && category->slug.current == "rekuperace" && isBestSelling == true])`)) === 0 &&
                bestSellingModels.map((product, index) => (
                  <ProductCard key={`best-fb-${index}`} {...product} />
                ))}
            </div>
            <div className="mt-8 md:mt-16 text-center">
              <PDFDownloadButton
                url="/katalogy/rekuperace-kompletni-katalog.pdf"
                filename="sfera-rekuperace-katalog.pdf"
                title="Stáhnout kompletní katalog"
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-28 bg-purple-100/50 text-black">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-black">Od návrhu po čistý vzduch v 5 krocích</h2>
              <p className="text-base md:text-lg text-black">
                Náš proces je transparentní a navržený tak, aby pro vás byl co nejjednodušší a nejpohodlnější.
              </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-violet-700"></div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 relative">
                {[
                  { step: "Poptávka a analýza", icon: "1" },
                  { step: "Projekt a návrh", icon: "2" },
                  { step: "Cenová nabídka", icon: "3" },
                  { step: "Odborná montáž", icon: "4" },
                  { step: "Regulace a servis", icon: "5" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-12 md:w-16 h-12 md:h-16 bg-purple-800 border-2 border-purple-700 rounded-full flex items-center justify-center font-bold text-lg md:text-xl mx-auto mb-3 md:mb-4 transition-all duration-300 group-hover:border-primary">
                      <span className="text-white/90">{item.icon}</span>
                    </div>
                    <p className="font-semibold text-xs md:text-sm text-black leading-tight">{item.step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 lg:py-28 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Co říkají naši zákazníci</h2>
              <p className="text-base md:text-lg text-black">
                Spokojenost našich klientů je pro nás nejlepší referencí. Podívejte se na ukázky naší práce.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              {(testimonials && testimonials.length > 0 ? testimonials : []).map((t, index) => (
                <div key={`t-${index}`} className="bg-slate-50/70 rounded-xl md:rounded-2xl p-1 flex flex-col border border-slate-200/80">
                  <div className="relative h-48 md:h-56 w-full">
                    <Image src={t.clientImageUrl || "/placeholder.svg"} alt={t.clientName} fill className="object-cover rounded-t-xl md:rounded-t-2xl" />
                  </div>
                  <div className="p-4 md:p-6 flex-grow flex flex-col">
                    <Quote className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0" fill="currentColor" />
                    <p className="text-slate-600 italic mb-6 flex-grow">"{t.quote}"</p>
                    <div className="mt-auto pt-5 border-t border-slate-200">
                      <p className="font-bold text-slate-800">{t.clientName}{t.clientTitle ? `, ${t.clientTitle}` : ""}</p>
                      <p className="text-sm text-slate-500">{t.clientCompany || t.location || ""}</p>
                    </div>
                  </div>
                </div>
              ))}

              {(!testimonials || testimonials.length === 0) && references.map((ref, index) => (
                <div key={`r-${index}`} className="bg-slate-50/70 rounded-xl md:rounded-2xl p-1 flex flex-col border border-slate-200/80">
                  <div className="relative h-48 md:h-56 w-full">
                    <Image src={ref.image} alt={ref.project} fill className="object-cover rounded-t-xl md:rounded-t-2xl" />
                  </div>
                  <div className="p-4 md:p-6 flex-grow flex flex-col">
                    <Quote className="w-8 h-8 text-primary/20 mb-4 flex-shrink-0" fill="currentColor" />
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

        <section className="py-20 sm:py-28 bg-purple-50/70">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Jak funguje rekuperace?</h2>
              <p className="text-lg text-slate-600">
                Pochopte principy řízeného větrání s rekuperací tepla a zjistěte, proč je to nejefektivnější způsob větrání moderních domů.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Přívod čerstvého vzduchu</h3>
                      <p className="text-slate-600">
                        Venkovní vzduch je nasáván do rekuperační jednotky, kde prochází filtrací. Hrubé nečistoty, pyl a alergeny jsou zachyceny ve filtrech.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Výměna tepla</h3>
                      <p className="text-slate-600">
                        V tepelném výměníku se setkávají proudy čerstvého a odpadního vzduchu. Teplo z teplého odpadního vzduchu se předává studenému čerstvému vzduchu - aniž by se proudy smíchaly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Distribuce vzduchu</h3>
                      <p className="text-slate-600">
                        Předehřátý čerstvý vzduch je rozváděn do obytných místností (obývák, ložnice), zatímco odpadní vzduch je odsáván z vlhkých prostor (koupelna, kuchyň).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-900 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Odvod odpadního vzduchu</h3>
                      <p className="text-slate-600">
                        Spotřebovaný vzduch je po předání tepla vyveden ven. Díky rekuperaci se ztratí pouze 5-15% tepla místo 100% při klasickém větrání okny.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-3">Klíčové výhody procesu:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-5 w-5 text-purple-800 mr-2 flex-shrink-0" />
                      <span>Úspora tepla až 95%</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-5 w-5 text-purple-800 mr-2 flex-shrink-0" />
                      <span>Filtrovaný vzduch</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-5 w-5 text-purple-800 mr-2 flex-shrink-0" />
                      <span>Konstantní teplota</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-5 w-5 text-purple-800 mr-2 flex-shrink-0" />
                      <span>Kontrola vlhkosti</span>
                    </div>
                  </div>
                </div>

                {rightDynamicFaqs && rightDynamicFaqs.map((item, idx) => (
                  <div key={`faq-right-${idx}`} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">{item.question}</h3>
                        <div className="prose prose-sm max-w-none text-slate-700">
                          <CustomPortableText value={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-purple-800 mb-4">Princip rekuperace tepla</h4>
                    </div>
                    
                    {/* Schematické znázornění */}
                    <div className="relative">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="bg-blue-100 rounded-lg p-4 mb-2">
                            <Wind className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-blue-800">Čerstvý vzduch</p>
                            <p className="text-xs text-blue-600">-5°C → +18°C</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-red-100 rounded-lg p-4 mb-2">
                            <Wind className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-red-800">Odpadní vzduch</p>
                            <p className="text-xs text-red-600">+22°C → +2°C</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-primary/10 rounded-lg p-4">
                          <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm font-semibold text-slate-800">Tepelný výměník</p>
                          <p className="text-xs text-slate-600">Účinnost až 96%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
                        Úspora energie: 85-95%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Modernized */}
        <section className="py-20 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">?</span>
                </div>
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                  FAQ
                </Badge>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-purple-900 bg-clip-text text-transparent">
                Často kladené otázky
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Vše co potřebujete vědět o rekuperačních systémech - odpovědi od expertů
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-900 to-purple-700 mx-auto mt-8"></div>
            </div>


         
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Levý sloupec */}
         
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Jak rekuperace funguje a jaký má princip?</h3>
                        <p className="text-muted-foreground mb-4">
                          Rekuperace je systém řízeného větrání s využitím tepla odpadního vzduchu. Princip je jednoduchý:
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span>Čerstvý vzduch z venku je přiváděn do interiéru</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span>Odpadní vzduch z interiéru je odváděn ven</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span>V tepelném výměníku dochází k předání tepla mezi proudy</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span>Čerstvý vzduch se předehřeje a odpadní se předchlazuje</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Jaká je účinnost rekuperace?</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                            <span className="font-medium">Průměrná účinnost:</span>
                            <span className="text-purple-900 font-bold">85-95%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                            <span className="font-medium">Prémiové modely:</span>
                            <span className="text-purple-900 font-bold">až 96%</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Účinnost závisí na kvalitě výměníku a regulace. Moderní jednotky dokážou zachytit až 96% tepla z odpadního vzduchu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Kdy je nutná údržba rekuperace?</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span><strong>Filtry:</strong> 3-6 měsíců</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span><strong>Výměník:</strong> 1x ročně</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-purple-900 mr-3" />
                            <span><strong>Ventilátory:</strong> Kontrola 1x ročně</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Pravidelná údržba zajišťuje maximální účinnost a životnost systému.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Lze rekuperaci kombinovat s jinými systémy?</h3>
                        <p className="text-muted-foreground mb-4">
                          Ano, rekuperaci lze kombinovat s různými systémy:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <Wrench className="h-4 w-4 text-purple-900 mr-2" />
                            <span>FV panely</span>
                          </div>
                          <div className="flex items-center">
                            <Wrench className="h-4 w-4 text-purple-900 mr-2" />
                            <span>Nabíječky elektromobilů</span>
                          </div>
                          <div className="flex items-center">
                            <Wrench className="h-4 w-4 text-purple-900 mr-2" />
                            <span>Podlahové vytápění</span>
                          </div>
                          <div className="flex items-center">
                            <Wrench className="h-4 w-4 text-purple-900 mr-2" />
                            <span>Chladící systémy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {leftDynamicFaqs && leftDynamicFaqs.map((item, idx) => (
                  <div key={`faq-left-${idx}`} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">{item.question}</h3>
                        <div className="prose prose-sm max-w-none text-slate-700">
                          <CustomPortableText value={item.answer} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                </div>

                {/* Pravý sloupec */}
                <div className="space-y-6">

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Jaký je rozdíl mezi centrální a decentrální rekuperací?</h3>
                        <div className="space-y-3 mb-4">
                          <div className="p-3 bg-purple-50 rounded">
                            <p className="font-medium text-purple-700 mb-1">Centrální rekuperace</p>
                            <ul className="text-sm space-y-1">
                              <li>• Jedna jednotka pro celý dům</li>
                              <li>• Potrubní systém ve zdech</li>
                              <li>• Ideální pro novostavby</li>
                              <li>• Vyšší účinnost</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-purple-50 rounded">
                            <p className="font-medium text-purple-700 mb-1">Decentrální rekuperace</p>
                            <ul className="text-sm space-y-1">
                              <li>• Jednotky v obvodových stěnách</li>
                              <li>• Bez potrubí</li>
                              <li>• Vhodné pro rekonstrukce</li>
                              <li>• Nižší investice</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Jak hlásí rekuperace?</h3>
                        <p className="text-muted-foreground mb-4">
                          Moderní rekuperační jednotky jsou extrémně tiché:
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                            <span className="font-medium">Průměrný provoz:</span>
                            <span className="text-purple-900 font-bold">25-35 dB(A)</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                            <span className="font-medium">V noci:</span>
                            <span className="text-purple-900 font-bold">19-25 dB(A)</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-3">
                          Pro srovnání: normální konverzace = 60 dB(A), tichý šepot = 30 dB(A)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-900">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        Q
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-3 text-purple-900">Jaká je záruka na rekuperační systémy?</h3>
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                            <span className="font-medium">Práce a montáž:</span>
                            <span className="text-green-600 font-bold">5 let</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                            <span className="font-medium">Jednotky:</span>
                            <span className="text-blue-600 font-bold">dle výrobce (5-10 let)</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          V případě jakýchkoli problémů jsme k dispozici 24/7. Záruka je na všechny práce a materiály.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="py-20 sm:py-28 bg-slate-50/70">
          <div className="container">
            <ContactForm
              customHeading="Získejte nabídku na míru"
              subtitle="Nechte nám na sebe kontakt a my se vám obratem ozveme. Navrhneme vám nejlepší řešení řízeného větrání pro váš dům či byt."
              source="rekuperace-page"
            />
          </div>
        </section>
      </div>
    </ThemeProvider>
  )
}