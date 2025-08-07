import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Zap, Shield, Award, Users, CheckCircle, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1B5D93] text-white">
      {/* Red Header Bar */}
      <div className="bg-red-600 py-4">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-white" />
              <div>
                <div className="font-bold text-white">24h ELEKTRO POHOTOVOST</div>
                <div className="text-white/90 text-sm">Opava ± 25km • Okamžitý výjezd</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">+420 735 014 112</div>
              </div>
              <div className="bg-white text-red-600 px-4 py-2 rounded text-sm font-bold">
                NONSTOP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: SFERA PRO DOMOV */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-white" />
              <h3 className="text-xl font-bold text-white">SFERA PRO DOMOV</h3>
            </div>
            <p className="text-white/90 text-sm mb-2">Rodinná firma z Ostravy</p>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Specializujeme se na klimatizace, tepelná čerpadla, rekuperace a elektroinstalace. 
              Komplexní služby s 5letou zárukou a 24h pohotovostí.
            </p>
            
            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-white text-sm font-medium">5 let záruka</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-white text-sm font-medium">Certifikováno</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">120+ zákazníků</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white text-sm font-medium">Montáž do 14 dnů</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Naše služby */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Naše služby</h3>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link href="/klimatizace" className="text-sm hover:text-white transition-colors">
                  Klimatizace
                </Link>
              </li>
              <li>
                <Link href="/tepelna-cerpadla" className="text-sm hover:text-white transition-colors">
                  Tepelná čerpadla
                </Link>
              </li>
              <li>
                <Link href="/rekuperace" className="text-sm hover:text-white transition-colors">
                  Rekuperace
                </Link>
              </li>
              <li>
                <Link href="/elektroinstalace" className="text-sm hover:text-white transition-colors">
                  Elektroinstalace
                </Link>
              </li>
              <li>
                <Link href="/fotovoltaika" className="text-sm hover:text-white transition-colors">
                  Fotovoltaika
                </Link>
              </li>
              <li>
                <Link href="/elektro-pohotovost" className="text-sm hover:text-white transition-colors">
                  24h Elektro pohotovost
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontakt */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Kontakt</h3>
            <div className="space-y-3 text-white/90">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-white" />
                <div>
                  <div className="text-sm font-medium">+420 735 014 112</div>
                  <div className="text-xs text-white/70">Po-Pá: 8:00-17:00</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white" />
                <div className="text-sm">info@sfera-pro-domov.cz</div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm">Nákladní 471/32</div>
                  <div className="text-sm">746 01 Opava</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-white" />
                <div>
                  <div className="text-sm">Po-Pá: 8:00-17:00</div>
                  <div className="text-sm">So: 9:00-12:00</div>
                  <div className="text-sm">Ne: zavřeno</div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white">4.9</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">
                    Seznam.cz (65 recenzí)
                  </button>
                  <button className="bg-gray-600 text-white text-xs px-3 py-1 rounded">
                    Google (55 recenzí)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
            <p className="text-white/90 text-sm mb-4">
              Přihlaste se k odběru novinek a získejte slevu 10% na první objednávku.
            </p>
            
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="Váš e-mail" 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded text-sm placeholder-gray-400"
              />
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Přihlásit se
              </button>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-white/90 text-sm">Sledujte nás</span>
              </div>
              <div className="flex gap-3">
                <Link href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Facebook className="h-4 w-4 text-[#1B5D93]" />
                </Link>
                <Link href="https://instagram.com/klima_sfera" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Instagram className="h-4 w-4 text-[#1B5D93]" />
                </Link>
                <Link href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Linkedin className="h-4 w-4 text-[#1B5D93]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-[#0f3d5f] py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white/80">
            <p>&copy; 2024 SFERA PRO DOMOV s.r.o. Všechna práva vyhrazena.</p>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <Link href="/obchodni-podminky" className="hover:text-white transition-colors">
                Obchodní podmínky
              </Link>
              <div className="w-px h-4 bg-white/30"></div>
              <Link href="/gdpr" className="hover:text-white transition-colors">
                GDPR
              </Link>
              <div className="w-px h-4 bg-white/30"></div>
              <span>IČO: 12345678</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
