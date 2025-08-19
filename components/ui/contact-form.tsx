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
import { Loader2, ArrowRight } from "lucide-react"

// Props jsou zjednodušené. Komponenta se stará pouze o formulář.
interface ContactFormProps {
  source?: string
}

export function ContactForm({ source = "general" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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

  // Komponenta nyní vrací přímo formulář, bez nadbytečných obalů.
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Jméno a příjmení</Label>
          <Input id="name" name="name" required placeholder="Jan Novák" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="+420 123 456 789" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" required placeholder="vas@email.cz" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">O co máte zájem?</Label>
        <Select name="service">
          <SelectTrigger><SelectValue placeholder="Vyberte službu" /></SelectTrigger>
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
        <Textarea id="message" name="message" rows={4} placeholder="Popište nám stručně vaši představu, na co se máme zaměřit, nebo na co se chcete zeptat..." className="resize-y" />
      </div>

      <div className="pt-2">
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
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
  )
}