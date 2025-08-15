"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, Calendar, Source, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConversionMetrics, type ConversionMetrics, type ConversionData } from "@/hooks/use-conversion-metrics"

export function ConversionDashboard() {
  const { getMetrics } = useConversionMetrics()
  const [metrics, setMetrics] = useState<ConversionMetrics>(getMetrics())
  const [conversions, setConversions] = useState<ConversionData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  useEffect(() => {
    loadData()
  }, [selectedPeriod])

  const loadData = () => {
    setIsLoading(true)
    try {
      const newMetrics = getMetrics()
      setMetrics(newMetrics)
      
      // Načtení detailních dat
      const conversionsData = localStorage.getItem('sfera-conversions')
      if (conversionsData) {
        const allConversions: ConversionData[] = JSON.parse(conversionsData)
        const filteredConversions = filterConversionsByPeriod(allConversions, selectedPeriod)
        setConversions(filteredConversions)
      }
    } catch (error) {
      console.error('Chyba při načítání dat:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterConversionsByPeriod = (data: ConversionData[], period: string) => {
    const now = new Date()
    const filterDate = new Date()
    
    switch (period) {
      case '7d':
        filterDate.setDate(now.getDate() - 7)
        break
      case '30d':
        filterDate.setDate(now.getDate() - 30)
        break
      case '90d':
        filterDate.setDate(now.getDate() - 90)
        break
      case 'all':
        return data
    }
    
    return data.filter(conv => new Date(conv.timestamp) >= filterDate)
  }

  const exportData = () => {
    try {
      const dataStr = JSON.stringify(conversions, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `sfera-conversions-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Chyba při exportu:', error)
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getConversionRate = () => {
    // Simulace conversion rate (v reálné aplikaci byste měli data o návštěvnících)
    const totalVisitors = conversions.length * 20 // Odhad
    return totalVisitors > 0 ? ((conversions.length / totalVisitors) * 100).toFixed(2) : '0.00'
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Konverzní Dashboard</h2>
          <p className="text-slate-600">Přehled konverzí a výkonnosti formulářů</p>
        </div>
        
        <div className="flex gap-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 focus:border-blue-500 focus:ring-blue-500/50"
          >
            <option value="7d">Posledních 7 dní</option>
            <option value="30d">Posledních 30 dní</option>
            <option value="90d">Posledních 90 dní</option>
            <option value="all">Všechny</option>
          </select>
          
          <Button
            onClick={loadData}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Obnovit
          </Button>
          
          <Button
            onClick={exportData}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Klíčové metriky */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Celkem konverzí</p>
              <p className="text-3xl font-bold text-blue-800">{metrics.totalConversions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Konverzní poměr</p>
              <p className="text-3xl font-bold text-green-800">{getConversionRate()}%</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Aktivní zdroje</p>
              <p className="text-3xl font-bold text-purple-800">
                {Object.keys(metrics.conversionsBySource).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <Source className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Dny s konverzemi</p>
              <p className="text-3xl font-bold text-orange-800">
                {Object.keys(metrics.conversionsByDate).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Konverze podle zdroje */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Konverze podle zdroje</h3>
          <div className="space-y-3">
            {Object.entries(metrics.conversionsBySource).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-700">{getSourceLabel(source)}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(count / metrics.totalConversions) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-semibold text-blue-600 min-w-[3rem] text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Konverze podle data</h3>
          <div className="space-y-3">
            {Object.entries(metrics.conversionsByDate)
              .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
              .slice(0, 7)
              .map(([date, count]) => (
                <div key={date} className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-700">{formatDate(date)}</span>
                  <span className="font-semibold text-green-600">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Detailní seznam konverzí */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Poslední konverze</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-slate-600 font-medium">Datum</th>
                <th className="text-left p-3 text-slate-600 font-medium">Jméno</th>
                <th className="text-left p-3 text-slate-600 font-medium">Email</th>
                <th className="text-left p-3 text-slate-600 font-medium">Zdroj</th>
                <th className="text-left p-3 text-slate-600 font-medium">PSČ</th>
                <th className="text-left p-3 text-slate-600 font-medium">UTM</th>
              </tr>
            </thead>
            <tbody>
              {conversions
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 10)
                .map((conv, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-white">
                    <td className="p-3 text-sm text-slate-700">{formatDate(conv.timestamp.toString())}</td>
                    <td className="p-3 text-sm text-slate-700">{conv.name}</td>
                    <td className="p-3 text-sm text-slate-700">{conv.email}</td>
                    <td className="p-3 text-sm text-slate-700">{getSourceLabel(conv.source)}</td>
                    <td className="p-3 text-sm text-slate-700">{conv.zipCode}</td>
                    <td className="p-3 text-sm text-slate-700">
                      {conv.utmCampaign ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {conv.utmCampaign}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
