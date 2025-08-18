"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "@/components/ui/contact-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { EnhancedSectionDivider } from "@/components/ui/enhanced-section-divider"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users,
  CheckCircle,
  Briefcase,
  Wrench,
  Zap,
  Building,
  ShieldCheck,
  Rocket
} from "lucide-react"

// --- TYPES ---
interface Employee {
  _id: string
  name: string
  position: string
  image?: {
    asset: {
      url: string
    }
  }
  phone?: string
  email?: string
  isDirector: boolean
}

// --- SUB-KOMPONENTY ---
const TeamMemberCard = ({ member }: { member: Employee }) => (
  <Card className="group flex flex-col h-full bg-white text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-slate-200/80 hover:border-blue-300">
    <CardHeader className="flex-shrink-0">
      <div className="relative w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px] mx-auto overflow-hidden aspect-[1/1] rounded-full group-hover:scale-105 transition-transform duration-500">
        <Image 
          src={member.image?.asset?.url || "/images/tym-sfera.webp"} 
          alt={member.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
        />
      </div>
    </CardHeader>
    <CardContent className="flex flex-col flex-grow p-3 sm:p-4 md:p-6 pt-1 sm:pt-2">
      <CardTitle className="text-lg sm:text-xl text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">{member.name}</CardTitle>
      <CardDescription className="text-blue-600 font-semibold text-xs sm:text-sm mb-3 sm:mb-4 group-hover:text-blue-700 transition-colors duration-300">{member.position}</CardDescription>
      <Separator className="my-3 sm:my-4 group-hover:bg-blue-300 transition-colors duration-300" />
      {member.isDirector && (
        <div className="flex gap-1.5 sm:gap-2 justify-center">
          {member.phone && (
            <Button size="sm" asChild className="flex-1 bg-slate-800 hover:bg-slate-900 hover:scale-105 transition-all duration-300 hover:shadow-lg group/btn text-xs sm:text-sm h-8 sm:h-10">
              <Link href={`tel:${member.phone}`}>
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover/btn:animate-pulse transition-all duration-300" />Zavolat
              </Link>
            </Button>
          )}
          {member.email && (
            <Button size="sm" variant="outline" asChild className="flex-1 hover:scale-105 transition-all duration-300 hover:shadow-md group/btn text-xs sm:text-sm h-8 sm:h-10">
              <Link href={`mailto:${member.email}`}>
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover/btn:animate-bounce transition-all duration-300" />Email
              </Link>
            </Button>
          )}
        </div>
      )}
    </CardContent>
  </Card>
)

// --- MAIN COMPONENT ---
export default function ContactPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const { client } = await import('@/lib/sanity.client')
        const { employeesQuery } = await import('@/lib/sanity.queries')
        const data = await client.fetch(employeesQuery)
        setEmployees(data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const director = employees.find(emp => emp.isDirector)
  const otherEmployees = employees.filter(emp => !emp.isDirector)

  const ContactInfoCard = ({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href: string }) => (
    <div>
      <Link href={href} className="group block rounded-xl sm:rounded-2xl bg-white/10 p-3 sm:p-4 md:p-6 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 h-full hover:scale-105 hover:shadow-2xl">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">{icon}</div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-blue-100 group-hover:text-white transition-colors duration-300">{title}</p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-white group-hover:text-blue-200 transition-colors duration-300 leading-tight">{value}</p>
          </div>
        </div>
      </Link>
    </div>
  )

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* --- HERO SEKCE S DIVIDEREM --- */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/tym-sfera.webp" alt="Tým SFERA PRO DOMOV" fill className="object-cover object-[center_50%] md:object-[center_20%]" quality={80} priority />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/70 to-blue-900/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 pt-24 sm:pt-32 lg:pt-40 pb-32 sm:pb-40 lg:pb-48">
          <div className="max-w-4xl">
            <div><Badge className="bg-white/10 text-white border-white/20 text-sm px-4 py-2 mb-6">Kontaktujte nás</Badge></div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
              Spojte se s odborníky, kteří rozumí vašemu domovu.
            </h1>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-3xl">
              Ať už máte konkrétní dotaz, nebo jen hledáte správné řešení, náš tým je připraven vám pomoci.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ContactInfoCard icon={<Phone className="h-6 w-6 text-white"/>} title="Zavolejte nám" value="+420 735 014 112" href="tel:+420735014112" />
              <ContactInfoCard icon={<Mail className="h-6 w-6 text-white"/>} title="Napište nám" value="info@sfera-domov.cz" href="mailto:info@sfera-domov.cz" />
              <ContactInfoCard icon={<MapPin className="h-6 w-6 text-white"/>} title="Hlavní sídlo" value="Nákladní 471/32, Opava" href="#mapa" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <EnhancedSectionDivider fromColor="from-slate-900" toColor="to-slate-50" />
        </div>
      </section>

      {/* --- SEKCE NÁŠ TÝM - VYCENTROVANÁ --- */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wider uppercase">Náš Tým</h2>
            <p className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900">Odborníci s vášní pro detail</p>
            <p className="mt-6 text-lg text-slate-600 leading-8">Každý člen našeho týmu přináší unikátní dovednosti a léta zkušeností. Jsme hrdí na práci, kterou odvádíme.</p>
          </div>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Načítání týmu...</p>
            </div>
          ) : (
            <>
              {director && (
                <div className="max-w-xl mx-auto mb-10">
                  <TeamMemberCard member={director} />
                </div>
              )}
              {/* Vertikální oddělení jednatele od ostatních */}
              {otherEmployees.length > 0 && (
                <>
                  <div className="hidden md:flex items-center justify-center my-8">
                    <div className="h-12 w-px bg-slate-300" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherEmployees.map(member => (
                      <TeamMemberCard key={member._id} member={member} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* --- SEKCE KDE NÁS NAJDETE --- */}
      <section id="mapa" className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-blue-600 tracking-wider uppercase">Naše působnost</h2>
            <p className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900">Jsme vám nablízku</p>
            <p className="mt-6 text-lg text-slate-600 leading-8">Naše hlavní sídlo a kanceláře najdete v Opavě a Ostravě. Působíme napříč Ostravským, Olomouckým a Zlínským  krajem.</p>
          </div>
          <Card className="overflow-hidden shadow-2xl border-slate-200/80">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Naše pobočky</h3>
                <div className="space-y-6">
                  <div className="flex gap-4"><div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Building className="h-6 w-6 text-blue-600" /></div><div><h4 className="font-semibold text-slate-800">Ostrava - hlavní sídlo společnosti</h4><p className="text-slate-600 text-sm">Čujkovova 1714/21, 702 00</p><p className="text-slate-500 text-xs mt-1">Po-Pá 8:00-17:00</p></div></div>
                  <div className="flex gap-4"><div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Briefcase className="h-6 w-6 text-green-600" /></div><div><h4 className="font-semibold text-slate-800">Opava - kancelář</h4><p className="text-slate-600 text-sm">Nákladní 471/32, 746 01</p><p className="text-slate-500 text-xs mt-1">Po-Pá 8:00-20:00</p></div></div>
                  <div className="flex gap-4"><div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><Wrench className="h-6 w-6 text-orange-600" /></div><div><h4 className="font-semibold text-slate-800">Jakartovice & Olomouc - sklady</h4><p className="text-slate-600 text-sm">Technické a materiálové zázemí</p><p className="text-slate-500 text-xs mt-1">Pouze pro interní účely</p></div></div>
                </div>
              </div>
              <div className="h-80 lg:h-auto min-h-[400px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4484.510035199729!2d18.237136604774975!3d49.79217936787458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e4ecf450b74f%3A0xd1e19997e75ce5a0!2s%C4%8Cujkovova%201714%2F21%2C%20700%2030%20Ostrava-jih-Z%C3%A1b%C5%99eh!5e0!3m2!1scs!2scz!4v1755345150839!5m2!1scs!2scz" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Sídlo společnosti SFERA PRO DOMOV"></iframe>                </div>
            </div>
          </Card>
        </div>
      </section>

      {/* --- SEKCE KONTAKTNÍ FORMULÁŘ - PŘEPRACOVANÁ --- */}
      <section id="kontaktni-formular" className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Levá část - Text */}
            <div className="max-w-md">
              {/* Logo firmy - velké a nad nadpisem */}
              <div className="mb-4 sm:mb-6">
                <Image 
                  src="/logo-sfera.svg" 
                  alt="SFERA PRO DOMOV" 
                  width={1600} 
                  height={1360} 
                  className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto hover:scale-105 transition-transform duration-500 hover:drop-shadow-2xl"
                />
              </div>
              <h2 className="text-sm sm:text-base font-semibold text-blue-600 tracking-wider uppercase animate-fade-in-up">Máte dotaz?</h2>
              <p className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-slate-900 animate-fade-in-up animation-delay-200 leading-tight">
                Pošlete nám zprávu
              </p>
              <p className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed animate-fade-in-up animation-delay-400">
                Vyplňte formulář a my se vám ozveme do 24 hodin s návrhem řešení. Konzultace je vždy nezávazná a zdarma.
              </p>
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 animate-fade-in-up animation-delay-600">
                {[
                  "Rychlá odpověď do 24 hodin",
                  "Nezávazná konzultace a nacenění",
                  "Profesionální a vstřícný přístup"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: `${700 + index * 100}ms` }}>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 animate-pulse hover:animate-bounce transition-all duration-300 flex-shrink-0" />
                    <span className="text-xs sm:text-sm md:text-base text-slate-700 hover:text-slate-900 transition-colors duration-300 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pravá část - Formulář a Trust Badges */}
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-2xl border border-slate-200/60">
                <h3 className="text-2xl font-bold mb-1 text-slate-800">Nezávazná poptávka</h3>
                <p className="text-slate-600 mb-6">Vyplňte formulář nebo nám rovnou zavolejte.</p>
                <ContactForm source="kontakt-page" />
                <Separator className="my-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}