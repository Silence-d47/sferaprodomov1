"use client"

import { useState, useEffect } from "react"
import { X, Phone, Mail, MapPin, User, MessageSquare, CheckCircle, Clock, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThankYouPage } from "@/components/ui/thank-you-page"
import { useConversionMetrics, type ConversionData } from "@/hooks/use-conversion-metrics"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WelcomePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [conversionData, setConversionData] = useState<ConversionData | null>(null)
  const { saveConversion } = useConversionMetrics()

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: "", // Prázdné, protože jsme odstranili pole
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      zipCode: formData.get("zipCode") as string,
      source: "welcome-popup"
    }

    try {
      // Uložení konverze s metrikami
      const success = saveConversion(data)
      
      if (success) {
        // Vytvoření conversion data pro thank you stránku
        const conversionData: ConversionData = {
          ...data,
          name: "", // Prázdné, protože jsme odstranili pole
          phone: data.phone, // Telefon z formuláře
          timestamp: new Date(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
        }
        
        setConversionData(conversionData)
        setShowThankYou(true)
        
        // Reset formuláře
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error('Nepodařilo se uložit konverzi')
      }
    } catch (error) {
      console.error('Chyba při odesílání:', error)
      // Fallback na toast notifikaci při chybě
      alert('Formulář se nepodařilo odeslat. Zkuste to prosím znovu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleThankYouClose = () => {
    setShowThankYou(false)
    setConversionData(null)
    onClose()
  }

  if (!isOpen) return null

  // Zobrazení thank you stránky
  if (showThankYou && conversionData) {
    return (
      <ThankYouPage 
        conversionData={conversionData}
        onClose={handleThankYouClose}
      />
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop s rozmazaným pozadím */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose} 
      />
      
      {/* Popup */}
      <div className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-2xl mx-2 sm:mx-4 max-h-[90dvh] sm:max-h-[85vh] overflow-y-auto overscroll-contain transition-all duration-500 transform ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        {/* Zavírací tlačítko */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors group"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 group-hover:text-slate-800" />
        </button>

        {/* Obsah popupu */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Malý obrázek nahoře - proužek */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center shadow-lg">
              <Award className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
            </div>
          </div>

          {/* Hlavní nadpis */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Nechte si poradit od profíků a získejte 5% slevu
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              Nechte si od nás nezávazně a zdarma navrhnout ideální řešení pro vaši domácnost.
            </p>
          </div>

          {/* Klíčové výhody - odrážky */}
          <div className="mb-6 sm:mb-8">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700">Nezávazná konzultace a nacenění zdarma</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700">Návrhneme vám řešení na míru </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-slate-700">Garance 5% slevy na finální realizaci</span>
              </div>
            </div>
          </div>

          {/* Formulář - pro ukládání leadů */}
          <div className="bg-slate-50/70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
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
              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  placeholder="Váš email*"
                  required
                  className="h-10 sm:h-12 text-sm sm:text-base bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              
              <div className="relative">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Telefon*"
                  required
                  className="h-10 sm:h-12 text-sm sm:text-base bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 "
                />
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              
              <div className="relative">
                <Input
                  name="zipCode"
                  placeholder="PSČ (pro ověření lokality)*"
                  required
                  className="h-10 sm:h-12 text-sm sm:text-base bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg h-12 sm:h-14"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Chci konzultaci a slevu
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
