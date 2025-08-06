import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <Image src="/logo-sfera.svg" alt="Sfera" width={120} height={40} className="h-8 w-auto" />
            <p className="text-sm text-muted-foreground">
              Profesionální klimatizace, tepelná čerpadla, rekuperace a elektroinstalace. Nadstandardní servis s důrazem
              na kvalitu a spolehlivost.
            </p>

            {/* Hodnocení */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium">5,0</span>
              <span className="text-xs text-muted-foreground">(120+ recenzí)</span>
            </div>

            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/klima_sfera"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Naše služby</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/klimatizace" className="text-muted-foreground hover:text-primary transition-colors">
                  Klimatizace
                </Link>
              </li>
              <li>
                <Link href="/tepelna-cerpadla" className="text-muted-foreground hover:text-primary transition-colors">
                  Tepelná čerpadla
                </Link>
              </li>
              <li>
                <Link href="/rekuperace" className="text-muted-foreground hover:text-primary transition-colors">
                  Rekuperace
                </Link>
              </li>
              <li>
                <Link href="/elektroinstalace" className="text-muted-foreground hover:text-primary transition-colors">
                  Elektroinstalace
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Společnost</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/reference" className="text-muted-foreground hover:text-primary transition-colors">
                  Reference
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <Link href="tel:+420735014112" className="hover:text-primary transition-colors">
                  +420 735 014 112
                </Link>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <Link href="mailto:info@klima-sfera.cz" className="hover:text-primary transition-colors">
                  info@klima-sfera.cz
                </Link>
              </div>
              <div className="flex items-start text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Nákladní 471/32</p>
                  <p>746 01 Opava</p>
                  <p>Česká republika</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 SFERA. Všechna práva vyhrazena.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="/gdpr" className="hover:text-primary transition-colors">
              GDPR
            </Link>
            <Link href="/obchodni-podminky" className="hover:text-primary transition-colors">
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
