import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/ui/contact-form4"
import { ThemeProvider } from "@/components/theme-provider"
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
    <ThemeProvider theme="elektroinstalace">
      <div className="bg-white text-slate-800">
        <section className="relative h-[90vh] min-h-[600px] flex items-center text-white">
          <div className="absolute inset-0">
          <Image src="/images/elektroinstalace.webp" alt="Profesionální elektroinstalace" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/90 via-slate-600/60 to-black"></div>
        </div>
        <div className="relative z-10 container">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-6 bg-orange-500/10 border-orange-500/30 text-white ">
              Elektroinstalace</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)] text-white-70">Profesionální řešení pro domov i firmu.</h1>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl [text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                Náš tým zkušených a pečlivých profesionálů vás přesvědčí,<span className="font-bold"> že bezpečí nemusí být jen pocit. </span>  
                Nabízíme řešení pro nové instalace, modernizace starých rozvodů, nebo fotovoltaické panely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-orange-500 hover:bg-orange-900">
                  <Link href="#kontakt">Nabídka zdarma</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white text-white  bg-orange-500/60 hover:bg-white hover:text-orange-500 bg-transparent"
                >
                  <Link href="#sluzby">Naše služby</Link>
                </Button>
              </div>
            </div>
          </div>
      </section>
 



      {/* Důvody proč elektroinstalace */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč si nás vybrat?</h2>
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
              <h3 className="font-bold text-lg mb-3 text-orange-500">Bezpečnost především!</h3>
              <p className="text-muted-foreground leading-relaxed">
                Používáme pouze certifikovaný materiál a dodržujeme všechny platné normy ČSN. 
                Prioritou je vždy bezpečnost.
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
                Nabízíme moderní řešení pro fotovoltaiku nebo nabíjecí stanici pro váš elektromobil.
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
                Náš tým tvoří pouze kvalifikovaní a zkušení elektrikáři se všemi potřebnými osvědčeními (Zákon č. 250/2021 Sb. a NV 194/2022 Sb).
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše služby elektroinstalací </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Kompletní elektroinstalace pro novostavby i modernizaci starých rozvodů
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
              <p className="text-muted-foreground mb-6 text-center">Modernizace starých rozvodů (Al/Cu) </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Výměna starých hliníkových vodičů za měděné
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
                <h3 className="font-bold text-xl text-orange-500">Elektroinstalace pro SVJ</h3>
              </div>
              <p className="text-muted-foreground mb-6 text-center">Rozvaděče, osvětlení, elektroinstalace, zvonky</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Zahrnuje:</h4>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Osvětlení společných prostor
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Dodávka a montáž systému domovních zvonků
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Centrální rozvaděče a zásuvky
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
                  Wallbox - konzultace, dodávka, instalace
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  Příprava pro FV včetně konzultace
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

  {/* Technical Support Section - Professional & Trustworthy */}
  <section className="py-32 bg-gradient-to-br from-orange-600 via-orange-30 to-orange-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#3D8FC4]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#196097]/20 to-transparent rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Professional header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/30">
                <Shield className="w-5 h-5" />
                <span>Technická Podpora</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Jsme tu pro vás!
                <span className="block text-white/90 font-normal"></span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Tým našich proškolených a certifikovaných techniků je připraven řešit vaše požadavky ve všední dny od 8:00 do 20:00.  
                <span className="font-bold text-white"> <p>
                   &nbsp;ELEKTROPOHOTOVOST - OPAVA A OKOLÍ 25 km.</p>
                  </span>Akutní poruchu garantujeme opravit nejpozději do 72 hodin od prvního kontaktu. V některých případech i do 24 hodin.
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
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                                  <div className="text-white font-bold text-2xl mb-2">+420 735 014 112</div>
                <div className="text-white/80 text-sm">Hlavní linka</div>
                <div className="text-green-300 text-sm font-medium mt-2">✓ Elektropohotovost Opava</div>
                <div className="text-green-300 text-sm font-medium">✓ Oprava do 72 hodin</div>
                </div>

                {/* Working hours */}
                <div className="text-center lg:text-right">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto lg:mr-0 lg:ml-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-white font-bold text-lg mb-2">Po - Pá: 8:00 - 20:00</div>
                  <div className="text-green-300 text-sm font-medium mt-3">✓ Pohotovostní servis</div>
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





      {/* Jak pracujeme */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Jak pracujeme</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
  Pořádek dělá přátelé. Proto jsme transparentní a profesionální.
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-orange-500">Průběh v 5ti krocích</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">První kontakt a konzultace</h4>
                      <p className="text-muted-foreground">
                        Bezplatná konzultace online nebo na místě realizace. Prodiskutujeme vaše potřeby, 
                        možnosti a očekávání. Poradíme s výběrem nejlepšího řešení.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Návrh a rozpočet</h4>
                      <p className="text-muted-foreground">
                      Připravíme jasný návrh řešení a přehledný rozpočet. Vše srozumitelně, bez zbytečných komplikací a s důrazem na férovost.                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Plánování a příprava</h4>
                      <p className="text-muted-foreground">
                        Dohodneme termín, zajistíme materiál a připravíme vše potřebné. 
                        Celou dobu jsme v kontaktu a vy budete vědět přesně, kdy začínáme a jak dlouho bude trvat práce.
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
                        Práci provádíme rychle, precizně a čistota je naší prioritou. Používáme pouze kvalitní 
                        materiály od renomovaných značek a moderní nástroje. Váš provoz nenarušíme.
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
                        Po dokončení společně provedeme revizi, předáme dokumentaci, vysvětlíme funkčnost a zodpovíme vaše otázky. 
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
                    "Bezplatná konzultace a nacenění",
                    "Transparentní ceny bez skrytých poplatků",
                    "Dodržení dohodnutých termínů",
                    "Použití pouze certifikovaných materiálů",
                    "Profesionální přístup a čistota",
                    "Ucelená dokumentace",
                    "Záruka na všechny práce",
                    "Servis i po dokončení práce",
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Realizace našich prací</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Zadokumentované realizace včetně porovnání před a po.
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
                        <span className="text-sm">Chybějící nouzové osvětlení</span>
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
                        <li>• Připraveno na budoucnost</li>
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
                      <h3 className="font-bold text-lg mb-3 text-orange-500">Děláte i drobné zásahy?</h3>
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
                          <span>Diagnostiku a opravu poruchy</span>
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
                      </div>
                      <p className="text-sm text-muted-foreground">
                        V případě jakýchkoli problémů jsme k dispozici 24/7. Záruka je na všechny práce a materiály.
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


              </div>
            </div>

            {/* CTA v FAQ */}
            <div className="mt-12 text-center bg-orange-500/10 rounded-2xl p-8 border border-orange-500/20">
              <h3 className="text-2xl font-bold text-orange-500 mb-4">Chcete se zeptat na něco jiného?</h3>
              <p className="text-muted-foreground mb-6">
                Kontaktujte nás telefonicky nebo e-mailem. Rádi vám odpovíme na všechny dotazy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-orange-500 hover:bg-orange-500" asChild>
                  <Link href="tel:+420735014112">
                    <Phone className="h-4 w-4 mr-2" />
                    +420 735 014 112
                  </Link>
                </Button>
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50" asChild>
                  <Link href="mailto:info@sfera-pro-domov.cz">
                    <Mail className="h-4 w-4 mr-2" />
                    info@sfera-pro-domov.cz
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
          <h2 className="text-4xl font-bold mb-6">Začínáte projekt? Pomůžeme vám.</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-orange-200">
            Zatím máte jen nápad, možná máte připravený kompletní plán a chcete začít s realizací? Ozvěte se nám,  
            Rádi vám připravíme nezávaznou nabídku.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-white font-bold text-orange-500 hover:bg-orange-50">
              <Link href="#kontakt">SPOLUPRACUJTE S NÁMI!</Link>
            </Button>
            <div className="flex items-center gap-3 text-lg">
              <span>Zavolejte nám:</span>
              <Link href="tel:+420735014112" className="font-bold hover:text-orange-200">
                +420 735 014 112
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
              title="Poptávka elektroinstalace"
              subtitle="Pošlete nám vyplněný formulář a my vám připravíme nabídku šitou na míru."
              source="elektroinstalace-page"
              customHeading="Nechte si váš projekt dopředu nacenit."
            />
          </div>
        </div>
      </section>
    </div>
    </ThemeProvider>
  )
}