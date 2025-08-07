"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

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

  return (
    <header className="absolute left-0 right-0 z-50 mx-4 bg-transparent backdrop-blur-none top-20">
      <div className="container flex h-18 items-center justify-between px-8">
        {/* SFERA DOMOV - Left */}
        <div className="flex-1">
          <Link href="/" className="flex items-center">
            <span className="text-white text-xl font-semibold drop-shadow-lg">SFÉRA PRO DOMOV.CZ</span>
          </Link>
        </div>

        {/* Desktop Navigation - Right side */}
        <div className="flex-1 flex justify-end">
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-normal text-white drop-shadow-lg px-4 py-2 rounded-lg whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white drop-shadow-lg">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/95 backdrop-blur-md border-l border-gray-200/50">
              <nav className="flex flex-col space-y-2 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100/30 py-3 px-4 rounded-lg"
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
