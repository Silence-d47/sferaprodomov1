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
  const { getMetrics } = useConversionMetrics()
  const [metrics, setMetrics] = useState(getMetrics())
  const [showMetrics, setShowMetrics] = useState(false)

  useEffect(() => {
    // Aktualizace metrik při mount
    setMetrics(getMetrics())
  }, [getMetrics])

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Zavírací tlačítko */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 hover:bg-slate-100 rounded-full transition-colors group"
          >
            <span className="sr-only">Zavřít</span>
            <svg className="h-6 w-6 text-slate-600 group-hover:text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="p-8 lg:p-12">
          {/* Hlavní thank you sekce */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Děkujeme za váš zájem! 🎯
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Vaše poptávka byla úspěšně odeslána. Naše odborná konzultace je zdarma a brzy se vám ozveme.
            </p>
          </div>

          {/* Informace o konverzi */}
          {conversionData && (
            <div className="bg-slate-50/70 rounded-2xl p-6 mb-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Detaily vaší poptávky</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Zdroj:</span>
                  <span className="ml-2 font-medium text-slate-800">{getSourceLabel(conversionData.source)}</span>
                </div>
                <div>
                  <span className="text-slate-600">Čas odeslání:</span>
                  <span className="ml-2 font-medium text-slate-800">
                    {formatDate(conversionData.timestamp.toString())}
                  </span>
                </div>
                {conversionData.utmCampaign && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-600">Kampaň:</span>
                    <span className="ml-2 font-medium text-slate-800">{conversionData.utmCampaign}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Další kroky */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-800 mb-3">Co bude následovat?</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Do 24 hodin se vám ozveme s návrhem řešení na míru a termínem bezplatné konzultace.
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-green-800 mb-3">Máte dotaz?</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Zavolejte nám rovnou na +420 735 014 112 nebo napište na info@sfera-pro-domov.cz
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-purple-800 mb-3">Užitečné materiály</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Stáhněte si naše ceníky a technické specifikace pro lepší orientaci.
              </p>
            </div>
          </div>

          {/* Call to action tlačítka */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl text-lg h-14">
              <Link href="/kontakt">
                <Phone className="h-5 w-5 mr-2" />
                Zavolejte nám
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-semibold py-4 px-8 rounded-xl text-lg h-14">
              <Link href="/reference">
                <Star className="h-5 w-5 mr-2" />
                Prohlédnout reference
              </Link>
            </Button>
          </div>

          {/* Metriky pro adminy (skryté pro běžné uživatele) */}
          <div className="border-t border-slate-200 pt-8">
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium mx-auto"
            >
              <TrendingUp className="h-4 w-4" />
              {showMetrics ? 'Skrýt' : 'Zobrazit'} metriky
            </button>
            
            {showMetrics && (
              <div className="mt-6 bg-slate-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 text-center">Konverzní metriky</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{metrics.totalConversions}</div>
                    <div className="text-sm text-slate-600">Celkem konverzí</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {Object.keys(metrics.conversionsBySource).length}
                    </div>
                    <div className="text-sm text-slate-600">Aktivní zdroje</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {Object.keys(metrics.conversionsByDate).length}
                    </div>
                    <div className="text-sm text-slate-600">Dny s konverzemi</div>
                  </div>
                </div>

                {/* Konverze podle zdroje */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-slate-700">Konverze podle zdroje:</h5>
                  {Object.entries(metrics.conversionsBySource).map(([source, count]) => (
                    <div key={source} className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-slate-700">{getSourceLabel(source)}</span>
                      <span className="font-semibold text-blue-600">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
