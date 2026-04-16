import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string | undefined, maxLength = 220): string {
  if (!text) {
    return ''
  }
  if (text.length <= maxLength) {
    return text
  }
  const truncated = text.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  const result = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated

  return result.replace(/[,;:\-–—]+$/, '') + '...'
}
