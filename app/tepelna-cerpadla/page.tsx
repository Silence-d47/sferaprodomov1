// Importy inspirované stránkou pro klimatizace, přizpůsobené pro tepelná čerpadla
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card" 
import { ContactForm } from "@/components/ui/contact-form2" 
import { PDFDownloadButton } from "@/components/ui/pdf-download-button"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { 
  Shield, 
  Clock, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Quote,
  ChevronRight,
  Sprout, // Ikonka pro ekologii
  TrendingUp, // Ikonka pro úspory
  Users,
  Fan,
  Waves,
  Mountain,
  Wrench
} from "lucide-react"

// Důvody, proč si vybrat právě nás (v novém stylu)
const whyChooseUs = [
  { icon: TrendingUp, title: "Úspora nákladů až 75 %", description: "Drasticky snížíme vaše účty za energie oproti plynu či elektřině." },
  { icon: Users, title: "Certifikovaní experti", description: "Instalace provádí pouze proškolení odborníci s dlouholetou praxí." },
  { icon: Sprout, title: "Dotace a prodloužená záruka", description: "Pomůžeme vám s dotací 'Nová zelená úsporám' a nabízíme záruku až 7 let." },
  { icon: Clock, title: "Rychlá realizace", description: "Od návrhu po spuštění systému do několika týdnů, bez zbytečného čekání." },
]

// Typy tepelných čerpadel (vylepšená sekce)
const heatPumpTypes = [
  {
    icon: Fan,
    title: "Vzduch-vzduch",
    description: "Čerpá energii z venkovního vzduchu a předává ji přímo do interiéru. V létě funguje jako výkonná klimatizace.",
    advantages: [
      "Nejnižší pořizovací náklady",
      "Velmi rychlá a snadná instalace",
      "Možnost chlazení v létě",
      "Ideální pro byty a menší objekty"
    ],
  },
  {
    icon: Waves,
    title: "Vzduch-voda",
    description: "Nejrozšířenější typ. Energii ze vzduchu převádí do vody v topném systému (radiátory, podlahové topení) a pro ohřev TUV.",
    advantages: [
      "Skvělý poměr cena/výkon",
      "Instalace bez nutnosti zemních prací",
      "Vhodné pro novostavby i rekonstrukce",
      "Nezabírá místo na pozemku"
    ],
  },
  {
    icon: Mountain,
    title: "Země-voda",
    description: "Využívá stabilní teplotu země pomocí vrtů nebo plošných kolektorů. Nabízí nejvyšší a nejstabilnější výkon.",
    advantages: [
      "Nejvyšší účinnost po celý rok",
      "Nezávislost na venkovní teplotě",
      "Velmi tichý provoz a dlouhá životnost",
      "Možnost pasivního chlazení"
    ],
  }
]

// 8 nejprodávanějších modelů tepelných čerpadel (data ponechána)
const bestSellingModels = [
    {
    slug: 'daikin-altherma-3-h-ht',
    title: "Daikin Altherma 3 H HT",
    description: "Vysoce účinné TČ vzduch-voda pro vytápění, chlazení a ohřev teplé vody.",
    image: "/placeholder.svg?height=300&width=300&text=Daikin+Altherma",
    features: ["Energetická třída A+++", "Provoz do -28°C", "Integrovaný zásobník TUV", "Bluevolution technologie", "Tichý provoz 35 dB(A)"],
    isRecommended: true,
    catalogUrl: "/katalogy/daikin-altherma.pdf",
  },
  {
    slug: 'mitsubishi-ecodan-zubadan',
    title: "Mitsubishi Ecodan Zubadan",
    description: "Revoluční technologie pro spolehlivý výkon i v extrémně nízkých teplotách.",
    image: "/placeholder.svg?height=300&width=300&text=Mitsubishi+Zubadan",
    features: ["Topí i při -28°C", "Udržuje výkon bez poklesu", "Flash Injection technologie", "MELCloud ovládání", "Hybridní možnosti"],
    catalogUrl: "/katalogy/mitsubishi-ecodan.pdf",
  },
  {
    slug: 'vaillant-arotherm-plus',
    title: "Vaillant aroTHERM plus",
    description: "Prémiové tepelné čerpadlo s přírodním chladivem a elegantním designem.",
    image: "/placeholder.svg?height=300&width=300&text=Vaillant+AroTherm",
    features: ["Přírodní chladivo R290", "Výstupní teplota až 75°C", "myVAILLANT aplikace", "Sound Safe System", "Energetická třída A+++"],
    catalogUrl: "/katalogy/vaillant-arotherm.pdf",
  },
  {
    slug: 'viessmann-vitocal-200-s',
    title: "Viessmann Vitocal 200-S",
    description: "Spolehlivé splitové TČ s pokročilým řízením Vitotronic a tichým provozem.",
    image: "/placeholder.svg?height=300&width=300&text=Viessmann+Vitocal",
    features: ["COP až 5,0", "Vitotronic 200 regulace", "ViCare aplikace", "Modulární konstrukce", "Tichý noční provoz"],
    catalogUrl: "/katalogy/viessmann-vitocal.pdf",
  },
   {
    slug: 'lg-therma-v-r32',
    title: "LG Therma V R32 Monoblok",
    description: "Kompaktní monoblokové řešení s ekologickým chladivem R32 a snadnou instalací.",
    image: "/placeholder.svg?height=300&width=300&text=LG+Therma+V",
    features: ["Chladivo R32", "R1 Compressor™", "LG ThinQ integrace", "Kompaktní rozměry", "Snadná instalace a údržba"],
    catalogUrl: "/katalogy/lg-therma-v.pdf",
  },
  {
    slug: 'panasonic-aquarea-t-cap',
    title: "Panasonic Aquarea T-CAP",
    description: "Inovativní technologie pro udržení maximálního výkonu i při nízkých teplotách.",
    image: "/placeholder.svg?height=300&width=300&text=Panasonic+Aquarea",
    features: ["T-CAP technologie", "Provoz do -28°C", "Aquarea Smart Cloud", "Hydromodul All in One", "Energetická třída A+++" ],
    catalogUrl: "/katalogy/panasonic-aquarea.pdf",
  },
  {
    slug: 'bosch-compress-7000i-aw',
    title: "Bosch Compress 7000i AW",
    description: "Prémiové tepelné čerpadlo s inteligentním řízením a vysokou účinností.",
    image: "/placeholder.svg?height=300&width=300&text=Bosch+Compress",
    features: ["Top design", "Inverterová technologie", "Bosch HomeCom Pro", "Hybridní připravenost", "Velmi tichý provoz"],
    catalogUrl: "/katalogy/bosch-compress.pdf",
  },
  {
    slug: 'stiebel-eltron-wpl-acs',
    title: "Stiebel Eltron WPL-A Premium",
    description: "Německá kvalita s pokročilými funkcemi, určená pro vytápění i chlazení.",
    image: "/placeholder.svg?height=300&width=300&text=Stiebel+Eltron",
    features: ["Inverterová technologie", "Internet Service Gateway", "Aktivní chlazení", "Kombinace s fotovoltaikou", "Tichý provoz"],
    catalogUrl: "/katalogy/stiebel-eltron.pdf",
  },
]

// Ukázkové reference pro tepelná čerpadla
const references = [
  {
    slug: 'rd-brno-venkov',
    image: "/images/reference/rd-brno-venkov.jpg",
    quote: "Přechod z elektrokotle na tepelné čerpadlo od Sféry pro domov byl nejlepší investicí. Úspory jsou obrovské a celý proces od návrhu po realizaci byl naprosto bezproblémový.",
    customer: "Rodina Dvořákova, Brno-venkov",
    project: "Instalace TČ vzduch-voda v novostavbě"
  },
  {
    slug: 'rekonstrukce-vysocina',
    image: "/images/reference/rekonstrukce-vysocina.jpg",
    quote: "Měli jsme starší dům a báli jsme se, jestli bude tepelné čerpadlo stačit. Technici vše skvěle navrhli a systém funguje perfektně i v mrazech na Vysočině. Doporučujeme!",
    customer: "Manželé Procházkovi, Vysočina",
    project: "Výměna kotle na tuhá paliva za TČ"
  },
  {
    slug: 'pasivni-dum-praha',
    image: "/images/reference/pasivni-dum-praha.jpg",
    quote: "Pro náš pasivní dům jsme chtěli to nejlepší. Zvolili jsme TČ země-voda a nemůžeme si ho vynachválit. Stabilní výkon, tichý provoz a minimální náklady. Skvělá práce.",
    customer: "Pan architekt Svoboda, Praha-východ",
    project: "Instalace TČ země-voda s vrtem"
  },
];

export default function TepelnaCerpadlaPageRefined() {
  return (
    <ThemeProvider theme="tepelna-cerpadla">
      <div className="bg-white text-slate-800">
      <section className="relative h-[90vh] min-h-[600px] flex items-center text-white">
        <div className="absolute inset-0">
          <Image src="/images/tepelne_cerpadlo_hero.jpg" alt="Dům s tepelným čerpadlem" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/90 via-transparent to-black"></div>
        </div>
        <div className="relative z-10 container">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4 bg-green-500/10 border-green-500/30 text-white">
              Tepelná čerpadla pro váš domov
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight [text-shadow:_0_3px_10px_rgb(0_0_0_/_70%)]">
              Ušetřete za energie až 75 %
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl [text-shadow:_0_4px_10px_rgb(0_0_0_/_70%)]">
              Zajistíme profesionální návrh, montáž a servis tepelných čerpadel. Využijte obnovitelnou energii a získejte dotaci až 130 000 Kč.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                              <Button size="lg" asChild className="bg-white text-green-700 font-semibold hover:bg-green-700/90 hover:text-white shadow-lg">
                <Link href="#kontakt">Získat nezávaznou nabídku</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/50 bg-white/10 text-green hover:bg-green-700/20 hover:text-green-30 sm">
                <Link href="#modely">Prohlédnout modely</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-green-50/70">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-700">Proč si pro tepelné čerpadlo vybrat nás?</h2>
            <p className="text-lg text-slate-600">
              Kombinujeme špičkovou technologii, odbornost a férový přístup. Vaše úspory a spokojenost jsou náš cíl.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason) => (
              <div key={reason.title} className="bg-white p-6 rounded-xl border border-slate-200/80 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="h-14 w-14 rounded-full flex items-center justify-center bg-green-700/10">
                    <reason.icon className="h-7 w-7 text-green-700" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-700 mb-2">{reason.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- NOVÁ SEKCE TYPY TEPELNÝCH ČERPADEL --- */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Jaký typ tepelného čerpadla je pro vás?</h2>
            <p className="text-lg text-slate-600">
              Každý dům je jiný. Pomůžeme vám vybrat řešení, které bude přesně odpovídat vašim potřebám a možnostem.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {heatPumpTypes.map((type, index) => (
              <div key={index} className="bg-slate-50/70 rounded-2xl p-8 flex flex-col border border-slate-200/80 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                                          <div className="flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center bg-green-700/10">
                        <type.icon className="h-8 w-8 text-green-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{type.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6 flex-grow">{type.description}</p>
                  <div className="space-y-3 mt-auto">
                    {type.advantages.map((advantage, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                                                  <CheckCircle className="h-5 w-5 text-green-700 mr-2 flex-shrink-0" />
                        <span className="text-slate-700">{advantage}</span>
                      </div>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modely" className="py-20 sm:py-28 bg-muted/70">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Naše nejprodávanější tepelná čerpadla</h2>
            <p className="text-lg text-muted-foreground">
              Prohlédněte si výběr ověřených modelů od předních světových výrobců, které instalujeme nejčastěji.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bestSellingModels.map((product, index) => (
              <ProductCard theme="tepelna-cerpadla" key={index} {...product} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <PDFDownloadButton
              url="/katalogy/tepelna-cerpadla-kompletni-katalog.pdf"
              filename="sfera-tepelna-cerpadla-katalog.pdf"
              title="Stáhnout kompletní katalog všech modelů"
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-green-700 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Od poptávky k úsporám v 5 krocích</h2>
            <p className="text-lg text-green-400">
              Náš proces je transparentní a navržený tak, aby pro vás byl co nejjednodušší a nejpohodlnější.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-100"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {[
                { step: "Poptávka a konzultace", icon: "1" },
                { step: "Technický návrh", icon: "2" },
                { step: "Dotace a smlouva", icon: "3" },
                { step: "Profesionální instalace", icon: "4" },
                { step: "Spuštění a servis", icon: "5" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                                      <div className="relative w-16 h-16 bg-green-200 border-2 border-green-700 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 transition-all duration-300 group-hover:border-green-700">
                      <span className="text-green-700/80">{item.icon}</span>
                  </div>
                  <p className="font-light text-sm text-green-300 leading-tight">{item.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                <div className="relative h-56 w-full">
                  <Image src={ref.image} alt={ref.project} layout="fill" objectFit="cover" className="rounded-t-2xl" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                                      <Quote className="w-8 h-8 text-green-700/20 mb-4 flex-shrink-0" fill="currentColor" />
                  <p className="text-slate-600 italic mb-6 flex-grow">"{ref.quote}"</p>
                  <div className="mt-auto pt-5 border-t border-slate-200">
                    <p className="font-bold text-slate-800">{ref.customer}</p>
                    <p className="text-sm text-slate-500">{ref.project}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 text-green-700">
            <Button asChild size="lg" variant="outline" className="border-green-700 hover:bg-green-700/10">
              <Link href="/reference">
                Zobrazit všechny realizace <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ - Modernized */}
      <section className="py-20 bg-gradient-to-br from-green-50/30 via-white to-green-50/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">?</span>
              </div>
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                FAQ
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
              Často kladené otázky
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Vše co potřebujete vědět o tepelných čerpadlech - odpovědi od expertů
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mt-8"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Levý sloupec */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jak tepelné čerpadlo funguje?</h3>
                      <p className="text-muted-foreground mb-4">
                        Tepelné čerpadlo přenáší teplo z jednoho místa na druhé pomocí malého množství elektrické energie:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Vzduchové čerpadlo získává teplo z venkovního vzduchu</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Zemní čerpadlo získává teplo z podzemí</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Voda-vzduch čerpadlo získává teplo z podzemní vody</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span>Teplo je komprimováno a přenášeno do interiéru</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jaká je účinnost tepelného čerpadla?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">COP (Coefficient of Performance):</span>
                          <span className="text-green-500 font-bold">3-5</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Sezónní účinnost:</span>
                          <span className="text-green-500 font-bold">150-300%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tepelné čerpadlo dodá 3-5krát více tepla než spotřebuje elektrické energie.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jaký typ tepelného čerpadla je pro mě nejvhodnější?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="p-3 bg-green-50 rounded">
                          <p className="font-medium text-green-700 mb-1">Vzduchové čerpadlo (Aerothermální)</p>
                          <ul className="text-sm space-y-1">
                            <li>• Nejlevnější instalace</li>
                            <li>• Minimální zásah do terénu</li>
                            <li>• Ideální pro menší domy</li>
                            <li>• Nižší investice</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <p className="font-medium text-green-700 mb-1">Zemní čerpadlo (Geotermální)</p>
                          <ul className="text-sm space-y-1">
                            <li>• Nejvyšší účinnost</li>
                            <li>• Stabilní výkon</li>
                            <li>• Vyšší investice</li>
                            <li>• Vyžaduje zemní práce</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Lze tepelné čerpadlo kombinovat s jinými systémy?</h3>
                      <p className="text-muted-foreground mb-4">
                        Ano, tepelná čerpadla lze kombinovat s různými systémy:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-green-500 mr-2" />
                          <span>FV panely</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-green-500 mr-2" />
                          <span>Nabíječky elektromobilů</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-green-500 mr-2" />
                          <span>Rekuperace</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-green-500 mr-2" />
                          <span>Podlahové vytápění</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pravý sloupec */}
              <div className="space-y-6">

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jaké jsou provozní náklady tepelného čerpadla?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Elektřina:</span>
                          <span className="text-green-500 font-bold">~3-5 Kč/kWh</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Údržba ročně:</span>
                          <span className="text-green-500 font-bold">2 000-5 000 Kč</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Servis:</span>
                          <span className="text-green-500 font-bold">1x ročně</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Náklady na provoz jsou výrazně nižší než u klasických zdrojů tepla.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jak hlásí tepelné čerpadlo?</h3>
                      <p className="text-muted-foreground mb-4">
                        Moderní tepelná čerpadla jsou tichá:
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Venkovní jednotka:</span>
                          <span className="text-green-500 font-bold">45-55 dB(A)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium">Vnitřní jednotka:</span>
                          <span className="text-green-500 font-bold">35-45 dB(A)</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Pro srovnání: normální konverzace = 60 dB(A), tichý šepot = 30 dB(A)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-green-500">Jaká je záruka na tepelná čerpadla?</h3>
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
            subtitle="Nechte nám na sebe kontakt a my se vám obratem ozveme. Spočítáme vám úspory a navrhneme nejlepší řešení pro váš dům."
            source="tepelna-cerpadla-page"
          />
        </div>
      </section>
    </div>
    </ThemeProvider>
  )
}