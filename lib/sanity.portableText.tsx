'use client'

import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-96 my-8">
          <img
            src={value.asset?.url || value.url || ''}
            alt={value.alt || 'Image'}
            className="w-full h-full object-cover rounded-lg"
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

export function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
} 