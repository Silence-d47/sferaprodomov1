'use client'

export interface ConversionData {
  name: string
  email: string
  phone: string
  zipCode: string
  source: string
  timestamp: Date
  userAgent: string
  referrer: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export function useConversionMetrics() {
  // Zachytání UTM parametrů z URL
  const getUTMParams = () => {
    if (typeof window === 'undefined') {
      return {}
    }

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined,
    }
  }

  // Zachytání referrer informací
  const getReferrerInfo = () => {
    if (typeof window === 'undefined') {
      return { referrer: '', userAgent: '' }
    }

    return {
      referrer: document.referrer || 'direct',
      userAgent: navigator.userAgent,
    }
  }

  // Uložení konverze — každý krok běží nezávisle, selhání jednoho neblokuje ostatní.
  // Vždy vrací true, aby se neblokoval redirect. Chyby se logují do console.error (Vercel error log).
  const saveConversion = (data: Omit<ConversionData, 'timestamp' | 'userAgent' | 'referrer'>) => {
    const conversionData: ConversionData = {
      ...data,
      timestamp: new Date(),
      ...getReferrerInfo(),
      ...getUTMParams(),
    }

    // 1. Uložení do localStorage
    try {
      const existingConversions = localStorage.getItem('sfera-conversions')
      const conversions = existingConversions ? JSON.parse(existingConversions) : []
      conversions.push(conversionData)
      localStorage.setItem('sfera-conversions', JSON.stringify(conversions))
    } catch (error) {
      console.error('[Sféra] Chyba při ukládání konverze do localStorage:', error)
    }

    // 2. Uložení do sessionStorage
    try {
      sessionStorage.setItem('sfera-last-conversion', JSON.stringify(conversionData))
    } catch (error) {
      console.error('[Sféra] Chyba při ukládání konverze do sessionStorage:', error)
    }

    // 3. Odeslání do analytics (GA4, Facebook Pixel, GTM)
    try {
      trackAnalytics(conversionData)
    } catch (error) {
      console.error(
        '[Sféra] Chyba při odesílání analytics — data formuláře byla odeslána, ale analytics tracking selhal:',
        error,
      )
    }

    return true
  }

  // Sledování v analytics službách
  const trackAnalytics = (data: ConversionData) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: data.source,
        value: 1,
        custom_parameters: {
          form_name: 'welcome-popup',
          user_location: data.zipCode,
        },
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'welcome-popup',
        content_category: data.source,
        value: 1,
        currency: 'CZK',
      })
    }

    // Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_name: 'welcome-popup',
        form_source: data.source,
        user_location: data.zipCode,
        timestamp: data.timestamp.toISOString(),
      })
    }
  }

  return {
    saveConversion,
  }
}
