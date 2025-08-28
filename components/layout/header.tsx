"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import z from "zod"

const navigation = [
  { name: "Klimatizace", href: "/klimatizace" },
  { name: "Tepelná čerpadla", href: "/tepelna-cerpadla" },
  { name: "Rekuperace", href: "/rekuperace" },
  { name: "Elektroinstalace", href: "/elektroinstalace" },
  { name: "Fotovoltaika", href: "/fotovoltaika" },
  { name: "Reference", href: "/reference" },
  { name: "Blog", href: "/blog" },
  { name: "Kontakt", href: "/kontakt" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Změna stylu po odscrollování hero sekce
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120)
    }
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
      <header className={`${scrolled ? 'bg-white/30 backdrop-blur-md backdrop-saturate-120 shadow-xl' : 'bg-transparent backdrop-blur-lg'} hidden lg:block fixed top-[70px] md:top-[70px] z-40 left-0 right-0 transition-all duration-300`}>
      <div className="container mx-auto px-2 md:px-4 flex h-12 md:h-16 items-center justify-between max-w-7xl">
      
        {/* Desktop Navigation - Right side */}
        <div className="flex flex-1 justify-end">
          <nav className="hidden lg:flex items-center space-x-0.5">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className={`text-sm font-normal px-1 py-1 rounded-lg whitespace-nowrap transition-all duration-300 hover:scale-105 ${scrolled ? 'text-gray-900 hover:text-blue-800' : 'text-white drop-shadow-lg hover:text-blue-200'}`}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <span className="text-white/60 mx-1">|</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-1">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden" data-header-sheet-trigger>
              <Button variant="ghost" size="icon" className={`${scrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'}`}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[350px] bg-white/95 backdrop-blur-md border-l border-gray-200/50">
              <nav className="flex flex-col space-y-1 mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-700 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100/30 py-3 px-3 rounded-lg border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild className="mt-6 bg-[#1B5D93]/80 text-white hover:bg-[#1B5D93]/90 transition-all duration-300 rounded-lg backdrop-blur-sm">
                  <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                    Kontaktujte nás
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
