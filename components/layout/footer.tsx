import Link from "next/link"
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Zap, Shield, Award, Users, CheckCircle, Clock, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#123e61] text-gray-300"> {/* Jemnější hlavní modrá, základní text lehce šedý */}
    
      {/* Hlavní obsah footeru */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Sloupec 1: O nás */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">SFÉRA PRO DOMOV.CZ</h3>
            </Link>
            <p className="text-sm text-gray-400 mb-4">Rodinná firma z Moravskoslezského kraje.</p>
            <p className="mb-6 leading-relaxed">
              Váš specialista na klimatizace, tepelná čerpadla, rekuperace a moderní elektroinstalace.
            </p>
            {/* Klíčové výhody - přehlednější seznam */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Shield className="h-5 w-5 text-green-400 flex-shrink-0" /><span className="text-gray-200">záruka na práci 2 roky</span></li>
              <li className="flex items-center gap-3"><Award className="h-5 w-5 text-yellow-400 flex-shrink-0" /><span className="text-gray-200">Certifikovaný specialisté</span></li>
              <li className="flex items-center gap-3"><Users className="h-5 w-5 text-blue-400 flex-shrink-0" /><span className="text-gray-200">Přes 120 spokojených zákazníků</span></li>
              <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" /><span className="text-gray-200">Realizace do 14 dnů</span></li>
            </ul>
          </div>

          {/* Sloupec 2: Naše služby */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Naše služby</h4>
            <ul className="space-y-2">
              {[
                { href: "/klimatizace", label: "Klimatizace" },
                { href: "/tepelna-cerpadla", label: "Tepelná čerpadla" },
                { href: "/rekuperace", label: "Rekuperace" },
                { href: "/elektroinstalace", label: "Elektroinstalace" },
                { href: "/fotovoltaika", label: "Fotovoltaika" },
                { href: "/elektro-pohotovost", label: "Elektro pohotovost" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4 text-blue-400 transition-transform group-hover:translate-x-1" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sloupec 3: Rychlý kontakt */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Rychlý kontakt</h4>
            <div className="space-y-4">
              <a href="tel:+420735014112" className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                <div className="text-white font-medium group-hover:underline">+420 735 014 112</div>
              </a>
              <a href="mailto:info@sfera-pro-domov.cz" className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                <div className="text-white font-medium group-hover:underline">info@sfera-pro-domov.cz</div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Nákladní 471/32, Opava</div>
                  <div className="text-sm text-gray-400">Po - Pá 8:00 - 20:00</div>
                </div>
              </div>
            </div>
            {/* Hodnocení a recenze */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => ( <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> ))}
                </div>
                <span className="font-bold text-white">4.9 / 5</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 hover:bg-white/20 transition-colors text-gray-200 px-3 py-1.5 rounded-full">
                  Seznam.cz (65+ recenzí)
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 hover:bg-white/20 transition-colors text-gray-200 px-3 py-1.5 rounded-full">
                  Google (55+ recenzí)
                </a>
              </div>
            </div>
          </div>

          {/* Sloupec 4: Newsletter & Socials */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Akce a novinky</h4>
            <p className="text-sm text-gray-400 mb-4">
              Získejte slevy a tipy z oboru. Žádný spam, slibujeme.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Váš e-mail" 
                className="w-full bg-white/5 border border-white/20 px-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-500 transition-colors flex-shrink-0">
                Odebírat
              </button>
            </form>
            {/* Sociální sítě */}
            <div className="mt-8">
              <h5 className="text-base font-semibold text-white mb-3">Sledujte nás</h5>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-6 w-6" /></a>
                <a href="https://instagram.com/klima_sfera" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-6 w-6" /></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spodní pruh s copyrightem a odkazy */}
      <div className="bg-black/20 py-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-2">
            <p>&copy; {new Date().getFullYear()} SFÉRA PRO DOMOV s.r.o. | IČO: 21089230</p>
            <div className="flex items-center gap-x-4">
              <Link href="/obchodni-podminky" className="hover:text-white transition-colors">Obchodní podmínky</Link>
              <span className="text-gray-600">|</span>
              <Link href="/gdpr" className="hover:text-white transition-colors">Ochrana osobních údajů</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}