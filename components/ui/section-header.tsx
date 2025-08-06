"use client"

import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'yellow'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  description,
  color = 'blue',
  className = ''
}: SectionHeaderProps) {
  const colorClasses = {
    blue: 'from-blue-600 to-cyan-600',
    green: 'from-green-600 to-emerald-600',
    purple: 'from-purple-600 to-violet-600',
    orange: 'from-orange-600 to-red-600',
    yellow: 'from-yellow-500 to-amber-600'
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="relative">
        {/* Title and Subtitle */}
        <div className="mb-6">
          <h2 className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl`}>
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 my-4"></div>
          <p className="text-lg text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
