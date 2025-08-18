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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
      {/* Backdrop s rozmazaným pozadím */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} 
        onClick={onClose} 
      />
      
      {/* Popup - optimalizovaný pro mobilní zařízení */}
      <div className={`relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-sm md:max-w-md mx-2 sm:mx-4 max-h-[90vh] sm:max-h-[85vh] overflow-hidden transition-all duration-500 transform ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        {/* Zavírací tlačítko */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-all duration-300 group hover:scale-110 hover:rotate-90"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
        </button>

        {/* Obsah popupu - optimalizovaný pro mobilní zařízení */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Malý obrázek nahoře */}
          <div className="text-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center shadow-lg animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110 hover:shadow-xl">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
            </div>
          </div>

          {/* Hlavní nadpis - optimalizovaný pro mobilní zařízení */}
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-1 sm:mb-2 animate-fade-in-up leading-tight">
              Nechte si poradit od profíků a získejte 5% slevu
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xs sm:max-w-sm mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
              Nechte si od nás nezávazně a zdarma navrhnout ideální řešení pro vaši domácnost.
            </p>
          </div>

          {/* Klíčové výhody - optimalizované pro mobilní zařízení */}
          <div className="mb-3 sm:mb-4">
            <div className="space-y-1.5 sm:space-y-2">
              {[
                "Nezávazná konzultace a nacenění zdarma",
                "Návrhneme vám řešení na míru",
                "Garance 5% slevy na finální realizaci"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-1.5 sm:gap-2 animate-fade-in-left" style={{ animationDelay: `${300 + index * 100}ms` }}>
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0 animate-bounce" style={{ animationDelay: `${400 + index * 100}ms` }} />
                  <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulář - optimalizovaný pro mobilní zařízení */}
          <div className="bg-slate-50/70 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200 animate-fade-in-up animation-delay-500">
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              <div className="space-y-2 animate-fade-in-up animation-delay-600">
                <Select name="service">
                  <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm hover:scale-105 transition-transform duration-200">
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
              <div className="relative animate-fade-in-up animation-delay-700 group">
                <Input
                  name="email"
                  type="email"
                  placeholder="Váš email*"
                  required
                  className="h-9 sm:h-10 text-xs sm:text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                />
                <Mail className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              
              <div className="relative animate-fade-in-up animation-delay-800 group">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Telefon*"
                  required
                  className="h-9 sm:h-10 text-xs sm:text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                />
                <Phone className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              
              <div className="relative animate-fade-in-up animation-delay-900 group">
                <Input
                  name="zipCode"
                  placeholder="PSČ (pro ověření lokality)*"
                  required
                  className="h-9 sm:h-10 text-xs sm:text-sm bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                />
                <MapPin className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base h-10 sm:h-12 animate-fade-in-up animation-delay-1000 hover:animate-pulse"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-1.5 sm:mr-2" />
                    Odesílám...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-bounce" />
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
