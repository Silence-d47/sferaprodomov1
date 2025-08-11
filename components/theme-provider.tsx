"use client"

import React, { createContext, useContext, useEffect } from 'react'

// Definice barevných schémat pro každou stránku
export const themeColors = {
  klimatizace: {
    // Tailwind blue-600
    primary: '217.2 91.2% 59.8%',
    primaryForeground: '210 40% 98%',
    accent: '217.2 91.2% 59.8%',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
  },
  'tepelna-cerpadla': {
    // Tailwind green-700 for better contrast
    primary: '142.1 70.6% 45.3%',
    primaryForeground: '210 40% 98%',
    accent: '142.1 70.6% 45.3%',
    gradientFrom: 'from-green-600',
    gradientTo: 'to-green-700',
  },
  elektroinstalace: {
    // Tailwind orange-500 (HSL)
    primary: '24.6 95% 53.1%',
    primaryForeground: '210 40% 98%',
    accent: '24.6 95% 53.1%',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-red-400',
  },
  rekuperace: {
    // Tailwind violet-600
    primary: '262.1 83.3% 57.8%',
    primaryForeground: '210 40% 98%',
    accent: '262.1 83.3% 57.8%',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-violet-600',
  },
  fotovoltaika: {
    // Tailwind amber-600 (teplejší než yellow pro lepší kontrast)
    primary: '37.7 92.1% 50.2%',
    primaryForeground: '210 40% 98%',
    accent: '37.7 92.1% 50.2%',
    gradientFrom: 'from-yellow-500', 
    gradientTo: 'to-amber-600',
  },
  default: {
    // Tailwind blue-600
    primary: '217.2 91.2% 59.8%',
    primaryForeground: '210 40% 98%',
    accent: '217.2 91.2% 59.8%',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
  }
} as const

export type ThemeName = keyof typeof themeColors

interface ThemeContextType {
  theme: ThemeName
  colors: typeof themeColors[ThemeName]
  setTheme: (theme: ThemeName) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  theme: ThemeName
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const colors = themeColors[theme] || themeColors.default

  useEffect(() => {
    // Nastavit CSS custom properties pro aktuální téma
    const root = document.documentElement
    
    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--primary-foreground', colors.primaryForeground)
    root.style.setProperty('--accent', colors.accent)
    
    // Přidat classy pro gradientové barvy
    root.className = root.className.replace(/theme-\w+/g, '')
    root.classList.add(`theme-${theme}`)
    
  }, [theme, colors])

  const value: ThemeContextType = {
    theme,
    colors,
    setTheme: () => {}, // Pro tuto implementaci není potřeba
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
