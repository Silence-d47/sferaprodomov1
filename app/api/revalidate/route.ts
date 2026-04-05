import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const SLUG_PATTERN = /^[a-z0-9-]+$/

const TAG_MAP: Record<string, string[]> = {
  projectReference: ['references'],
  post: ['posts'],
  product: ['products'],
  category: ['products'],
  heroSlide: ['hero'],
  referencePageSettings: ['references'],
}

export async function POST(req: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Server misconfigured' }, { status: 500 })
  }

  const secret = req.headers.get('x-sanity-webhook-secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const docType = body?._type as string | undefined

  if (!docType) {
    return NextResponse.json({ message: 'Missing _type' }, { status: 400 })
  }

  const tags = TAG_MAP[docType] || [docType]
  for (const tag of tags) {
    revalidateTag(tag)
  }

  const slug = body?.slug?.current
  const validSlug = typeof slug === 'string' && SLUG_PATTERN.test(slug) ? slug : null

  if (docType === 'projectReference') {
    revalidatePath('/reference')
    if (validSlug) {
      revalidatePath(`/reference/${validSlug}`)
    }
  } else if (docType === 'post') {
    revalidatePath('/blog')
    if (validSlug) {
      revalidatePath(`/blog/${validSlug}`)
    }
  } else if (docType === 'referencePageSettings') {
    revalidatePath('/reference')
  } else if (docType === 'category') {
    revalidatePath('/klimatizace')
    revalidatePath('/rekuperace')
    revalidatePath('/tepelna-cerpadla')
    revalidatePath('/elektroinstalace')
  }

  return NextResponse.json({ revalidated: true, tags, now: Date.now() })
}
