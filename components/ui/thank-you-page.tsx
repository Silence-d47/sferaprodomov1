"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Phone, Mail, MapPin, Clock, ArrowRight, Download, Star, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConversionMetrics, type ConversionData } from "@/hooks/use-conversion-metrics"
import Link from "next/link"

interface ThankYouPageProps {
  conversionData: ConversionData | null
  onClose?: () => void
}

export function ThankYouPage({ conversionData, onClose }: ThankYouPageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      'welcome-popup': 'Uvítací popup',
      'contact-form': 'Kontaktní formulář',
      'service-page': 'Stránka služby',
      'general': 'Obecný formulář'
    }
    return labels[source] || source
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-[95vw] sm:max-w-2xl w-full mx-2 sm:mx-4 overflow-hidden animate-fade-in-up">
        {/* Zavírací tlačítko */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-all duration-300 group hover:scale-110 hover:rotate-90"
          >
            <span className="sr-only">Zavřít</span>
            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 group-hover:text-slate-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-4 sm:p-5 md:p-6 lg:p-8">
          {/* Hlavní thank you sekce */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 animate-fade-in-up leading-tight">
              Děkujeme za váš zájem! 🎯
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-sm sm:max-w-xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
              Vaše poptávka byla úspěšně odeslána. Naše odborná konzultace je zdarma a brzy se vám ozveme.
            </p>
          </div>

          {/* Informace o konverzi */}
          {conversionData && (
            <div className="bg-slate-50/70 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-slate-200 animate-fade-in-up animation-delay-300">
              <h3 className="text-sm sm:text-base font-semibold text-slate-800 mb-2 sm:mb-3">Detaily vaší poptávky</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="animate-fade-in-left animation-delay-400">
                  <span className="text-slate-600">Zdroj:</span>
                  <span className="ml-1.5 sm:ml-2 font-medium text-slate-800">{getSourceLabel(conversionData.source)}</span>
                </div>
                <div className="animate-fade-in-right animation-delay-500">
                  <span className="text-slate-600">Čas odeslání:</span>
                  <span className="ml-1.5 sm:ml-2 font-medium text-slate-800">
                    {formatDate(conversionData.timestamp.toString())}
                  </span>
                </div>
                {conversionData.utmCampaign && (
                  <div className="sm:col-span-2 animate-fade-in-up animation-delay-600">
                    <span className="text-slate-600">Kampaň:</span>
                    <span className="ml-1.5 sm:ml-2 font-medium text-slate-800">{conversionData.utmCampaign}</span>
                  </div>
                )}
              </div>
            </div>
          )}

       
          {/* Call to action tlačítka */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center animate-fade-in-up animation-delay-700">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base h-10 sm:h-12 hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <Link href="/kontakt">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-pulse" />
                Zavolejte nám
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base h-10 sm:h-12 hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <Link href="/reference">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-bounce" />
                Prohlédnout reference
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
