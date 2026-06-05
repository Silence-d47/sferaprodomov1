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
import { Loader2, Clock, Award, CheckCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const colorThemes = {
  blue: {
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    focus: 'focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500',
    gradient: 'from-blue-600 to-blue-500',
    icon: 'text-blue-500',
    hoverText: 'group-hover:text-blue-600',
    shadow: 'shadow-blue-500/30 hover:shadow-blue-500/40',
    link: 'hover:text-blue-600',
  },
  green: {
    primaryBg: 'bg-green-600',
    primaryHover: 'hover:bg-green-700',
    focus: 'focus:ring-2 focus:ring-green-500/50 focus:border-green-500',
    gradient: 'from-green-600 to-green-500',
    icon: 'text-green-500',
    hoverText: 'group-hover:text-green-600',
    shadow: 'shadow-green-500/30 hover:shadow-green-500/40',
    link: 'hover:text-green-600',
  },
  purple: {
    primaryBg: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    focus: 'focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500',
    gradient: 'from-purple-600 to-purple-500',
    icon: 'text-purple-500',
    hoverText: 'group-hover:text-purple-600',
    shadow: 'shadow-purple-500/30 hover:shadow-purple-500/40',
    link: 'hover:text-purple-600',
  },
  orange: {
    primaryBg: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    focus: 'focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500',
    gradient: 'from-orange-600 to-orange-500',
    icon: 'text-orange-500',
    hoverText: 'group-hover:text-orange-600',
    shadow: 'shadow-orange-500/30 hover:shadow-orange-500/40',
    link: 'hover:text-orange-600',
  },
  yellow: {
    primaryBg: 'bg-yellow-600',
    primaryHover: 'hover:bg-yellow-700',
    focus: 'focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500',
    gradient: 'from-yellow-600 to-yellow-500',
    icon: 'text-yellow-500',
    hoverText: 'group-hover:text-yellow-600',
    shadow: 'shadow-yellow-500/30 hover:shadow-yellow-500/40',
    link: 'hover:text-yellow-600',
  },
} as const;

type ColorTheme = keyof typeof colorThemes;

function TrustBadge({
  icon: Icon,
  title,
  subtitle,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  gradient: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-bold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

interface ContactFormSectionProps {
  source?: string;
  customHeading?: string;
  showTrustBadges?: boolean;
  color?: ColorTheme;
}

export function ContactFormSection({
  source = 'general',
  customHeading,
  showTrustBadges = true,
  color = 'blue',
}: ContactFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const theme = colorThemes[color];

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

    const scriptURL =
      'https://script.google.com/macros/s/AKfycbx-qf_oc0ftJqcPvfZSsYhnm37vu89MDHKtKw2TdATRRGNrG8mXboPol4sWXV9JDBKigQ/exec';

    try {
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

  return (
    <div className="bg-slate-50/70 rounded-3xl p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* --- LEVÁ ČÁST: Informace a důvěra --- */}
        <div className="lg:col-span-2 space-y-10 pt-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {customHeading || 'Nezávazná poptávka'}
            </h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              Vyplňte formulář a my se vám ozveme do 24 hodin s řešením na míru. Nebo nám rovnou
              zavolejte.
            </p>
          </div>

          {/* Kontaktní údaje */}
          <div className="space-y-4">
            <a href="tel:+420735014112" className="flex items-center gap-4 group">
              <Phone className={`h-5 w-5 ${theme.icon}`} />
              <span className={`font-medium text-slate-700 ${theme.hoverText} transition-colors`}>
                +420 735 014 112
              </span>
            </a>
            <a href="mailto:info@sfera-domov.cz" className="flex items-center gap-4 group">
              <Mail className={`h-5 w-5 ${theme.icon}`} />
              <span className={`font-medium text-slate-700 ${theme.hoverText} transition-colors`}>
                info@sfera-domov.cz
              </span>
            </a>
            <div className="flex items-center gap-4">
              <MapPin className={`h-5 w-5 ${theme.icon}`} />
              <span className="font-medium text-slate-700">Nákladní 471/32, Opava</span>
            </div>
          </div>

          {/* Trust Badges */}
          {showTrustBadges && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <TrustBadge
                icon={CheckCircle}
                title="Nezávazná konzultace"
                subtitle="Zdarma a bez závazků"
                gradient={theme.gradient}
              />
              <TrustBadge
                icon={Clock}
                title="Rychlá odpověď"
                subtitle="Reagujeme do 24 hodin"
                gradient={theme.gradient}
              />
              <TrustBadge
                icon={Award}
                title="Prodloužená záruka"
                subtitle="Až 5 let na naše instalace"
                gradient={theme.gradient}
              />
            </div>
          )}
        </div>

        {/* --- PRAVÁ ČÁST: Formulář --- */}
        <div className="lg:col-span-3 bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Jméno a příjmení</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Jan Novák"
                  className={theme.focus}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+420 123 456 789"
                  className={theme.focus}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vas@email.cz"
                  className={theme.focus}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">PSČ</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  required
                  placeholder="746 01"
                  className={theme.focus}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">O co máte zájem?</Label>
              <Select name="service" required>
                <SelectTrigger className={theme.focus}>
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
                rows={5}
                placeholder="Popište nám stručně vaši představu, na co se máme zaměřit, nebo na co se chcete zeptat..."
                className={`${theme.focus} resize-y`}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${theme.primaryBg} ${theme.primaryHover} text-white font-bold py-3 text-base rounded-lg shadow-lg ${theme.shadow} transition-all duration-300 flex items-center justify-center gap-2`}
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
              <Link href="/gdpr" className={`font-medium text-slate-600 ${theme.link} underline`}>
                zásadami ochrany os. údajů
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
