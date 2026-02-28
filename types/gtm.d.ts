declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtm?: (...args: unknown[]) => void
  }
}

export {}
