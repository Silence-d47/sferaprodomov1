import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "@/components/ui/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OrganicWaveDivider } from "@/components/ui/organic-wave-divider"
import { ShapedSectionHeader } from "@/components/ui/shaped-section-header"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Calendar,
  Star,
  Shield,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react"

export default function KontaktPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - konzistentní s ostatními stránkami */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        <div className="absolute inset-0">
          <Image 
            src="/placeholder.svg?height=600&width=1200&text=Kontakt+Hero" 
            alt="Kontakt" 
            fill 
            className="object-cover opacity-20" 
          />
        </div>
        <div className="relative z-10 container h-full flex items-center">
          <div className="max-w-4xl text-white">
            <div className="flex items-center mb-6">
              <Image 
                src="/logo/logo.svg" 
                alt="Sfera logo" 
                width={60} 
                height={60} 
                className="mr-4" 
              />
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-3 py-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Kontakt
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Jsme tu pro vás
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
              Ozvěte se nám s jakýmkoliv dotazem nebo požadavkem. Naši odborníci vám rádi pomohou 
              s výběrem nejlepšího řešení pro váš domov nebo firmu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" asChild>
                <Link href="#kontaktni-udaje">
                  <Phone className="h-5 w-5 mr-2" />
                  Zavolat nyní
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#kontaktni-formular">
                  <Mail className="h-5 w-5 mr-2" />
                  Napsat email
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Organic Wave Divider */}
      <OrganicWaveDivider />

      {/* Trust Indicators */}
      <section className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Proč si vybrat právě nás?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Více než 15 let zkušeností, stovky spokojených zákazníků a profesionální přístup
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">15+ let</h3>
                <p className="text-muted-foreground">zkušeností v oboru</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">500+</h3>
                <p className="text-muted-foreground">spokojených zákazníků</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">5 let</h3>
                <p className="text-muted-foreground">záruka na práci</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">98%</h3>
                <p className="text-muted-foreground">spokojenost zákazníků</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shaped Section Header */}
      <ShapedSectionHeader 
        variant="wave-inverse"
        animated={true}
        height="lg"
        backgroundColor="bg-white"
        particles={false}
      />

      {/* Contact Info and Form */}
      <section id="kontaktni-udaje" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontaktujte nás</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Jsme tu pro vás každý den. Ozvěte se nám jakýmkoliv způsobem, který vám vyhovuje
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid gap-6">
                <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                  <CardContent className="p-8 flex items-start space-x-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Naše adresa</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Nákladní 471/32<br />
                        746 01 Opava<br />
                        Česká republika
                      </p>
                      <Button variant="outline" size="sm" className="mt-4" asChild>
                        <Link href="#mapa">
                          <MapPin className="h-4 w-4 mr-2" />
                          Zobrazit na mapě
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                  <CardContent className="p-8 flex items-start space-x-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Telefon</h3>
                      <p className="text-muted-foreground mb-2">+420 735 014 112</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Rychlá odezva, okamžitá konzultace
                      </p>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                        <Link href="tel:+420735014112">
                          <Phone className="h-4 w-4 mr-2" />
                          Zavolat nyní
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                  <CardContent className="p-8 flex items-start space-x-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">info@klima-sfera.cz</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Odpovídme do 24 hodin
                      </p>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700" asChild>
                        <Link href="mailto:info@klima-sfera.cz">
                          <Mail className="h-4 w-4 mr-2" />
                          Napsat email
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow">
                  <CardContent className="p-8 flex items-start space-x-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">Pracovní doba</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p className="flex justify-between">
                          <span>Pondělí - Pátek:</span>
                          <span className="font-medium">8:00 - 17:00</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sobota:</span>
                          <span className="font-medium">9:00 - 12:00</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Neděle:</span>
                          <span className="font-medium">Zavřeno</span>
                        </p>
                      </div>
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-red-700 font-semibold text-sm flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Pohotovost 24/7 pro závazné situace
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Social Media */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="font-bold text-lg mb-4">Sledujte nás na sociálních sítích</h3>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div id="kontaktni-formular">
              <Card className="shadow-2xl border-0 bg-white">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">Napište nám</h3>
                    <p className="text-muted-foreground">
                      Vyplněte formulář a my se vám ozveme do 24 hodin s nezávaznou nabídkou
                    </p>
                  </div>
                  <ContactForm />
                  
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-6 text-sm text-blue-700">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Rychlá odezva
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Nezávazná konzultace
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Profesionální přístup
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Shaped Section Header */}
      <ShapedSectionHeader 
        variant="wave-inverse"
        animated={true}
        height="lg"
        backgroundColor="bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30"
        particles={false}
      />

      {/* Map Section */}
      <section id="mapa" className="py-20 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kde nás najdete</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Navštivte nás v našem sídle v Opavě nebo si domluvte schůzku přímo u vás doma
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white overflow-hidden">
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Map */}
                <div className="lg:col-span-2 relative h-96 lg:h-auto">
                  <Image 
                    src="/mapa/mapa.png" 
                    alt="Mapa - Sfera Opava" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">SFERA</p>
                        <p className="text-xs text-muted-foreground">Nákladní 471/32, Opava</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info Panel */}
                <div className="p-8 bg-white">
                  <h3 className="font-bold text-xl mb-6">Informace o navštěvě</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Adresa</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Nákladní 471/32<br />
                          746 01 Opava
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Otevreno</p>
                        <p className="text-sm text-muted-foreground">
                          Po-Pá: 8:00-17:00<br />
                          So: 9:00-12:00
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">Doporučení</p>
                        <p className="text-sm text-muted-foreground">
                          Domluvte si schůzku předem
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                      <Link href="tel:+420735014112">
                        <Phone className="h-4 w-4 mr-2" />
                        Zavolat a domluvit schůzku
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="https://maps.google.com" target="_blank">
                        <MapPin className="h-4 w-4 mr-2" />
                        Otevřít v Google Maps
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800&text=CTA+Background')] opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <MessageCircle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Jste připraveni začít?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Kontaktujte nás ještě dnes a necháme si zpracovat nezávaznou nabídku 
              přesně na míru vašim potřebám a rozpočtu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" asChild>
                <Link href="tel:+420735014112">
                  <Phone className="h-5 w-5 mr-2" />
                  Zavolat nyní
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="#kontaktni-formular">
                  <Mail className="h-5 w-5 mr-2" />
                  Napsat zprávu
                </Link>
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              ✓ Rychlá odezva do 24 hodin    ✓ Nezávazná konzultace    ✓ Profesionální přístup
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
