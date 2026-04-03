import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { serverClient } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import ReferenceDetail from './reference-detail'
import type { ReferenceData } from './reference-detail'

const BASE_URL = 'https://www.sfera-domov.cz'

export const revalidate = 3600

const referenceQuery = groq`
  *[_type == "projectReference" && slug.current == $slug][0] {
    title,
    subtitle,
    description,
    "body": body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      },
      _type == "youtube" => {
        ...,
        "posterImage": posterImage{
          ...,
          "url": asset->url
        }
      }
    },
    category,
    location,
    year,
    "mainImage": image.asset->url,
    youtubeUrl,
    "gallery": gallery[].asset->url,
    rating,
    highlights,
    projectDetails,
    testimonial,
    technicalSpecs[]{label, value},
    seo
  }
`

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = await serverClient.fetch<ReferenceData | null>(
    referenceQuery,
    { slug },
    { next: { tags: ['references'] } },
  )

  if (!data) {
    return { title: 'Reference nenalezena' }
  }

  const canonical = `${BASE_URL}/reference/${slug}`
  const title = data.seo?.metaTitle || data.title || 'Reference'
  const description = data.seo?.metaDescription || data.description || ''

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: data.mainImage ? [data.mainImage] : [],
    },
  }
}

export default async function ReferenceDetailPage({ params }: Props) {
  const { slug } = await params
  const reference = await serverClient.fetch<ReferenceData | null>(
    referenceQuery,
    { slug },
    { next: { tags: ['references'] } },
  )

  if (!reference) {
    notFound()
  }

  return <ReferenceDetail reference={reference} />
}
