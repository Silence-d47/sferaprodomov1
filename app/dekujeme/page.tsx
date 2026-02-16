import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AutoRedirect } from "@/components/ui/auto-redirect"

export const metadata: Metadata = {
  title: "Děkujeme za vaši poptávku | SFÉRA-DOMOV.CZ",
  description:
    "Vaše zpráva byla úspěšně odeslána. Do 24 hodin se vám ozveme s konkrétním řešením na míru.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function DekujemePage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/90 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-200/70 dark:border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Děkujeme za vaši poptávku.
                </h1>
                <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Vaše zpráva byla úspěšně odeslána.
                  <br />
                  Do 24 hodin se vám ozveme s konkrétním řešením na míru.
                </p>
                <p className="mt-4 text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                  Právě jste udělali první krok k pohodlnějšímu a úspornějšímu domovu.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/40 p-5 sm:p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Co bude následovat?</h2>
                <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-200">
                  <li>Ozveme se vám telefonicky nebo e-mailem</li>
                  <li>Upřesníme detaily a vaše požadavky</li>
                  <li>Připravíme návrh řešení a cenovou nabídku</li>
                  <li>Domluvíme možný termín realizace</li>
                </ol>
              </div>

              <div className="mt-8 rounded-xl bg-white dark:bg-slate-950/30 border border-slate-200/60 dark:border-slate-700/40 p-5 sm:p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                  Potřebujete něco doplnit hned?
                </h3>

                <div className="grid gap-3">
                  <a
                    href="tel:+420735014112"
                    className="flex items-center gap-3 rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-800 dark:text-slate-100">+420 735 014 112</span>
                  </a>

                  <a
                    href="mailto:info@sfera-domov.cz"
                    className="flex items-center gap-3 rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-slate-800 dark:text-slate-100">info@sfera-domov.cz</span>
                  </a>

                  <div className="flex items-start gap-3 rounded-lg border border-slate-200/70 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-slate-800 dark:text-slate-100">
                      <div className="font-semibold">Nákladní 471/32, Opava</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        Jsme k dispozici Po – Ne 8:00 – 20:00.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-slate-700/40">
                  <div className="text-center">
                    <div className="font-extrabold tracking-wide text-slate-900 dark:text-white">
                      SFÉRA-DOMOV.CZ
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Váš specialista na klimatizace, tepelná čerpadla, rekuperace a moderní elektroinstalace.
                    </p>
                    <p className="mt-3 text-slate-700 dark:text-slate-200 font-medium">
                      Děkujeme za důvěru. Ozveme se brzy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/kontakt">
                    Kontakt
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">Zpět na úvod</Link>
                </Button>
              </div>

              <div className="mt-4">
                <AutoRedirect to="/" seconds={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

