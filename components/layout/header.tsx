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
    <header className="absolute left-0 right-0 z-50 mx-2 md:mx-4 bg-transparent backdrop-blur-none top-20 md:top-24">
      <div className="container flex h-16 md:h-18 items-center justify-between px-4 md:px-8">
        {/* SFERA DOMOV - Left */}
        <div className="flex-1">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-white text-2xl md:text-4xl font-semibold drop-shadow-lg leading-tight">S F É R A</span>
            <span className="text-white text-sm md:text-xl font-semibold drop-shadow-lg leading-none mt-0.5">PRO DOMOV.CZ</span>
          </Link>
        </div>

        {/* Desktop Navigation - Right side */}
        <div className="flex-1 flex justify-end">
          <nav className="hidden lg:flex items-center space-x-4 mt-2">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className="text-sm font-normal text-white drop-shadow-lg px-2 py-1 rounded-lg whitespace-nowrap transition-all duration-300 hover:text-blue-200 hover:scale-105"
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

        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white drop-shadow-lg">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white/95 backdrop-blur-md border-l border-gray-200/50">
              <nav className="flex flex-col space-y-1 mt-6">
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
