"use client"

import { Clock, Phone, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function TopBar() {
  return (
    <div className="bg-[#1B5D93] text-white py-3 px-4 top-bar">
      <div className="container flex items-center justify-between">
        {/* Left side - Logo and Contact Info */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-sfera.svg" 
              alt="Sfera" 
              width={120} 
              height={41} 
              className="h-8 w-auto filter brightness-0 invert" 
            />
          </Link>
          
          {/* Contact Info */}
          <div className="flex items-center space-x-8 text-sm font-medium">
            {/* Working Hours */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Pondělí - Pátek 8:00 - 20:00</span>
              <span className="sm:hidden">Po-Pá 8-20</span>
            </div>
            
            {/* Phone */}
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <Link href="tel:+420123456789" className="hover:underline">
                +420 123 456 789
              </Link>
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Moravskoslezský kraj</span>
              <span className="sm:hidden">MS kraj</span>
            </div>
          </div>
        </div>

        {/* Right side - CTA and Ratings */}
        <div className="flex items-center space-x-6">
          {/* Google Rating */}
                      <div className="flex items-center space-x-2">
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="w-5 h-5 bg-white/30 rounded-sm flex items-center justify-center">
                <span className="text-xs text-white font-bold">G</span>
              </div>
            </div>
          
          {/* Seznam Rating */}
                      <div className="flex items-center space-x-2">
              <div className="flex space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="w-5 h-5 bg-white/30 rounded-sm flex items-center justify-center">
                <span className="text-xs text-white font-bold">S</span>
              </div>
            </div>
          

        </div>
      </div>
    </div>
  )
} 