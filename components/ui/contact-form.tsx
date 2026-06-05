'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { appendUtmToFormData } from '@/lib/utm-params';
import { submitLeadToSanity } from '@/lib/submit-lead';
import { Loader2, ArrowRight } from 'lucide-react';

// Props jsou zjednodušené. Komponenta se stará pouze o formulář.
interface ContactFormProps {
  source?: string;
}

export function ContactForm({ source = 'general' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      zipCode: formData.get('zipCode') as string,
      service: (formData.get('service') as string) || source,
      message: (formData.get('message') as string) || '',
      source: source,
    };

    // URL vašeho Google Apps Scriptu - stejný jako u welcome popupu
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbx-qf_oc0ftJqcPvfZSsYhnm37vu89MDHKtKw2TdATRRGNrG8mXboPol4sWXV9JDBKigQ/exec';

    try {
      // Vytvoříme FormData pro odeslání na Google Script
      const googleFormData = new FormData();
      googleFormData.append('email', data.email);
      googleFormData.append('phone', data.phone);
      googleFormData.append('name', data.name);
      googleFormData.append('zipCode', data.zipCode);
      googleFormData.append('service', data.service);
      googleFormData.append('message', data.message);
      googleFormData.append('source', data.source);
      appendUtmToFormData(googleFormData);

      void submitLeadToSanity(data);

      const response = await fetch(scriptURL, {
        method: 'POST',
        body: googleFormData,
      });

      if (!response.ok) {
        throw new Error('Chyba při odesílání na server.');
      }

      // Úspěšné odeslání
      toast({
        title: 'Poptávka úspěšně odeslána!',
        description: 'Děkujeme, brzy se vám ozveme s dalšími kroky.',
      });
      form.reset();
      router.push('/dekujeme');
    } catch (error) {
      console.error('Chyba při odesílání:', error);
      toast({
        title: 'Něco se pokazilo',
        description: 'Formulář se nepodařilo odeslat. Zkuste to prosím znovu.',
        variant: 'destructive',
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" required placeholder="vas@email.cz" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">PSČ</Label>
          <Input id="zipCode" name="zipCode" required placeholder="746 01" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">O co máte zájem?</Label>
        <Select name="service" required>
          <SelectTrigger>
            <SelectValue placeholder="Vyberte službu" />
          </SelectTrigger>
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
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Popište nám stručně vaši představu, na co se máme zaměřit, nebo na co se chcete zeptat..."
          className="resize-y"
        />
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
        Odesláním formuláře souhlasíte s našimi{' '}
        <Link href="/gdpr" className="font-medium text-slate-600 hover:text-blue-600 underline">
          zásadami ochrany os. údajů
        </Link>
        .
      </p>
    </form>
  );
}
