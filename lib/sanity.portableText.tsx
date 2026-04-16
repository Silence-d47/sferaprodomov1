'use client';

import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity.image';
import { useState } from 'react';

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtu\.be\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

function YouTubeEmbed({ url, posterImage }: { url: string; posterImage?: { url?: string } }) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return null;
  }

  const posterUrl = posterImage?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!playing) {
    return (
      <div
        className="relative w-full aspect-video my-8 rounded-lg overflow-hidden cursor-pointer group"
        onClick={() => setPlaying(true)}
      >
        <Image
          src={posterUrl}
          alt="YouTube video"
          fill
          sizes="(max-width: 960px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 md:w-10 md:h-10 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = value.url || (value.asset ? urlForImage(value)?.url() : '') || '';

      if (!imageUrl) {
        return null;
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
      );
    },
    youtube: ({ value }) => {
      if (!value?.url) {
        return null;
      }
      return <YouTubeEmbed url={value.url} posterImage={value.posterImage} />;
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="underline decoration-1 underline-offset-2 text-blue-600 hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
  },
};

export function CustomPortableText({ value }: { value: PortableTextBlock | PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
