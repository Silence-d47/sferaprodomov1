"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function Carousel({ children, autoPlay = true, interval = 5000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  const startTimer = useCallback(() => {
    if (!autoPlay) return

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === children.length - 1 ? 0 : prevIndex + 1))
    }, interval)
  }, [autoPlay, interval, children.length])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  const goToPrevious = () => {
    stopTimer()
    setCurrentIndex(currentIndex === 0 ? children.length - 1 : currentIndex - 1)
    startTimer()
  }

  const goToNext = () => {
    stopTimer()
    setCurrentIndex(currentIndex === children.length - 1 ? 0 : currentIndex + 1)
    startTimer()
  }

  return (
    <div className={cn("relative overflow-hidden", className)} onMouseEnter={stopTimer} onMouseLeave={startTimer}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={goToNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {children.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-background/50",
            )}
            onClick={() => {
              stopTimer()
              setCurrentIndex(index)
              startTimer()
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const CarouselContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const CarouselItem = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const CarouselPrevious = () => {
  return <></>
}

export const CarouselNext = () => {
  return <></>
}
