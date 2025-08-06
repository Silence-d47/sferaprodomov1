"use client"

import React from "react"
import { Container } from "@/components/ui/container"

interface UnifiedLayoutProps {
  children: React.ReactNode
  className?: string
}

export function UnifiedLayout({ children, className = "" }: UnifiedLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Container className="py-8">
        {children}
      </Container>
    </div>
  )
}

export function UnifiedSection({ children, className = "", alt = false }: { 
  children: React.ReactNode
  className?: string
  alt?: boolean 
}) {
  return (
    <section className={`py-16 ${alt ? 'bg-gray-50' : 'bg-white'} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  )
}

export function UnifiedHeading({ 
  children, 
  level = 1, 
  className = "" 
}: { 
  children: React.ReactNode
  level?: 1 | 2 | 3
  className?: string
}) {
  const baseClasses = "font-bold text-gray-900 mb-6"
  
  switch (level) {
    case 1:
      return <h1 className={`text-4xl md:text-5xl lg:text-6xl ${baseClasses} ${className}`}>{children}</h1>
    case 2:
      return <h2 className={`text-3xl md:text-4xl lg:text-5xl ${baseClasses} ${className}`}>{children}</h2>
    case 3:
      return <h3 className={`text-2xl md:text-3xl lg:text-4xl ${baseClasses} ${className}`}>{children}</h3>
    default:
      return <h1 className={`text-4xl md:text-5xl lg:text-6xl ${baseClasses} ${className}`}>{children}</h1>
  }
}

export function UnifiedText({ 
  children, 
  size = "base", 
  className = "" 
}: { 
  children: React.ReactNode
  size?: "sm" | "base" | "lg" | "xl"
  className?: string
}) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }
  
  return (
    <p className={`text-gray-600 leading-relaxed ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  )
}

export function UnifiedButton({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  ...props 
}: { 
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  [key: string]: any
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 hover:transform hover:scale-105"
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white",
    outline: "bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50"
  }
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function UnifiedCard({ 
  children, 
  className = "",
  hover = true 
}: { 
  children: React.ReactNode
  className?: string
  hover?: boolean
}) {
  const baseClasses = "bg-white rounded-xl shadow-md border border-gray-200 p-6"
  const hoverClasses = hover ? "hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300" : ""
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  )
}

export function UnifiedGrid({ 
  children, 
  cols = 3, 
  className = "" 
}: { 
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }
  
  return (
    <div className={`grid gap-6 ${gridClasses[cols]} ${className}`}>
      {children}
    </div>
  )
} 