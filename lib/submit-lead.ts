import { getStoredUtmParams } from '@/lib/utm-params'

export interface LeadInput {
  name?: string
  phone: string
  email: string
  zipCode: string
  service: string
  message?: string
  source: string
}

export async function submitLeadToSanity(lead: LeadInput): Promise<void> {
  try {
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, ...getStoredUtmParams() }),
      keepalive: true,
    })
  } catch (error) {
    console.error('[Sféra] Záložní uložení poptávky do Sanity selhalo:', error)
  }
}
