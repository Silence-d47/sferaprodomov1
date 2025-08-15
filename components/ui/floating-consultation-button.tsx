"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingConsultationButtonProps {
  onOpen: () => void
  isVisible: boolean
}

export function FloatingConsultationButton({ onOpen, isVisible }: FloatingConsultationButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsAnimating(true), 100)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-slate-800 text-white text-sm rounded-xl shadow-2xl whitespace-nowrap animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span className="font-medium">Bezplatná konzultace</span>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
      
      {/* Hlavní tlačítko */}
      <button
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group relative w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          "rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform",
          "flex items-center justify-center text-white overflow-hidden",
          isAnimating ? "animate-in slide-in-from-bottom-2 duration-500" : "opacity-0 translate-y-4",
          isHovered ? "scale-110" : "scale-100"
        )}
      >
        <MessageSquare className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        
        {/* Pulzující efekt */}
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
        
        {/* Modrý bod pro zvýraznění */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
        
        {/* Hover efekt - světelný kruh */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Gradient overlay pro lepší vzhled */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
      </button>
      
      {/* Text pod tlačítkem */}
      <div className={cn(
        "text-center mt-2 text-xs text-slate-600 font-medium transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-70"
      )}>
        Konzultace
      </div>
    </div>
  )
}
