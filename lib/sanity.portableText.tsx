'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from './sanity.image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlForImage(value)?.url() || ''}
            alt={value.alt || 'Image'}
            fill
            className="object-cover"
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
          className="underline decoration-1 underline-offset-2"
        >
          {children}
        </a>
      )
    },
  },
}

export function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
} 