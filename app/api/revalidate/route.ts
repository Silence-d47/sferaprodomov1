import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

const TAG_MAP: Record<string, string[]> = {
  projectReference: ['references'],
  post: ['posts'],
  product: ['products'],
  serviceCatalog: ['products'],
  heroSlide: ['hero'],
  referencePageSettings: ['references'],
}

export async function POST(req: NextRequest) {
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

  // Also revalidate specific paths for immediate effect
  if (docType === 'projectReference') {
    revalidatePath('/reference')
    if (body?.slug?.current) {
      revalidatePath(`/reference/${body.slug.current}`)
    }
  } else if (docType === 'post') {
    revalidatePath('/blog')
    if (body?.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`)
    }
  }

  return NextResponse.json({ revalidated: true, tags, now: Date.now() })
}
