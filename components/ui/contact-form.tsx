"use client"

import Link from "next/link"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Shield, Clock, Award, CheckCircle } from "lucide-react"

type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'yellow'

interface ContactFormProps {
  title?: string
  subtitle?: string
  source?: string // Pro měřitelnost různých reklam
  colorTheme?: ColorTheme
  customHeading?: string
  showTrustBadges?: boolean
}

export function ContactForm({ 
  title = "Kontaktujte nás", 
  subtitle, 
  source = "general",
  colorTheme = 'blue',
  customHeading,
  showTrustBadges = true 
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Color theme configurations
  const themeConfig = {
    blue: {
      primary: 'text-[#1B5D93]',
      primaryBg: 'bg-gradient-to-r from-[#1B5D93] to-[#2D78AD]',
      primaryHover: 'hover:from-[#2D78AD] hover:to-[#49A3D7]',
      focus: 'focus:border-[#1B5D93]',
      gradient: 'from-[#1B5D93] to-[#2D78AD]'
    },
    green: {
      primary: 'text-green-600',
      primaryBg: 'bg-green-600',
      primaryHover: 'hover:bg-green-700',
      focus: 'focus:border-green-600',
      gradient: 'from-green-600 to-emerald-600'
    },
    purple: {
      primary: 'text-purple-600',
      primaryBg: 'bg-purple-600',
      primaryHover: 'hover:bg-purple-700',
      focus: 'focus:border-purple-600',
      gradient: 'from-purple-600 to-violet-600'
    },
    orange: {
      primary: 'text-orange-600',
      primaryBg: 'bg-orange-600',
      primaryHover: 'hover:bg-orange-700',
      focus: 'focus:border-orange-600',
      gradient: 'from-orange-600 to-red-600'
    },
    yellow: {
      primary: 'text-yellow-600',
      primaryBg: 'bg-yellow-500',
      primaryHover: 'hover:bg-yellow-600',
      focus: 'focus:border-yellow-500',
      gradient: 'from-yellow-500 to-amber-600'
    }
  }

  const theme = themeConfig[colorTheme]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      source: source, // Pro tracking různých formulářů
    }

    try {
      // Zde by byla integrace s CMS/backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Zpráva odeslána!",
        description: "Děkujeme za vaši poptávku. Ozveme se vám do 24 hodin.",
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      toast({
        title: "Chyba při odesílání",
        description: "Zkuste to prosím znovu nebo nás kontaktujte telefonicky.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Custom Heading Section */}
      {customHeading && (
        <div className="text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            {customHeading}
          </h2>
        </div>
      )}
      
      {/* Trust Badges */}
      {showTrustBadges && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5D93] to-[#2D78AD] rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-900">Zdarma</p>
            <p className="text-xs text-gray-600">konzultace</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5D93] to-[#2D78AD] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-900">24h</p>
            <p className="text-xs text-gray-600">odpověď</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5D93] to-[#2D78AD] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Award className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-900">5 let</p>
            <p className="text-xs text-gray-600">záruka</p>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1B5D93] to-[#2D78AD] rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-900">GDPR</p>
            <p className="text-xs text-gray-600">ochrana</p>
          </div>
        </div>
      )}
      
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-[#1B5D93]">{title}</CardTitle>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Jméno a příjmení *
              </Label>
              <Input
                id="name"
                name="name"
                required
                className={`border-gray-200 ${theme.focus}`}
                placeholder="Jan Novák"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className={`border-gray-200 ${theme.focus}`}
                placeholder="jan@email.cz"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Telefon *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                className={`border-gray-200 ${theme.focus}`}
                placeholder="+420 123 456 789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium">
                Služba
              </Label>
              <Select name="service">
                <SelectTrigger className={`border-gray-200 ${theme.focus}`}>
                  <SelectValue placeholder="Vyberte službu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="klimatizace">Klimatizace</SelectItem>
                  <SelectItem value="tepelna-cerpadla">Tepelná čerpadla</SelectItem>
                  <SelectItem value="rekuperace">Rekuperace</SelectItem>
                  <SelectItem value="elektroinstalace">Elektroinstalace</SelectItem>
                  <SelectItem value="servis">Servis</SelectItem>
                  <SelectItem value="jine">Jiné</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Zpráva *
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              required
              className={`border-gray-200 ${theme.focus} resize-none`}
              placeholder="Popíšte nám váš požadavek..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#1B5D93] to-[#2D78AD] hover:from-[#2D78AD] hover:to-[#49A3D7] text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Odesílání...
              </>
            ) : (
              "Odeslat nezávaznou poptávku"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Odesláním souhlasíte se zpracováním osobních údajů podle{" "}
            <Link href="/gdpr" className="text-[#1B5D93] hover:underline">
              GDPR
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}
