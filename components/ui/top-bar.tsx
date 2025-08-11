"use client"

import { Clock, Phone, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function TopBar() {
  return (
    <div className="bg-[#1B5D93] text-white py-2 md:py-3 px-2 md:px-4 top-bar">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full max-w-7xl overflow-hidden">
        {/* Left side - Logo and Contact Info */}
        <div className="flex items-center space-x-2 md:space-x-8 flex-1 min-w-0">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/logo-sfera.svg" 
              alt="Sfera" 
              width={120} 
              height={60} 
              className="h-8 md:h-12 w-auto filter brightness-0 invert" 
            />
          </Link>
          
          {/* Contact Info */}
          <div className="flex items-center space-x-2 md:space-x-8 text-xs md:text-sm font-medium overflow-hidden">
            {/* Working Hours */}
            <div className="hidden md:flex items-center space-x-2">
              <Clock className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden lg:inline">Pondělí - Pátek 8:00 - 20:00</span>
              <span className="lg:hidden">Po-Pá 8-20</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center space-x-1 md:space-x-2">
              <Phone className="w-3 md:w-4 h-3 md:h-4" />
              <Link href="tel:+420735014112" className="hover:underline whitespace-nowrap">
                <span className="hidden sm:inline">+420 735 014 112</span>
                <span className="sm:hidden">735 014 112</span>
              </Link>
            </div>
            
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-2">
              <MapPin className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden lg:inline">Moravskoslezský kraj</span>
              <span className="lg:hidden">MS kraj</span>
            </div>
          </div>
        </div>

        {/* Right side - CTA and Ratings */}
        <div className="flex items-center space-x-2 md:space-x-6 flex-shrink-0">
          {/* Google Rating */}
          <div className="hidden sm:flex items-center space-x-2 bg-white/40 backdrop-blur-sm rounded-lg p-1 md:p-2">
            <Image 
              src="/google.png" 
              alt="Google" 
              width={120} 
              height={40} 
              className="h-6 md:h-10 w-auto" 
            />
          </div>
          
          {/* Seznam Rating */}
          <div className="hidden md:flex items-center space-x-2 bg-white/40 backdrop-blur-sm rounded-lg p-1 md:p-2">
            <Image 
              src="/firmycz.svg" 
              alt="Seznam.cz" 
              width={120} 
              height={40} 
              className="h-6 md:h-10 w-auto" 
            />
          </div>
        </div>
      </div>
    </div>
  )
} 