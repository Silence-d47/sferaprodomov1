"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Shield, Clock, Award, CheckCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

// Tento komponent je nyní menší a čistší
function TrustBadge({ icon: Icon, title, subtitle, theme }: { icon: any, title: string, subtitle: string, theme: any }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.gradient}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-bold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  )
}

// Props zůstávají stejné pro zpětnou kompatibilitu
interface ContactFormProps {
  title?: string
  subtitle?: string
  source?: string
  customHeading?: string
  showTrustBadges?: boolean
}

export function ContactForm({ 
  title = "Napište nám", 
  subtitle = "Rádi vám připravíme nabídku na míru.", 
  source = "general",
  customHeading,
  showTrustBadges = true 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Zjednodušená barevná schémata, hlavní barva je modrá
  const theme = {
    primary: 'text-blue-600',
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    focus: 'focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
    gradient: 'from-blue-600 to-blue-500'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // URL vašeho Google skriptu - stejná jako u pop-upu
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxpEjOr45h3ErID2_GKH7dmeSy4nwLq8dCj_m9tnJqqC8snPQwMabH7kquuWIs4OCc-eg/exec';
    const form = e.currentTarget;
  
    try {
      // Nahrazujeme simulaci skutečným odesláním dat na Google Script
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
      });
  
      // Zkontrolujeme, zda odeslání proběhlo úspěšně
      if (!response.ok) {
        throw new Error('Chyba při odesílání na server.');
      }
  
      // Vše je v pořádku, zobrazíme úspěšnou notifikaci
      toast({
        title: "Poptávka úspěšně odeslána!",
        description: "Děkujeme, brzy se vám ozveme s dalšími kroky.",
      });
      form.reset(); // Vyčistíme formulář
  
    } catch (error) {
      console.error('Chyba při odesílání:', error);
      // V případě chyby zobrazíme chybovou notifikaci
      toast({
        title: "Něco se pokazilo",
        description: "Formulář se nepodařilo odeslat. Zkuste to prosím znovu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-slate-50/70 rounded-3xl p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* --- LEVÁ ČÁST: Informace a důvěra --- */}
        <div className="lg:col-span-2 space-y-10 pt-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">{customHeading || "Nezávazná poptávka"}</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Vyplňte formulář a my se vám ozveme do 24 hodin s řešením na míru. Nebo nám rovnou zavolejte.
            </p>
          </div>
          
          {/* Kontaktní údaje */}
          <div className="space-y-4">
            <a href="tel:+420735014112" className="flex items-center gap-4 group">
              <Phone className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">+420 735 014 112</span>
            </a>
            <a href="mailto:info@sfera-pro-domov.cz" className="flex items-center gap-4 group">
              <Mail className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">info@sfera-pro-domov.cz</span>
            </a>
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-slate-700">Nákladní 471/32, Opava</span>
            </div>
          </div>
          
          {/* Trust Badges - nový, čistší styl */}
          {showTrustBadges && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <TrustBadge icon={CheckCircle} title="Nezávazná konzultace" subtitle="Zdarma a bez závazků" theme={theme} />
              <TrustBadge icon={Clock} title="Rychlá odpověď" subtitle="Reagujeme do 24 hodin" theme={theme} />
              <TrustBadge icon={Award} title="Prodloužená záruka" subtitle="Až 5 let na naše instalace" theme={theme} />
            </div>
          )}
        </div>

        {/* --- PRAVÁ ČÁST: Formulář --- */}
        <div className="lg:col-span-3 bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Jméno a příjmení</Label>
                <Input id="name" name="name" required placeholder="Jan Novák" className={theme.focus} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="+420 123 456 789" className={theme.focus} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required placeholder="vas@email.cz" className={theme.focus} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">O co máte zájem?</Label>
              <Select name="service">
                <SelectTrigger className={theme.focus}><SelectValue placeholder="Vyberte službu" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="klimatizace">Klimatizace</SelectItem>
                  <SelectItem value="tepelna-cerpadla">Tepelná čerpadla</SelectItem>
                  <SelectItem value="rekuperace">Rekuperace</SelectItem>
                  <SelectItem value="elektroinstalace">Elektroinstalace</SelectItem>
                  <SelectItem value="fotovoltaika">Fotovoltaika</SelectItem>
                  <SelectItem value="servis">Servis a revize</SelectItem>
                  <SelectItem value="jine">Jiný dotaz</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Vaše zpráva</Label>
              <Textarea id="message" name="message" rows={5} placeholder="Popište nám stručně vaši představu, na co se máme zaměřit, nebo na co se chcete zeptat..." className={`${theme.focus} resize-y`} />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting} className={`w-full ${theme.primaryBg} ${theme.primaryHover} text-white font-bold py-3 text-base rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2`}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    Odeslat nezávaznou poptávku
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-slate-500 text-center pt-2">
              Odesláním formuláře souhlasíte s našimi <Link href="/gdpr" className="font-medium text-slate-600 hover:text-blue-600 underline">zásadami ochrany os. údajů</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}