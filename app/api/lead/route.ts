import { type NextRequest, NextResponse } from 'next/server'
import { client } from '@/app/lib/sanity.client'

function cleanString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }
  const trimmed = value.trim().slice(0, maxLength)
  return trimmed || undefined
}

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }

  const email = cleanString(body.email, 200)
  const phone = cleanString(body.phone, 50)

  if (!email && !phone) {
    return NextResponse.json({ message: 'Missing contact' }, { status: 400 })
  }

  const lead = {
    _type: 'lead',
    submittedAt: new Date().toISOString(),
    name: cleanString(body.name, 200),
    email,
    phone,
    zipCode: cleanString(body.zipCode, 20),
    service: cleanString(body.service, 80),
    message: cleanString(body.message, 5000),
    source: cleanString(body.source, 100),
    utmSource: cleanString(body.utm_source, 200),
    utmMedium: cleanString(body.utm_medium, 200),
    utmCampaign: cleanString(body.utm_campaign, 200),
    utmTerm: cleanString(body.utm_term, 200),
    utmContent: cleanString(body.utm_content, 200),
    status: 'new',
  }

  try {
    await client.create(lead)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Sféra] Uložení poptávky do Sanity selhalo:', error)
    return NextResponse.json({ message: 'Create failed' }, { status: 502 })
  }
}
