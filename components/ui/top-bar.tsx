"use client"

import { Clock, Phone, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function TopBar() {
  return (
    <div className="bg-[#1B5D93] text-white py-2 md:py-3 px-2 md:px-2 top-bar">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-full max-w-7xl overflow-hidden">
        {/* Left side - Logo and Contact Info */}
        <div className="flex items-center justify-start space-x-4 md:space-x-6 flex-1 min-w-0">
          {/* Text - SFÉRA a PRO DOMOV */}
          <div className="flex flex-col justify-center items-start gap-0">
            <span className="text-white text-sm md:text-xl font-semibold drop-shadow-lg leading-tight">S F É R A</span>
            <span className="text-white text-sm md:text-sm font-light drop-shadow-lg leading-none">PRO DOMOV</span>
          </div>
          
          {/* Logo - vedle textu */}
          <Link href="/" className="flex justify-start items-center flex-shrink-0">
            <Image 
              src="/logo-sfera.svg" 
              alt="Sfera" 
              width={120} 
              height={60} 
              className="h-8 md:h-12 w-auto filter brightness-0 invert" 
            />
          </Link>

          {/* Svislá čára */}

          {/* Otevírací doba - doleva */}
          <div className="flex items-center space-x-1">
            <Clock className="w-3 md:w-4 h-3 md:h-4" />
            <span className="hidden lg:inline text-xs md:text-sm font-medium">| Pondělí - Pátek 08:00 - 20:00</span>
            <span className="lg:hidden text-xs md:text-sm font-medium">Po-Pá 8-20</span>
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center  space-x-1 md:space-x-8 text-xs md:text-sm font-medium overflow-hidden">
            {/* Phone */}
            <div className="flex items-center space-x-1 md:space-x-1">
              <Phone className="w-3 md:w-4 h-3 md:h-4" />
              <Link href="tel:+420735014112" className="hover:underline whitespace-nowrap">
                <span className="hidden sm:inline">| +420 735 014 112</span>
                <span className="sm:hidden">735 014 112</span>
              </Link>
            </div>
            
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1">
              <MapPin className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden lg:inline">|&nbsp;Ostrava, Olomouc a okolí</span>
              <span className="lg:hidden">Ostrava, Olomouc a okolí</span>
            </div>
          </div>
        </div>

        {/* Right side - CTA and Ratings */}
        <div className="flex items-center space-x-1 md:space-x-1 flex-shrink-0">
          <div className="hidden sm:flex items-center space-x-4">
            {/* Google Rating */}
            <div className="flex flex-col items-center space-y-1">
              <Image 
                src="/google.svg"
                alt="Google hodnocení"
                width={84}
                height={24}
                className="h-5 w-[84px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="flex space-x-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Image 
                    key={`google-star-${i}`}
                    src="/star.svg"
                    alt="Hvězda hodnocení"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5"
                    style={{ filter: 'invert(86%) sepia(99%) saturate(358%) hue-rotate(354deg) brightness(104%) contrast(102%)' }}
                  />
                ))}
              </div>
            </div>

            {/* Seznam Rating */}
            <div className="flex flex-col items-center space-y-1">
              <Image 
                src="/seznam.svg"
                alt="Seznam.cz hodnocení"
                width={78}
                height={21}
                className="h-5 w-[78px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="flex space-x-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Image 
                    key={`seznam-star-${i}`}
                    src="/star.svg"
                    alt="Hvězda hodnocení"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5"
                    style={{ filter: 'invert(86%) sepia(99%) saturate(358%) hue-rotate(354deg) brightness(104%) contrast(102%)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 