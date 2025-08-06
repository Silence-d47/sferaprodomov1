"use client"

import React from 'react';

const colorSchemes = {
  gray: {
    subtitle: 'text-gray-500',
    title: 'text-gray-900',
    divider: 'from-gray-400 to-gray-500',
  },
  blue: {
    subtitle: 'text-blue-600',
    title: 'text-gray-900',
    divider: 'from-blue-500 to-cyan-400',
  },
  green: {
    subtitle: 'text-green-600',
    title: 'text-gray-900',
    divider: 'from-green-500 to-emerald-400',
  },
  purple: {
    subtitle: 'text-purple-600',
    title: 'text-gray-900',
    divider: 'from-purple-500 to-violet-400',
  },
  orange: {
    subtitle: 'text-orange-600',
    title: 'text-gray-900',
    divider: 'from-orange-500 to-amber-400',
  },
  yellow: {
    subtitle: 'text-yellow-600',
    title: 'text-gray-900',
    divider: 'from-yellow-500 to-amber-400',
  },
};

export interface ShapedSectionHeaderProps {
  title: string;
  subtitle: string;
  color?: keyof typeof colorSchemes | 'gray';
  className?: string;
}

export function ShapedSectionHeader({
  title,
  subtitle,
  color = 'blue',
  className = '',
}: ShapedSectionHeaderProps) {
  const theme = colorSchemes[color] || colorSchemes.blue;

  return (
    <div className={`mb-8 md:mb-12 ${className}`}>
      <p className={`text-sm font-bold uppercase tracking-wider ${theme.subtitle}`}>
        {subtitle}
      </p>
      <h2 className={`mt-2 text-3xl sm:text-4xl font-bold tracking-tight ${theme.title}`}>
        {title}
      </h2>
      <div className={`mt-4 w-24 h-1.5 bg-gradient-to-r ${theme.divider} rounded-full`} />
    </div>
  );
}
