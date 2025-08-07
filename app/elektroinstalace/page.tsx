import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/ui/contact-form"
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
  Mail
} from "lucide-react"

export default function ElektroinstalacePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=500&width=1200&text=Elektroinstalace+Hero"
            alt="Profesionální elektroinstalace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-red-400 opacity-90" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/20">Elektroinstalace</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">Profesionální elektroinstalace</h1>
              <p className="text-xl mb-8 leading-relaxed drop-shadow-lg">
                Nejsme jen dráteníci. Navrhujeme chytré domácnosti, připravíme pro vás fotovoltaiku 
                nebo třeba nabíjecí stanici pro váš elektromobil.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-orange-500 hover:bg-orange-100">
                  <Link href="#kontakt">Nezávazná poptávka</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
                >
                  <Link href="#sluzby">Naše služby</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
   {/* Technical Support Section - Professional & Trustworthy */}
   <section className="py-32 bg-gradient-to-br from-[#1B5D93] via-[#2D78AD] to-[#49A3D7] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#3D8FC4]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#196097]/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Professional header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/30">
                <Shield className="w-5 h-5" />
                <span>Certifikovaná technická podpora</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Jsme tu pro vás
                <span className="block text-white/90 font-normal"></span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Naši certifikovaní technici jsou připraveni řešit vaše požadavky ve všední dny od 8:00 do 20:00.
                <span className="font-semibold text-white"> Elektropohotovost Opava a okolí do 25km .
                  </span> Pokud se jedná o akutní poruchu, garantujeme opravu nejpozději do 72 hodin od zavolání. V některých případech i do 24 hodin.
              </p>
            </div>

            {/* Professional contact card */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Phone contact */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Phone className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                                  <div className="text-white font-bold text-2xl mb-2">+420 735 014 112</div>
                <div className="text-white/80 text-sm">Hlavní linka</div>
                <div className="text-green-400 text-sm font-medium mt-2">✓ Elektropohotovost Opava</div>
                <div className="text-green-400 text-sm font-medium">✓ Opravy do 24 hodin</div>
                </div>

                {/* Working hours */}
                <div className="text-center lg:text-right">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto lg:mr-0 lg:ml-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-white font-bold text-lg mb-2">Po - Pá: 8:00 - 20:00</div>
                  <div className="text-green-400 text-sm font-medium mt-2">✓ Pohotovostní servis</div>
                </div>
              </div>
            </div>



            {/* CTA Button */}
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1B5D93] hover:bg-gray-50 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-0"
              >
                <Link href="/kontakt" className="flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <span>POHOTOVOSTNÍ LINKA</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              {/* Button glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-white/40 to-white/30 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </div>
        </div>
      </section>





      {/* Důvody proč elektroinstalace */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč elektroinstalace?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bezpečnost, spolehlivost a moderní řešení na prvním místě
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Bezpečnost na 1. místě</h3>
              <p className="text-muted-foreground leading-relaxed">
                Používáme certifikované materiály a dodržujeme všechny platné normy ČSN. 
                Prioritou je pro nás vaše bezpečnost.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Záruka a spolehlivost</h3>
              <p className="text-muted-foreground leading-relaxed">
                Na naši práci se můžete spolehnout. Poskytujeme plnou záruku a servis.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Moderní řešení</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nejsme jen dráteníci. Navrhujeme chytré domácnosti, připravíme pro vás 
                fotovoltaiku nebo třeba nabíjecí stanici pro váš elektromobil.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Odbornost a zkušenost</h3>
              <p className="text-muted-foreground leading-relaxed">
                Náš tým tvoří pouze kvalifikovaní elektrikáři s praxí a všemi potřebnými 
                osvědčeními (vyhláška 50).
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Čistota a preciznost</h3>
              <p className="text-muted-foreground leading-relaxed">
                Víme, že jsme u vás doma, nebo ve firmě. Po naši práci zůstane vždycky čisto a uklizeno.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-3 text-orange-500">Rychlost a efektivita</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dodržujeme termíny a pracujeme efektivně. Minimalizujeme narušení vašeho provozu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Naše služby */}
      <section id="sluzby" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše služby elektroinstalací</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kompletní elektroinstalace od novostaveb po modernizace
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Nové instalace</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Rodinné domy a byty (kompletní silnoproud i slaboproud)</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Kompletní návrh a projekt
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Silnoproud i slaboproud
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Revize a kolaudace
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <Wrench className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Rekonstrukce</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Modernizace starých rozvodů (výměna hlíníkových za měď)</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Výměna starých rozvodů
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Moderní materiály
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Minimální narušení provozu
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <Building className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Komerční prostory</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Kanceláře, obchody, dílny, sportoviště</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Průmyslové instalace
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Bezpečnostní systémy
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Pravidelné revize
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Chytrá domácnost</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Ovládání světel, topení, žaluzií, smart lock přes mobil</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Chytré spínače a zásuvky
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Mobilní aplikace
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Automatizace a scénáře
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <Car className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Moderní technologie</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Nabíjecí stanice pro elektromobily, fotovoltaika</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Wallbox instalace
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Příprava pro FV
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Chytré měření
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
              <div className="text-center mb-6">
                <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 mb-4 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-xl text-orange-500">Revize a údržba</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Pravidelné kontroly pro firmy</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Povinné revize
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Protokoly a certifikáty
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Pravidelný servis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jak pracujeme */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Jak pracujeme</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparentní a profesionální přístup od prvního kontaktu po finální předání
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-500">Náš proces v 5 krocích</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">První kontakt a konzultace</h4>
                      <p className="text-muted-foreground">
                        Bezplatná konzultace na místě nebo online. Prodiskutujeme vaše potřeby, 
                        možnosti a očekávání. Poradíme s výběrem nejlepšího řešení.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Detailní návrh a rozpočet</h4>
                      <p className="text-muted-foreground">
                        Vypracujeme podrobný návrh včetně schématu, seznamu materiálů a 
                        transparentního rozpočtu. Vše jasně a srozumitelně.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Plánování a příprava</h4>
                      <p className="text-muted-foreground">
                        Dohodneme termín, objednáme materiál a připravíme vše potřebné. 
                        Budete vědět přesně, kdy začínáme a jak dlouho bude trvat práce.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Profesionální realizace</h4>
                      <p className="text-muted-foreground">
                        Práci provádíme rychle, čisto a precizně. Používáme pouze kvalitní 
                        materiály a moderní nástroje. Minimální narušení vašeho provozu.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Předání a záruka</h4>
                      <p className="text-muted-foreground">
                        Provedeme revizi, předáme dokumentaci a vysvětlíme funkčnost. 
                        Poskytujeme záruku na všechny práce a materiály.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/5 p-8 rounded-lg border border-orange-500/20">
                <h3 className="text-2xl font-bold mb-6 text-orange-500">Co vás čeká</h3>
                <div className="space-y-4">
                  {[
                    "Bezplatná konzultace a ocenění",
                    "Transparentní ceny bez skrytých poplatků",
                    "Dodržení dohodnutých termínů",
                    "Použití pouze certifikovaných materiálů",
                    "Profesionální přístup a čistota",
                    "Kompletní dokumentace a revize",
                    "Záruka na všechny práce",
                    "Poradenstvo i po dokončení",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ukázky naší práce */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ukázky naší práce</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Detailní případové studie s fotodokumentací před a po zásahu
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="space-y-16">
            {/* Příklad 1: Rekonstrukce bytu */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">Kompletní rekonstrukce bytu 2+1</h3>
                    <p className="text-muted-foreground">Olomouc • Červen 2024 • Doba realizace: 5 dnů</p>
                  </div>
                  <Badge className="bg-orange-500 text-white px-4 py-2">Dokončeno</Badge>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Výchozí stav - PŘED</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-red-50 flex items-center justify-center border-2 border-red-200">
                        <div className="text-center">
                          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                          <p className="text-red-700 font-medium">Stará elektroinstalace</p>
                          <p className="text-sm text-red-600">Hliníkové rozvody z 80. let</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        <span className="text-sm">Zastaralý rozvaděč bez jističů</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        <span className="text-sm">Hliníkové voodiče - bezpečnostní riziko</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        <span className="text-sm">Ohořelé zásuvky a spínače</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <X className="h-4 w-4 mr-2" />
                        <span className="text-sm">Nedostatečné uzemění</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Výsledný stav - PO</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-green-50 flex items-center justify-center border-2 border-green-200">
                        <div className="text-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                          <p className="text-green-700 font-medium">Moderní instalace</p>
                          <p className="text-sm text-green-600">Měděné rozvody dle ČSN</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Nový rozvaděč s moderními jističi</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Měděné voodiče - maximální bezpečnost</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Nové zásuvky a LED osvětlení</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Kompletní uzemění a revize</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Rozsah prác:</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Elektroinstalace</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Výměna hlavního rozvaděče</li>
                        <li>• Nové měděné rozvody</li>
                        <li>• 15 nových zásuvek</li>
                        <li>• 8 světelných okruhů</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Doplňky</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Příprava pro kuchyně</li>
                        <li>• LED osvětlení</li>
                        <li>• Revize a certifikát</li>
                        <li>• 2 roky záruka</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Příklad 2: Chytrá domácnost */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">Chytrá domácnost v rodinném domě</h3>
                    <p className="text-muted-foreground">Brno • Říjen 2024 • Doba realizace: 3 dny</p>
                  </div>
                  <Badge className="bg-orange-500 text-white px-4 py-2">Dokončeno</Badge>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Původní stav - PŘED</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-gray-50 flex items-center justify-center border-2 border-gray-200">
                        <div className="text-center">
                          <ToggleLeft className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-700 font-medium">Klasické spínače</p>
                          <p className="text-sm text-gray-600">Ruční ovládání</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Minus className="h-4 w-4 mr-2" />
                        <span className="text-sm">Klasické mechanické spínače</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Minus className="h-4 w-4 mr-2" />
                        <span className="text-sm">Ruční ovládání všech zařízení</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Minus className="h-4 w-4 mr-2" />
                        <span className="text-sm">Žádná automatizace</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Chytré řešení - PO</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-blue-50 flex items-center justify-center border-2 border-blue-200">
                        <div className="text-center">
                          <Smartphone className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                          <p className="text-blue-700 font-medium">Chytré ovládání</p>
                          <p className="text-sm text-blue-600">Mobilní aplikace</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-blue-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Chytré spínače s WiFi</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Ovládání přes mobilní aplikaci</span>
                      </div>
                      <div className="flex items-center text-blue-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Automatické scénáře a časovače</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Instalované technologie:</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Osvětlení</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 12 chytrých spínačů</li>
                        <li>• Stmívání LED</li>
                        <li>• Barevné RGB pásky</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Automatizace</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Pohybové senzory</li>
                        <li>• Časové scénáře</li>
                        <li>• Geolokace</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Ovládání</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Mobilní aplikace</li>
                        <li>• Hlasové příkazy</li>
                        <li>• Nastavení skupin</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Příklad 3: Firemní objekt */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-500 mb-2">Elektroinstalace firemního objektu</h3>
                    <p className="text-muted-foreground">Ostrava • Září 2024 • Doba realizace: 8 dnů</p>
                  </div>
                  <Badge className="bg-orange-500 text-white px-4 py-2">Dokončeno</Badge>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Výchozí stav - PŘED</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-yellow-50 flex items-center justify-center border-2 border-yellow-200">
                        <div className="text-center">
                          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                          <p className="text-yellow-700 font-medium">Nedostatečná kapacita</p>
                          <p className="text-sm text-yellow-600">Staré rozvody</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Přetížené okruhy</span>
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Nedostatečný počet zásuvek</span>
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Chybějící núzové osvětlení</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4 text-lg">Moderní řešení - PO</h4>
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className="h-64 bg-green-50 flex items-center justify-center border-2 border-green-200">
                        <div className="text-center">
                          <Zap className="h-12 w-12 text-green-500 mx-auto mb-2" />
                          <p className="text-green-700 font-medium">Vysoká kapacita</p>
                          <p className="text-sm text-green-600">Moderní rozvody</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Nové rozvoděče s rezervou</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Dostatečný počet zásuvek</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">Úsporné LED osvětlení</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Technické parametry</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Hlavní přívod 3x63A</li>
                        <li>• 4 podrozvaděče</li>
                        <li>• 85 zásuvek</li>
                        <li>• 25 světelných okruhů</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-500 mb-2">Benefity</h5>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 50% úspora elektrické energie</li>
                        <li>• Zvýšení bezpečnosti</li>
                        <li>• Lepší pracovní prostředí</li>
                        <li>• Připravenost pro budoucnost</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Modernized */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 via-white to-orange-50/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">?</span>
              </div>
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                FAQ
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Často kladené otázky
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Vše co potřebujete vědět o elektroinstalacích - odpovědi od expertů s více než 15letou praxí
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mt-8"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Levý sloupec */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Jak dlouho trvá kompletní rekonstrukce elektroinstalace?</h3>
                      <p className="text-muted-foreground mb-4">
                        <strong>Byt 2+1:</strong> 3-5 pracovních dnů<br/>
                        <strong>Rodinný dům:</strong> 5-10 pracovních dnů<br/>
                        <strong>Firemní objekt:</strong> 1-3 týdny
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Přesný harmonogram vám předložíme před začátkem prací včetně detailního plánu každého dne.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Kolik stojí nová elektroinstalace?</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-medium">Byt 2+1:</span>
                          <span className="text-orange-500 font-bold">40-80 tis. Kč</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-medium">Rodinný dům:</span>
                          <span className="text-orange-500 font-bold">80-200 tis. Kč</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-medium">Chytrá domácnost:</span>
                          <span className="text-orange-500 font-bold">+30-50 tis. Kč</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cena závisí na složitosti, počtu okruhů a kvalitě materiálů. Bezplatná kalkulace na místě.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Kdy je nutná revize elektroinstalace?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
                          <span><strong>Domácnosti:</strong> Každých 5 let</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
                          <span><strong>Firmy:</strong> Každé 2 roky</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
                          <span><strong>Nová instalace:</strong> Vždy povinná</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-orange-500 mr-3" />
                          <span><strong>Větší změny:</strong> Povinná revize</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Revizi provádíme včetně vydání certifikátu a protokolu o revizi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Můžu si nechat udělat jen část prác?</h3>
                      <p className="text-muted-foreground mb-4">
                        Samozřejmě! Nabízíme jak kompletní rekonstrukce, tak i menší zásahy:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Výměna rozvaděče</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Přidání zásuvek</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-orange-500 mr-2" />
                          <span>LED osvětlení</span>
                        </div>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 text-orange-500 mr-2" />
                          <span>Opravy poruch</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pravý sloupec */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Co zahrnuje chytrá domácnost?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="font-medium">Ovládání osvětlení</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Chytré spínače, stmívání, barevné LED</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Home className="h-5 w-5 text-green-600 mr-2" />
                            <span className="font-medium">Automatizace</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Pohybové senzory, časovače, scénáře</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Shield className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="font-medium">Bezpečnost</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Chytré zámky, kamery, alarm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Jaká je záruka na vaši práci?</h3>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="font-medium">Práce a montáž:</span>
                          <span className="text-green-600 font-bold">2 roky</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span className="font-medium">Materiál a komponenty:</span>
                          <span className="text-blue-600 font-bold">dle výrobce</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <span className="font-medium">Chytré technologie:</span>
                          <span className="text-orange-500 font-bold">3 roky</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        V případě jakýchkoli problémů jsme k dispozici 24/7.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Potřebuji přípravu pro elektromobil?</h3>
                      <p className="text-muted-foreground mb-4">
                        Ano, pro nabíjecí stanici (wallbox) je potřeba speciální příprava:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Car className="h-4 w-4 text-orange-500 mr-3" />
                          <span className="text-sm">Silný okruh 32A (7kW) nebo 63A (22kW)</span>
                        </div>
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 text-orange-500 mr-3" />
                          <span className="text-sm">Speciální jistič typu B</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-orange-500 mr-3" />
                          <span className="text-sm">Proudový chránič 30mA</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                          <span className="text-sm">Certifikovaná instalace</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      Q
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Jak probíhá úhrada za práci?</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-2 bg-gray-50 rounded">
                          <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                          <span className="text-sm">Záloha 30% při objednání</span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded">
                          <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                          <span className="text-sm">60% při dokončení prác</span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded">
                          <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                          <span className="text-sm">10% po úspěšné revizi</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Přijímáme hotovost, převod i kartů. Fakturu vystávíme ihned.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA v FAQ */}
            <div className="mt-12 text-center bg-orange-500/10 rounded-2xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Nenalezli jste odpověď na svou otázku?</h3>
              <p className="text-muted-foreground mb-6">
                Kontaktujte nás telefonicky nebo e-mailem. Rádi vám odpovíme na všechny dotazy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-500 hover:bg-orange-500" asChild>
                  <Link href="tel:+420777123456">
                    <Phone className="h-4 w-4 mr-2" />
                    +420 777 123 456
                  </Link>
                </Button>
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50" asChild>
                  <Link href="mailto:info@elektroklima.cz">
                    <Mail className="h-4 w-4 mr-2" />
                    info@elektroklima.cz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Máte projekt? Pobavme se o něm.</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-orange-200">
            Ať už máte nápad nebo rovnou kompletní plán, ozveťte se nám. 
            Rádi připravíme nezávaznou nabídku.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white text-orange-500 hover:bg-orange-50">
              <Link href="#kontakt">Nezávazná poptávka</Link>
            </Button>
            <div className="flex items-center gap-3 text-lg">
              <span>nebo zavolejte:</span>
              <Link href="tel:+420123456789" className="font-bold hover:text-orange-200">
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
            <CompleteContactSection
              title="Poptávka elektroinstalace"
              subtitle="Vyplnťte formulář a my vám připravíme nabídku na míru vašemu projektu."
              source="elektroinstalace-page"
              colorTheme="orange"
              customHeading="Nechťe si vypočítat nabídku"
            />
          </div>
        </div>
      </section>
    </div>
  )
}