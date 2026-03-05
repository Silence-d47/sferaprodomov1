'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value.url || (value.asset ? urlForImage(value)?.url() : '') || ''

      if (!imageUrl) {
        return null
      }

      return (
        <div className="relative w-full aspect-video my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Image'}
            fill
            sizes="(max-width: 960px) 100vw, 896px"
            className="object-cover rounded-lg"
          />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="underline decoration-1 underline-offset-2 text-blue-600 hover:text-blue-800"
        >
          {children}
        </a>
      )
    },
  },
}

export function CustomPortableText({ value }: { value: PortableTextBlock | PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
