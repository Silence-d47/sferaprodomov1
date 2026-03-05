'use client'

import { useEffect } from 'react'
import { captureUtmParams } from '@/lib/utm-params'

export function UtmCapture() {
  useEffect(() => {
    captureUtmParams()
  }, [])

  return null
}
