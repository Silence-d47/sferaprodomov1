import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { 
  Sun, 
  ArrowRight,
  Clock
} from "lucide-react"

export default function FotovoltaikaPage() {
  return (
    <ThemeProvider theme="fotovoltaika">
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Fotovoltaika+Hero"
            alt="Fotovoltaika"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-600 opacity-90" />
        </div>
        <div className="relative z-10 flex items-center h-full">
          <div className="container">
            <div className="max-w-3xl text-white">
              <Badge className="mb-4 bg-white/20 text-white border-white/20">Fotovoltaika</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Fotovoltaické elektrárny
              </h1>
              <p className="text-xl mb-8 leading-relaxed drop-shadow-lg">
                Profesionální instalace fotovoltaických panelů s maximálním výkonem a návratností. 
                Ušetřete na energiích s vlastní čistou elektřinou.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-100" asChild>
                  <Link href="/kontakt">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMING SOON Section */}
      <section className="py-32 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Sun className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-yellow-600 mb-8">
              COMING SOON
            </h2>
            <p className="text-2xl text-yellow-700 mb-12 leading-relaxed">
              Připravujeme pro vás kompletní informace o fotovoltaických elektrárnách, 
              kalkulačky úspor a detailní průvodce instalací.
            </p>
            
            <div className="bg-yellow-100 rounded-2xl p-8 border-2 border-yellow-300 mb-12">
              <div className="flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-yellow-600 mr-3" />
                <span className="text-xl font-semibold text-yellow-800">Očekávané spuštění</span>
              </div>
              <p className="text-3xl font-bold text-yellow-700">Březen 2025</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">Kalkulačka úspor</h3>
                <p className="text-yellow-700">Vypočítejte si přesné úspory pro váš dům</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">3D vizualizace</h3>
                <p className="text-yellow-700">Podívejte se, jak bude fotovoltaika vypadat na vaší střeše</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">Online konfigurátor</h3>
                <p className="text-yellow-700">Sestavte si systém přesně podle vašich potřeb</p>
              </div>
            </div>

            <div className="bg-yellow-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Máte zájem už teď?</h3>
              <p className="text-xl mb-6">
                Kontaktujte nás pro nezávaznou konzultaci a předběžnou kalkulaci úspor.
              </p>
              <Button size="lg" className="bg-white text-yellow-700 hover:bg-yellow-100" asChild>
                <Link href="/kontakt">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Kontaktovat nás
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ThemeProvider>
  )
}